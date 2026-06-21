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

            ApplicationError.LibraryNotFound notFound => Results.Problem(
                title: "Referenced library does not exist.",
                detail: $"No library found with id '{notFound.LibraryId}'.",
                statusCode: StatusCodes.Status422UnprocessableEntity,
                extensions: new Dictionary<string, object?>
                {
                    ["code"] = "library_not_found",
                    ["libraryId"] = notFound.LibraryId,
                }
            ),

            _ => throw new InvalidOperationException(
                $"Unhandled ApplicationError: {error.GetType().Name}"
            ),
        };
}
