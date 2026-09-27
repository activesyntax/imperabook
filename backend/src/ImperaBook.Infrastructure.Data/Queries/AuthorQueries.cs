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

    public async Task<IReadOnlySet<Guid>> Owned(
        IReadOnlyCollection<Guid> ids,
        CancellationToken ct
    ) =>
        await db
            .Authors.AsNoTracking()
            .Where(a => a.OwnerId == user.Id && ids.Contains(a.Id))
            .Select(a => a.Id)
            .ToHashSetAsync(ct);
}

public static class AuthorQueriesExtensions
{
    public static IEnumerable<AuthorName> Names(this IEnumerable<BookAuthorEntity> authors) =>
        authors.Select(a => new AuthorName(a.Author.FirstName, a.Author.LastName));
}
