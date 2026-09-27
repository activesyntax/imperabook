using ImperaBook.Api.Errors;
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

        app.MapPost("/api/authors", AddAuthor)
            .WithName("AddAuthor")
            .Produces<CommandResult>(StatusCodes.Status201Created)
            .ProducesValidationProblem()
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status422UnprocessableEntity);

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

    private static async Task<IResult> AddAuthor(
        AddAuthorCommand command,
        AddAuthorCommandHandler handler,
        CancellationToken ct
    )
    {
        var result = await handler.Handle(command, ct);

        return result.IsSuccess
            ? TypedResults.Created($"/api/authors/{result.Value}", Added(command))
            : result.Error.ToProblem();
    }

    private static CommandResult Added(AddAuthorCommand command)
    {
        var name = $"{command.FirstName?.Trim()} {command.LastName.Trim()}".Trim();

        return new CommandResult([new MessageView($"Added author {name}.", MessageKind.Success)]);
    }
}
