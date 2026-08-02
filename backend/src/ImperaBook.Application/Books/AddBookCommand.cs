using CSharpFunctionalExtensions;
using ImperaBook.Application.Covers;
using ImperaBook.Domain;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application.Books;

public sealed record AddBookCommand
{
    public required string Title { get; init; }
    public string? Subtitle { get; init; }
    public string? Summary { get; init; }
    public required IReadOnlyList<Guid> AuthorIds { get; init; }
    public Guid? LibraryId { get; init; }
    public string? CoverHash { get; init; }
}

public sealed class AddBookCommandHandler(
    IBookWriteRepository books,
    ILibraryRepository libraries,
    ICoverStore covers
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

        var (title, subtitle, summary, coverHash, authors) = fields.Value;

        var location = await ResolveLocation(command.LibraryId, ct);
        if (location.IsFailure)
            return location.Error;

        var cover = await ResolveCover(coverHash, ct);
        if (cover.IsFailure)
            return cover.Error;

        var attribution = Attribution.Of(authors);
        var bookId = Id<Book>.New();
        var book = Book.Create(
            bookId,
            title,
            subtitle,
            summary,
            attribution,
            location.Value,
            cover.Value
        );

        await books.Add(book, ct);
        return bookId.Value;
    }

    private record struct BookFields(
        Title Title,
        Maybe<Subtitle> Subtitle,
        Maybe<Summary> Summary,
        Maybe<ContentHash> CoverHash,
        Maybe<ImperaBook.Domain.Catalog.Authors> Authors
    );

    private static Result<BookFields, ApplicationError> ValidateFields(AddBookCommand command)
    {
        var title = Title.Create(command.Title);
        var subtitle = Subtitle.Create(command.Subtitle);
        var summary = Summary.Create(command.Summary);
        var coverHash = ParseCoverHash(command.CoverHash);
        var authors = ImperaBook.Domain.Catalog.Authors.Create(
            command.AuthorIds.Select(Id<Author>.From)
        );

        CatalogValidationError?[] errors =
        [
            title.IsFailure ? title.Error : null,
            subtitle.IsFailure ? subtitle.Error : null,
            summary.IsFailure ? summary.Error : null,
            coverHash.IsFailure ? coverHash.Error : null,
            authors.HasNoValue ? new CatalogValidationError.AuthorRequired() : null,
        ];

        var failures = errors.OfType<CatalogValidationError>().ToList();
        if (failures.Count > 0)
            return new ApplicationError.Validation(failures);

        return Result.Success<BookFields, ApplicationError>(
            new BookFields(title.Value, subtitle.Value, summary.Value, coverHash.Value, authors)
        );
    }

    private static Result<Maybe<ContentHash>, CatalogValidationError> ParseCoverHash(string? raw) =>
        string.IsNullOrWhiteSpace(raw)
            ? Maybe<ContentHash>.None
            : ContentHash.Create(raw).Map(Maybe<ContentHash>.From);

    private async Task<Result<Location, ApplicationError>> ResolveLocation(
        Guid? libraryId,
        CancellationToken ct
    )
    {
        if (libraryId is not { } id)
            return new Location.Unknown();

        if (!await libraries.Exists(id, ct))
            return new ApplicationError.LibraryNotFound(id);

        Id<Library> guid = Id<Library>.From(id);
        return new Location.AtLibrary(guid);
    }

    private async Task<Result<Maybe<Cover>, ApplicationError>> ResolveCover(
        Maybe<ContentHash> hash,
        CancellationToken ct
    )
    {
        if (!hash.TryGetValue(out var contentHash))
            return Maybe<Cover>.None;

        var cover = await covers.Find(contentHash, ct);
        if (cover.HasNoValue)
            return new ApplicationError.CoverNotFound(contentHash);

        return cover;
    }
}
