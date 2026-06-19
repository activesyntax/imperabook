using System;

namespace ImperaBook.Domain;

public readonly record struct Title
{
    public const int MaxLength = 500;

    public string Value { get; }
    private Title(string value) => Value = value;

    public static Result<Title> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => Result<Title>.Fail(new DomainValidationError.TitleRequired()),
            TextRules.Checked.TooLong => Result<Title>.Fail(new DomainValidationError.TitleTooLong(MaxLength)),
            TextRules.Checked.Valid v => Result<Title>.Ok(new Title(v.Value)),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case.")
        };
}

public readonly record struct Subtitle
{
    public const int MaxLength = 500;

    public string Value { get; }
    private Subtitle(string value) => Value = value;

    // Blank maps to None (null), not an error — faithful to Subtitle.create returning Result<_ option, _>.
    public static Result<Subtitle?> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => Result<Subtitle?>.Ok(null),
            TextRules.Checked.TooLong => Result<Subtitle?>.Fail(new DomainValidationError.SubtitleTooLong(MaxLength)),
            TextRules.Checked.Valid v => Result<Subtitle?>.Ok(new Subtitle(v.Value)),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case.")
        };
}

public readonly record struct Summary
{
    public const int MaxLength = 4000;

    public string Value { get; }
    private Summary(string value) => Value = value;

    public static Result<Summary?> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => Result<Summary?>.Ok(null),
            TextRules.Checked.TooLong => Result<Summary?>.Fail(new DomainValidationError.SummaryTooLong(MaxLength)),
            TextRules.Checked.Valid v => Result<Summary?>.Ok(new Summary(v.Value)),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case.")
        };
}

public readonly record struct PersonName
{
    public const int MaxLength = 300;

    public string Value { get; }
    private PersonName(string value) => Value = value;

    public static Result<PersonName> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => Result<PersonName>.Fail(new DomainValidationError.NameRequired()),
            TextRules.Checked.TooLong => Result<PersonName>.Fail(new DomainValidationError.NameTooLong(MaxLength)),
            TextRules.Checked.Valid v => Result<PersonName>.Ok(new PersonName(v.Value)),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case.")
        };
}

public readonly record struct LibraryName
{
    public const int MaxLength = 200;

    public string Value { get; }
    private LibraryName(string value) => Value = value;

    public static Result<LibraryName> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => Result<LibraryName>.Fail(new DomainValidationError.LibraryNameRequired()),
            TextRules.Checked.TooLong => Result<LibraryName>.Fail(new DomainValidationError.LibraryNameTooLong(MaxLength)),
            TextRules.Checked.Valid v => Result<LibraryName>.Ok(new LibraryName(v.Value)),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case.")
        };
}
