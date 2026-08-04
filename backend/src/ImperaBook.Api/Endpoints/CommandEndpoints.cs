using ImperaBook.API.Views;
using ImperaBook.Application.Authors;
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
                    IDashboardQueries dashboard,
                    IBookQueries books,
                    IAuthorQueries authors,
                    CancellationToken ct
                ) => Dispatch(request, dashboard, books, authors, ct)
            )
            .WithName("RunCommand")
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status501NotImplemented);

        return app;
    }

    private static async Task<Results<Ok<CommandResult>, ProblemHttpResult>> Dispatch(
        CommandRequest request,
        IDashboardQueries dashboard,
        IBookQueries books,
        IAuthorQueries authors,
        CancellationToken ct
    )
    {
        return request.Command switch
        {
            "dashboard" => TypedResults.Ok((await dashboard.GetSummaryAsync(ct)).ToCommandResult()),
            "list books" => TypedResults.Ok(
                (await books.List(null, null, ct)).ToCommandResult(
                    "All books",
                    "No books yet. Add one to start your library."
                )
            ),
            "search" => TypedResults.Ok(
                (await books.List(null, request.Text, ct)).ToCommandResult(
                    $"Results for \"{request.Text}\"",
                    "No books match that search."
                )
            ),

            "list authors" => TypedResults.Ok(
                (await authors.List(null, null, ct)).ToCommandResult(
                    "All authors",
                    "No authors yet."
                )
            ),

            "add book"
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
