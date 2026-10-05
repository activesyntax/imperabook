using ImperaBook.Application;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Queries;

public sealed class DashboardQueries(ImperaBookDbContext db, ICurrentUser user) : IDashboardQueries
{
    public async Task<DashboardSummary> GetSummaryAsync(CancellationToken ct)
    {
        // Every book count in one pass: a single query with a filtered count per finding.
        var books = await db.OwnedBooks(user)
            .GroupBy(_ => 1)
            .Select(g => new
            {
                Total = g.Count(),
                Pages = g.Sum(b => b.PageCount ?? 0),
                LackingAny = g.Count(b =>
                    b.PageCount == null || b.Isbn == null || b.CoverHash == null || b.PublishedYear == null
                ),
                WithoutPageCount = g.Count(b => b.PageCount == null),
                WithoutIsbn = g.Count(b => b.Isbn == null),
                WithoutCover = g.Count(b => b.CoverHash == null),
                WithoutPublicationYear = g.Count(b => b.PublishedYear == null),
            })
            .SingleOrDefaultAsync(ct);

        var authors = db.Authors.AsNoTracking().Where(a => a.OwnerId == user.Id);
        var totalAuthors = await authors.CountAsync(ct);
        var authorsWithoutBooks = await authors.CountAsync(
            a => !db.Set<BookAuthorEntity>().Any(ba => ba.AuthorId == a.Id),
            ct
        );

        // No books at all: the grouping has no group to report.
        return books is null
            ? new DashboardSummary(0, totalAuthors, 0, new CatalogGaps(0, 0, 0, 0, 0, authorsWithoutBooks))
            : new DashboardSummary(
                books.Total,
                totalAuthors,
                books.Pages,
                new CatalogGaps(
                    books.LackingAny,
                    books.WithoutPageCount,
                    books.WithoutIsbn,
                    books.WithoutCover,
                    books.WithoutPublicationYear,
                    authorsWithoutBooks
                )
            );
    }
}
