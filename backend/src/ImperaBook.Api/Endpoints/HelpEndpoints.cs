using ImperaBook.API.Views;
using ImperaBook.Contracts.Views;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ImperaBook.API.Endpoints;

public static class HelpEndpoints
{
    public static IEndpointRouteBuilder MapHelpEndpoints(this IEndpointRouteBuilder app)
    {
        // Public: offered before sign-in, and says nothing about anyone's library.
        app.MapGet("/api/help", GetHelp)
            .WithName("GetHelp")
            .AllowAnonymous()
            .Produces<CommandResult>(StatusCodes.Status200OK);

        return app;
    }

    private static Ok<CommandResult> GetHelp() =>
        TypedResults.Ok(new GeneralHelp().ToCommandResult());
}
