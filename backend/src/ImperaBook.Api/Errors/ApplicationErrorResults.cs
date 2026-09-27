using ImperaBook.Application;

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

            ApplicationError.AuthorsNotFound e => Results.Problem(
                statusCode: StatusCodes.Status422UnprocessableEntity,
                title: "Author not found",
                detail: "One or more authors do not exist in your catalog. Add them first.",
                extensions: new Dictionary<string, object?>
                {
                    ["code"] = "author_not_found",
                    ["authorIds"] = e.Ids,
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
