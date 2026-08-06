namespace ImperaBook.Application.Dashboard;

public sealed record DashboardSummary(int TotalBooks, int TotalAuthors, int TotalPages);

public interface IDashboardQueries
{
    Task<DashboardSummary> GetSummaryAsync(CancellationToken ct);
}
