using System;
using System.Threading;
using System.Threading.Tasks;

namespace ImperaBook.Application.Books;

public sealed record GetBooks
{
    public Guid? LibraryId { get; init; }
    public string? TitleContains { get; init; }
}

public sealed class GetBooksHandler(IBookReadRepository books)
{
    public Task<BookListItem[]> Handle(GetBooks query, CancellationToken ct)
    {
        var titleContains = string.IsNullOrWhiteSpace(query.TitleContains)
            ? null
            : query.TitleContains.Trim();

        return books.List(query.LibraryId, titleContains, ct);
    }
}
