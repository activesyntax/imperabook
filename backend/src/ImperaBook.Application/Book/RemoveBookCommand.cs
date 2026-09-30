using CSharpFunctionalExtensions;
using ImperaBook.Domain;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application;

public sealed record BookRemoved(Guid Id, string Title);

/// <summary>
/// Removes a book from the current user's library. The authors stay, even one left with no
/// books: they are still in the catalog, and the dashboard points them out.
/// </summary>
public sealed class RemoveBookCommandHandler(IBookQueries books, IBookCommands commands)
{
    public async Task<Result<BookRemoved, ApplicationError>> Handle(Guid id, CancellationToken ct)
    {
        // Looked up first for the title the reply names; the query is owner-scoped, so a book
        // in someone else's library is as missing as one that never existed.
        var book = await books.Get(id, ct);
        if (book.HasNoValue)
            return new ApplicationError.BookNotFound();

        // Gone between the two calls (removed elsewhere): still not found, not an error.
        return await commands.Remove(Id<Book>.From(id), ct)
            ? new BookRemoved(id, book.Value.Title)
            : new ApplicationError.BookNotFound();
    }
}
