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
}
