using System.Linq.Expressions;
using CSharpFunctionalExtensions;
using ImperaBook.Application;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Queries;

public sealed class AuthorQueries(ImperaBookDbContext db, ICurrentUser user) : IAuthorQueries
{
    /// <summary>The list-row projection, shared with queries that list a subset of authors.</summary>
    internal static readonly Expression<Func<AuthorEntity, AuthorListItem>> ToListItem = a =>
        new AuthorListItem(
            a.Id,
            a.FirstName,
            a.LastName,
            a.PortraitHash,
            a.BirthYear,
            a.Vitality,
            a.DeathYear
        );

    public Task<AuthorListItem[]> List(AuthorFilter filter, CancellationToken ct) =>
        BornIn(
                db
                    .Authors.AsNoTracking()
                    .Where(a => a.OwnerId == user.Id)
                    // The same test the dashboard counts with, so its finding and this list agree.
                    .Where(a => !filter.WithoutBooks || !db.Set<BookAuthorEntity>().Any(ba => ba.AuthorId == a.Id))
                    .Where(a => !filter.Living || a.Vitality == VitalityKind.Living),
                filter.Born
            )
            .OrderBy(a => a.LastName)
            .ThenBy(a => a.FirstName)
            .ThenBy(a => a.Id)
            .Select(ToListItem)
            .ToArrayAsync(ct);

    public async Task<Maybe<AuthorDetail>> Get(Guid id, CancellationToken ct)
    {
        var author = await db
            .Authors.AsNoTracking()
            .Where(a => a.OwnerId == user.Id && a.Id == id)
            .Select(ToListItem)
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
        var pattern = LikePattern.Containing(term);

        return db
            .Authors.AsNoTracking()
            .Where(a => a.OwnerId == user.Id)
            .Where(a =>
                // Accents ignored, as in find: "by author barany" resolves to Bárány.
                EF.Functions.ILike(
                    EF.Functions.Unaccent(a.FirstName == null ? a.LastName : a.FirstName + " " + a.LastName),
                    EF.Functions.Unaccent(pattern),
                    LikePattern.Escape
                )
            )
            .OrderBy(a => a.LastName)
            .ThenBy(a => a.FirstName)
            .ThenBy(a => a.Id)
            .Select(ToListItem)
            .ToArrayAsync(ct);
    }

    // Unknown birth years drop out: a comparison with null is false in SQL.
    private static IQueryable<AuthorEntity> BornIn(IQueryable<AuthorEntity> authors, YearFilter? f) =>
        f switch
        {
            null => authors,
            { Comparison: YearComparison.In } => authors.Where(a => a.BirthYear == f.Year),
            { Comparison: YearComparison.Before } => authors.Where(a => a.BirthYear < f.Year),
            { Comparison: YearComparison.After } => authors.Where(a => a.BirthYear > f.Year),
            { Comparison: YearComparison.Between } => authors.Where(a =>
                a.BirthYear >= f.Year && a.BirthYear <= f.UpTo
            ),
            _ => throw new InvalidOperationException($"Unhandled year comparison: {f.Comparison}"),
        };
}
