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

    private static async Task<IResult> AddBook(
        AddBookCommand command,
        AddBookCommandHandler handler,
        CancellationToken ct
    )
    {
        var result = await handler.Handle(command, ct);

        return result.IsSuccess
            ? TypedResults.Created($"/api/books/{result.Value.Id}", Added(result.Value))
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
