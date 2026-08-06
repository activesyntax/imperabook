using CSharpFunctionalExtensions;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application;

public interface IImageStore
{
    Task<bool> Exists(ContentHash hash, CancellationToken ct);

    Task<ImageContent?> OpenRead(ContentHash hash, CancellationToken ct);

    Task<Result<ContentHash, ImageStoreError>> Store(
        Stream bytes,
        string mediaType,
        CancellationToken ct
    );
}

public sealed record ImageContent(Stream Bytes, string MediaType, long Length);

public abstract record ImageStoreError
{
    private ImageStoreError() { }

    public sealed record UnsupportedMediaType(string MediaType) : ImageStoreError;

    public sealed record TooLarge(long LimitBytes) : ImageStoreError;
}
