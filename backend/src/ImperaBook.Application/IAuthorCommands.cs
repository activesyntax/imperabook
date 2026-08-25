using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application;

public interface IAuthorCommands
{
    Task Add(Author book, CancellationToken ct);
}
