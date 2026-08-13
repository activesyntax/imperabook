using ImperaBook.Contracts.Views;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ImperaBook.API.Endpoints;

public static class AuthEndpoints
{
    // Placeholder credentials. Replaced by ASP.NET Core Identity's SignInManager; nothing else in
    // this file changes when that lands, which is the point of sketching it this way.
    private const string DemoUsername = "john";
    private const string DemoPassword = "asdf";

    private const string RejectedMessage = "Those credentials were not recognized.";

    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/login", (LoginRequest request) => Login(request))
            .WithName("Login")
            .AllowAnonymous()
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        return app;
    }

    private static Results<Ok<CommandResult>, ProblemHttpResult> Login(LoginRequest request)
    {
        var ok =
            string.Equals(request.Username, DemoUsername, StringComparison.Ordinal)
            && string.Equals(request.Password, DemoPassword, StringComparison.Ordinal);

        if (!ok)
        {
            // ADR 12: a hiba ProblemDetails. A `views` extension a hibaválasznak is megadja
            // azt, amit a sikeres válasz alapból tud — mit lásson a felhasználó. A `detail`
            // és a MessageView ugyanabból a konstansból jön, hogy ne tudjanak elcsúszni.
            return TypedResults.Problem(
                detail: RejectedMessage,
                statusCode: StatusCodes.Status401Unauthorized,
                title: "Sign-in failed",
                extensions: new Dictionary<string, object?>
                {
                    ["views"] = new ViewNode[]
                    {
                        new MessageView(RejectedMessage, MessageKind.Error),
                    },
                }
            );
        }

        return TypedResults.Ok(
            new CommandResult([
                new MessageView($"Signed in as {request.Username}.", MessageKind.Success),
            ])
        );
    }
}

public sealed record LoginRequest(string Username, string Password);
