using CSharpFunctionalExtensions;

namespace ImperaBook.Application;

public sealed record LanguageCount(string? Language, int Count);

public sealed record LibraryStatistics(
    int TotalBooks,
    int TotalAuthors,
    int TotalPages,
    int BooksWithPageCount
);

public sealed record LibraryDetail(string Name, string? PhotoHash);

public interface ILibraryQueries
{
    Task<bool> ExistsAsync(Guid id, CancellationToken ct);

    Task<Maybe<LibraryDetail>> GetLibraryAsync(CancellationToken ct);

    Task<LibraryStatistics> GetStatisticsAsync(CancellationToken ct);

    Task<Maybe<Guid>> GetIdAsync(CancellationToken ct);
}
