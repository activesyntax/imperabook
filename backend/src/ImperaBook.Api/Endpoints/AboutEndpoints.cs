using ImperaBook.API.Views;
using ImperaBook.Contracts.Views;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ImperaBook.API.Endpoints;

public static class AboutEndpoints
{
    public static IEndpointRouteBuilder MapAboutEndpoints(this IEndpointRouteBuilder app)
    {
        // Public: offered before sign-in, and says nothing about anyone's library.
        app.MapGet("/api/about", GetAbout)
            .WithName("GetAbout")
            .AllowAnonymous()
            .Produces<CommandResult>(StatusCodes.Status200OK);

        return app;
    }

    private static Ok<CommandResult> GetAbout() =>
        TypedResults.Ok(new About().ToCommandResult());
}
