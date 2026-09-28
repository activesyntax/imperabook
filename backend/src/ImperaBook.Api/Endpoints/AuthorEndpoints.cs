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

        app.MapGet("/api/authors/search", SearchAuthors)
            .WithName("SearchAuthors")
            .Produces<AuthorMatch[]>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        app.MapGet("/api/authors/{id:guid}", GetAuthor)
            .WithName("GetAuthor")
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status404NotFound);

        app.MapPost("/api/authors", AddAuthor)
            .WithName("AddAuthor")
            .Produces<CommandResult>(StatusCodes.Status201Created)
            .ProducesValidationProblem()
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status409Conflict)
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

    /// <summary>How many matches the command bar can use as suggestion chips.</summary>
    private const int SuggestionLimit = 8;

    // Feeds the command bar's author suggestions. Plain data rather than a view:
    // it fills in text the user is typing instead of showing anything. Matching
    // is the same as "by author" resolution, so a suggestion always resolves.
    private static async Task<Ok<AuthorMatch[]>> SearchAuthors(
        string? q,
        IAuthorQueries authors,
        CancellationToken ct
    )
    {
        var term = string.Join(' ', (q ?? "").Split(' ', StringSplitOptions.RemoveEmptyEntries));
        if (term.Length == 0)
            return TypedResults.Ok(Array.Empty<AuthorMatch>());

        var matches = await authors.Search(term, ct);

        return TypedResults.Ok(
            matches.Take(SuggestionLimit).Select(a => new AuthorMatch(a.Id, a.DisplayName())).ToArray()
        );
    }

    /// <summary>Where a single author is shown; list items link here through Open.</summary>
    internal static string DetailPath(Guid id) => $"/api/authors/{id}";

    // Scoped to the current user by the query, so another user's author is indistinguishable
    // from one that does not exist.
    private static async Task<Results<Ok<CommandResult>, ProblemHttpResult>> GetAuthor(
        Guid id,
        IAuthorQueries authors,
        CancellationToken ct
    )
    {
        var author = await authors.Get(id, ct);

        return author.HasValue
            ? TypedResults.Ok(author.Value.ToCommandResult())
            : TypedResults.Problem(
                statusCode: StatusCodes.Status404NotFound,
                title: "Author not found",
                detail: "That author is not in your catalog.",
                extensions: new Dictionary<string, object?> { ["code"] = "author_not_found" }
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
            ? TypedResults.Created(DetailPath(result.Value), Added(command))
            : result.Error.ToProblem();
    }

    private static CommandResult Added(AddAuthorCommand command)
    {
        var name = $"{command.FirstName?.Trim()} {command.LastName.Trim()}".Trim();

        return new CommandResult([new MessageView($"Added author {name}.", MessageKind.Success)]);
    }
}

public sealed record AuthorMatch(Guid Id, string Name);
