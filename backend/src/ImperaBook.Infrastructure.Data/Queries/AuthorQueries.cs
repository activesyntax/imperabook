using ImperaBook.Application;
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
}
