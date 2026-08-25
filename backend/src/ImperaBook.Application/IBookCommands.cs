using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application;

public interface IBookCommands
{
    Task Add(Book book, CancellationToken ct);
}
