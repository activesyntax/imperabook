using ImperaBook.Application;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Queries;

public sealed class BookQueries(ImperaBookDbContext db) : IBookQueries
{
    public Task<BookListItem[]> List(Guid? libraryId, string? titleContains, CancellationToken ct)
    {
        var title = string.IsNullOrWhiteSpace(titleContains) ? null : titleContains.Trim();

        var q = db.Books.AsNoTracking();

        if (libraryId is { } lib)
            q = q.Where(b => b.LibraryId == lib);

        if (title is not null)
            q = q.Where(b => EF.Functions.ILike(b.Title, $"%{title}%"));

        return q.OrderBy(b => b.Title)
            .Select(b => new BookListItem
            {
                Id = b.Id,
                Title = b.Title,
                Subtitle = b.Subtitle,
                Authors = b
                    .Authors.OrderBy(ba => ba.Ordinal)
                    .Select(ba => new BookListAuthor
                    {
                        Id = ba.AuthorId,
                        FirstName = ba.Author.FirstName,
                        LastName = ba.Author.LastName,
                    })
                    .ToList(),
                LibraryId = b.LibraryId,
                CoverHash = b.CoverHash,
            })
            .ToArrayAsync(ct);
    }
}
