using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application;

public abstract record ApplicationError
{
    private ApplicationError() { }

    public sealed record Validation(IReadOnlyList<CatalogValidationError> Errors)
        : ApplicationError;

    public sealed record NoLibrary() : ApplicationError;

    public sealed record BookNotFound() : ApplicationError;

    public sealed record ImageNotFound(ContentHash Hash) : ApplicationError;

    public sealed record DuplicateAuthor(AuthorListItem Existing) : ApplicationError;

    public sealed record AmbiguousAuthor(string Search, IReadOnlyList<AuthorListItem> Matches)
        : ApplicationError;
}
