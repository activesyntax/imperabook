using CSharpFunctionalExtensions;

namespace ImperaBook.Domain.Catalog;

/// <summary>
/// A BlurHash string: a compact, base83-encoded summary of an image, decoded client-side into a
/// blurred placeholder while the real bytes load. Derived from the cover at upload time and
/// immutable with it.
/// </summary>
public readonly record struct Blurhash
{
    private const string Base83Alphabet =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~";

    /// <summary>Shortest legal BlurHash: a 1x1 component grid. 4 header characters + 2 per component.</summary>
    public const int MinLength = 6;

    /// <summary>Longest legal BlurHash: a 9x9 component grid, the maximum the size flag can encode.</summary>
    public const int MaxLength = 166;

    public string Value { get; }

    private Blurhash(string value) => Value = value;

    public static Result<Blurhash, CatalogValidationError> Create(string? raw)
    {
        if (string.IsNullOrWhiteSpace(raw))
            return new CatalogValidationError.BlurhashRequired();

        var candidate = raw.Trim();

        if (candidate.Length is < MinLength or > MaxLength)
            return new CatalogValidationError.BlurhashMalformed();

        foreach (var c in candidate)
        {
            if (!Base83Alphabet.Contains(c))
                return new CatalogValidationError.BlurhashMalformed();
        }

        // The first character encodes the component grid, which fixes the exact expected length.
        // Checking it turns "plausible-looking string" into "structurally decodable BlurHash".
        var sizeFlag = Base83Alphabet.IndexOf(candidate[0]);
        var componentsY = (sizeFlag / 9) + 1;
        var componentsX = (sizeFlag % 9) + 1;
        var expectedLength = 4 + (2 * componentsX * componentsY);

        if (candidate.Length != expectedLength)
            return new CatalogValidationError.BlurhashMalformed();

        return new Blurhash(candidate);
    }

    public override string ToString() => Value;
}
