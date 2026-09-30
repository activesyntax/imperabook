using ImperaBook.Domain;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application;

public interface IBookCommands
{
    Task Add(Book book, CancellationToken ct);

    /// <summary>
    /// Deletes the book if it is in the current user's library; its author links go with it.
    /// Returns whether a book was deleted.
    /// </summary>
    Task<bool> Remove(Id<Book> id, CancellationToken ct);
}
