using CSharpFunctionalExtensions;
using ImperaBook.Application;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Queries;

public sealed class AuthorQueries(ImperaBookDbContext db, ICurrentUser user) : IAuthorQueries
{
    public Task<AuthorListItem[]> List(CancellationToken ct) =>
        db
            .Authors.AsNoTracking()
            .Where(a => a.OwnerId == user.Id)
            .OrderBy(a => a.LastName)
            .ThenBy(a => a.FirstName)
            .ThenBy(a => a.Id)
            .Select(a => new AuthorListItem(
                a.Id,
                a.FirstName,
                a.LastName,
                a.PortraitHash,
                a.BirthYear,
                a.Vitality,
                a.DeathYear
            ))
            .ToArrayAsync(ct);

    public async Task<Maybe<AuthorDetail>> Get(Guid id, CancellationToken ct)
    {
        var author = await db
            .Authors.AsNoTracking()
            .Where(a => a.OwnerId == user.Id && a.Id == id)
            .Select(a => new AuthorListItem(
                a.Id,
                a.FirstName,
                a.LastName,
                a.PortraitHash,
                a.BirthYear,
                a.Vitality,
                a.DeathYear
            ))
            .SingleOrDefaultAsync(ct);

        if (author is null)
            return Maybe<AuthorDetail>.None;

        var books = await db.OwnedBooks(user)
            .Where(b => b.Authors.Any(ba => ba.AuthorId == id))
            .OrderBy(b => b.Title)
            .ThenBy(b => b.Id)
            .Select(BookQueries.ToListItem)
            .ToArrayAsync(ct);

        return new AuthorDetail(author, books);
    }

    public Task<AuthorListItem[]> Search(string term, CancellationToken ct)
    {
        var pattern = $"%{EscapeLike(term)}%";

        return db
            .Authors.AsNoTracking()
            .Where(a => a.OwnerId == user.Id)
            .Where(a =>
                EF.Functions.ILike(
                    a.FirstName == null ? a.LastName : a.FirstName + " " + a.LastName,
                    pattern,
                    @"\"
                )
            )
            .OrderBy(a => a.LastName)
            .ThenBy(a => a.FirstName)
            .ThenBy(a => a.Id)
            .Select(a => new AuthorListItem(
                a.Id,
                a.FirstName,
                a.LastName,
                a.PortraitHash,
                a.BirthYear,
                a.Vitality,
                a.DeathYear
            ))
            .ToArrayAsync(ct);
    }

    // The user's text is matched literally: % and _ are not wildcards to them.
    private static string EscapeLike(string term) =>
        term.Replace(@"\", @"\\").Replace("%", @"\%").Replace("_", @"\_");
}

public static class AuthorQueriesExtensions
{
    public static IEnumerable<AuthorName> Names(this IEnumerable<BookAuthorEntity> authors) =>
        authors.Select(a => new AuthorName(a.Author.FirstName, a.Author.LastName));
}
