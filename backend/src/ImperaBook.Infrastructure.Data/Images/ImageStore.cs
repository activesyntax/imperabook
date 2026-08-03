using System.Security.Cryptography;
using CSharpFunctionalExtensions;
using ImperaBook.Application.Images;
using ImperaBook.Domain.Catalog;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Npgsql;

namespace ImperaBook.Infrastructure.Data.Images;

public sealed class ImageStore(
    ImperaBookDbContext db,
    IBlurhashEncoder blurhash,
    IOptions<ImageStoreOptions> options
) : IImageStore
{
    public async Task<Maybe<ImageRef>> Find(ContentHash hash, CancellationToken ct)
    {
        var row = await db
            .Images.AsNoTracking()
            .Where(i => i.Hash == hash.Value)
            .Select(i => new { i.Hash, i.Blurhash })
            .SingleOrDefaultAsync(ct);

        return row is null ? Maybe<ImageRef>.None : Rehydrate(row.Hash, row.Blurhash);
    }

    public async Task<Maybe<ImageContent>> OpenRead(ContentHash hash, CancellationToken ct)
    {
        var row = await db
            .Images.AsNoTracking()
            .Where(i => i.Hash == hash.Value)
            .Select(i => new { i.Bytes, i.MediaType })
            .SingleOrDefaultAsync(ct);

        if (row is null)
            return Maybe<ImageContent>.None;

        // Materializes the whole image in memory. Bounded by MaxBytes on the way in, so this is a
        // known ceiling rather than an open one — but it is a copy per request. True streaming needs
        // NpgsqlDataReader.GetStream and raw ADO; deferred until it measurably matters.
        return new ImageContent(
            new MemoryStream(row.Bytes, writable: false),
            row.MediaType,
            row.Bytes.LongLength
        );
    }

    public async Task<Result<ImageRef, ImageStoreError>> Store(
        Stream bytes,
        string mediaType,
        CancellationToken ct
    )
    {
        var settings = options.Value;

        if (!settings.AllowedMediaTypes.Contains(mediaType, StringComparer.OrdinalIgnoreCase))
            return new ImageStoreError.UnsupportedMediaType(mediaType);

        var buffered = await Buffer(bytes, settings.MaxBytes, ct);
        if (buffered.IsFailure)
            return buffered.Error;

        var data = buffered.Value;
        var hash = ContentHash.Create(Convert.ToHexStringLower(SHA256.HashData(data))).Value;

        var existing = await Find(hash, ct);
        if (existing.TryGetValue(out var already))
            return already;

        if (!blurhash.Encode(data).TryGetValue(out var derived))
            return new ImageStoreError.Undecodable();

        db.Images.Add(
            new ImageEntity
            {
                Hash = hash.Value,
                Blurhash = derived.Value,
                Bytes = data,
                MediaType = mediaType,
                ByteSize = data.Length,
            }
        );

        try
        {
            await db.SaveChangesAsync(ct);
        }
        catch (DbUpdateException ex) when (IsUniqueViolation(ex))
        {
            foreach (var entry in ex.Entries)
                entry.State = EntityState.Detached;

            // Two concurrent uploads of identical bytes race to the same primary key. The loser
            // reads the winner's row: both callers wanted the same address, and both got it.
            if ((await Find(hash, ct)).TryGetValue(out var raced))
                return raced;

            throw;
        }

        return ImageRef.Create(hash, derived);
    }

    static bool IsUniqueViolation(DbUpdateException ex) =>
        ex.InnerException is PostgresException { SqlState: PostgresErrorCodes.UniqueViolation };

    private static async Task<Result<byte[], ImageStoreError>> Buffer(
        Stream source,
        long max,
        CancellationToken ct
    )
    {
        using var buffered = new MemoryStream();
        var chunk = new byte[81920];
        long total = 0;

        int read;
        while ((read = await source.ReadAsync(chunk, ct)) > 0)
        {
            total += read;
            if (total > max)
                return new ImageStoreError.TooLarge(max);

            buffered.Write(chunk, 0, read);
        }

        return buffered.ToArray();
    }

    // Stored values that fail validation are corruption, not user input (DECISIONS 10).
    private static ImageRef Rehydrate(string hash, string blurhash) =>
        ImageRef.Create(ContentHash.Create(hash).Value, Blurhash.Create(blurhash).Value);
}

public sealed class ImageStoreOptions
{
    public const string SectionName = "ImageStore";

    public long MaxBytes { get; set; } = 10 * 1024 * 1024;

    public IReadOnlyList<string> AllowedMediaTypes { get; set; } =
    ["image/jpeg", "image/png", "image/webp", "image/avif"];
}
