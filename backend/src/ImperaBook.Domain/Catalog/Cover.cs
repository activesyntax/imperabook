namespace ImperaBook.Domain.Catalog;

public sealed record Cover
{
    public ContentHash Hash { get; }
    public Blurhash Blurhash { get; }

    private Cover(ContentHash hash, Blurhash blurhash)
    {
        Hash = hash;
        Blurhash = blurhash;
    }

    public static Cover Create(ContentHash hash, Blurhash blurhash) => new(hash, blurhash);
}
