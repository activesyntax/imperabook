using CSharpFunctionalExtensions;

namespace ImperaBook.Domain.Catalog;

/// <summary>
/// The content address of a stored blob: a lowercase hex SHA-256 digest of the bytes themselves.
/// Identity is the content, so equal hashes are the same bytes and a changed file is a new hash.
/// </summary>
public readonly record struct ContentHash
{
    /// <summary>Length of a hex-encoded SHA-256 digest. Reused by the EF Core configuration.</summary>
    public const int Length = 64;

    public string Value { get; }

    private ContentHash(string value) => Value = value;

    public static Result<ContentHash, CatalogValidationError> Create(string? raw)
    {
        if (string.IsNullOrWhiteSpace(raw))
            return new CatalogValidationError.ContentHashRequired();

        // Hex is case-insensitive by definition, so lowercasing is canonicalization, not leniency.
        // The canonical form is load-bearing: it is what goes into the cover URL and therefore what
        // the HTTP cache keys on.
        var normalized = raw.Trim().ToLowerInvariant();

        if (normalized.Length != Length || !IsHex(normalized))
            return new CatalogValidationError.ContentHashMalformed(Length);

        return new ContentHash(normalized);
    }

    private static bool IsHex(string value)
    {
        foreach (var c in value)
        {
            var isHexDigit = c is >= '0' and <= '9' or >= 'a' and <= 'f';
            if (!isHexDigit)
                return false;
        }

        return true;
    }

    public override string ToString() => Value;
}
