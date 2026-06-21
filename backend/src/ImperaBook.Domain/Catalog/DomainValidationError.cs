namespace ImperaBook.Domain.Catalog;

public abstract record DomainValidationError
{
    private DomainValidationError() { }

    public sealed record TitleRequired : DomainValidationError;

    public sealed record TitleTooLong(int MaxLength) : DomainValidationError;

    public sealed record SubtitleRequired : DomainValidationError;

    public sealed record SubtitleTooLong(int MaxLength) : DomainValidationError;

    public sealed record SummaryTooLong(int MaxLength) : DomainValidationError;

    public sealed record NameRequired : DomainValidationError;

    public sealed record NameTooLong(int MaxLength) : DomainValidationError;

    public sealed record LibraryNameRequired : DomainValidationError;

    public sealed record LibraryNameTooLong(int MaxLength) : DomainValidationError;
}
