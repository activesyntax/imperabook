using CSharpFunctionalExtensions;
using CSharpFunctionalExtensions.ValueTasks;
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

        var stats = await OwnedBooks
            .GroupBy(_ => 1)
            .Select(g => new
            {
                TotalPages = g.Sum(b => b.PageCount ?? 0),
                WithPageCount = g.Count(b => b.PageCount.HasValue),
                LanguageCount = g.Count(b => b.Language != null),
            })
            .SingleOrDefaultAsync(ct);

        var longestBook = await GetLongestBookAsync(ct);

        var totalPages = stats?.TotalPages ?? 0;
        var booksWithPageCount = stats?.WithPageCount ?? 0;
        var totalLanguages = stats?.LanguageCount ?? 0;
        var avgPagesPerBook = booksWithPageCount > 0 ? (double)totalPages / booksWithPageCount : 0;

        return new LibraryStatistics(
            TotalBooks: totalBooks,
            TotalAuthors: totalAuthors,
            TotalPages: totalPages,
            TotalLanguages: totalLanguages,
            BooksWithPageCount: booksWithPageCount,
            AvgPagesPerBook: avgPagesPerBook,
            LongestBook: longestBook
        );
    }

    private async Task<Maybe<LongestBook>> GetLongestBookAsync(CancellationToken ct) =>
        await OwnedBooks
            .Where(b => b.PageCount != null)
            .OrderByDescending(b => b.PageCount)
            .Select(b => new LongestBook(
                new BookReference
                {
                    Id = b.Id,
                    Title = b.Title,
                    Authors = b
                        .Authors.OrderBy(ba => ba.Ordinal)
                        .Select(ba => new BookAuthor
                        {
                            Id = ba.AuthorId,
                            FirstName = ba.Author.FirstName,
                            LastName = ba.Author.LastName,
                        })
                        .ToList(),
                },
                b.PageCount!.Value
            ))
            .FirstOrDefaultAsync(ct);
}
