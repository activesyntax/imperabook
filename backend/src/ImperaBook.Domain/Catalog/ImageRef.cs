namespace ImperaBook.Domain.Catalog;

public sealed record ImageRef
{
    public ContentHash Hash { get; }
    public Blurhash Blurhash { get; }

    private ImageRef(ContentHash hash, Blurhash blurhash)
    {
        Hash = hash;
        Blurhash = blurhash;
    }

    public static ImageRef Create(ContentHash hash, Blurhash blurhash) => new(hash, blurhash);
}
