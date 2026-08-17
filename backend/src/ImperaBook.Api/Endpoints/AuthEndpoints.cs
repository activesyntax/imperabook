using System.Security.Claims;
using ImperaBook.Application;
using ImperaBook.Contracts.Views;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;

namespace ImperaBook.API.Endpoints;

public static class AuthEndpoints
{
    // One message for every rejection reason. Naming which of "no such user", "wrong
    // password" or "locked out" occurred would let anyone probe the instance for valid
    // usernames. The cost is real and worth stating: a locked-out user is told their
    // password is wrong, and retrying will not help them until the window expires.
    private const string RejectedMessage = "Username or password is incorrect.";

    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/login", Login)
            .WithName("Login")
            .AllowAnonymous()
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        return app;
    }

    private static async Task<Results<Ok<CommandResult>, ProblemHttpResult>> Login(
        LoginRequest request,
        SignInManager<UserEntity> signIn,
        IDashboardQueries dashboard,
        ClaimsPrincipal principal,
        CancellationToken ct
    )
    {
        // `login` is the one anonymous route an authenticated request can still reach, so
        // this branch is not politeness. Without it, a mistyped second `login` would run
        // PasswordSignInAsync, fail, and return the login screen — while the original
        // session is in fact still valid. The user would believe they had been thrown out.
        if (principal.Identity?.IsAuthenticated == true)
        {
            return TypedResults.Ok(CommandHandler.AlreadySignedIn(principal.Identity.Name));
        }

        var user = await signIn.UserManager.FindByNameAsync(request.Username);

        if (user is null)
        {
            return Rejected();
        }

        // lockoutOnFailure: true is what makes the lockout options configured in
        // AddIdentityCore actually count failures — it is off by default.
        // isPersistent: true so the cookie survives a browser restart; the session's
        // real bound is ExpireTimeSpan (14 days) and the security stamp check.
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
