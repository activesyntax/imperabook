using ImperaBook.Contracts.Views;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ImperaBook.API.Endpoints;

public static class AuthEndpoints
{
    // Placeholder credentials. Replaced by ASP.NET Core Identity's SignInManager; nothing else in
    // this file changes when that lands, which is the point of sketching it this way.
    private const string DemoUsername = "john";
    private const string DemoPassword = "asdf";

    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/login", (LoginRequest request) => Login(request))
            .WithName("Login")
            .AllowAnonymous()
            .Produces<CommandResult>(StatusCodes.Status200OK);

        return app;
    }

    private static Ok<CommandResult> Login(LoginRequest request)
    {
        var ok =
            string.Equals(request.Username, DemoUsername, StringComparison.Ordinal)
            && string.Equals(request.Password, DemoPassword, StringComparison.Ordinal);

        var message = ok
            ? new MessageView("success", $"Signed in as {request.Username}.")
            : new MessageView("error", "Those credentials were not recognized.");

        return TypedResults.Ok(new CommandResult([message]));
    }
}

public sealed record LoginRequest(string Username, string Password);
