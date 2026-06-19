using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
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

public sealed class AddBookHandler(IBookWriteRepository books, ILibraryRepository libraries)
{
    public async Task<AppResult<Guid>> Handle(AddBook command, CancellationToken ct)
    {
        var fields = ValidateFields(command);
        if (fields.IsError)
            return fields.Error;

        var (title, subtitle, summary) = fields.Value;

        var location = await ResolveLocation(command.LibraryId, ct);
        if (location.IsError)
            return location.Error;

        var attribution = Attribution.OfAuthorIds(command.AuthorIds.Select(Id<Author>.From));

        var bookId = Id<Book>.New();
        var book = Book.Create(bookId, title, subtitle, summary, attribution, location.Value);

        await books.Add(book, ct);
        return bookId.Value;
    }

    // Every field is validated and all errors are collected before returning — the explicit,
    // dependency-free stand-in for applicative error accumulation.
    private static AppResult<(Title Title, Subtitle? Subtitle, Summary? Summary)> ValidateFields(AddBook command)
    {
        var title = Title.Create(command.Title);
        var subtitle = Subtitle.Create(command.Subtitle);
        var summary = Summary.Create(command.Summary);

        List<DomainValidationError> errors = [];
        if (!title.IsOk) errors.Add(title.Error);
        if (!subtitle.IsOk) errors.Add(subtitle.Error);
        if (!summary.IsOk) errors.Add(summary.Error);

        if (errors.Count > 0)
            return new ApplicationError.Validation(errors);

        return (title.Value, subtitle.Value, summary.Value);
    }

    private async Task<AppResult<Location>> ResolveLocation(Guid? libraryId, CancellationToken ct)
    {
        if (libraryId is not { } id)
            return new Location.Unknown();

        if (!await libraries.Exists(id, ct))
            return new ApplicationError.LibraryNotFound(id);

        return new Location.Library(Id<Library>.From(id));
    }
}
