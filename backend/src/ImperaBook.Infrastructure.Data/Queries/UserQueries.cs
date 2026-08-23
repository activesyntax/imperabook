using ImperaBook.Application;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Queries;

public sealed class UserQueries(ImperaBookDbContext db, ICurrentUser user) : IUserQueries
{
    public async Task<SessionOwner> GetOwner(CancellationToken ct)
    {
        var row = await db
            .Users.AsNoTracking()
            .Where(u => u.Id == user.Id)
            .Select(u => new SessionOwner(
                u.FirstName,
                u.LastName,
                db.Libraries.Where(l => l.OwnerId == u.Id).Select(l => l.Name).FirstOrDefault()
            ))
            .SingleOrDefaultAsync(ct);

        return row
            ?? throw new InvalidOperationException(
                $"The authenticated principal {user.Id} has no user row."
            );
    }
}
