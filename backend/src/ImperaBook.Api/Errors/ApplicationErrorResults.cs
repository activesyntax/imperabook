using ImperaBook.API.Views;
using ImperaBook.Application;
using ImperaBook.Contracts.Views;

namespace ImperaBook.Api.Errors;

internal static class ApplicationErrorResults
{
    public static IResult ToProblem(this ApplicationError error) =>
        error switch
        {
            ApplicationError.Validation validation => Results.ValidationProblem(
                errors: new Dictionary<string, string[]>(),
                title: "One or more validation errors occurred.",
                // The command bar shows detail, so it carries the messages themselves.
                detail: string.Join(" ", validation.Errors.Select(e => e.ToFailure().Message)),
                statusCode: StatusCodes.Status400BadRequest,
                extensions: new Dictionary<string, object?>
                {
                    ["failures"] = validation.Errors.Select(e => e.ToFailure()).ToArray(),
                }
            ),

            ApplicationError.NoLibrary => Problem(
                StatusCodes.Status409Conflict,
                "No library",
                "A library must exist before books can be added.",
                "no_library"
            ),

            ApplicationError.ImageNotFound e => Problem(
                StatusCodes.Status422UnprocessableEntity,
                "Image not found",
                $"No image is stored with hash \"{e.Hash.Value}\". Upload it first.",
                "image_not_found"
            ),

            // Nothing was added. The views show the author who is already there; keepQuery hands
            // the typed command back in case a different name was meant.
            ApplicationError.DuplicateAuthor e => Results.Problem(
                statusCode: StatusCodes.Status409Conflict,
                title: "Author already exists",
                detail: $"{e.Existing.DisplayName()} is already in your catalog.",
                extensions: new Dictionary<string, object?>
                {
                    ["code"] = "author_exists",
                    ["keepQuery"] = true,
                    ["views"] = AuthorViews.AlreadyInCatalog(e.Existing),
                }
            ),

            // Nothing was added. The views say which authors matched; keepQuery hands the typed
            // command back so the user can narrow "by author" instead of retyping everything.
            ApplicationError.AmbiguousAuthor e => Results.Problem(
                statusCode: StatusCodes.Status409Conflict,
                title: "Ambiguous author",
                detail: $"\"{e.Search}\" matches {e.Matches.Count} authors.",
                extensions: new Dictionary<string, object?>
                {
                    ["code"] = "author_ambiguous",
                    ["keepQuery"] = true,
                    ["views"] = AuthorViews.Choices(e.Search, e.Matches),
                }
            ),

            _ => throw new InvalidOperationException(
                $"Unhandled ApplicationError: {error.GetType().Name}"
            ),
        };

    private static IResult Problem(int status, string title, string detail, string code) =>
        Results.Problem(
            statusCode: status,
            title: title,
            detail: detail,
            extensions: new Dictionary<string, object?> { ["code"] = code }
        );
}
