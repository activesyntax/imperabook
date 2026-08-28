using CSharpFunctionalExtensions;

namespace ImperaBook.Application;

public sealed record LanguageCount(string? Language, int Count);

public sealed record BookReference
{
    public required Guid Id { get; init; }
    public required string Title { get; init; }
    public required IReadOnlyList<BookAuthor> Authors { get; init; }
}

public sealed record ShortestBook(BookReference Book, int PageCount);

public sealed record LongestBook(BookReference Book, int PageCount);

public sealed record LibraryStatistics(
    int TotalBooks,
    int TotalAuthors,
    int TotalPages,
    int TotalLanguages,
    int BooksWithPageCount,
    double AvgPagesPerBook,
    Maybe<LongestBook> LongestBook
);

public sealed record LibraryDetail(string Name, string? PhotoHash);

public interface ILibraryQueries
{
    Task<bool> ExistsAsync(Guid id, CancellationToken ct);

    Task<Maybe<LibraryDetail>> GetLibraryAsync(CancellationToken ct);

    Task<LibraryStatistics> GetStatisticsAsync(CancellationToken ct);

    Task<Maybe<Guid>> GetIdAsync(CancellationToken ct);
}
