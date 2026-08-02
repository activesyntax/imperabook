using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application;

public abstract record ApplicationError
{
    private ApplicationError() { }

    public sealed record Validation(IReadOnlyList<CatalogValidationError> Errors)
        : ApplicationError;

    public sealed record LibraryNotFound(Guid LibraryId) : ApplicationError;

    public sealed record CoverNotFound(ContentHash Hash) : ApplicationError;
}
