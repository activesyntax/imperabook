using ErrorOr;
using ImperaBook.Domain;

namespace ImperaBook.Application.Books.Commands;

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
    public async Task<ErrorOr<Guid>> Handle(AddBookCommand command, CancellationToken ct)
    {
        // 1. Accumulate all field validation errors
        var fieldsResult = ValidateFields(command);
        if (fieldsResult.IsError)
            return fieldsResult.Errors;

        var (title, subtitle, summary) = fieldsResult.Value;

        // 2. Resolve target location safely
        var locationResult = await ResolveLocation(command.LibraryId, ct);
        if (locationResult.IsError)
            return locationResult.Errors;

        // 3. Construct domain aggregates and persist
        var attribution = Attribution.OfAuthorIds(command.AuthorIds.Select(Id<Author>.From));
        var bookId = Id<Book>.New();
        var book = Book.Create(bookId, title, subtitle, summary, attribution, locationResult.Value);

        await books.Add(book, ct);
        return bookId.Value;
    }

    private static ErrorOr<(Title Title, Subtitle? Subtitle, Summary? Summary)> ValidateFields(
        AddBookCommand command
    )
    {
        var titleResult = Title.Create(command.Title);
        var subtitleResult = Subtitle.Create(command.Subtitle);
        var summaryResult = Summary.Create(command.Summary);

        var errors = new List<Error>();
        if (titleResult.IsError)
            errors.AddRange(titleResult.Errors);

        if (subtitleResult.IsError)
            errors.AddRange(subtitleResult.Errors);

        if (summaryResult.IsError)
            errors.AddRange(summaryResult.Errors);

        return errors.Any()
            ? errors
            : (titleResult.Value, subtitleResult.Value, summaryResult.Value);
    }

    private async Task<ErrorOr<Location>> ResolveLocation(Guid? libraryId, CancellationToken ct)
    {
        if (libraryId is not { } id)
            return new Location.Unknown(); // Valid state, implicitly converts to success

        if (!await libraries.Exists(id, ct))
        {
            return Error.NotFound(
                code: "Library.NotFound",
                description: $"The specified library with ID '{id}' does not exist."
            );
        }

        return new Location.Library(Id<Library>.From(id));
    }
}
