using System.Globalization;
using ImperaBook.Application;

namespace ImperaBook.API.Views;

internal static class TextFormatting
{
    /// <summary>A year as read: 1965, or 428 BC for a year before the common era (stored as -428).</summary>
    internal static string AsYear(this int year) =>
        year < 0
            ? $"{(-year).ToString(CultureInfo.InvariantCulture)} BC"
            : year.ToString(CultureInfo.InvariantCulture);

    internal static string Plural(this string singular, int count) =>
        count == 1 ? singular : singular + "s";

    internal static string AsText(this IReadOnlyList<BookAuthor> authors) =>
        authors.Count == 0 ? "Unknown" : string.Join(", ", authors.Select(FullName));

    internal static string FullName(this BookAuthor a) =>
        string.IsNullOrWhiteSpace(a.FirstName) ? a.LastName : $"{a.FirstName} {a.LastName}";
}
