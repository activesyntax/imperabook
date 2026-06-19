using ImperaBook.Domain;

namespace ImperaBook.Application.Books;

public sealed record AddBook
{
    public required string Title { get; init; }
    public string? Subtitle { get; init; }
    public string? Summary { get; init; }
    public required IReadOnlyList<Guid> AuthorIds { get; init; }
    public Guid? LibraryId { get; init; }
}

public static class AddBookHandler
{
    // The manual equivalent of F#'s `validation { let! ... and! ... }`: every field is validated,
    // ALL errors are collected (no short-circuit), and the result is built only if the list is empty.
    private static AppResult<(Title, Subtitle?, Summary?)> ValidateFields(AddBook cmd)
    {
        var errors = new List<DomainValidationError>();

        var title = Title.Create(cmd.Title);
        if (!title.IsOk)
            errors.Add(title.Error);

        var subtitle = Subtitle.Create(cmd.Subtitle);
        if (!subtitle.IsOk)
            errors.Add(subtitle.Error);

        var summary = Summary.Create(cmd.Summary);
        if (!summary.IsOk)
            errors.Add(summary.Error);

        if (errors.Count > 0)
            return AppResult<(Title, Subtitle?, Summary?)>.Fail(
                new ApplicationError.Validation(errors)
            );

        return AppResult<(Title, Subtitle?, Summary?)>.Ok(
            (title.Value, subtitle.Value, summary.Value)
        );
    }

    private static async Task<AppResult<Location>> ResolveLocation(
        ILibraryRepository libraries,
        Guid? libraryId,
        CancellationToken ct
    )
    {
        if (libraryId is null)
            return AppResult<Location>.Ok(new Location.Unknown());

        var id = libraryId.Value;

        var exists = await libraries.Exists(id, ct);
        if (!exists)
            return AppResult<Location>.Fail(new ApplicationError.LibraryNotFound(id));

        return AppResult<Location>.Ok(new Location.Library(Id<Library>.From(id)));
    }

    // The railway orchestration that `taskResult { }` gave you for free: each `let!` becomes
    // a check-and-early-return on the result before moving on.
    public static async Task<AppResult<Guid>> Handle(
        IBookWriteRepository books,
        ILibraryRepository libraries,
        AddBook cmd,
        CancellationToken ct
    )
    {
        var fields = ValidateFields(cmd);
        if (!fields.IsOk)
            return AppResult<Guid>.Fail(fields.Error);

        var (title, subtitle, summary) = fields.Value;

        var attribution = Attribution.OfAuthorIds(cmd.AuthorIds.Select(Id<Author>.From));

        var location = await ResolveLocation(libraries, cmd.LibraryId, ct);
        if (!location.IsOk)
            return AppResult<Guid>.Fail(location.Error);

        var bookId = Id<Book>.New();
        var book = Book.Create(bookId, title, subtitle, summary, attribution, location.Value);

        await books.Add(book, ct);
        return AppResult<Guid>.Ok(bookId.Value);
    }
}
