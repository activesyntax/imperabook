using CSharpFunctionalExtensions;

namespace ImperaBook.Domain.Catalog;

public readonly record struct Title
{
    public const int MaxLength = 500;

    public string Value { get; }

    private Title(string value) => Value = value;

    public static Result<Title, DomainValidationError> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => new DomainValidationError.TitleRequired(),
            TextRules.Checked.TooLong => new DomainValidationError.TitleTooLong(MaxLength),
            TextRules.Checked.Valid v => new Title(v.Value),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case."),
        };
}

public readonly record struct Subtitle
{
    public const int MaxLength = 500;

    public string Value { get; }

    private Subtitle(string value) => Value = value;

    public static Result<Maybe<Subtitle>, DomainValidationError> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => Maybe<Subtitle>.None,
            TextRules.Checked.TooLong => new DomainValidationError.SubtitleTooLong(MaxLength),
            TextRules.Checked.Valid v => Maybe<Subtitle>.From(new Subtitle(v.Value)),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case."),
        };
}

public readonly record struct Summary
{
    public const int MaxLength = 4000;

    public string Value { get; }

    private Summary(string value) => Value = value;

    public static Result<Maybe<Summary>, DomainValidationError> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => Maybe<Summary>.None,
            TextRules.Checked.TooLong => new DomainValidationError.SummaryTooLong(MaxLength),
            TextRules.Checked.Valid v => Maybe<Summary>.From(new Summary(v.Value)),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case."),
        };
}

public readonly record struct LibraryName
{
    public const int MaxLength = 200;

    public string Value { get; }

    private LibraryName(string value) => Value = value;

    public static Result<LibraryName, DomainValidationError> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => new DomainValidationError.LibraryNameRequired(),
            TextRules.Checked.TooLong => new DomainValidationError.LibraryNameTooLong(MaxLength),
            TextRules.Checked.Valid v => new LibraryName(v.Value),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case."),
        };
}
