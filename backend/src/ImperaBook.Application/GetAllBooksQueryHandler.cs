using System.Threading;
using System.Threading.Tasks;

namespace ImperaBook.Application.Books.Queries;

// No GetAllBooksQuery record: with no parameters and no mediator dispatch, an empty
// request object is pure ceremony. The handler suffix carries the convention.
public sealed class GetAllBooksQueryHandler(IBookReadRepository books)
{
    public Task<BookListItem[]> Handle(CancellationToken ct) => books.ListAll(ct);
}
