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
