using System;
using System.Threading;
using System.Threading.Tasks;

namespace ImperaBook.Application.Books;

public sealed record GetBooks
{
    public Guid? LibraryId { get; init; }
    public string? TitleContains { get; init; }
}

public static class GetBooksHandler
{
    public static Task<BookListItem[]> Handle(IBookReadRepository books, GetBooks query, CancellationToken ct)
    {
        var titleContains = query.TitleContains?.Trim();
        if (string.IsNullOrEmpty(titleContains))
            titleContains = null;

        return books.List(query.LibraryId, titleContains, ct);
    }
}
