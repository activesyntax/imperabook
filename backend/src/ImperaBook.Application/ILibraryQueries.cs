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
    Task<bool> Exists(Guid id, CancellationToken ct);

    Task<Maybe<LibraryDetail>> GetLibrary(Guid id, CancellationToken ct);

    Task<LibraryStatistics> GetStatistics(Guid libraryId, CancellationToken ct);
}
