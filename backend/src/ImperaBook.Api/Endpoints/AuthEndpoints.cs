using System.Security.Claims;
using ImperaBook.API.Data;
using ImperaBook.Application;
using ImperaBook.Contracts.Views;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;

namespace ImperaBook.API.Endpoints;

public static class AuthEndpoints
{
    private const string RejectedMessage = "Username or password is incorrect.";

    private static readonly ImageView LoginIllustration = new(
        "/static/imperabook-login-dark.svg",
        "ImperaBook",
        ImageRole.Illustration
    );

    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/auth/bootstrap", Bootstrap)
            .WithName("Bootstrap")
            .AllowAnonymous()
            .Produces<BootstrapResponse>(StatusCodes.Status200OK);

        app.MapPost("/api/auth/login", Login)
            .WithName("Login")
            .AllowAnonymous()
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        app.MapGet("/api/auth/login", () => TypedResults.Ok(LoginScreen()))
            .WithName("GetLoginScreen")
            .AllowAnonymous()
            .Produces<CommandResult>(StatusCodes.Status200OK);

        app.MapPost("/api/auth/logout", Logout)
            .WithName("Logout")
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        return app;
    }

    private static Ok<BootstrapResponse> Bootstrap(HttpContext http)
    {
        http.Response.Headers.CacheControl = "no-store";

        return TypedResults.Ok(
            new BootstrapResponse(CommandCatalog.Login, LoginScreen().Views)
        );
    }

    private static async Task<Results<Ok<CommandResult>, ProblemHttpResult>> Login(
        LoginRequest request,
        SignInManager<UserEntity> signIn,
        IDashboardQueries dashboard,
        ClaimsPrincipal principal,
        CancellationToken ct
    )
    {
        if (principal.Identity?.IsAuthenticated == true)
        {
            return TypedResults.Ok(AlreadySignedIn(principal.Identity.Name));
        }

        var user = await signIn.UserManager.FindByNameAsync(request.Username);

        if (user is null)
        {
            return Rejected();
        }

        var result = await signIn.PasswordSignInAsync(
            user,
            request.Password,
            isPersistent: true,
            lockoutOnFailure: true
        );

        if (!result.Succeeded)
        {
            return Rejected();
        }

        return TypedResults.Ok(await LoggedIn(dashboard, user.FirstName, ct));
    }

    // ADR 26: the error shape carries a view too. The client renders the login screen with
    // the reason on it rather than deciding for itself what a 401 should look like.
    private static ProblemHttpResult Rejected() =>
        TypedResults.Problem(
            detail: RejectedMessage,
            statusCode: StatusCodes.Status401Unauthorized,
            title: "Log in failed",
            extensions: new Dictionary<string, object?>
            {
                ["code"] = "invalid_credentials",
                ["views"] = LoginScreen(RejectedMessage).Views,
            }
        );

    private static async Task<Ok<CommandResult>> Logout(SignInManager<UserEntity> signIn)
    {
        await signIn.SignOutAsync();

        return TypedResults.Ok(
            new CommandResult([
                new MessageView("Signed out.", MessageKind.Info),
                .. LoginScreen().Views,
            ])
        );
    }

    /// <summary>
    /// The login screen. <paramref name="error"/> is non-null only when a sign-in attempt was
    /// rejected — the same surface comes back, carrying the reason.
    /// </summary>
    internal static CommandResult LoginScreen(string? error = null) =>
        new(
            error is null
                ? [LoginIllustration]
                : [LoginIllustration, new MessageView(error, MessageKind.Error)]
        );

    private static CommandResult AlreadySignedIn(string? username) =>
        new([
            new MessageView(
                username is null
                    ? "You are already signed in."
                    : $"You are already signed in as {username}.",
                MessageKind.Info
            ),
        ]);

    private static async Task<CommandResult> LoggedIn(
        IDashboardQueries dashboard,
        string displayName,
        CancellationToken ct
    )
    {
        var summary = await DashboardEndpoints.Summary(dashboard, ct);

        ViewNode[] views =
        [
            // new MessageView($"Welcome back, {displayName}.", MessageKind.Success),
            .. summary.Views,
        ];

        return new CommandResult(views);
    }
}

public sealed record LoginRequest(string Username, string Password);

public sealed record BootstrapResponse(CommandDescriptor Command, IReadOnlyList<ViewNode> Views);
