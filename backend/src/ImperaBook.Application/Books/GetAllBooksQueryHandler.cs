using ImperaBook.Application.Books.ReadModel;

namespace ImperaBook.Application.Books;

// No GetAllBooksQuery record: with no parameters and no mediator dispatch, an empty
// request object is pure ceremony. The handler suffix carries the convention.
public sealed class GetAllBooksQueryHandler(IBookReadRepository books)
{
    public Task<BookListItem[]> Handle(CancellationToken ct) => books.ListAll(ct);
}
