using ImperaBook.Application.Books.ReadModel;

namespace ImperaBook.Application.Books;

public interface IBookQueries
{
    Task<BookListItem[]> List(Guid? libraryId, string? titleContains, CancellationToken ct);
}
