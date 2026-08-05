namespace ImperaBook.API.Views;

internal static class TextFormatting
{
    internal static string Plural(this string singular, int count) =>
        count == 1 ? singular : singular + "s";
}
