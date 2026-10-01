using System.Globalization;
using System.Text;

namespace ImperaBook.Domain;

/// <summary>How a person's name is written once it is stored.</summary>
public static class NameCase
{
    /// <summary>Name particles written in lower case, except where a name begins with one.</summary>
    private static readonly HashSet<string> Particles = new(StringComparer.OrdinalIgnoreCase)
    {
        "van",
        "der",
        "de",
        "von",
    };

    /// <summary>
    /// Each word — and each part of a hyphenated one — starts with a capital, however it was
    /// typed: "le guin" → "Le Guin", "jean-paul" → "Jean-Paul". Only first letters change, so
    /// "McDonald" and initials like "Y.N." stay as typed.
    ///
    /// The particles van, der, de and von are the exception: lower case ("Ludwig van
    /// Beethoven"), unless the name begins with one ("Van Gogh"). A last name is stored apart
    /// from the first, so <paramref name="startsName"/> says whether this part is where the
    /// whole name begins.
    /// </summary>
    public static string? Capitalize(string? raw, bool startsName = true)
    {
        if (raw is null)
            return null;

        var chars = raw.ToCharArray();
        var firstWord = startsName;
        var i = 0;
        while (i < chars.Length)
        {
            if (char.IsWhiteSpace(chars[i]))
            {
                i++;
                continue;
            }

            var end = i;
            while (end < chars.Length && !char.IsWhiteSpace(chars[end]))
                end++;

            var word = new string(chars, i, end - i);
            if (Particles.Contains(word) && !firstWord)
                LowerCase(chars, i, end);
            else
                CapitalizeParts(chars, i, end);

            firstWord = false;
            i = end;
        }
        return new string(chars);
    }

    /// <summary>
    /// Whether two names are the same name, as a person would read them: ignoring case,
    /// accents ("Bárány" and "barany") and how many blanks sit between words. Matches the
    /// database's unaccented search, so a name the search finds can also be recognized here.
    /// </summary>
    public static bool SameName(string a, string b) =>
        string.Equals(Fold(a), Fold(b), StringComparison.Ordinal);

    // Lower case, single blanks, and every accent mark dropped: "á" decomposes into "a" and a
    // combining mark, and the mark is left out.
    private static string Fold(string name)
    {
        var words = name.Split((char[]?)null, StringSplitOptions.RemoveEmptyEntries);
        var decomposed = string.Join(' ', words).ToLowerInvariant().Normalize(NormalizationForm.FormD);

        var folded = new StringBuilder(decomposed.Length);
        foreach (var c in decomposed)
            if (CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                folded.Append(c);
        return folded.ToString();
    }

    // The first letter, and the first after each hyphen.
    private static void CapitalizeParts(char[] chars, int start, int end)
    {
        for (var i = start; i < end; i++)
            if (i == start || chars[i - 1] == '-')
                chars[i] = char.ToUpperInvariant(chars[i]);
    }

    private static void LowerCase(char[] chars, int start, int end)
    {
        for (var i = start; i < end; i++)
            chars[i] = char.ToLowerInvariant(chars[i]);
    }
}
