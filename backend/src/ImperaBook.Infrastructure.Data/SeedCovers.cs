using System.Net;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data;

/// <summary>
/// Supplies cover images for seeded books. A real file under <c>SeedData/Covers</c> is used when one
/// exists; otherwise a typographic SVG is generated from the title. The generated form is not a
/// placeholder standing in for "the real thing" — it is a legitimate cover for a book whose artwork
/// nobody has, and it looks like ImperaBook rather than like a missing-image icon.
/// </summary>
internal static class SeedCovers
{
    private const string ResourcePrefix = "ImperaBook.Infrastructure.Data.SeedData.Covers.";

    private static readonly Assembly Assembly = typeof(SeedCovers).Assembly;

    /// <summary>
    /// Registers a cover for <paramref name="title"/> and returns its content address. The
    /// <paramref name="registered"/> map is what makes deduplication work across a seed run: two
    /// books with identical artwork produce one hash, and adding the row twice would violate the
    /// primary key.
    /// </summary>
    public static async Task<string> Register(
        DbContext ctx,
        Dictionary<string, string> registered,
        string title,
        CancellationToken ct
    )
    {
        var (bytes, mediaType) = await Load(title, ct);
        var hash = Convert.ToHexStringLower(SHA256.HashData(bytes));

        if (registered.ContainsKey(hash))
            return hash;

        ctx.Set<ImageEntity>()
            .Add(
                new ImageEntity
                {
                    Hash = hash,
                    Bytes = bytes,
                    MediaType = mediaType,
                    ByteSize = bytes.Length,
                }
            );

        registered[hash] = hash;
        return hash;
    }

    private static async Task<(byte[] Bytes, string MediaType)> Load(
        string title,
        CancellationToken ct
    )
    {
        var slug = Slug(title);
        var resource = Assembly
            .GetManifestResourceNames()
            .FirstOrDefault(r => r.StartsWith($"{ResourcePrefix}{slug}.", StringComparison.Ordinal));

        if (resource is null)
            return (Encoding.UTF8.GetBytes(Generate(title)), "image/svg+xml");

        await using var stream = Assembly.GetManifestResourceStream(resource)!;
        using var buffer = new MemoryStream();
        await stream.CopyToAsync(buffer, ct);

        return (buffer.ToArray(), MediaTypeFor(Path.GetExtension(resource)));
    }

    /// <summary>
    /// Builds a typographic cover: dark ground, a thin copper rule, the title set in the
    /// application's own monospace face. Deterministic in the title, so the same book always hashes
    /// to the same address and reseeding is idempotent.
    /// </summary>
    private static string Generate(string title)
    {
        const int width = 300;
        const int height = 450;
        const int fontSize = 22;
        const int lineHeight = 30;

        var lines = Wrap(title, maxCharsPerLine: 16);
        var blockTop = (height / 2) - (((lines.Count - 1) * lineHeight) / 2);

        var text = new StringBuilder();
        for (var i = 0; i < lines.Count; i++)
        {
            var y = blockTop + (i * lineHeight);
            text.Append(
                $"""<text x="{width / 2}" y="{y}" fill="#E8DDD0" font-family="JetBrains Mono, monospace" font-size="{fontSize}" text-anchor="middle">{WebUtility.HtmlEncode(lines[i])}</text>"""
            );
        }

        return $"""
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
              <rect width="{width}" height="{height}" fill="#141210"/>
              <rect x="14" y="14" width="{width - 28}" height="{height - 28}" fill="none" stroke="#C97B4A" stroke-width="1" opacity="0.55"/>
              <line x1="40" y1="{(height / 2) - 90}" x2="{width - 40}" y2="{(height / 2) - 90}" stroke="#C97B4A" stroke-width="1" opacity="0.35"/>
              <line x1="40" y1="{(height / 2) + 90}" x2="{width - 40}" y2="{(height / 2) + 90}" stroke="#C97B4A" stroke-width="1" opacity="0.35"/>
              {text}
            </svg>
            """;
    }

    /// <summary>
    /// SVG has no automatic text wrapping, so lines are broken here. Words longer than the limit are
    /// left intact and allowed to overflow rather than hyphenated mid-word.
    /// </summary>
    private static List<string> Wrap(string title, int maxCharsPerLine)
    {
        var lines = new List<string>();
        var current = new StringBuilder();

        foreach (var word in title.Split(' ', StringSplitOptions.RemoveEmptyEntries))
        {
            if (current.Length > 0 && current.Length + 1 + word.Length > maxCharsPerLine)
            {
                lines.Add(current.ToString());
                current.Clear();
            }

            if (current.Length > 0)
                current.Append(' ');

            current.Append(word);
        }

        if (current.Length > 0)
            lines.Add(current.ToString());

        return lines.Count == 0 ? [title] : lines;
    }

    private static string MediaTypeFor(string extension) =>
        extension.ToLowerInvariant() switch
        {
            ".png" => "image/png",
            ".webp" => "image/webp",
            ".avif" => "image/avif",
            ".svg" => "image/svg+xml",
            _ => "image/jpeg",
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
