using CSharpFunctionalExtensions;
using ImperaBook.Application;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Queries;

public sealed class BookQueries(ImperaBookDbContext db, ICurrentUser user) : IBookQueries
{
    public Task<BookListItem[]> List(CancellationToken ct) =>
        Owned()
            .OrderBy(b => b.Title)
            .ThenBy(b => b.Id)
            .Select(b => new BookListItem
            {
                Id = b.Id,
                Title = b.Title,
                Subtitle = b.Subtitle,
                Authors = b
                    .Authors.OrderBy(ba => ba.Ordinal)
                    .Select(ba => new BookAuthor
                    {
                        Id = ba.AuthorId,
                        FirstName = ba.Author.FirstName,
                        LastName = ba.Author.LastName,
                    })
                    .ToList(),
                CoverHash = b.CoverHash,
            })
            .ToArrayAsync(ct);

    public async Task<Maybe<BookDetail>> Get(Guid id, CancellationToken ct)
    {
        // SingleOrDefault rather than FirstOrDefault: the id is a primary key, so a second row is
        // corruption and should say so rather than be silently discarded.
        var detail = await Owned()
            .Where(b => b.Id == id)
            .Select(b => new BookDetail
            {
                Id = b.Id,
                Title = b.Title,
                Subtitle = b.Subtitle,
                Authors = b
                    .Authors.OrderBy(ba => ba.Ordinal)
                    .Select(ba => new BookAuthor
                    {
                        Id = ba.AuthorId,
                        FirstName = ba.Author.FirstName,
                        LastName = ba.Author.LastName,
                    })
                    .ToList(),
                Summary = b.Summary,
                CoverHash = b.CoverHash,
                Isbn = b.Isbn,
                Published = b.PublishedYear,
                Publisher = b.Publisher,
                Language = b.Language,
                Pages = b.PageCount,
            })
            .SingleOrDefaultAsync(ct);

        return detail is null ? Maybe<BookDetail>.None : detail;
    }

    /// <summary>
    /// Every read starts here. The scope is not a parameter any caller could forget or get wrong
    /// (ADR 31), and a book reaches its owner through its library rather than directly.
    /// </summary>
    private IQueryable<BookEntity> Owned() =>
        db
            .Books.AsNoTracking()
            .Join(
                db.Libraries,
                b => b.LibraryId,
                l => l.Id,
                (b, l) => new { Book = b, Library = l }
            )
            .Where(x => x.Library.OwnerId == user.Id)
            .Select(x => x.Book);
}
