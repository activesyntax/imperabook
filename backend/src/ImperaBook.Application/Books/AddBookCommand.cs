using CSharpFunctionalExtensions;
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
}

public sealed class AddBookCommandHandler(IBookWriteRepository books, ILibraryRepository libraries)
{
    public async Task<Result<Guid, ApplicationError>> Handle(
        AddBookCommand command,
        CancellationToken ct
    )
    {
        var fields = ValidateFields(command);
        if (fields.IsFailure)
            return fields.Error;

        var (title, subtitle, summary) = fields.Value;

        var location = await ResolveLocation(command.LibraryId, ct);
        if (location.IsFailure)
            return location.Error;

        var attribution = Attribution.OfAuthorIds(command.AuthorIds.Select(Id<Author>.From));
        var bookId = Id<Book>.New();
        var book = Book.Create(bookId, title, subtitle, summary, attribution, location.Value);

        await books.Add(book, ct);
        return bookId.Value;
    }

    private record struct BookFields(Title Title, Maybe<Subtitle> Subtitle, Maybe<Summary> Summary);

    private static Result<BookFields, ApplicationError> ValidateFields(AddBookCommand command)
    {
        var title = Title.Create(command.Title);
        var subtitle = Subtitle.Create(command.Subtitle);
        var summary = Summary.Create(command.Summary);

        DomainValidationError?[] errors =
        [
            title.IsFailure ? title.Error : null,
            subtitle.IsFailure ? subtitle.Error : null,
            summary.IsFailure ? summary.Error : null,
        ];

        var failures = errors.OfType<DomainValidationError>().ToList();
        if (failures.Count > 0)
            return new ApplicationError.Validation(failures);

        return Result.Success<BookFields, ApplicationError>(
            new BookFields(title.Value, subtitle.Value, summary.Value)
        );
    }

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
}
