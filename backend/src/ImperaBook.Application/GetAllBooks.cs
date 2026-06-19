using System.Threading;
using System.Threading.Tasks;

namespace ImperaBook.Application.Books;

public static class GetAllBooksHandler
{
    public static Task<BookListItem[]> Handle(IBookReadRepository books, CancellationToken ct) =>
        books.ListAll(ct);
}
