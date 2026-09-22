using ImperaBook.API.Views;
using ImperaBook.Application;
using ImperaBook.Contracts.Views;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ImperaBook.API.Endpoints;

public static class AuthorEndpoints
{
    public static IEndpointRouteBuilder MapAuthorEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/authors", ListAuthors)
            .WithName("ListAuthors")
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        return app;
    }

    private static async Task<Ok<CommandResult>> ListAuthors(
        IAuthorQueries authors,
        CancellationToken ct
    )
    {
        var authorList = await authors.List(ct);

        return TypedResults.Ok(
            authorList.ToCommandResult(
                "No authors yet.",
                new PageInfo(1, 1, authorList.Count(), "authors")
            )
        );
    }
}
