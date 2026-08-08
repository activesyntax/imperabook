using ImperaBook.API.Views;
using ImperaBook.Application;
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

        // todo: inject queries onto CommandHandler
        app.MapPost(
                "/api/command",
                (
                    CommandRequest request,
                    IDashboardQueries dashboard,
                    IBookQueries books,
                    IAuthorQueries authors,
                    ILibraryQueries libraries,
                    CancellationToken ct
                ) => Dispatch(request, dashboard, books, authors, libraries, ct)
            )
            .WithName("RunCommand")
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status501NotImplemented);

        return app;
    }

    // TODO: get valid library id from UserQueries. the users library should be
    // displayed
    static readonly Guid LibraryId = Guid.Parse("11111111-1111-1111-1111-111111111111");

    private static async Task<Results<Ok<CommandResult>, ProblemHttpResult>> Dispatch(
        CommandRequest request,
        IDashboardQueries dashboard,
        IBookQueries books,
        IAuthorQueries authors,
        ILibraryQueries libraries,
        // IUserQueries users,
        CancellationToken ct
    )
    {
        return request.Command switch
        {
            "dashboard" => TypedResults.Ok((await dashboard.GetSummaryAsync(ct)).ToCommandResult()),
            "library" => TypedResults.Ok(await CommandHandler.Library(libraries, LibraryId, ct)),
            "list books" => TypedResults.Ok(await CommandHandler.ListBooks(books, ct)),
            "search" => TypedResults.Ok(
                (await books.List(null, request.Text, ct)).ToCommandResult(
                    "No books match that search."
                )
            ),

            "list authors" => TypedResults.Ok(await CommandHandler.ListAuthors(authors, ct)),

            "help" => TypedResults.Ok(new GeneralHelp().ToCommandResult()),

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
