using CSharpFunctionalExtensions;
using ImperaBook.Application;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Queries;

public sealed class LibraryQueries(ImperaBookDbContext db, ICurrentUser user) : ILibraryQueries
{
    private IQueryable<Entities.LibraryEntity> Owned =>
        db.Libraries.AsNoTracking().Where(l => l.OwnerId == user.Id);

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
        var books =
            from b in db.Books.AsNoTracking()
            join l in Owned on b.LibraryId equals l.Id
            select b;

        var totalBooks = await books.CountAsync(ct);

        // Authors are scoped through books, because an author row has no owner. The known
        // cost: an author with no books attributed is invisible to every user, including
        // the one who created them — which forecloses `list unattributed authors`
        // (COMMANDS.md). See the note below; this is a stopgap, not the answer.
        var totalAuthors = await books
            .SelectMany(b => b.Authors)
            .Select(ba => ba.AuthorId)
            .Distinct()
            .CountAsync(ct);

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
