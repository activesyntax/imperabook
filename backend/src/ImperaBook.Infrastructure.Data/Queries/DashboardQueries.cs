using ImperaBook.Application;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Queries;

public sealed class DashboardQueries(ImperaBookDbContext db, ICurrentUser user) : IDashboardQueries
{
    private IQueryable<BookEntity> OwnedBooks =>
        db
            .Books.AsNoTracking()
            .Join(
                db.Libraries.AsNoTracking().Where(l => l.OwnerId == user.Id),
                book => book.LibraryId,
                library => library.Id,
                (book, _) => book
            );

    public async Task<DashboardSummary> GetSummaryAsync(CancellationToken ct)
    {
        var totalBooks = await OwnedBooks.CountAsync(ct);

        var totalAuthors = await db
            .Authors.AsNoTracking()
            .CountAsync(a => a.OwnerId == user.Id, ct);

        // TODO: BookEntity carries no page count yet. Fixed placeholder — the only
        // fabricated value in this class.
        const int totalPages = 8450;

        return new DashboardSummary(totalBooks, totalAuthors, totalPages);
    }
}
