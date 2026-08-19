using System.Security.Claims;
using ImperaBook.API.Views;
using ImperaBook.Application;
using ImperaBook.Contracts.Views;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;

namespace ImperaBook.API.Endpoints;

public static class CommandEndpoints
{
    public static IEndpointRouteBuilder MapCommandEndpoints(this IEndpointRouteBuilder app)
    {
        // Behind the fallback policy. The catalog names every command a session may run,
        // and a client with no session gets the one it may run from /api/auth/bootstrap
        // instead. Filtering this list by principal is the move to make if a second
        // anonymous command ever exists; today there is nothing to filter.
        app.MapGet("/api/commands", () => TypedResults.Ok(CommandCatalog.All))
            .WithName("GetCommands")
            .Produces<IReadOnlyList<CommandDescriptor>>(StatusCodes.Status200OK);

        // todo: inject queries onto CommandHandler
        app.MapPost(
                "/api/command",
                (
                    CommandRequest request,
                    ClaimsPrincipal principal,
                    SignInManager<UserEntity> signIn,
                    IDashboardQueries dashboard,
                    IBookQueries books,
                    IAuthorQueries authors,
                    ILibraryQueries libraries,
                    CancellationToken ct
                ) => Dispatch(request, principal, signIn, dashboard, books, authors, libraries, ct)
            )
            .WithName("RunCommand")
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status501NotImplemented);

        return app;
    }

    // TODO: get valid library id from UserQueries. the users library should be
    // displayed
    static readonly Guid LibraryId = Guid.Parse("11111111-1111-1111-1111-111111111111");

    private static async Task<Results<Ok<CommandResult>, ProblemHttpResult>> Dispatch(
        CommandRequest request,
        ClaimsPrincipal principal,
        SignInManager<UserEntity> signIn,
        IDashboardQueries dashboard,
        IBookQueries books,
        IAuthorQueries authors,
        ILibraryQueries libraries,
        // IUserQueries users,
        CancellationToken ct
    )
    {
        // The route is behind the fallback policy, so an anonymous request cannot arrive
        // here today. The check stays because the policy is route-level and access is
        // per-command: the moment a second anonymous command opens the route, this is the
        // only enforcement left. An unknown command is null here and falls through to the
        // throw below rather than being reported as a permission problem.
        var descriptor = CommandCatalog.All.SingleOrDefault(c => c.Command == request.Command);

        if (
            descriptor is { Access: CommandAccess.Authenticated }
            && principal.Identity?.IsAuthenticated != true
        )
        {
            return NotAuthenticated(request.Command);
        }

        return request.Command switch
        {
            "dashboard" => TypedResults.Ok(await CommandHandler.Dashboard(dashboard, ct)),
            "library" => TypedResults.Ok(await CommandHandler.Library(libraries, LibraryId, ct)),
            "list books" => TypedResults.Ok(await CommandHandler.ListBooks(books, ct)),
            "list authors" => TypedResults.Ok(await CommandHandler.ListAuthors(authors, ct)),

            "help" => TypedResults.Ok(new GeneralHelp().ToCommandResult()),
            "about" => TypedResults.Ok(new About().ToCommandResult()),
            "settings" => TypedResults.Ok(new Settings().ToCommandResult()),

            // Reachable only with a session: the login screen belongs to the bootstrap
            // route and to the rejection path, both of which serve a client that has none.
            "login" => TypedResults.Ok(CommandHandler.AlreadySignedIn(principal.Identity?.Name)),
            "logout" => TypedResults.Ok(await CommandHandler.SignOut(signIn)),

            "account"
            or "add book"
            or "update book"
            or "remove book"
            or "show book"
            or "add author"
            or "update author"
            or "remove author"
            or "filter"
            or "next"
            or "prev"
            or "open"
            or "back"
            or "top"
            or "bottom"
            or "clear"
            or "cancel"
            or "quit"
            or "exit" => NotImplemented(request.Command),

            _ => throw new InvalidOperationException($"Unknown command \"{request.Command}\"."),
        };
    }

    private static Results<Ok<CommandResult>, ProblemHttpResult> NotImplemented(string command) =>
        TypedResults.Problem(
            statusCode: StatusCodes.Status501NotImplemented,
            title: "Command not implemented",
            detail: $"\"{command}\" is recognized but has no handler yet.",
            extensions: new Dictionary<string, object?> { ["code"] = "command_not_implemented" }
        );

    // ADR 26: the error shape carries a view too. Same producer as the bootstrap route and
    // the rejection path, so the three cannot drift apart.
    private static Results<Ok<CommandResult>, ProblemHttpResult> NotAuthenticated(string command) =>
        TypedResults.Problem(
            statusCode: StatusCodes.Status401Unauthorized,
            title: "Not signed in",
            detail: $"\"{command}\" requires a session. Sign in to continue.",
            extensions: new Dictionary<string, object?>
            {
                ["code"] = "not_authenticated",
                ["views"] = CommandHandler.LoginScreen().Views,
            }
        );
}

public sealed record CommandRequest(string Command);
