using System.Security.Cryptography;
using CSharpFunctionalExtensions;
using ImperaBook.Application;
using ImperaBook.Domain.Catalog;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace ImperaBook.Infrastructure.Data.Images;

public sealed class ImageStore(ImperaBookDbContext db, IOptions<ImageStoreOptions> options)
    : IImageStore
{
    public Task<bool> Exists(ContentHash hash, CancellationToken ct) =>
        db.Images.AsNoTracking().AnyAsync(i => i.Hash == hash.Value, ct);

    public async Task<ImageContent?> OpenRead(ContentHash hash, CancellationToken ct)
    {
        var row = await db
            .Images.AsNoTracking()
            .Where(i => i.Hash == hash.Value)
            .Select(i => new { i.Bytes, i.MediaType })
            .SingleOrDefaultAsync(ct);

        if (row is null)
            return null;

        return new ImageContent(
            new MemoryStream(row.Bytes, writable: false),
            row.MediaType,
            row.Bytes.LongLength
        );
    }

    public async Task<Result<ContentHash, ImageStoreError>> Store(
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

        // Re-uploading the same file is a no-op by definition: same bytes, same address, same row.
        if (await Exists(hash, ct))
            return hash;

        var entity = db.Images.Add(
            new ImageEntity
            {
                Hash = hash.Value,
                Bytes = data,
                MediaType = mediaType,
                ByteSize = data.Length,
            }
        );

        try
        {
            await db.SaveChangesAsync(ct);
        }
        catch (DbUpdateException)
        {
            db.Entry(entity).State = EntityState.Detached;

            if (!await Exists(hash, ct))
                throw;
        }

        return hash;
    }

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
}

public sealed class ImageStoreOptions
{
    public const string SectionName = "ImageStore";

    public long MaxBytes { get; set; } = 10 * 1024 * 1024;

    public IReadOnlyList<string> AllowedMediaTypes { get; set; } =
    ["image/jpeg", "image/png", "image/webp", "image/avif"];
}
