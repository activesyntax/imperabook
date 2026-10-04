using System.Linq.Expressions;
using CSharpFunctionalExtensions;
using ImperaBook.Application;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Queries;

public sealed class BookQueries(ImperaBookDbContext db, ICurrentUser user) : IBookQueries
{
    public Task<BookListItem[]> List(PageFilter? pages, string? author, CancellationToken ct) =>
        WrittenBy(WithPages(Owned(), pages), author)
            .OrderBy(b => b.Title)
            .ThenBy(b => b.Id)
            .Select(ToListItem)
            .ToArrayAsync(ct);

    private static IQueryable<BookEntity> WrittenBy(IQueryable<BookEntity> books, string? author)
    {
        if (string.IsNullOrWhiteSpace(author))
            return books;

        var pattern = LikePattern.Containing(author.Trim());
        return books.Where(b =>
            b.Authors.Any(ba =>
                EF.Functions.ILike(
                    EF.Functions.Unaccent(
                        ba.Author.FirstName == null
                            ? ba.Author.LastName
                            : ba.Author.FirstName + " " + ba.Author.LastName
                    ),
                    EF.Functions.Unaccent(pattern),
                    LikePattern.Escape
                )
            )
        );
    }

    // Comparisons with a null page count are false in SQL, so unknown counts drop out — except
    // that C#'s != treats null as different from any number, which EF keeps; "other than"
    // says outright that the count must be known.
    private static IQueryable<BookEntity> WithPages(IQueryable<BookEntity> books, PageFilter? f) =>
        f switch
        {
            null => books,
            { Comparison: PageComparison.Over } => books.Where(b => b.PageCount > f.Pages),
            { Comparison: PageComparison.Under } => books.Where(b => b.PageCount < f.Pages),
            { Comparison: PageComparison.Equal } => books.Where(b => b.PageCount == f.Pages),
            { Comparison: PageComparison.AtLeast } => books.Where(b => b.PageCount >= f.Pages),
            { Comparison: PageComparison.AtMost } => books.Where(b => b.PageCount <= f.Pages),
            { Comparison: PageComparison.OtherThan } => books.Where(b =>
                b.PageCount != null && b.PageCount != f.Pages
            ),
            { Comparison: PageComparison.Between } => books.Where(b =>
                b.PageCount >= f.Pages && b.PageCount <= f.UpTo
            ),
            _ => throw new InvalidOperationException($"Unhandled page comparison: {f.Comparison}"),
        };

    /// <summary>The list-row projection, shared with queries that list a subset of books.</summary>
    internal static readonly Expression<Func<BookEntity, BookListItem>> ToListItem =
        b => new BookListItem
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
            Pages = b.PageCount,
        };

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
    private IQueryable<BookEntity> Owned() => db.OwnedBooks(user);
}

public static class OwnedBooksExtensions
{
    /// <summary>
    /// The one definition of which books a user may read: a book reaches its owner through its
    /// library rather than directly. Every book read, in any query class, starts here.
    /// </summary>
    internal static IQueryable<BookEntity> OwnedBooks(this ImperaBookDbContext db, ICurrentUser user) =>
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
