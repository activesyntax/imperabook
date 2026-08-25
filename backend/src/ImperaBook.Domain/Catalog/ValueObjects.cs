using CSharpFunctionalExtensions;

namespace ImperaBook.Domain.Catalog;

public readonly record struct Title
{
    public const int MaxLength = 500;

    public string Value { get; }

    private Title(string value) => Value = value;

    public static Result<Title, CatalogValidationError> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => new CatalogValidationError.TitleRequired(),
            TextRules.Checked.TooLong => new CatalogValidationError.TitleTooLong(MaxLength),
            TextRules.Checked.Valid v => new Title(v.Value),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case."),
        };
}

public readonly record struct Subtitle
{
    public const int MaxLength = 500;

    public string Value { get; }

    private Subtitle(string value) => Value = value;

    public static Result<Maybe<Subtitle>, CatalogValidationError> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => Maybe<Subtitle>.None,
            TextRules.Checked.TooLong => new CatalogValidationError.SubtitleTooLong(MaxLength),
            TextRules.Checked.Valid v => Maybe<Subtitle>.From(new Subtitle(v.Value)),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case."),
        };
}

public readonly record struct Summary
{
    public const int MaxLength = 4000;

    public string Value { get; }

    private Summary(string value) => Value = value;

    public static Result<Maybe<Summary>, CatalogValidationError> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => Maybe<Summary>.None,
            TextRules.Checked.TooLong => new CatalogValidationError.SummaryTooLong(MaxLength),
            TextRules.Checked.Valid v => Maybe<Summary>.From(new Summary(v.Value)),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case."),
        };
}

public readonly record struct LibraryName
{
    public const int MaxLength = 200;

    public string Value { get; }

    private LibraryName(string value) => Value = value;

    public static Result<LibraryName, CatalogValidationError> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => new CatalogValidationError.LibraryNameRequired(),
            TextRules.Checked.TooLong => new CatalogValidationError.LibraryNameTooLong(MaxLength),
            TextRules.Checked.Valid v => new LibraryName(v.Value),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case."),
        };
}

public readonly record struct Publisher
{
    public const int MaxLength = 200;

    public string Value { get; }

    private Publisher(string value) => Value = value;

    public static Result<Maybe<Publisher>, CatalogValidationError> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => Maybe<Publisher>.None,
            TextRules.Checked.TooLong => new CatalogValidationError.PublisherTooLong(MaxLength),
            TextRules.Checked.Valid v => Maybe<Publisher>.From(new Publisher(v.Value)),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case."),
        };
}

public readonly record struct LanguageCode
{
    /// <summary>ISO 639-1 alpha-2. Fixed width, so <c>MaxLength</c> is a ceiling the shape check
    /// shares with every other text rule; the exact-length rule below is this type's own.</summary>
    public const int MaxLength = 2;

    public string Value { get; }

    private LanguageCode(string value) => Value = value;

    public static Result<Maybe<LanguageCode>, CatalogValidationError> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => Maybe<LanguageCode>.None,
            TextRules.Checked.TooLong => new CatalogValidationError.LanguageCodeInvalid(),
            TextRules.Checked.Valid v => FromChecked(v.Value),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case."),
        };

    private static Result<Maybe<LanguageCode>, CatalogValidationError> FromChecked(string s)
    {
        if (s.Length != MaxLength)
            return new CatalogValidationError.LanguageCodeInvalid();

        var lower = s.ToLowerInvariant();

        return char.IsAsciiLetterLower(lower[0]) && char.IsAsciiLetterLower(lower[1])
            ? Maybe<LanguageCode>.From(new LanguageCode(lower))
            : new CatalogValidationError.LanguageCodeInvalid();
    }
}

public readonly record struct Isbn
{
    /// <summary>13 digits plus at most four separators.</summary>
    public const int MaxLength = 17;

    /// <summary>Canonical form: 13 digits, no separators.</summary>
    public string Value { get; }

    private Isbn(string value) => Value = value;

    public static Result<Maybe<Isbn>, CatalogValidationError> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => Maybe<Isbn>.None,
            TextRules.Checked.TooLong => new CatalogValidationError.IsbnInvalid(),
            TextRules.Checked.Valid v => Canonicalize(v.Value),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case."),
        };

    /// <summary>
    /// Hyphenation is presentation and ISBN-10 is a narrower encoding of the same number, so both
    /// collapse onto the 13-digit form. This is a choice between equivalent representations of one
    /// value — not conversion from another type.
    /// </summary>
    private static Result<Maybe<Isbn>, CatalogValidationError> Canonicalize(string s)
    {
        var stripped = Strip(s);

        return stripped.Length switch
        {
            10 when IsValid10(stripped) => Maybe<Isbn>.From(new Isbn(Widen(stripped))),
            13 when IsValid13(stripped) => Maybe<Isbn>.From(new Isbn(stripped)),
            _ => new CatalogValidationError.IsbnInvalid(),
        };
    }

    private static string Strip(string s)
    {
        Span<char> buffer = stackalloc char[s.Length];
        var n = 0;

        foreach (var c in s)
        {
            if (c is '-' or ' ')
                continue;
            buffer[n++] = char.ToUpperInvariant(c);
        }

        return new string(buffer[..n]);
    }

    private static bool IsValid10(string s)
    {
        var sum = 0;

        for (var i = 0; i < 9; i++)
        {
            if (!char.IsAsciiDigit(s[i]))
                return false;
            sum += (s[i] - '0') * (10 - i);
        }

        var last = s[9];
        var check =
            last == 'X' ? 10
            : char.IsAsciiDigit(last) ? last - '0'
            : -1;

        return check >= 0 && (sum + check) % 11 == 0;
    }

    private static bool IsValid13(string s)
    {
        foreach (var c in s)
            if (!char.IsAsciiDigit(c))
                return false;

        // Every ISBN-13 is an EAN-13 in the Bookland prefix range.
        if (
            !s.StartsWith("978", StringComparison.Ordinal)
            && !s.StartsWith("979", StringComparison.Ordinal)
        )
            return false;

        return CheckDigit13(s.AsSpan(0, 12)) == s[12];
    }

    private static string Widen(string isbn10)
    {
        var first12 = string.Concat("978", isbn10.AsSpan(0, 9));
        return first12 + CheckDigit13(first12);
    }

    private static char CheckDigit13(ReadOnlySpan<char> first12)
    {
        var sum = 0;

        for (var i = 0; i < 12; i++)
            sum += (first12[i] - '0') * (i % 2 == 0 ? 1 : 3);

        return (char)('0' + (10 - sum % 10) % 10);
    }

    public override string ToString() => Value;
}

public readonly record struct PageCount
{
    public const uint Max = 20_000;

    public uint Value { get; }

    private PageCount(uint value) => Value = value;

    public static Result<PageCount, CatalogValidationError> Create(uint value) =>
        value is 0 or > Max
            ? new CatalogValidationError.PageCountOutOfRange(1, (int)Max)
            : new PageCount(value);

    public override string ToString() => Value.ToString();

    public static explicit operator uint(PageCount pages) => pages.Value;
}

public readonly record struct Year
{
    public const int MinValue = -3000;
    public const int MaxValue = 2200;

    public int Value { get; }

    private Year(int value) => Value = value;

    public static Result<Year, CatalogValidationError> Create(int value) =>
        value is < MinValue or > MaxValue
            ? new CatalogValidationError.YearOutOfRange(MinValue, MaxValue)
            : new Year(value);

    public override string ToString() => Value.ToString();

    public static explicit operator int(Year year) => year.Value;
}
