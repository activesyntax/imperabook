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
    IAuthorQueries authors,
    IImageStore images,
    IArtwork artwork
)
{
    public async Task<Result<Guid, ApplicationError>> Handle(
        AddBookCommand command,
        CancellationToken ct
    )
    {
        var library = await ResolveLibrary(ct);
        if (library.IsFailure)
            return library.Error;

        var book = BuildBook(command, Id<Book>.New(), library.Value);
        if (book.IsFailure)
            return book.Error;

        var attribution = await VerifyAuthors(book.Value.Attribution, ct);
        if (attribution.IsFailure)
            return attribution.Error;

        var cover = await ResolveCover(book.Value, ct);
        if (cover.IsFailure)
            return cover.Error;

        await books.Add(book.Value with { Cover = cover.Value }, ct);
        return book.Value.Id.Value;
    }

    private async Task<Result<Id<Library>, ApplicationError>> ResolveLibrary(CancellationToken ct)
    {
        var libraryId = await libraries.GetIdAsync(ct);

        return libraryId.Match(
            id => Result.Success<Id<Library>, ApplicationError>(Id<Library>.From(id)),
            () => Result.Failure<Id<Library>, ApplicationError>(new ApplicationError.NoLibrary())
        );
    }

    private async Task<UnitResult<ApplicationError>> VerifyAuthors(
        Attribution attribution,
        CancellationToken ct
    )
    {
        var ids = attribution.AuthorIds().Select(id => id.Value).ToList();
        if (ids.Count == 0)
            return UnitResult.Success<ApplicationError>();

        var owned = await authors.Owned(ids, ct);
        var missing = ids.Where(id => !owned.Contains(id)).ToList();

        return missing.Count == 0
            ? UnitResult.Success<ApplicationError>()
            : UnitResult.Failure<ApplicationError>(new ApplicationError.AuthorsNotFound(missing));
    }

    /// <summary>
    /// A given cover must already be uploaded; a book added without one gets generated artwork.
    /// </summary>
    private async Task<Result<ContentHash, ApplicationError>> ResolveCover(
        Book book,
        CancellationToken ct
    )
    {
        if (!book.Cover.TryGetValue(out var hash))
            return await artwork.Cover(book.Title, ct);

        return await images.Exists(hash, ct)
            ? hash
            : new ApplicationError.ImageNotFound(hash);
    }

    private static Result<Book, ApplicationError> BuildBook(
        AddBookCommand command,
        Id<Book> id,
        Id<Library> library
    )
    {
        var title = Title.Create(command.Title);
        // An empty list is a legitimate answer: nobody knows who wrote it.
        var authors = Authors.Create(command.AuthorIds.Select(Id<Author>.From));

        var subtitle = Subtitle.Create(command.Subtitle);
        var summary = Summary.Create(command.Summary);
        var isbn = Isbn.Create(command.Isbn);
        var publisher = Publisher.Create(command.Publisher);
        var language = LanguageCode.Create(command.Language);
        var cover = ParseCover(command.CoverHash);
        var published = ParseYear(command.Published);
        var pages = ParsePageCount(command.Pages);

        CatalogValidationError?[] errors =
        [
            title.IsFailure ? title.Error : null,
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

        return new Book
        {
            Id = id,
            Library = library,
            Title = title.Value,
            Subtitle = subtitle.Value,
            Attribution = Attribution.Of(authors),
            Summary = summary.Value,
            Cover = cover.Value,
            Isbn = isbn.Value,
            Published = published.Value,
            Publisher = publisher.Value,
            Language = language.Value,
            Pages = pages.Value,
        };
    }

    private static Result<Maybe<ContentHash>, CatalogValidationError> ParseCover(string? raw) =>
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

    private static Result<Maybe<PageCount>, CatalogValidationError> ParsePageCount(string? raw)
    {
        if (string.IsNullOrWhiteSpace(raw))
            return Maybe<PageCount>.None;

        var trimmed = raw.Trim();

        return uint.TryParse(trimmed, CultureInfo.InvariantCulture, out var value)
            ? PageCount.Create(value).Map(Maybe<PageCount>.From)
            : new CatalogValidationError.NotANumber(trimmed);
    }
}
