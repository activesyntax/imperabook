using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application;

public interface IBookWriteRepository
{
    Task Add(Book book, CancellationToken ct);
}
