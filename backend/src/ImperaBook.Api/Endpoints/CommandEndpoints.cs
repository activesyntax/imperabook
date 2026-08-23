using System.Security.Claims;
using CSharpFunctionalExtensions;
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
        app.MapGet("/api/commands", GetCommands)
            .WithName("GetCommands")
            .Produces<CommandCatalogResponse>(StatusCodes.Status200OK);

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

    private static async Task<Results<Ok<CommandResult>, ProblemHttpResult>> Dispatch(
        CommandRequest request,
        ClaimsPrincipal principal,
        SignInManager<UserEntity> signIn,
        IDashboardQueries dashboard,
        IBookQueries books,
        IAuthorQueries authors,
        ILibraryQueries libraries,
        CancellationToken ct
    )
    {
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
            "library" => TypedResults.Ok(await CommandHandler.Library(libraries, ct)),
            "list books" => TypedResults.Ok(await CommandHandler.ListBooks(books, ct)),
            "list authors" => TypedResults.Ok(await CommandHandler.ListAuthors(authors, ct)),
            "dashboard" => TypedResults.Ok(await CommandHandler.Dashboard(dashboard, ct)),
            // "library" => libraryId.TryGetValue(out var id)
            //     ? TypedResults.Ok(await CommandHandler.Library(libraries, id, ct))
            //     : NoLibrary(),
            // "list books" => TypedResults.Ok(await CommandHandler.ListBooks(books, ct)),
            // "list authors" => TypedResults.Ok(await CommandHandler.ListAuthors(authors, ct)),

            "help" => TypedResults.Ok(new GeneralHelp().ToCommandResult()),
            "about" => TypedResults.Ok(new About().ToCommandResult()),
            "settings" => TypedResults.Ok(new Settings().ToCommandResult()),

            "login" => TypedResults.Ok(CommandHandler.LoginScreen()),
            "logout" => TypedResults.Ok(await CommandHandler.Logout(signIn)),

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

    private static Results<Ok<CommandResult>, ProblemHttpResult> NoLibrary() =>
        TypedResults.Problem(
            statusCode: StatusCodes.Status404NotFound,
            title: "No library",
            detail: "This account has no library.",
            extensions: new Dictionary<string, object?> { ["code"] = "no_library" }
        );

    private static async Task<Ok<CommandCatalogResponse>> GetCommands(
        IUserQueries users,
        HttpContext http,
        CancellationToken ct
    )
    {
        http.Response.Headers.CacheControl = "no-store";

        var owner = await users.GetOwner(ct);

        return TypedResults.Ok(
            new CommandCatalogResponse(owner.ToSessionView(), CommandCatalog.All)
        );
    }
}

public sealed record CommandRequest(string Command);

public sealed record SessionView(string DisplayName, string LibraryName);

public sealed record CommandCatalogResponse(
    SessionView Session,
    IReadOnlyList<CommandDescriptor> Commands
);
