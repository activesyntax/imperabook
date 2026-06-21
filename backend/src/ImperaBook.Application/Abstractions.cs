using ImperaBook.Application.Books.ReadModel;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application;

public interface IBookWriteRepository
{
    Task Add(Book book, CancellationToken ct);
}

public interface IBookReadRepository
{
    Task<BookListItem[]> List(Guid? libraryId, string? titleContains, CancellationToken ct);
    Task<BookListItem[]> ListAll(CancellationToken ct);
    Task<BookListItem[]> ListByLibrary(Guid libraryId, CancellationToken ct);
}

public interface ILibraryRepository
{
    Task<bool> Exists(Guid id, CancellationToken ct);
}
