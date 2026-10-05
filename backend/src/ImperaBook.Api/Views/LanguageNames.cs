using System.Globalization;
using ImperaBook.Domain;

namespace ImperaBook.API.Views;

/// <summary>
/// Between the ISO 639-1 code a book stores ("hu") and the language a person names: "Hungarian",
/// "hungarian", "magyar", or the code itself. Invariant rather than request-culture-dependent, so
/// the same catalog reads the same way regardless of who asks.
/// </summary>
internal static class LanguageNames
{
    private static readonly CultureInfo[] Languages = CultureInfo.GetCultures(CultureTypes.NeutralCultures)
        .Where(c => c.TwoLetterISOLanguageName.Length == 2 && c.TwoLetterISOLanguageName != "iv")
        .ToArray();

    /// <summary>The English name of a stored code; an unrecognised code falls back to itself.</summary>
    public static string NameOf(string code)
    {
        try
        {
            return CultureInfo.GetCultureInfo(code).EnglishName;
        }
        catch (CultureNotFoundException)
        {
            return code;
        }
    }

    /// <summary>
    /// The code a typed language stands for — a code, or an English or native name, ignoring case
    /// and accents — or none when no language goes by it.
    /// </summary>
    public static string? CodeOf(string typed)
    {
        var text = typed.Trim();
        var byCode = Languages.FirstOrDefault(c =>
            string.Equals(c.TwoLetterISOLanguageName, text, StringComparison.OrdinalIgnoreCase)
        );
        if (byCode is not null)
            return byCode.TwoLetterISOLanguageName;

        return Languages
            .FirstOrDefault(c => NameCase.SameName(c.EnglishName, text) || NameCase.SameName(c.NativeName, text))
            ?.TwoLetterISOLanguageName;
    }
}
