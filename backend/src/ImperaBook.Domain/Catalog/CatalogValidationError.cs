namespace ImperaBook.Domain.Catalog;

public abstract record CatalogValidationError
{
    private CatalogValidationError() { }

    public sealed record TitleRequired : CatalogValidationError;

    public sealed record TitleTooLong(int MaxLength) : CatalogValidationError;

    public sealed record SubtitleRequired : CatalogValidationError;

    public sealed record SubtitleTooLong(int MaxLength) : CatalogValidationError;

    public sealed record SummaryTooLong(int MaxLength) : CatalogValidationError;

    public sealed record NameRequired : CatalogValidationError;

    public sealed record NameTooLong(int MaxLength) : CatalogValidationError;

    public sealed record LibraryNameRequired : CatalogValidationError;

    public sealed record LibraryNameTooLong(int MaxLength) : CatalogValidationError;
}
