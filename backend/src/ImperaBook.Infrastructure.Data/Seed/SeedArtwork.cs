using System.Text;
using ImperaBook.Infrastructure.Data.Images;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data;

/// <summary>
/// What a seeded entity's artwork is. Selects both the folder the real file is looked up in and the
/// shape of the generated fallback — a cover is a book jacket, a portrait is not.
/// </summary>
internal enum SeedImageKind
{
    Cover,
    Portrait,
}

/// <summary>
/// Supplies artwork for seeded entities. A real file under <c>SeedData/{folder}</c> is used when one
/// exists; otherwise a typographic SVG is generated from the name by <see cref="ArtworkSvg"/>.
/// </summary>
internal static class SeedArtwork
{
    /// <summary>
    /// Returns the content address of <paramref name="name"/>'s artwork, registering the image if it
    /// is not already stored. Deduplication is handled by <see cref="SeedImage"/>: two entities with
    /// identical artwork resolve to one row.
    /// </summary>
    public static async Task<string> Register(
        DbContext ctx,
        string name,
        SeedImageKind kind,
        CancellationToken ct
    )
    {
        var file = await SeedImage.TryLoad(FolderFor(kind), Slug(name), ct);

        var (bytes, mediaType) =
            file ?? (Encoding.UTF8.GetBytes(Generate(name, kind)), ArtworkSvg.MediaType);

        return await SeedImage.Register(bytes, mediaType, ctx, ct);
    }

    private static string FolderFor(SeedImageKind kind) =>
        kind switch
        {
            SeedImageKind.Cover => "Covers",
            SeedImageKind.Portrait => "Authors",
            _ => throw new ArgumentOutOfRangeException(nameof(kind), kind, null),
        };

    /// <summary>
    /// Builds typographic artwork: dark ground, a thin copper rule, text set in the application's own
    /// monospace face. Deterministic in the name, so the same entity always hashes to the same
    /// address and reseeding is idempotent.
    /// </summary>
    private static string Generate(string name, SeedImageKind kind) =>
        kind switch
        {
            SeedImageKind.Cover => ArtworkSvg.Cover(name),
            SeedImageKind.Portrait => ArtworkSvg.Portrait(name),
            _ => throw new ArgumentOutOfRangeException(nameof(kind), kind, null),
        };

    private static string Slug(string title)
    {
        var chars = title
            .Select(c => char.IsAsciiLetterOrDigit(c) ? char.ToLowerInvariant(c) : '-')
            .ToArray();

        var slug = new string(chars);
        while (slug.Contains("--", StringComparison.Ordinal))
            slug = slug.Replace("--", "-", StringComparison.Ordinal);

        return slug.Trim('-');
    }
}
