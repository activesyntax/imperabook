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

        app.MapGet("/api/books/languages", GetLanguages)
            .WithName("GetBookLanguages")
            .Produces<CatalogLanguage[]>(StatusCodes.Status200OK)
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
    // pages and (for a range) pagesTo; "written by herbert" as author; "published before 1950"
    // as publishedOp, published and (for a range) publishedTo.
    private static async Task<IResult> ListBooks(
        string? pagesOp,
        string? pages,
        string? pagesTo,
        string? author,
        string? publishedOp,
        string? published,
        string? publishedTo,
        string? languageOp,
        string? language,
        IBookQueries books,
        CancellationToken ct
    )
    {
        var pageFilter = ParsePageFilter(pagesOp, pages, pagesTo);
        if (pageFilter.IsFailure)
            return InvalidFilter("Invalid page filter", pageFilter.Error, "invalid_page_filter");

        var yearFilter = ParseYearFilter(publishedOp, published, publishedTo);
        if (yearFilter.IsFailure)
            return InvalidFilter("Invalid publication filter", yearFilter.Error, "invalid_published_filter");

        var languageFilter = ParseLanguageFilter(languageOp, language);
        if (languageFilter.IsFailure)
            return InvalidFilter("Invalid language filter", languageFilter.Error, "invalid_language_filter");

        var filter = new BookFilter(
            pageFilter.Value,
            string.IsNullOrWhiteSpace(author) ? null : author.Trim(),
            yearFilter.Value,
            languageFilter.Value
        );
        var bookList = await books.List(filter, ct);
        var page = new PageInfo(1, 1, bookList.Length, "books");

        if (filter.IsEmpty)
            return TypedResults.Ok(
                bookList.ToCommandResult("No books yet. Add one to start your library.", page)
            );

        // The filters said back as one phrase, in reading order: "written by herbert published
        // before 1970 whose language is Hungarian and whose page count is at least 300".
        var whose = string.Join(
            " and ",
            new[] { filter.Language?.Describe(), filter.Pages?.Describe() }.OfType<string>()
        );
        var which = string.Join(
            ' ',
            new[]
            {
                filter.Author is null ? null : $"written by {filter.Author}",
                filter.Published?.Describe(),
                whose.Length == 0 ? null : whose,
            }.OfType<string>()
        );

        return TypedResults.Ok(
            bookList.ToCommandResult(
                $"No books {which}.",
                page,
                $"Books {which}",
                showPages: filter.Pages is not null,
                showYear: filter.Published is not null
            )
        );
    }

    // The languages the user's books are in, named, for the command bar's suggestions.
    private static async Task<Ok<CatalogLanguage[]>> GetLanguages(IBookQueries books, CancellationToken ct)
    {
        var codes = await books.Languages(ct);

        return TypedResults.Ok(
            codes
                .Select(code => new CatalogLanguage(code, LanguageNames.NameOf(code)))
                .OrderBy(l => l.Name, StringComparer.OrdinalIgnoreCase)
                .ToArray()
        );
    }

    /// <summary>No languageOp is no filter; a language that cannot be identified is an error.</summary>
    private static CSharpFunctionalExtensions.Result<LanguageFilter?, string> ParseLanguageFilter(
        string? op,
        string? language
    )
    {
        if (string.IsNullOrWhiteSpace(op))
            return CSharpFunctionalExtensions.Result.Success<LanguageFilter?, string>(null);

        var negated = op.ToLowerInvariant() switch
        {
            "is" => false,
            "not" => true,
            _ => (bool?)null,
        };
        if (negated is null)
            return $"Unknown language comparison \"{op}\".";

        if (string.IsNullOrWhiteSpace(language) || LanguageNames.CodeOf(language) is not { } code)
            return $"\"{language}\" is not a language I know. Try its English name, like hungarian, or its code, like hu.";

        return new LanguageFilter(code, negated.Value);
    }

    private static ProblemHttpResult InvalidFilter(string title, string detail, string code) =>
        TypedResults.Problem(
            statusCode: StatusCodes.Status400BadRequest,
            title: title,
            detail: detail,
            extensions: new Dictionary<string, object?> { ["code"] = code }
        );

    private static readonly Dictionary<string, YearComparison> YearComparisons = new(StringComparer.OrdinalIgnoreCase)
    {
        ["in"] = YearComparison.In,
        ["before"] = YearComparison.Before,
        ["after"] = YearComparison.After,
        ["between"] = YearComparison.Between,
    };

    /// <summary>No publishedOp is no filter; one that cannot be read is an error, not "all books".</summary>
    private static CSharpFunctionalExtensions.Result<YearFilter?, string> ParseYearFilter(
        string? op,
        string? year,
        string? yearTo
    )
    {
        if (string.IsNullOrWhiteSpace(op))
            return CSharpFunctionalExtensions.Result.Success<YearFilter?, string>(null);

        if (!YearComparisons.TryGetValue(op, out var comparison))
            return $"Unknown publication comparison \"{op}\".";

        // A sign is allowed: the catalog keeps years before the common era.
        if (!int.TryParse(year, NumberStyles.AllowLeadingSign, CultureInfo.InvariantCulture, out var y))
            return "The year must be a whole number.";

        if (comparison != YearComparison.Between)
            return new YearFilter(comparison, y);

        if (!int.TryParse(yearTo, NumberStyles.AllowLeadingSign, CultureInfo.InvariantCulture, out var upTo))
            return "A range needs a year at both ends.";

        return YearFilter.Between(y, upTo);
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

public sealed record CatalogLanguage(string Code, string Name);
