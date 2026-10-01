using ImperaBook.API.Views;
using ImperaBook.Application;
using ImperaBook.Contracts.Views;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ImperaBook.API.Endpoints;

public static class SearchEndpoints
{
    public static IEndpointRouteBuilder MapSearchEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/search", Search)
            .WithName("Search")
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        return app;
    }

    // The "find" command: q holds the keywords as typed, separated by blanks.
    private static async Task<Ok<CommandResult>> Search(
        string? q,
        ICatalogSearch search,
        CancellationToken ct
    )
    {
        var keywords = (q ?? "").Split((char[]?)null, StringSplitOptions.RemoveEmptyEntries);
        if (keywords.Length == 0)
            return TypedResults.Ok(SearchViews.NothingToFind());

        var found = await search.Find(keywords, ct);
        return TypedResults.Ok(found.ToCommandResult(string.Join(' ', keywords)));
    }
}
