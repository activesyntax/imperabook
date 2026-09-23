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

        return TypedResults.Created($"/api/images/{hash}", new UploadedImage(hash));
    }

    private static async Task<IResult> Download(
        string hash,
        IImageStore images,
        HttpContext http,
        CancellationToken ct
    )
    {
        if (!ContentHash.Create(hash).TryGetValue(out var contentHash))
            return NotFound();

        var content = await images.OpenRead(contentHash, ct);
        if (content is null)
            return NotFound();

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
