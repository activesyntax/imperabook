using ImperaBook.Application.Books.ReadModel;

namespace ImperaBook.Application.Books;

public sealed class GetLibraryBooksQueryHandler(IBookReadRepository books)
{
    public Task<BookListItem[]> Handle(Guid libraryId, CancellationToken ct) =>
        books.ListByLibrary(libraryId, ct);
}
