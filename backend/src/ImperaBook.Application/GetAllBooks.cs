using System.Threading;
using System.Threading.Tasks;

namespace ImperaBook.Application.Books;

public sealed class GetAllBooksHandler(IBookReadRepository books)
{
    public Task<BookListItem[]> Handle(CancellationToken ct) => books.ListAll(ct);
}
