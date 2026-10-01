using System.Linq.Expressions;
using ImperaBook.Application;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Queries;

/// <summary>
/// Plain ILIKE per keyword, with Postgres's English stemming beside it. Substring matching
/// finds part of a word ("dun" → Dune), which stemming alone would not; stemming finds another
/// form of a word ("flies" → flying), which substrings would not. Names are only matched as
/// substrings: stemming a name changes nothing useful.
///
/// No index: a personal catalog is scanned in well under a millisecond. Should one grow, a
/// pg_trgm GIN index speeds these same ILIKE queries without a change here.
/// </summary>
public sealed class CatalogSearch(ImperaBookDbContext db, ICurrentUser user) : ICatalogSearch
{
    private const string Stemming = "english";

    public async Task<SearchResults> Find(IReadOnlyList<string> keywords, CancellationToken ct)
    {
        if (keywords.Count == 0)
            return new SearchResults([], []);

        var books = db.OwnedBooks(user);
        var authors = db.Authors.AsNoTracking().Where(a => a.OwnerId == user.Id);

        foreach (var keyword in keywords)
        {
            books = books.Where(BookMatches(keyword));
            authors = authors.Where(AuthorMatches(keyword));
        }

        var bookList = await books
            .OrderBy(b => b.Title)
            .ThenBy(b => b.Id)
            .Select(BookQueries.ToListItem)
            .ToArrayAsync(ct);

        var authorList = await authors
            .OrderBy(a => a.LastName)
            .ThenBy(a => a.FirstName)
            .ThenBy(a => a.Id)
            .Select(AuthorQueries.ToListItem)
            .ToArrayAsync(ct);

        return new SearchResults(bookList, authorList);
    }

    private static Expression<Func<BookEntity, bool>> BookMatches(string keyword)
    {
        var pattern = LikePattern.Containing(keyword);

        return b =>
            EF.Functions.ILike(b.Title, pattern, LikePattern.Escape)
            || (b.Subtitle != null && EF.Functions.ILike(b.Subtitle, pattern, LikePattern.Escape))
            || (b.Summary != null && EF.Functions.ILike(b.Summary, pattern, LikePattern.Escape))
            || b.Authors.Any(ba =>
                EF.Functions.ILike(
                    ba.Author.FirstName == null
                        ? ba.Author.LastName
                        : ba.Author.FirstName + " " + ba.Author.LastName,
                    pattern,
                    LikePattern.Escape
                )
            )
            || EF.Functions
                .ToTsVector(Stemming, b.Title + " " + (b.Subtitle ?? "") + " " + (b.Summary ?? ""))
                .Matches(EF.Functions.PlainToTsQuery(Stemming, keyword));
    }

    private static Expression<Func<AuthorEntity, bool>> AuthorMatches(string keyword)
    {
        var pattern = LikePattern.Containing(keyword);

        return a =>
            EF.Functions.ILike(
                a.FirstName == null ? a.LastName : a.FirstName + " " + a.LastName,
                pattern,
                LikePattern.Escape
            );
    }
}
