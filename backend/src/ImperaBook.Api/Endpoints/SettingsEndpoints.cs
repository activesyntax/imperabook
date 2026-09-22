using ImperaBook.API.Views;
using ImperaBook.Contracts.Views;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ImperaBook.API.Endpoints;

public static class SettingsEndpoints
{
    public static IEndpointRouteBuilder MapSettingsEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/settings", GetSettings)
            .WithName("GetSettings")
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        return app;
    }

    private static Ok<CommandResult> GetSettings() =>
        TypedResults.Ok(new Settings().ToCommandResult());
}
