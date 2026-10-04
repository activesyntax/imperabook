using System.Globalization;
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
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        app.MapGet("/api/books/{id:guid}", GetBook)
            .WithName("GetBook")
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status404NotFound);

        app.MapDelete("/api/books/{id:guid}", RemoveBook)
            .WithName("RemoveBook")
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

    // "list books", optionally filtered: "whose page count is at least 120" arrives as pagesOp,
    // pages and (for a range) pagesTo; "written by herbert" as author.
    private static async Task<IResult> ListBooks(
        string? pagesOp,
        string? pages,
        string? pagesTo,
        string? author,
        IBookQueries books,
        CancellationToken ct
    )
    {
        var filter = ParsePageFilter(pagesOp, pages, pagesTo);
        if (filter.IsFailure)
            return TypedResults.Problem(
                statusCode: StatusCodes.Status400BadRequest,
                title: "Invalid page filter",
                detail: filter.Error,
                extensions: new Dictionary<string, object?> { ["code"] = "invalid_page_filter" }
            );

        var writer = string.IsNullOrWhiteSpace(author) ? null : author.Trim();
        var bookList = await books.List(filter.Value, writer, ct);
        var page = new PageInfo(1, 1, bookList.Length, "books");

        if (filter.Value is null && writer is null)
            return TypedResults.Ok(
                bookList.ToCommandResult("No books yet. Add one to start your library.", page)
            );

        // The filters said back as one phrase: "written by herbert whose page count is at least 120".
        var which = string.Join(
            ' ',
            new[] { writer is null ? null : $"written by {writer}", filter.Value?.Describe() }.OfType<string>()
        );

        return TypedResults.Ok(
            bookList.ToCommandResult(
                $"No books {which}.",
                page,
                $"Books {which}",
                showPages: filter.Value is not null
            )
        );
    }

    private static readonly Dictionary<string, PageComparison> Comparisons = new(StringComparer.OrdinalIgnoreCase)
    {
        ["over"] = PageComparison.Over,
        ["under"] = PageComparison.Under,
        ["equal"] = PageComparison.Equal,
        ["atLeast"] = PageComparison.AtLeast,
        ["atMost"] = PageComparison.AtMost,
        ["otherThan"] = PageComparison.OtherThan,
        ["between"] = PageComparison.Between,
    };

    /// <summary>No pagesOp is no filter; a pagesOp that cannot be read is an error, not "all books".</summary>
    private static CSharpFunctionalExtensions.Result<PageFilter?, string> ParsePageFilter(string? op, string? pages, string? pagesTo)
    {
        if (string.IsNullOrWhiteSpace(op))
            return CSharpFunctionalExtensions.Result.Success<PageFilter?, string>(null);

        if (!Comparisons.TryGetValue(op, out var comparison))
            return $"Unknown page comparison \"{op}\".";

        if (!int.TryParse(pages, NumberStyles.None, CultureInfo.InvariantCulture, out var n))
            return "The page count must be a whole number.";

        if (comparison != PageComparison.Between)
            return new PageFilter(comparison, n);

        if (!int.TryParse(pagesTo, NumberStyles.None, CultureInfo.InvariantCulture, out var upTo))
            return "A range needs a whole number at both ends.";

        return PageFilter.Between(n, upTo);
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

    private static async Task<IResult> RemoveBook(
        Guid id,
        RemoveBookCommandHandler handler,
        CancellationToken ct
    )
    {
        var result = await handler.Handle(id, ct);

        return result.IsSuccess
            ? TypedResults.Ok(
                new CommandResult(
                    [new MessageView($"Removed \"{result.Value.Title}\".", MessageKind.Success)]
                )
            )
            : result.Error.ToProblem();
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
