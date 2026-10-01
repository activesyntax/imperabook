namespace ImperaBook.Infrastructure.Data.Queries;

/// <summary>Text the user typed, made into an ILIKE pattern that matches it literally.</summary>
internal static class LikePattern
{
    /// <summary>The escape character the patterns below use; pass it to EF.Functions.ILike.</summary>
    public const string Escape = @"\";

    /// <summary>Matches anything containing <paramref name="term"/>; % and _ are not wildcards to the user.</summary>
    public static string Containing(string term) =>
        $"%{term.Replace(@"\", @"\\").Replace("%", @"\%").Replace("_", @"\_")}%";
}
