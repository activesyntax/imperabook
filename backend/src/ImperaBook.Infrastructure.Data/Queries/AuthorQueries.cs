using ImperaBook.Application.Authors;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Queries;

public sealed class AuthorQueries(ImperaBookDbContext db) : IAuthorQueries
{
    public Task<AuthorListItem[]> List(Guid? libraryId, string? titleContains, CancellationToken ct)
    {
        return Task.FromResult(Array.Empty<AuthorListItem>());
        // var q = db.Authors.AsNoTracking();
        //
        //
        // return q.OrderBy(b => b.)
        //     .Select(b => new AuthorListItem
        //     {
        //         Id = b.Id,
        //         FirstName = b.AuthorFirstName,
        //     })
        //     .ToArrayAsync(ct);
    }
}
