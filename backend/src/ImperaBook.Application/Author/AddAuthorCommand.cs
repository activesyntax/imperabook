using System.Globalization;
using CSharpFunctionalExtensions;
using ImperaBook.Domain;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application;

public sealed record AddAuthorCommand
{
    public required string LastName { get; init; }

    public string? FirstName { get; init; }
    public string? BirthYear { get; init; }
    public string? DeathYear { get; init; }
    public VitalityKind? Vitality { get; init; }
    public string? PortraitHash { get; init; }
}

/// <summary>The author as stored: their id, and their name as it was saved.</summary>
public sealed record AuthorAdded(Guid Id, string Name);

public sealed class AddAuthorCommandHandler(
    IAuthorCommands authors,
    IAuthorQueries catalog,
    ICurrentUser user,
    IImageStore images,
    IArtwork artwork
)
{
    public async Task<Result<AuthorAdded, ApplicationError>> Handle(
        AddAuthorCommand command,
        CancellationToken ct
    )
    {
        var author = BuildAuthor(command, Id<Author>.New(), Id<User>.From(user.Id));
        if (author.IsFailure)
            return author.Error;

        // Before the portrait: a rejected author must not leave generated artwork behind.
        var unique = await EnsureNotInCatalog(author.Value, ct);
        if (unique.IsFailure)
            return unique.Error;

        var portrait = await ResolvePortrait(author.Value, ct);
        if (portrait.IsFailure)
            return portrait.Error;

        var a = author.Value;
        await authors.Add(
            Author.Create(a.Id, a.Owner, a.FirstName, a.LastName, a.LifeRange, portrait.Value),
            ct
        );
        return new AuthorAdded(a.Id.Value, FullName(a.FirstName.Map(f => f.Value).GetValueOrDefault(), a.LastName.Value));
    }

    /// <summary>
    /// The same full name — ignoring case, accents and extra blanks — is the same author: adding it again
    /// would split their books across two entries. Namesakes are rare enough in a personal
    /// catalog that refusing is the better default.
    /// </summary>
    private async Task<UnitResult<ApplicationError>> EnsureNotInCatalog(
        Author author,
        CancellationToken ct
    )
    {
        var name = FullName(author.FirstName.Map(f => f.Value).GetValueOrDefault(), author.LastName.Value);
        var existing = (await catalog.Search(name, ct)).FirstOrDefault(a =>
            NameCase.SameName(FullName(a.FirstName, a.LastName), name)
        );

        return existing is null
            ? UnitResult.Success<ApplicationError>()
            : UnitResult.Failure<ApplicationError>(new ApplicationError.DuplicateAuthor(existing));
    }

    private static string FullName(string? first, string last) =>
        string.Join(' ', $"{first} {last}".Split(' ', StringSplitOptions.RemoveEmptyEntries));

    /// <summary>
    /// A given portrait must already be uploaded; an author added without one gets generated
    /// artwork.
    /// </summary>
    private async Task<Result<ContentHash, ApplicationError>> ResolvePortrait(
        Author author,
        CancellationToken ct
    )
    {
        if (!author.Portrait.TryGetValue(out var hash))
            return await artwork.Portrait(author.FirstName, author.LastName, ct);

        return await images.Exists(hash, ct)
            ? hash
            : new ApplicationError.ImageNotFound(hash);
    }

    private static Result<Author, ApplicationError> BuildAuthor(
        AddAuthorCommand command,
        Id<Author> id,
        Id<User> owner
    )
    {
        // Stored capitalized however it was typed ("le guin" → "Le Guin"). The last name only
        // begins the whole name when there is no first name: "van Beethoven" after "Ludwig",
        // but "Van Gogh" alone.
        var firstName = ParseFirstName(NameCase.Capitalize(command.FirstName));
        var lastName = PersonName.Create(
            NameCase.Capitalize(command.LastName, startsName: string.IsNullOrWhiteSpace(command.FirstName))
        );
        var birth = ParseYear(command.BirthYear);
        var death = ParseYear(command.DeathYear);
        var portrait = ParsePortrait(command.PortraitHash);

        var vitality = death.IsSuccess
            ? ResolveVitality(command.Vitality, death.Value)
            : Result.Success<Vitality, CatalogValidationError>(new Vitality.Unknown());

        var lifeRange =
            birth.IsSuccess && vitality.IsSuccess
                ? LifeRange.Create(birth.Value, vitality.Value)
                : Result.Success<LifeRange, CatalogValidationError>(LifeRange.Unrecorded);

        CatalogValidationError?[] errors =
        [
            lastName.IsFailure ? lastName.Error : null,
            firstName.IsFailure ? firstName.Error : null,
            birth.IsFailure ? birth.Error : null,
            death.IsFailure ? death.Error : null,
            vitality.IsFailure ? vitality.Error : null,
            lifeRange.IsFailure ? lifeRange.Error : null,
            portrait.IsFailure ? portrait.Error : null,
        ];

        var failures = errors.OfType<CatalogValidationError>().ToList();
        if (failures.Count > 0)
            return new ApplicationError.Validation(failures);

        return Author.Create(
            id,
            owner,
            firstName.Value,
            lastName.Value,
            lifeRange.Value,
            portrait.Value
        );
    }

    /// <summary>
    /// A death year implies the author is deceased, so it may stand in for an omitted vitality —
    /// but it contradicts an explicit "living" or "unknown" and is rejected rather than dropped.
    /// </summary>
    private static Result<Vitality, CatalogValidationError> ResolveVitality(
        VitalityKind? kind,
        Maybe<Year> death
    ) =>
        (kind, death.HasValue) switch
        {
            (null, false) or (VitalityKind.Unknown, false) => new Vitality.Unknown(),
            (VitalityKind.Living, false) => new Vitality.Living(),
            (null, true) or (VitalityKind.Deceased, _) => new Vitality.Deceased(death),
            (VitalityKind.Living or VitalityKind.Unknown, true) =>
                new CatalogValidationError.DeathYearRequiresDeceased(),
            _ => throw new InvalidOperationException($"Unmapped vitality kind: {kind}"),
        };

    private static Result<Maybe<PersonName>, CatalogValidationError> ParseFirstName(string? raw) =>
        string.IsNullOrWhiteSpace(raw)
            ? Maybe<PersonName>.None
            : PersonName.Create(raw).Map(Maybe<PersonName>.From);

    private static Result<Maybe<ContentHash>, CatalogValidationError> ParsePortrait(string? raw) =>
        string.IsNullOrWhiteSpace(raw)
            ? Maybe<ContentHash>.None
            : ContentHash.Create(raw).Map(Maybe<ContentHash>.From);

    private static Result<Maybe<Year>, CatalogValidationError> ParseYear(string? raw)
    {
        if (string.IsNullOrWhiteSpace(raw))
            return Maybe<Year>.None;

        var trimmed = raw.Trim();

        return int.TryParse(trimmed, CultureInfo.InvariantCulture, out var value)
            ? Year.Create(value).Map(Maybe<Year>.From)
            : new CatalogValidationError.NotANumber(trimmed);
    }
}
