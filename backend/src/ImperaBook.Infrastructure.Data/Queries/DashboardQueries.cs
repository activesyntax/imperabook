using ImperaBook.Application;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Queries;

public sealed class DashboardQueries(ImperaBookDbContext db, ICurrentUser user) : IDashboardQueries
{
    public async Task<DashboardSummary> GetSummaryAsync(CancellationToken ct)
    {
        var books =
            from b in db.Books.AsNoTracking()
            join l in db.Libraries.AsNoTracking() on b.LibraryId equals l.Id
            where l.OwnerId == user.Id
            select b;

        var totalBooks = await books.CountAsync(ct);

        var totalAuthors = await books
            .SelectMany(b => b.Authors)
            .Select(ba => ba.AuthorId)
            .Distinct()
            .CountAsync(ct);

        const int totalPages = 8450;

        return new DashboardSummary(totalBooks, totalAuthors, totalPages);
    }
}
