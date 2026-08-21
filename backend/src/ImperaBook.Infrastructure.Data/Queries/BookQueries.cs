using ImperaBook.Application;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Queries;

public sealed class BookQueries(ImperaBookDbContext db, ICurrentUser user) : IBookQueries
{
    public Task<BookListItem[]> List(string? titleContains, CancellationToken ct)
    {
        var title = string.IsNullOrWhiteSpace(titleContains) ? null : titleContains.Trim();

        var q =
            from b in db.Books.AsNoTracking()
            join l in db.Libraries.AsNoTracking() on b.LibraryId equals l.Id
            where l.OwnerId == user.Id
            select b;

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
