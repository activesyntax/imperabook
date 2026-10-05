namespace ImperaBook.Application;

public sealed record DashboardSummary(
    int TotalBooks,
    int TotalAuthors,
    int TotalPages,
    CatalogGaps Gaps
);

/// <summary>
/// What the catalog still lacks, counted the way the dashboard's findings list it — each count
/// is what its "list … having no …" command would return.
/// </summary>
/// <param name="BooksLackingAny">Books lacking at least one of the four things counted below.</param>
public sealed record CatalogGaps(
    int BooksLackingAny,
    int BooksWithoutPageCount,
    int BooksWithoutIsbn,
    int BooksWithoutCover,
    int BooksWithoutPublicationYear,
    int AuthorsWithoutBooks
);

public interface IDashboardQueries
{
    Task<DashboardSummary> GetSummaryAsync(CancellationToken ct);
}
