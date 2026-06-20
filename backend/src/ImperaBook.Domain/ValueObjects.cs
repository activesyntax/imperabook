#nullable enable
using ErrorOr;

namespace ImperaBook.Domain;

public readonly record struct Title
{
    public const int MaxLength = 500;

    public string Value { get; }

    private Title(string value) => Value = value;

    public static ErrorOr<Title> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => Error.Validation("Title.Required", "Title is required."),
            TextRules.Checked.TooLong => Error.Validation(
                "Title.TooLong",
                $"Title cannot exceed {MaxLength} characters."
            ),
            TextRules.Checked.Valid v => new Title(v.Value),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case."),
        };
}

public readonly record struct Subtitle
{
    public const int MaxLength = 500;

    public string Value { get; }

    private Subtitle(string value) => Value = value;

    // Blank maps cleanly to a successful null ErrorOr container
    public static ErrorOr<Subtitle?> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => (Subtitle?)null,
            TextRules.Checked.TooLong => Error.Validation(
                "Subtitle.TooLong",
                $"Subtitle cannot exceed {MaxLength} characters."
            ),
            TextRules.Checked.Valid v => new Subtitle(v.Value),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case."),
        };
}

public readonly record struct Summary
{
    public const int MaxLength = 4000;

    public string Value { get; }

    private Summary(string value) => Value = value;

    public static ErrorOr<Summary?> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => (Summary?)null,
            TextRules.Checked.TooLong => Error.Validation(
                "Summary.TooLong",
                $"Summary cannot exceed {MaxLength} characters."
            ),
            TextRules.Checked.Valid v => new Summary(v.Value),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case."),
        };
}

public readonly record struct PersonName
{
    public const int MaxLength = 300;

    public string Value { get; }

    private PersonName(string value) => Value = value;

    public static ErrorOr<PersonName> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => Error.Validation("PersonName.Required", "Name is required."),
            TextRules.Checked.TooLong => Error.Validation(
                "PersonName.TooLong",
                $"Name cannot exceed {MaxLength} characters."
            ),
            TextRules.Checked.Valid v => new PersonName(v.Value),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case."),
        };
}

public readonly record struct LibraryName
{
    public const int MaxLength = 200;

    public string Value { get; }

    private LibraryName(string value) => Value = value;

    public static ErrorOr<LibraryName> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => Error.Validation(
                "LibraryName.Required",
                "Library name is required."
            ),
            TextRules.Checked.TooLong => Error.Validation(
                "LibraryName.TooLong",
                $"Library name cannot exceed {MaxLength} characters."
            ),
            TextRules.Checked.Valid v => new LibraryName(v.Value),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case."),
        };
}
