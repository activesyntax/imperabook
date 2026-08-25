using System.Globalization;
using CSharpFunctionalExtensions;
using ImperaBook.Domain;
using ImperaBook.Domain.Catalog;
using Authors = ImperaBook.Domain.Catalog.Authors;

namespace ImperaBook.Application;

public sealed record AddBookCommand
{
    public required string Title { get; init; }
    public required IReadOnlyList<Guid> AuthorIds { get; init; }

    public string? Subtitle { get; init; }
    public string? Summary { get; init; }
    public string? CoverHash { get; init; }
    public string? Isbn { get; init; }
    public string? Published { get; init; }
    public string? Publisher { get; init; }
    public string? Language { get; init; }
    public string? Pages { get; init; }
}

public sealed class AddBookCommandHandler(
    IBookCommands books,
    ILibraryQueries libraries,
    IImageStore images
)
{
    public async Task<Result<Guid, ApplicationError>> Handle(
        AddBookCommand command,
        CancellationToken ct
    )
    {
        var fields = ValidateFields(command);
        if (fields.IsFailure)
            return fields.Error;

        var f = fields.Value;

        var cover = await ResolveCover(f.Cover, ct);
        if (cover.IsFailure)
            return cover.Error;

        var libraryId = await ResolveLibrary(ct);
        if (libraryId.IsFailure)
            return libraryId.Error;

        var bookId = Id<Book>.New();
        var book = new Book
        {
            Id = bookId,
            Library = libraryId.Value,
            Title = f.Title,
            Subtitle = f.Subtitle,
            Attribution = Attribution.Of(f.Authors),
            Summary = f.Summary,
            Cover = cover.Value,
            Isbn = f.Isbn,
            Published = f.Published,
            Publisher = f.Publisher,
            Language = f.Language,
            Pages = f.Pages,
        };

        await books.Add(book, ct);
        return bookId.Value;
    }

    private async Task<Result<Id<Library>, ApplicationError>> ResolveLibrary(CancellationToken ct)
    {
        var libraryId = await libraries.GetIdAsync(ct);

        return libraryId.Match(
            id => Result.Success<Id<Library>, ApplicationError>(Id<Library>.From(id)),
            () => Result.Failure<Id<Library>, ApplicationError>(new ApplicationError.NoLibrary())
        );
    }

    private readonly record struct BookFields(
        Title Title,
        Authors Authors,
        Maybe<Subtitle> Subtitle,
        Maybe<Summary> Summary,
        Maybe<ContentHash> Cover,
        Maybe<Isbn> Isbn,
        Maybe<Year> Published,
        Maybe<Publisher> Publisher,
        Maybe<LanguageCode> Language,
        Maybe<PageCount> Pages
    );

    private static Result<BookFields, ApplicationError> ValidateFields(AddBookCommand command)
    {
        var title = Title.Create(command.Title);
        var authors = Authors.Create(command.AuthorIds.Select(Id<Author>.From));

        // Text-shaped values handle their own absence: a string can be blank, so blankness is
        // something the type's own input can express (ADR 11).
        var subtitle = Subtitle.Create(command.Subtitle);
        var summary = Summary.Create(command.Summary);
        var isbn = Isbn.Create(command.Isbn);
        var publisher = Publisher.Create(command.Publisher);
        var language = LanguageCode.Create(command.Language);
        var cover = Optional(command.CoverHash, ContentHash.Create);
        var published = OptionalNumber<int, Year>(command.Published, Year.Create);
        var pages = OptionalNumber<uint, PageCount>(command.Pages, PageCount.Create);

        CatalogValidationError?[] errors =
        [
            title.IsFailure ? title.Error : null,
            authors.HasNoValue ? new CatalogValidationError.AuthorRequired() : null,
            subtitle.IsFailure ? subtitle.Error : null,
            summary.IsFailure ? summary.Error : null,
            cover.IsFailure ? cover.Error : null,
            isbn.IsFailure ? isbn.Error : null,
            publisher.IsFailure ? publisher.Error : null,
            language.IsFailure ? language.Error : null,
            published.IsFailure ? published.Error : null,
            pages.IsFailure ? pages.Error : null,
        ];

        var failures = errors.OfType<CatalogValidationError>().ToList();
        if (failures.Count > 0)
            return new ApplicationError.Validation(failures);

        return Result.Success<BookFields, ApplicationError>(
            new BookFields(
                title.Value,
                authors.Value, // asserted above: AuthorRequired covers the absent case
                subtitle.Value,
                summary.Value,
                cover.Value,
                isbn.Value,
                published.Value,
                publisher.Value,
                language.Value,
                pages.Value
            )
        );
    }

    /// <summary>
    /// For text value objects whose <c>Create</c> is also used where the value is required, and
    /// which therefore return a bare <c>Result</c>.
    /// </summary>
    private static Result<Maybe<T>, CatalogValidationError> Optional<T>(
        string? raw,
        Func<string, Result<T, CatalogValidationError>> create
    ) => string.IsNullOrWhiteSpace(raw) ? Maybe<T>.None : create(raw.Trim()).Map(Maybe<T>.From);

    /// <summary>
    /// Text-to-number conversion is a shape concern and stops here; the value object below only
    /// ever sees a number. Parsing is invariant because command text is not localized input.
    /// Moves to the command boundary once <c>CommandParameter</c> declares a parameter kind, at
    /// which point the failure carries a source offset instead of a field name.
    /// </summary>
    private static Result<Maybe<T>, CatalogValidationError> OptionalNumber<TNumber, T>(
        string? raw,
        Func<TNumber, Result<T, CatalogValidationError>> create
    )
        where TNumber : IParsable<TNumber>
    {
        if (string.IsNullOrWhiteSpace(raw))
            return Maybe<T>.None;

        var trimmed = raw.Trim();

        return TNumber.TryParse(trimmed, CultureInfo.InvariantCulture, out var number)
            ? create(number).Map(Maybe<T>.From)
            : new CatalogValidationError.NotANumber(trimmed);
    }

    private async Task<Result<Maybe<ContentHash>, ApplicationError>> ResolveCover(
        Maybe<ContentHash> hash,
        CancellationToken ct
    )
    {
        if (!hash.TryGetValue(out var contentHash))
            return Maybe<ContentHash>.None;

        if (!await images.Exists(contentHash, ct))
            return new ApplicationError.ImageNotFound(contentHash);

        return hash;
    }
}
