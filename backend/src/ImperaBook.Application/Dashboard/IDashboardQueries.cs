namespace ImperaBook.Application.Dashboard;

public sealed record DashboardSummary(int TotalBooks, int AuthorCount, int LanguageCount);

public interface IDashboardQueries
{
    Task<DashboardSummary> GetSummaryAsync(CancellationToken ct);
}
