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

        return app;
    }

    private static Ok<BootstrapResponse> Bootstrap(HttpContext http)
    {
        http.Response.Headers.CacheControl = "no-store";

        return TypedResults.Ok(
            new BootstrapResponse(CommandCatalog.Login, CommandHandler.LoginScreen().Views)
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
            return TypedResults.Ok(CommandHandler.AlreadySignedIn(principal.Identity.Name));
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

        return TypedResults.Ok(await CommandHandler.LoggedIn(dashboard, user.FirstName, ct));
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
                ["views"] = CommandHandler.LoginScreen(RejectedMessage).Views,
            }
        );
}

public sealed record LoginRequest(string Username, string Password);

public sealed record BootstrapResponse(CommandDescriptor Command, IReadOnlyList<ViewNode> Views);
