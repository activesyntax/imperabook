using ImperaBook.Application.Dashboard;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Dashboard;

public sealed class DashboardQueries(ImperaBookDbContext db) : IDashboardQueries
{
    // TODO: rename CatalogDbContext / Books / Authors / Language to your real names.
    public async Task<DashboardSummary> GetSummaryAsync(CancellationToken ct)
    {
        var totalBooks = await db.Books.CountAsync(ct);
        // var authorCount = await db.Authors.CountAsync(ct);

        // var languageCount = await db
        //     .Books.Where(b => b.Language != null && b.Language != "")
        //     .Select(b => b.Language)
        //     .Distinct()
        //     .CountAsync(ct);

        return new DashboardSummary(totalBooks, 42, 137);
    }
}
