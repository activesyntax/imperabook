using ImperaBook.Application.Books.ReadModel;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application;

public interface IBookWriteRepository
{
    Task Add(Book book, CancellationToken ct);
}

public interface ILibraryRepository
{
    Task<bool> Exists(Guid id, CancellationToken ct);
}
