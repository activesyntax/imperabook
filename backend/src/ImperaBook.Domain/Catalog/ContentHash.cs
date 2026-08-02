using CSharpFunctionalExtensions;

namespace ImperaBook.Domain.Catalog;

public readonly record struct ContentHash
{
    public const int Length = 64;

    public string Value { get; }

    private ContentHash(string value) => Value = value;

    public static Result<ContentHash, CatalogValidationError> Create(string? raw)
    {
        if (string.IsNullOrWhiteSpace(raw))
            return new CatalogValidationError.ContentHashRequired();

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
