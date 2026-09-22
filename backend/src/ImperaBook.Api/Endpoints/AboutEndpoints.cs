using ImperaBook.API.Views;
using ImperaBook.Contracts.Views;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ImperaBook.API.Endpoints;

public static class AboutEndpoints
{
    public static IEndpointRouteBuilder MapAboutEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/about", GetAbout)
            .WithName("GetAbout")
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        return app;
    }

    private static Ok<CommandResult> GetAbout() =>
        TypedResults.Ok(new About().ToCommandResult());
}
