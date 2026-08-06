using System.Net;
using System.Text;
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
/// exists; otherwise a typographic SVG is generated from the name. The generated form is not a
/// placeholder standing in for "the real thing" — it is legitimate artwork for an entity whose image
/// nobody has, and it looks like ImperaBook rather than like a missing-image icon.
/// </summary>
internal static class SeedArtwork
{
    private const string Ink = "#E8DDD0";
    private const string Ground = "#141210";
    private const string Copper = "#C97B4A";

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
            file ?? (Encoding.UTF8.GetBytes(Generate(name, kind)), "image/svg+xml");

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
            SeedImageKind.Cover => GenerateCover(name),
            SeedImageKind.Portrait => GeneratePortrait(name),
            _ => throw new ArgumentOutOfRangeException(nameof(kind), kind, null),
        };

    /// <summary>2:3 book jacket — framed, with the title set between two rules.</summary>
    private static string GenerateCover(string title)
    {
        const int width = 300;
        const int height = 450;
        const int fontSize = 22;
        const int lineHeight = 30;

        var lines = Wrap(title, maxCharsPerLine: 16);
        var blockTop = (height / 2) - (((lines.Count - 1) * lineHeight) / 2);

        var text = Lines(lines, width / 2, blockTop, lineHeight, fontSize);

        return $"""
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
              <rect width="{width}" height="{height}" fill="{Ground}"/>
              <rect x="14" y="14" width="{width - 28}" height="{height
                - 28}" fill="none" stroke="{Copper}" stroke-width="1" opacity="0.55"/>
              <line x1="40" y1="{(height / 2) - 90}" x2="{width - 40}" y2="{(height / 2)
                - 90}" stroke="{Copper}" stroke-width="1" opacity="0.35"/>
              <line x1="40" y1="{(height / 2) + 90}" x2="{width - 40}" y2="{(height / 2)
                + 90}" stroke="{Copper}" stroke-width="1" opacity="0.35"/>
              {text}
            </svg>
            """;
    }

    /// <summary>
    /// Square portrait — a monogram inside a copper ring, with the name beneath it. The circle is
    /// what stops this reading as a small book cover.
    /// </summary>
    private static string GeneratePortrait(string name)
    {
        const int size = 400;
        const int centre = size / 2;
        const int radius = 96;
        const int monogramSize = 76;
        const int fontSize = 20;
        const int lineHeight = 26;

        var monogram = Monogram(name);
        var lines = Wrap(name, maxCharsPerLine: 20);
        var blockTop = centre + radius + 56;

        var text = Lines(lines, centre, blockTop, lineHeight, fontSize);

        return $"""
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}">
              <rect width="{size}" height="{size}" fill="{Ground}"/>
              <circle cx="{centre}" cy="{centre
                - 30}" r="{radius}" fill="none" stroke="{Copper}" stroke-width="1" opacity="0.55"/>
              <text x="{centre}" y="{centre
                - 30
                + (
                    monogramSize / 3
                )}" fill="{Copper}" font-family="JetBrains Mono, monospace" font-size="{monogramSize}" text-anchor="middle">{WebUtility.HtmlEncode(
                monogram
            )}</text>
              <line x1="{centre - 60}" y1="{blockTop - 34}" x2="{centre + 60}" y2="{blockTop
                - 34}" stroke="{Copper}" stroke-width="1" opacity="0.35"/>
              {text}
            </svg>
            """;
    }

    private static string Lines(List<string> lines, int x, int top, int lineHeight, int fontSize)
    {
        var text = new StringBuilder();

        for (var i = 0; i < lines.Count; i++)
        {
            var y = top + (i * lineHeight);
            text.Append(
                $"""<text x="{x}" y="{y}" fill="{Ink}" font-family="JetBrains Mono, monospace" font-size="{fontSize}" text-anchor="middle">{WebUtility.HtmlEncode(lines[i])}</text>"""
            );
        }

        return text.ToString();
    }

    /// <summary>
    /// First letter of the first and last word — "Ursula K. Le Guin" gives "UG". A single-word name
    /// gives one letter rather than a doubled one.
    /// </summary>
    private static string Monogram(string name)
    {
        var words = name.Split(' ', StringSplitOptions.RemoveEmptyEntries);

        if (words.Length == 0)
            return "?";

        var initials = words.Length == 1 ? $"{words[0][0]}" : $"{words[0][0]}{words[^1][0]}";

        return initials.ToUpperInvariant();
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
