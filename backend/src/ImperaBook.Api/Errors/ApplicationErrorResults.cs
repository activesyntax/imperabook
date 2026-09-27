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
