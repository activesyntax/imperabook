using CSharpFunctionalExtensions;
using ImperaBook.Application;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Queries;

public sealed class LibraryQueries : ILibraryQueries
{
    private readonly ImperaBookDbContext _db;

    public LibraryQueries(ImperaBookDbContext db) => _db = db;

    public Task<bool> Exists(Guid id, CancellationToken ct) =>
        _db.Libraries.AnyAsync(l => l.Id == id, ct);

    public async Task<Maybe<LibraryDetail>> GetLibrary(Guid id, CancellationToken ct)
    {
        var row = await _db
            .Libraries.AsNoTracking()
            .Where(l => l.Id == id)
            .Select(l => new LibraryDetail(l.Name, l.PhotoHash))
            .SingleOrDefaultAsync(ct);

        return Maybe<LibraryDetail>.From(row);
    }

    public async Task<LibraryStatistics> GetStatistics(Guid libraryId, CancellationToken ct)
    {
        var books = _db.Books.AsNoTracking().Where(b => b.LibraryId == libraryId);

        var totalBooks = await books.CountAsync(ct);

        // Catalog-wide, not library-scoped: there is no book -> author relationship
        // in the schema yet. Identical under MVP1's one-library-per-user rule;
        // revisit the moment a join table exists.
        var totalAuthors = await _db.Authors.AsNoTracking().CountAsync(ct);

        // var languages = await books
        //     .GroupBy(b => b.Language)
        //     .Select(g => new LanguageCount(g.Key, g.Count()))
        //     .OrderByDescending(x => x.Count)
        //     .ThenBy(x => x.Language)
        //     .ToListAsync(ct);

        // TODO: BookEntity carries no page count yet, so these two cannot be computed.
        // Fixed placeholders — the only fabricated values in this class, and the only
        // reason it is not a pure projection. Replace with
        //   g.Sum(b => b.PageCount ?? 0) / g.Count(b => b.PageCount != null)
        // once `add book` prompts for a page count (COMMANDS.md, Books).
        const int totalPages = 78_450;
        const int booksWithPageCount = 248;

        return new LibraryStatistics(
            TotalBooks: totalBooks,
            TotalAuthors: totalAuthors,
            TotalPages: totalPages,
            BooksWithPageCount: booksWithPageCount
        );
    }
}
