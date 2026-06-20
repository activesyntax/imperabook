using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
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
    public async Task<AppResult<Guid>> Handle(AddBookCommand command, CancellationToken ct)
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
    private static Result<(Title Title, Subtitle? Subtitle, Summary? Summary)> ValidateFields(
        AddBookCommand command
    )
    {
        var title = Title.Create(command.Title);
        if (!title.IsOk)
            return Result<(Title, Subtitle?, Summary?)>.Fail();

        var subtitle = Subtitle.Create(command.Subtitle);
        if (!subtitle.IsOk)
            return Result<(Title, Subtitle?, Summary?)>.Fail(subtitle.Error);

        var summary = Summary.Create(command.Summary);
        if (!summary.IsOk)
            return Result<(Title, Subtitle?, Summary?)>.Fail(summary.Error);

        return Result<(Title, Subtitle?, Summary?)>.Ok(
            (title.Value, subtitle.Value, summary.Value)
        );
    }

    private async Task<Result<Location>> ResolveLocation(Guid? libraryId, CancellationToken ct)
    {
        if (libraryId is not { } id)
            return new Location.Unknown();

        if (!await libraries.Exists(id, ct))
            return new ApplicationError.LibraryNotFound(id);

        return new Location.Library(Id<Library>.From(id));
    }
}
