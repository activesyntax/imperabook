using CSharpFunctionalExtensions;
using ImperaBook.API.Views;
using ImperaBook.Application;
using ImperaBook.Contracts.Views;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ImperaBook.API.Endpoints;

public static class LibraryEndpoints
{
    public static IEndpointRouteBuilder MapLibraryEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/library", GetLibrary)
            .WithName("GetLibrary")
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        return app;
    }

    private static async Task<Ok<CommandResult>> GetLibrary(
        ILibraryQueries libraries,
        CancellationToken ct
    )
    {
        var statistics = await libraries.GetStatisticsAsync(ct);
        var libraryDetails = await libraries.GetLibraryAsync(ct);

        return TypedResults.Ok(
            libraryDetails.Match(
                library => library.ToCommandResult(statistics),
                () => CommandResult.Empty
            )
        );
    }
}
