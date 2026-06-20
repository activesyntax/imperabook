using System;
using System.Threading;
using System.Threading.Tasks;

namespace ImperaBook.Application.Books.Queries;

public sealed record GetBooksQuery
{
    public Guid? LibraryId { get; init; }
    public string? TitleContains { get; init; }
}

public sealed class GetBooksQueryHandler(IBookReadRepository books)
{
    public Task<BookListItem[]> Handle(GetBooksQuery query, CancellationToken ct)
    {
        var titleContains = string.IsNullOrWhiteSpace(query.TitleContains)
            ? null
            : query.TitleContains.Trim();

        return books.List(query.LibraryId, titleContains, ct);
    }
}
