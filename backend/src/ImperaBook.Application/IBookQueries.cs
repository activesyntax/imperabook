using CSharpFunctionalExtensions;

namespace ImperaBook.Application;

public sealed record BookAuthor
{
    public required Guid Id { get; init; }
    public string? FirstName { get; init; }
    public required string LastName { get; init; }
}

public sealed record BookListItem
{
    public required Guid Id { get; init; }
    public required string Title { get; init; }
    public string? Subtitle { get; init; }
    public required IReadOnlyList<BookAuthor> Authors { get; init; }
    public string? CoverHash { get; init; }
}

public sealed record BookDetail
{
    public required Guid Id { get; init; }
    public required string Title { get; init; }
    public string? Subtitle { get; init; }
    public required IReadOnlyList<BookAuthor> Authors { get; init; }
    public string? Summary { get; init; }
    public string? CoverHash { get; init; }
    public string? Isbn { get; init; }
    public int? Published { get; init; }
    public string? Publisher { get; init; }
    public string? Language { get; init; }
    public int? Pages { get; init; }
}

public enum PageComparison
{
    Over,
    Under,
    Equal,
    AtLeast,
    AtMost,
    OtherThan,
    Between,
}

/// <summary>
/// Books by page count: "over 120", "between 100 and 200" (both ends included). A book whose
/// page count is unknown matches none of them — not even "other than 120".
/// </summary>
public sealed record PageFilter(PageComparison Comparison, int Pages, int UpTo = 0)
{
    /// <summary>A range given either way round is the same range.</summary>
    public static PageFilter Between(int one, int other) =>
        new(PageComparison.Between, Math.Min(one, other), Math.Max(one, other));
}

public interface IBookQueries
{
    Task<BookListItem[]> List(PageFilter? filter, CancellationToken ct);

    Task<Maybe<BookDetail>> Get(Guid id, CancellationToken ct);
}
