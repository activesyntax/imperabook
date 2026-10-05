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
    public int? Pages { get; init; }
    public int? Published { get; init; }
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

public enum YearComparison
{
    In,
    Before,
    After,
    Between,
}

/// <summary>
/// Books by publication year: "before 1950" and "after 1950" leave 1950 out, "between 1950 and
/// 1960" keeps both ends. A book whose year is unknown matches none of them.
/// </summary>
public sealed record YearFilter(YearComparison Comparison, int Year, int UpTo = 0)
{
    /// <summary>A range given either way round is the same range.</summary>
    public static YearFilter Between(int one, int other) =>
        new(YearComparison.Between, Math.Min(one, other), Math.Max(one, other));
}

/// <summary>
/// Books by language code ("hu"), or by any other ("is not"). A book whose language is unknown
/// matches neither: an unknown language is not "not English".
/// </summary>
public sealed record LanguageFilter(string Code, bool Negated = false);

/// <summary>What a book list is narrowed to; every filter given must hold, none means all books.</summary>
/// <param name="Pages">By page count.</param>
/// <param name="Author">
/// By an author whose full name contains this, ignoring case and accents, as "by author" matches.
/// </param>
/// <param name="Published">By publication year.</param>
/// <param name="Language">By language.</param>
/// <param name="Missing">Lacking every one of these.</param>
public sealed record BookFilter(
    PageFilter? Pages = null,
    string? Author = null,
    YearFilter? Published = null,
    LanguageFilter? Language = null,
    IReadOnlySet<MissingField>? Missing = null
)
{
    public bool IsEmpty =>
        Pages is null && Author is null && Published is null && Language is null && Missing is not { Count: > 0 };
}

/// <summary>What a book can lack, for "having no …": each one listed must be absent.</summary>
public enum MissingField
{
    Author,
    Pages,
    Published,
    Language,
    Isbn,
    Cover,
}

public interface IBookQueries
{
    /// <summary>The current user's books matching every filter given in <paramref name="filter"/>.</summary>
    Task<BookListItem[]> List(BookFilter filter, CancellationToken ct);

    /// <summary>The language codes the current user's books are in, each once.</summary>
    Task<string[]> Languages(CancellationToken ct);

    Task<Maybe<BookDetail>> Get(Guid id, CancellationToken ct);
}
