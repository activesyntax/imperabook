using ImperaBook.Application;
using ImperaBook.Domain.Catalog;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ImperaBook.API.Endpoints;

public static class ImageEndpoints
{
    public static IEndpointRouteBuilder MapImageEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost(ImageRoutes.Collection, Upload)
            .WithName("UploadImage")
            // A JSON command body cannot carry a file, so this is the one point where the client
            // touches the backend outside the command channel before a command runs.
            .DisableAntiforgery()
            .Produces<UploadedImage>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status413PayloadTooLarge)
            .ProducesProblem(StatusCodes.Status415UnsupportedMediaType);

        app.MapGet(ImageRoutes.Collection + "/{hash}", Download)
            .WithName("GetImage")
            .Produces<IResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status404NotFound);

        return app;
    }

    private static async Task<Results<Created<UploadedImage>, ProblemHttpResult>> Upload(
        IFormFile file,
        IImageStore images,
        CancellationToken ct
    )
    {
        if (file.Length == 0)
            return Problem(
                StatusCodes.Status400BadRequest,
                "Empty upload",
                "The uploaded file contained no data.",
                "image_empty"
            );

        await using var stream = file.OpenReadStream();
        var stored = await images.Store(stream, file.ContentType, ct);

        if (stored.IsFailure)
            return stored.Error switch
            {
                ImageStoreError.UnsupportedMediaType e => Problem(
                    StatusCodes.Status415UnsupportedMediaType,
                    "Unsupported image type",
                    $"\"{e.MediaType}\" is not an accepted image format.",
                    "image_unsupported_media_type"
                ),
                ImageStoreError.TooLarge e => Problem(
                    StatusCodes.Status413PayloadTooLarge,
                    "Image too large",
                    $"Images are limited to {e.LimitBytes} bytes.",
                    "image_too_large"
                ),
                _ => throw new InvalidOperationException(
                    $"Unhandled {nameof(ImageStoreError)} case: {stored.Error.GetType().Name}."
                ),
            };

        var hash = stored.Value.Value;

        // 201 even when the bytes were already present: content-addressing makes a re-upload a
        // no-op that ends in the same state, and reporting it differently would tell the caller
        // something about other callers' uploads.
        return TypedResults.Created($"/api/images/{hash}", new UploadedImage(hash));
    }

    private static async Task<IResult> Download(
        string hash,
        IImageStore images,
        HttpContext http,
        CancellationToken ct
    )
    {
        // A malformed address names nothing, which is what 404 says. Distinguishing it from an
        // unknown-but-well-formed one would only tell a prober how to spell a hash.
        if (!ContentHash.Create(hash).TryGetValue(out var contentHash))
            return NotFound();

        var content = await images.OpenRead(contentHash, ct);
        if (content is null)
            return NotFound();

        // The URL *is* the content, so it can never go stale: different bytes are a different
        // address. This is the one place `immutable` is honest — static assets under /static keep
        // their names across deploys and must revalidate instead.
        http.Response.Headers.CacheControl = "public, max-age=31536000, immutable";

        return Results.Stream(content.Bytes, content.MediaType, enableRangeProcessing: true);
    }

    private static ProblemHttpResult NotFound() =>
        TypedResults.Problem(
            statusCode: StatusCodes.Status404NotFound,
            title: "Image not found",
            detail: "No image is stored at that address.",
            extensions: new Dictionary<string, object?> { ["code"] = "image_not_found" }
        );

    private static ProblemHttpResult Problem(
        int status,
        string title,
        string detail,
        string code
    ) =>
        TypedResults.Problem(
            statusCode: status,
            title: title,
            detail: detail,
            extensions: new Dictionary<string, object?> { ["code"] = code }
        );
}

public sealed record UploadedImage(string Hash);
