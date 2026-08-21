using CSharpFunctionalExtensions;
using ImperaBook.Domain;
using ImperaBook.Domain.Catalog;

// TODO: this class should be moved to ImperaBook.Infrastrucutre.Data
namespace ImperaBook.Application;

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

        var (title, subtitle, summary, coverHash, authors) = fields.Value;

        var cover = await ResolveCover(coverHash, ct);
        if (cover.IsFailure)
            return cover.Error;

        var libraryId = await ResolveLibrary(ct);
        if (libraryId.IsFailure)
            return libraryId.Error;

        var attribution = Attribution.Of(authors);
        var bookId = Id<Book>.New();
        var book = Book.Create(
            bookId,
            title,
            subtitle,
            summary,
            attribution,
            cover.Value,
            libraryId.Value
        );

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
