namespace ImperaBook.Domain.Catalog;

/// <summary>
/// A book's cover artwork, held as a reference rather than as bytes: the content address of the
/// stored image plus the BlurHash derived from it. The domain never sees image data — bytes live on
/// the content channel (DECISIONS 19) and are addressed by <see cref="ContentHash"/>.
/// </summary>
/// <remarks>
/// Both members are produced by one upload operation and are immutable together: a different image
/// is a different hash and therefore a different <see cref="Cover"/>. There is no partially-covered
/// state, which is why <see cref="Blurhash"/> is required rather than optional — a cover with no
/// placeholder would be a cover that skipped half its own creation.
/// </remarks>
public sealed record Cover
{
    public ContentHash Hash { get; }
    public Blurhash Blurhash { get; }

    private Cover(ContentHash hash, Blurhash blurhash)
    {
        Hash = hash;
        Blurhash = blurhash;
    }

    /// <summary>
    /// Composes a cover from two already-validated components. Returns <see cref="Cover"/> rather
    /// than <c>Result</c> deliberately: every constraint is carried by the component types, so there
    /// is no failure case left for this constructor to report. A <c>Result</c> that can only ever be
    /// <c>Ok</c> is ceremony, and forces callers to unwrap something that cannot fail.
    /// </summary>
    public static Cover Create(ContentHash hash, Blurhash blurhash) => new(hash, blurhash);
}
