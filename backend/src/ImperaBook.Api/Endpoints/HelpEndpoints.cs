using ImperaBook.API.Views;
using ImperaBook.Contracts.Views;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ImperaBook.API.Endpoints;

public static class HelpEndpoints
{
    public static IEndpointRouteBuilder MapHelpEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/help", GetHelp)
            .WithName("GetHelp")
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        return app;
    }

    private static Ok<CommandResult> GetHelp() =>
        TypedResults.Ok(new GeneralHelp().ToCommandResult());
}
