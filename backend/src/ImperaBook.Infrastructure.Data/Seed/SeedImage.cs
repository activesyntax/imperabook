using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data;

/// <summary>
/// Registers images into the content-addressed <c>images</c> table during seeding. Addressing is by
/// content hash (ADR 19/20), so registering identical bytes twice yields one row and the same
/// address — callers do not have to track what they have already added.
/// </summary>
internal static class SeedImage
{
    private const string ResourcePrefix = "ImperaBook.Infrastructure.Data.SeedData.";

    private static readonly Assembly Assembly = typeof(SeedImage).Assembly;

    /// <summary>
    /// Seed-time diagnostics. Seeding is a one-shot dev operation, so this writes to a file next to
    /// the process rather than going through the application's logging pipeline — it is meant to be
    /// read after a run, not tailed. Temporary: remove this and its call sites once seed artwork
    /// resolution is settled.
    /// </summary>
    private static readonly string LogPath = Path.Combine(
        AppContext.BaseDirectory,
        "seed-images.log"
    );

    /// <summary>
    /// Writes every embedded resource name once, so "the file was never embedded" can be told apart
    /// from "the name did not match". Call before the first lookup of a seed run; it truncates the
    /// log.
    /// </summary>
    public static void LogManifest()
    {
        File.WriteAllText(LogPath, $"=== seed run {DateTime.Now:u} ==={Environment.NewLine}");

        var names = Assembly
            .GetManifestResourceNames()
            .Where(r => r.StartsWith(ResourcePrefix, StringComparison.Ordinal))
            .OrderBy(r => r, StringComparer.Ordinal)
            .ToArray();

        Log($"embedded resources under {ResourcePrefix}: {names.Length}");
        foreach (var name in names)
            Log($"  {name}");
    }

    /// <summary>
    /// Registers an embedded seed file from the <c>SeedData</c> root by file name
    /// (<c>"library-photo.jpg"</c>) or stem (<c>"library-photo"</c>) and returns its content address.
    /// A named file that does not exist is a seed authoring bug, not a runtime condition, so it
    /// throws.
    /// </summary>
    public static async Task<string> Register(string name, DbContext ctx, CancellationToken ct)
    {
        var file =
            await TryLoad(folder: null, name, ct)
            ?? throw new InvalidOperationException(
                $"Seed image '{name}' is not an embedded resource under {ResourcePrefix}. "
                    + "Check the file exists and that the .csproj embeds it "
                    + @"(<EmbeddedResource Include=""SeedData\**\*"" />)."
            );

        return await Register(file.Bytes, file.MediaType, ctx, ct);
    }

    /// <summary>
    /// Registers raw bytes and returns their content address. Deduplicates against both the rows
    /// added earlier in this seed run and the rows already in the database, so reseeding an existing
    /// database does not fail on the primary key.
    /// </summary>
    public static async Task<string> Register(
        byte[] bytes,
        string mediaType,
        DbContext ctx,
        CancellationToken ct
    )
    {
        var hash = Convert.ToHexStringLower(SHA256.HashData(bytes));
        var images = ctx.Set<ImageEntity>();

        if (images.Local.Any(i => i.Hash == hash))
            return hash;

        if (await images.AnyAsync(i => i.Hash == hash, ct))
            return hash;

        images.Add(
            new ImageEntity
            {
                Hash = hash,
                Bytes = bytes,
                MediaType = mediaType,
                ByteSize = bytes.Length,
            }
        );

        return hash;
    }

    /// <summary>
    /// Loads an embedded seed image from <paramref name="folder"/> — a directory under
    /// <c>SeedData</c>, or <c>null</c> for its root — by file name or stem. Returns <c>null</c> when
    /// nothing matches, which is the "use a real file if there is one" probe
    /// <see cref="SeedArtwork"/> needs.
    /// </summary>
    public static async Task<(byte[] Bytes, string MediaType)?> TryLoad(
        string? folder,
        string name,
        CancellationToken ct
    )
    {
        var resource = Find(folder, name);
        if (resource is null)
            return null;

        await using var stream = Assembly.GetManifestResourceStream(resource)!;
        using var buffer = new MemoryStream();
        await stream.CopyToAsync(buffer, ct);

        return (buffer.ToArray(), MediaTypeFor(Path.GetExtension(resource)));
    }

    /// <summary>
    /// Manifest resource names flatten the directory path into dots
    /// (<c>…SeedData.Covers.the-hobbit.jpg</c>), so a folder is part of the prefix, never part of the
    /// file name. The single-dot filter is what keeps a folder lookup from reaching into a nested
    /// subfolder: once the prefix is stripped, a file sitting directly in that folder has exactly one
    /// dot left. Its cost is that a file whose extension separator is missing
    /// (<c>isaac-asimovwebp</c>) is silently rejected — hence the diagnostic below.
    /// </summary>
    private static string? Find(string? folder, string name)
    {
        var prefix = folder is null ? ResourcePrefix : $"{ResourcePrefix}{folder}.";

        var inFolder = Assembly
            .GetManifestResourceNames()
            .Where(r => r.StartsWith(prefix, StringComparison.Ordinal))
            .Select(r => (Resource: r, File: r[prefix.Length..]))
            .ToArray();

        var candidates = inFolder.Where(x => x.File.Count(c => c == '.') == 1).ToArray();
        var hit = candidates.FirstOrDefault(x => Matches(x.File, name));

        var report = new StringBuilder();
        report.Append($"lookup folder='{folder ?? "(root)"}' name='{name}' -> ");
        report.Append(hit.Resource is null ? "MISS" : $"HIT {hit.Resource}");

        if (hit.Resource is null)
        {
            report.Append($" | prefix='{prefix}'");
            report.Append($" | in folder: {Describe(inFolder.Select(x => x.File))}");

            var rejected = inFolder.Except(candidates).Select(x => x.File).ToArray();
            if (rejected.Length > 0)
                report.Append(
                    $" | rejected (dot count != 1, likely a missing or extra '.'): {Describe(rejected)}"
                );
        }

        Log(report.ToString());

        return hit.Resource;
    }

    private static bool Matches(string file, string name) =>
        name.Contains('.', StringComparison.Ordinal)
            ? file.Equals(name, StringComparison.OrdinalIgnoreCase)
            : Path.GetFileNameWithoutExtension(file)
                .Equals(name, StringComparison.OrdinalIgnoreCase);

    private static string Describe(IEnumerable<string> files)
    {
        var list = files.ToArray();
        return list.Length == 0 ? "(none)" : string.Join(", ", list.Select(f => $"'{f}'"));
    }

    private static void Log(string message) =>
        File.AppendAllText(LogPath, $"{DateTime.Now:HH:mm:ss.fff}  {message}{Environment.NewLine}");

    public static string MediaTypeFor(string extension) =>
        extension.ToLowerInvariant() switch
        {
            ".png" => "image/png",
            ".webp" => "image/webp",
            ".avif" => "image/avif",
            ".svg" => "image/svg+xml",
            _ => "image/jpeg",
        };
}
