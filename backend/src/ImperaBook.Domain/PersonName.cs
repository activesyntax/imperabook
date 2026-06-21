using CSharpFunctionalExtensions;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Domain;

public readonly record struct PersonName
{
    public const int MaxLength = 300;

    public string Value { get; }

    private PersonName(string value) => Value = value;

    public static Result<PersonName, CatalogValidationError> Create(string? raw) =>
        TextRules.Check(MaxLength, raw) switch
        {
            TextRules.Checked.Empty => new CatalogValidationError.NameRequired(),
            TextRules.Checked.TooLong => new CatalogValidationError.NameTooLong(MaxLength),
            TextRules.Checked.Valid v => new PersonName(v.Value),
            _ => throw new InvalidOperationException("Unhandled TextRules.Checked case."),
        };
}
