using CSharpFunctionalExtensions;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application.Images;

public interface IImageStore
{
    Task<Maybe<ImageRef>> Find(ContentHash hash, CancellationToken ct);
    Task<Maybe<ImageContent>> OpenRead(ContentHash hash, CancellationToken ct);
    Task<Result<ImageRef, ImageStoreError>> Store(
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

    public sealed record Undecodable : ImageStoreError;
}

public interface IBlurhashEncoder
{
    Maybe<Blurhash> Encode(byte[] imageBytes);
}
