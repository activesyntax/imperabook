using ImperaBook.Application;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Queries;

public sealed class AuthorQueries(ImperaBookDbContext db) : IAuthorQueries
{
    // todo: use maybe for query param, or use a default value for the parameter
    public Task<AuthorListItem[]> List(Guid? libraryId, string? query, CancellationToken ct)
    {
        var nameQuery = string.IsNullOrWhiteSpace(query) ? null : query.Trim();

        var q = db.Authors.AsNoTracking();

        // not supported yet, but we will need it once we have the Book↔Author
        // relationship in place
        // if (libraryId is { } lib)
        //     q = q.Where(b => b.LibraryId == lib);
        //
        // if (nameQuery is not null)
        //     q = q.Where(b => EF.Functions.ILike(b.FirstName, $"%{query}%"));
        //
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
