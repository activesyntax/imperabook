using ImperaBook.Api.Errors;
using ImperaBook.API.Views;
using ImperaBook.Application;
using ImperaBook.Contracts.Views;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ImperaBook.API.Endpoints;

public static class BookEndpoints
{
    public static IEndpointRouteBuilder MapBookEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/books", ListBooks)
            .WithName("ListBooks")
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        app.MapGet("/api/books/{id:guid}", GetBook)
            .WithName("GetBook")
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status404NotFound);

        app.MapPost("/api/books", AddBook)
            .WithName("AddBook")
            .Produces<CommandResult>(StatusCodes.Status201Created)
            .ProducesValidationProblem()
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status409Conflict)
            .ProducesProblem(StatusCodes.Status422UnprocessableEntity);

        return app;
    }

    private static async Task<Ok<CommandResult>> ListBooks(IBookQueries books, CancellationToken ct)
    {
        var bookList = await books.List(ct);

        return TypedResults.Ok(
            bookList.ToCommandResult(
                "No books yet. Add one to start your library.",
                new PageInfo(1, 1, bookList.Count(), "books")
            )
        );
    }

    /// <summary>Where a single book is shown; list items link here through Open.</summary>
    internal static string DetailPath(Guid id) => $"/api/books/{id}";

    // Scoped to the current user by the query, so another user's book is indistinguishable from
    // one that does not exist.
    private static async Task<Results<Ok<CommandResult>, ProblemHttpResult>> GetBook(
        Guid id,
        IBookQueries books,
        CancellationToken ct
    )
    {
        var book = await books.Get(id, ct);

        return book.HasValue
            ? TypedResults.Ok(book.Value.ToCommandResult())
            : TypedResults.Problem(
                statusCode: StatusCodes.Status404NotFound,
                title: "Book not found",
                detail: "That book is not in your library.",
                extensions: new Dictionary<string, object?> { ["code"] = "book_not_found" }
            );
    }

    private static async Task<IResult> AddBook(
        AddBookCommand command,
        AddBookCommandHandler handler,
        CancellationToken ct
    )
    {
        var result = await handler.Handle(command, ct);

        return result.IsSuccess
            ? TypedResults.Created(DetailPath(result.Value.Id), Added(result.Value))
            : result.Error.ToProblem();
    }

    private static CommandResult Added(BookAdded book)
    {
        var author = book.Author switch
        {
            AuthorResolution.Existing e => $" by {e.Name}",
            AuthorResolution.Created c => $" by {c.Name} (new author)",
            _ => ", author unknown",
        };

        return new CommandResult(
            [new MessageView($"Added \"{book.Title}\"{author}.", MessageKind.Success)]
        );
    }
}
