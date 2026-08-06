namespace ImperaBook.Application;

public sealed record DashboardSummary(int TotalBooks, int TotalAuthors, int TotalPages);

public interface IDashboardQueries
{
    Task<DashboardSummary> GetSummaryAsync(CancellationToken ct);
}
