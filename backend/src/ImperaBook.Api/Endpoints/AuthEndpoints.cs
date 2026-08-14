using ImperaBook.Application;
using ImperaBook.Contracts.Views;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ImperaBook.API.Endpoints;

public static class AuthEndpoints
{
    // Placeholder credentials. Replaced by ASP.NET Core Identity's SignInManager; nothing else in
    // this file changes when that lands, which is the point of sketching it this way.
    private const string DemoUsername = "john";
    private const string DemoPassword = "asdf";

    private const string RejectedMessage = "Username or password is incorrect.";

    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost(
                "/api/auth/login",
                (LoginRequest request, IDashboardQueries dashboard, CancellationToken ct) =>
                    Login(request, dashboard, ct)
            )
            .WithName("Login")
            .AllowAnonymous()
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        return app;
    }

    private static async Task<Results<Ok<CommandResult>, ProblemHttpResult>> Login(
        LoginRequest request,
        IDashboardQueries dashboard,
        CancellationToken ct
    )
    {
        var ok =
            string.Equals(request.Username, DemoUsername, StringComparison.Ordinal)
            && string.Equals(request.Password, DemoPassword, StringComparison.Ordinal);

        if (!ok)
        {
            return TypedResults.Problem(
                detail: RejectedMessage,
                statusCode: StatusCodes.Status401Unauthorized,
                title: "Log in failed",
                extensions: new Dictionary<string, object?>
                {
                    ["code"] = "invalid_credentials",
                    ["views"] = CommandHandler.LoginScreen(RejectedMessage).Views,
                }
            );
        }

        return TypedResults.Ok(await CommandHandler.LoggedIn(dashboard, request.Username, ct));
    }
}

public sealed record LoginRequest(string Username, string Password);
