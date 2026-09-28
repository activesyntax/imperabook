using ImperaBook.Application;

namespace ImperaBook.API.Views;

internal static class TextFormatting
{
    internal static string Plural(this string singular, int count) =>
        count == 1 ? singular : singular + "s";

    internal static string AsText(this IReadOnlyList<BookAuthor> authors) =>
        authors.Count == 0 ? "Unknown" : string.Join(", ", authors.Select(FullName));

    internal static string FullName(this BookAuthor a) =>
        string.IsNullOrWhiteSpace(a.FirstName) ? a.LastName : $"{a.FirstName} {a.LastName}";
}
