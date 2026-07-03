using ImperaBook.API.Views;
using ImperaBook.Application.Books;
using ImperaBook.Application.Dashboard;
using ImperaBook.Contracts.Views;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ImperaBook.API.Endpoints;

public static class CommandEndpoints
{
    public static IEndpointRouteBuilder MapCommandEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/commands", () => TypedResults.Ok(CommandCatalog.All))
            .WithName("GetCommands")
            .Produces<IReadOnlyList<CommandDescriptor>>(StatusCodes.Status200OK);

        app.MapPost(
                "/api/command",
                (
                    CommandRequest request,
                    IBookQueries books,
                    IDashboardQueries dashboard,
                    CancellationToken ct
                ) => Dispatch(request, books, dashboard, ct)
            )
            .WithName("RunCommand")
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status501NotImplemented);

        return app;
    }

    private static async Task<Results<Ok<CommandResult>, ProblemHttpResult>> Dispatch(
        CommandRequest request,
        IBookQueries books,
        IDashboardQueries dashboard,
        CancellationToken ct
    )
    {
        return request.Command switch
        {
            "list books" => TypedResults.Ok((await books.List(null, null, ct)).ToCommandResult()),
            "search" => TypedResults.Ok(
                (await books.List(null, request.Text, ct)).ToCommandResult()
            ),

            "dashboard" => TypedResults.Ok((await dashboard.GetSummaryAsync(ct)).ToCommandResult()),
            "add book"
            or "update book"
            or "remove book"
            or "show book"
            or "add author"
            or "update author"
            or "remove author"
            or "list authors"
            or "filter"
            or "next"
            or "prev"
            or "open"
            or "back"
            or "top"
            or "bottom"
            or "help"
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
}

public sealed record CommandRequest(string Command, string? Text);
