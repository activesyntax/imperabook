using System;
using System.Threading;
using System.Threading.Tasks;

namespace ImperaBook.Application.Books;

public static class GetLibraryBooksHandler
{
    public static Task<BookListItem[]> Handle(IBookReadRepository books, Guid libraryId, CancellationToken ct) =>
        books.ListByLibrary(libraryId, ct);
}
