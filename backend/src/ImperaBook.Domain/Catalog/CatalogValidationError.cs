namespace ImperaBook.Domain.Catalog;

public abstract record CatalogValidationError
{
    private CatalogValidationError() { }

    public sealed record AuthorRequired : CatalogValidationError;

    public sealed record TitleRequired : CatalogValidationError;

    public sealed record TitleTooLong(int MaxLength) : CatalogValidationError;

    public sealed record SubtitleRequired : CatalogValidationError;

    public sealed record SubtitleTooLong(int MaxLength) : CatalogValidationError;

    public sealed record SummaryTooLong(int MaxLength) : CatalogValidationError;

    public sealed record NameRequired : CatalogValidationError;

    public sealed record NameTooLong(int MaxLength) : CatalogValidationError;

    public sealed record LibraryNameRequired : CatalogValidationError;

    public sealed record LibraryNameTooLong(int MaxLength) : CatalogValidationError;

    public sealed record ContentHashRequired : CatalogValidationError;

    public sealed record ContentHashMalformed(int ExpectedLength) : CatalogValidationError;

    public sealed record YearOutOfRange(int Min, int Max) : CatalogValidationError;

    public sealed record DeathBeforeBirth(int Birth, int Death) : CatalogValidationError;

    public sealed record IsbnInvalid : CatalogValidationError;

    public sealed record LanguageCodeInvalid : CatalogValidationError;

    public sealed record PublisherTooLong(int Max) : CatalogValidationError;

    public sealed record PageCountInvalid : CatalogValidationError;

    public sealed record PageCountOutOfRange(int Min, int Max) : CatalogValidationError;

    public sealed record NotANumber(string s) : CatalogValidationError;
}
