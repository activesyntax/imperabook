using System.Security.Claims;
using ImperaBook.API.Data;
using ImperaBook.API.Views;
using ImperaBook.Application;
using ImperaBook.Contracts.Views;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ImperaBook.API.Endpoints;

public static class CommandEndpoints
{
    public static IEndpointRouteBuilder MapCommandEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/commands", GetCommands)
            .WithName("GetCommands")
            .Produces<CommandCatalogResponse>(StatusCodes.Status200OK);

        app.MapPost("/api/command", Dispatch)
            .WithName("RunCommand")
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status501NotImplemented);

        return app;
    }

    private static Results<Ok<CommandResult>, ProblemHttpResult> Dispatch(
        CommandRequest request,
        ClaimsPrincipal principal
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

    private static Results<Ok<CommandResult>, ProblemHttpResult> NotAuthenticated(string command) =>
        TypedResults.Problem(
            statusCode: StatusCodes.Status401Unauthorized,
            title: "Not signed in",
            detail: $"\"{command}\" requires a session. Sign in to continue.",
            extensions: new Dictionary<string, object?>
            {
                ["code"] = "not_authenticated",
                ["views"] = AuthEndpoints.LoginScreen().Views,
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
