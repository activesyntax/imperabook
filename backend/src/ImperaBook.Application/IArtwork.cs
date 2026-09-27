using CSharpFunctionalExtensions;
using ImperaBook.Domain;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application;

/// <summary>
/// Generates and stores artwork for a book or author added without an image, and returns its
/// content address.
/// </summary>
public interface IArtwork
{
    Task<ContentHash> Cover(Title title, CancellationToken ct);

    Task<ContentHash> Portrait(
        Maybe<PersonName> firstName,
        PersonName lastName,
        CancellationToken ct
    );
}
