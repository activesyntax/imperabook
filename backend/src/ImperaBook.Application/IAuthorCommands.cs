using ImperaBook.Domain;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application;

public interface IAuthorCommands
{
    Task Add(Author book, CancellationToken ct);

    /// <summary>
    /// Deletes the author if they are the current user's, unlinking them from their books first.
    /// Returns how many books were left with no author — whose only author this was — or none
    /// when there was no such author to delete.
    /// </summary>
    Task<int?> Remove(Id<Author> id, CancellationToken ct);
}
