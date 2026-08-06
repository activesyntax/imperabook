using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application;

public interface IAuthorWriteRepository
{
    Task Add(Author book, CancellationToken ct);
}
