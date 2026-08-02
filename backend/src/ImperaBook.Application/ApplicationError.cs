using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application;

/// <summary>
/// Closed hierarchy — the C# analog of the F# ApplicationError DU.
/// Validation carries the accumulated list of domain errors (the payload of the
/// F# `Validation of DomainValidationError list` case).
/// </summary>
public abstract record ApplicationError
{
    private ApplicationError() { }

    public sealed record Validation(IReadOnlyList<CatalogValidationError> Errors)
        : ApplicationError;

    public sealed record LibraryNotFound(Guid LibraryId) : ApplicationError;

    public sealed record CoverNotFound(ContentHash Hash) : ApplicationError;
}
