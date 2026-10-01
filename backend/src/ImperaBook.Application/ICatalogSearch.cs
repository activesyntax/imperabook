namespace ImperaBook.Application;

/// <summary>Books and authors in the current user's catalog that match every keyword.</summary>
public sealed record SearchResults(
    IReadOnlyList<BookListItem> Books,
    IReadOnlyList<AuthorListItem> Authors
)
{
    public bool IsEmpty => Books.Count == 0 && Authors.Count == 0;
}

public interface ICatalogSearch
{
    /// <summary>
    /// Every keyword must match, so each one narrows the results. A book matches a keyword
    /// found in its title, subtitle, summary or an author's name — as part of a word, or as the
    /// same English word in another form ("flies" finds "flying"). An author matches a keyword
    /// found in their name.
    /// </summary>
    Task<SearchResults> Find(IReadOnlyList<string> keywords, CancellationToken ct);
}
