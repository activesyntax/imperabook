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
            .ProducesProblem(StatusCodes.Status400BadRequest)
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

        app.MapDelete("/api/authors/{id:guid}", RemoveAuthor)
            .WithName("RemoveAuthor")
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

    // "list authors", optionally filtered: "having no books" arrives as missing=books, "born
    // before 1900" as bornOp, born and (for a range) bornTo, "died …" as diedOp, died and
    // diedTo, "living" as vitality=living.
    private static async Task<IResult> ListAuthors(
        string? missing,
        string? bornOp,
        string? born,
        string? bornTo,
        string? diedOp,
        string? died,
        string? diedTo,
        string? vitality,
        IAuthorQueries authors,
        CancellationToken ct
    )
    {
        var withoutBooks = !string.IsNullOrWhiteSpace(missing);
        if (withoutBooks && !string.Equals(missing!.Trim(), "books", StringComparison.OrdinalIgnoreCase))
            return ListFilters.Invalid(
                "Invalid having-no filter",
                $"An author can only lack books, not \"{missing}\".",
                "invalid_missing_filter"
            );

        var bornFilter = ListFilters.ParseYear(bornOp, born, bornTo);
        if (bornFilter.IsFailure)
            return ListFilters.Invalid("Invalid birth filter", bornFilter.Error, "invalid_born_filter");

        var diedFilter = ListFilters.ParseYear(diedOp, died, diedTo);
        if (diedFilter.IsFailure)
            return ListFilters.Invalid("Invalid death filter", diedFilter.Error, "invalid_died_filter");

        var living = !string.IsNullOrWhiteSpace(vitality);
        if (living && !string.Equals(vitality!.Trim(), "living", StringComparison.OrdinalIgnoreCase))
            return ListFilters.Invalid(
                "Invalid vitality filter",
                $"Authors can be listed as living, not \"{vitality}\".",
                "invalid_vitality_filter"
            );

        var filter = new AuthorFilter(withoutBooks, bornFilter.Value, living, diedFilter.Value);
        var authorList = await authors.List(filter, ct);
        var page = new PageInfo(1, 1, authorList.Length, "authors");

        if (filter.IsEmpty)
            return TypedResults.Ok(authorList.ToCommandResult("No authors yet.", page));

        // Said back as one phrase: "Authors born after 1850 who died before 1900 having no books".
        var who = filter.Living ? "living authors" : "authors";
        var which = string.Join(
            ' ',
            new[]
            {
                filter.Born?.Describe("born"),
                filter.Died is { } d ? "who " + d.Describe("died") : null,
                filter.WithoutBooks ? "having no books" : null,
            }.OfType<string>()
        );
        var heading = $"{char.ToUpperInvariant(who[0])}{who[1..]}{(which.Length == 0 ? "" : " " + which)}";

        return TypedResults.Ok(authorList.ToCommandResult($"No {who}{(which.Length == 0 ? "" : " " + which)}.", page, heading));
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

    // Says what happened to the books, since that is the part the user cannot see.
    private static async Task<IResult> RemoveAuthor(
        Guid id,
        RemoveAuthorCommandHandler handler,
        CancellationToken ct
    )
    {
        var result = await handler.Handle(id, ct);
        if (result.IsFailure)
            return result.Error.ToProblem();

        var removed = result.Value;
        var books = removed.BooksLeftWithoutAuthor switch
        {
            0 => "",
            1 => " 1 book no longer has an author.",
            var n => $" {n} books no longer have an author.",
        };

        return TypedResults.Ok(
            new CommandResult([new MessageView($"Removed {removed.Name}.{books}", MessageKind.Success)])
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
            ? TypedResults.Created(DetailPath(result.Value.Id), Added(result.Value))
            : result.Error.ToProblem();
    }

    // Names the author as stored — capitalized — not as typed.
    private static CommandResult Added(AuthorAdded author) =>
        new([new MessageView($"Added author {author.Name}.", MessageKind.Success)]);
}

public sealed record AuthorMatch(Guid Id, string Name);
