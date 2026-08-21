using ImperaBook.Application;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Queries;

public sealed class AuthorQueries(ImperaBookDbContext db, ICurrentUser user) : IAuthorQueries
{
    public Task<AuthorListItem[]> List(CancellationToken ct)
    {
        var q = db.Authors.Where(a => a.OwnerId == user.Id).AsNoTracking();

        return q.OrderBy(a => a.LastName)
            .Select(a => new AuthorListItem
            {
                Id = a.Id,
                FirstName = a.FirstName,
                LastName = a.LastName,
                PortraitHash = a.PortraitHash,
            })
            .ToArrayAsync(ct);
    }
}
