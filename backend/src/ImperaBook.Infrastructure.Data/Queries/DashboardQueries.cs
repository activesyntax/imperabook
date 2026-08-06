using ImperaBook.Application;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Queries;

public sealed class DashboardQueries(ImperaBookDbContext db) : IDashboardQueries
{
    public async Task<DashboardSummary> GetSummaryAsync(CancellationToken ct)
    {
        var totalBooks = await db.Books.CountAsync(ct);
        var totalAuthors = await db.Authors.CountAsync(ct);
        var totalPages = 8450;

        // var languageCount = await db
        //     .Books.Where(b => b.Language != null && b.Language != "")
        //     .Select(b => b.Language)
        //     .Distinct()
        //     .CountAsync(ct);

        return new DashboardSummary(totalBooks, totalAuthors, totalPages);
    }
}
