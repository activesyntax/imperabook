using CSharpFunctionalExtensions;
using ImperaBook.Application.Images;
using ImperaBook.Domain.Catalog;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Images;

public sealed class ImageStore(ImperaBookDbContext db) : IImageStore
{
    public async Task<Maybe<ImageRef>> Find(ContentHash hash, CancellationToken ct)
    {
        var row = await db
            .Covers.AsNoTracking()
            .Where(c => c.Hash == hash.Value)
            .Select(c => new { c.Hash, c.Blurhash })
            .SingleOrDefaultAsync(ct);

        if (row is null)
            return Maybe<ImageRef>.None;

        // Stored values that fail validation are corruption, not user input (DECISIONS 10).
        return ImageRef.Create(
            ContentHash.Create(row.Hash).Value,
            Blurhash.Create(row.Blurhash).Value
        );
    }
}
