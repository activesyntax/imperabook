using System.Globalization;
using ImperaBook.Application;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ImperaBook.API.Endpoints;

/// <summary>Reading list filters from a query string, shared by the book and author lists.</summary>
internal static class ListFilters
{
    public static ProblemHttpResult Invalid(string title, string detail, string code) =>
        TypedResults.Problem(
            statusCode: StatusCodes.Status400BadRequest,
            title: title,
            detail: detail,
            extensions: new Dictionary<string, object?> { ["code"] = code }
        );

    private static readonly Dictionary<string, YearComparison> YearComparisons = new(StringComparer.OrdinalIgnoreCase)
    {
        ["in"] = YearComparison.In,
        ["before"] = YearComparison.Before,
        ["after"] = YearComparison.After,
        ["between"] = YearComparison.Between,
    };

    /// <summary>
    /// A year filter — "published before 1950", "born between 1900 and 1950" — from its op, year
    /// and (for a range) upper year. No op is no filter; one that cannot be read is an error, not
    /// "everything".
    /// </summary>
    public static CSharpFunctionalExtensions.Result<YearFilter?, string> ParseYear(
        string? op,
        string? year,
        string? yearTo
    )
    {
        if (string.IsNullOrWhiteSpace(op))
            return CSharpFunctionalExtensions.Result.Success<YearFilter?, string>(null);

        if (!YearComparisons.TryGetValue(op, out var comparison))
            return $"Unknown year comparison \"{op}\".";

        // A sign is allowed: the catalog keeps years before the common era.
        if (!int.TryParse(year, NumberStyles.AllowLeadingSign, CultureInfo.InvariantCulture, out var y))
            return "The year must be a whole number.";

        if (comparison != YearComparison.Between)
            return new YearFilter(comparison, y);

        if (!int.TryParse(yearTo, NumberStyles.AllowLeadingSign, CultureInfo.InvariantCulture, out var upTo))
            return "A range needs a year at both ends.";

        return YearFilter.Between(y, upTo);
    }
}
