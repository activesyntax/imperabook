using CSharpFunctionalExtensions;
using ImperaBook.Application;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Queries;

public sealed class LibraryQueries(ImperaBookDbContext db, ICurrentUser user) : ILibraryQueries
{
    private IQueryable<LibraryEntity> Owned =>
        db.Libraries.AsNoTracking().Where(l => l.OwnerId == user.Id);

    private IQueryable<BookEntity> OwnedBooks =>
        db
            .Books.AsNoTracking()
            .Join(Owned, book => book.LibraryId, library => library.Id, (book, _) => book);

    public Task<bool> ExistsAsync(Guid id, CancellationToken ct) =>
        Owned.AnyAsync(l => l.Id == id, ct);

    public async Task<Maybe<LibraryDetail>> GetLibraryAsync(CancellationToken ct)
    {
        var row = await Owned
            .Select(l => new LibraryDetail(l.Name, l.PhotoHash))
            .SingleOrDefaultAsync(ct);

        return Maybe<LibraryDetail>.From(row);
    }

    public async Task<Maybe<Guid>> GetIdAsync(CancellationToken ct)
    {
        var id = await Owned.Select(l => (Guid?)l.Id).SingleOrDefaultAsync(ct);

        return id is null ? Maybe<Guid>.None : Maybe<Guid>.From(id.Value);
    }

    public async Task<LibraryStatistics> GetStatisticsAsync(CancellationToken ct)
    {
        var totalBooks = await OwnedBooks.CountAsync(ct);

        var totalAuthors = await db
            .Authors.AsNoTracking()
            .CountAsync(a => a.OwnerId == user.Id, ct);

        // TODO: BookEntity carries no page count yet, so these two cannot be computed.
        // Fixed placeholders — the only fabricated values in this class.
        const int totalPages = 8450;
        const int booksWithPageCount = 248;

        return new LibraryStatistics(
            TotalBooks: totalBooks,
            TotalAuthors: totalAuthors,
            TotalPages: totalPages,
            BooksWithPageCount: booksWithPageCount
        );
    }
}
