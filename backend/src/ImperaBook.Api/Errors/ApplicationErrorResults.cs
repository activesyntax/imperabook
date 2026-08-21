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

            _ => throw new InvalidOperationException(
                $"Unhandled ApplicationError: {error.GetType().Name}"
            ),
        };
}
