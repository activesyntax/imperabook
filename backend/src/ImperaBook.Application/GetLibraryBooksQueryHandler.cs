using System;
using System.Threading;
using System.Threading.Tasks;

namespace ImperaBook.Application.Books.Queries;

public sealed class GetLibraryBooksQueryHandler(IBookReadRepository books)
{
    public Task<BookListItem[]> Handle(Guid libraryId, CancellationToken ct) =>
        books.ListByLibrary(libraryId, ct);
}
