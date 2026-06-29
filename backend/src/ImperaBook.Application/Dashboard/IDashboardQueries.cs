namespace ImperaBook.Application.Dashboard;

/// <summary>
/// Flat read model (DECISIONS 8): plain counts queried straight from the store.
/// No Result — a read has no expected domain error; an empty library is a valid
/// zero, not a failure (DECISIONS 12). Unexpected failures propagate to the global
/// exception handler.
/// </summary>
public sealed record DashboardSummary(int TotalBooks, int AuthorCount, int LanguageCount);

public interface IDashboardQueries
{
    Task<DashboardSummary> GetSummaryAsync(CancellationToken ct);
}
