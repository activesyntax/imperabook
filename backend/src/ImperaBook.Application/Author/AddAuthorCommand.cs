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

public sealed class AddAuthorCommandHandler(
    IAuthorCommands authors,
    ICurrentUser user,
    IImageStore images,
    IArtwork artwork
)
{
    public async Task<Result<Guid, ApplicationError>> Handle(
        AddAuthorCommand command,
        CancellationToken ct
    )
    {
        var author = BuildAuthor(command, Id<Author>.New(), Id<User>.From(user.Id));
        if (author.IsFailure)
            return author.Error;

        var portrait = await ResolvePortrait(author.Value, ct);
        if (portrait.IsFailure)
            return portrait.Error;

        var a = author.Value;
        await authors.Add(
            Author.Create(a.Id, a.Owner, a.FirstName, a.LastName, a.LifeRange, portrait.Value),
            ct
        );
        return a.Id.Value;
    }

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
        var lastName = PersonName.Create(command.LastName);
        var firstName = ParseFirstName(command.FirstName);
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
