using ImperaBook.Application;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Queries;

public sealed class BookQueries(ImperaBookDbContext db, ICurrentUser user) : IBookQueries
{
    public Task<BookListItem[]> List(CancellationToken ct)
    {
        var q = db
            .Books.AsNoTracking()
            .Join(
                db.Libraries.AsNoTracking(),
                b => b.LibraryId,
                l => l.Id,
                (b, l) => new { Book = b, Library = l }
            )
            .Where(x => x.Library.OwnerId == user.Id)
            .Select(x => x.Book);

        return q.OrderBy(b => b.Title)
            .ThenBy(b => b.Id)
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
                CoverHash = b.CoverHash,
            })
            .ToArrayAsync(ct);
    }
}
