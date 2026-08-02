using CSharpFunctionalExtensions;
using ImperaBook.Application.Covers;
using ImperaBook.Domain.Catalog;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Covers;

public sealed class CoverStore(ImperaBookDbContext db) : ICoverStore
{
    public async Task<Maybe<Cover>> Find(ContentHash hash, CancellationToken ct)
    {
        // Only the metadata — the bytes stay in the database until the content channel serves them.
        var row = await db
            .Covers.AsNoTracking()
            .Where(c => c.Hash == hash.Value)
            .Select(c => new { c.Hash, c.Blurhash })
            .SingleOrDefaultAsync(ct);

        if (row is null)
            return Maybe<Cover>.None;

        // Stored values that fail validation are corruption, not user input (DECISIONS 10).
        return Cover.Create(
            ContentHash.Create(row.Hash).Value,
            Blurhash.Create(row.Blurhash).Value
        );
    }
}
