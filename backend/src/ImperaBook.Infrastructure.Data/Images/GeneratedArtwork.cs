using System.Text;
using CSharpFunctionalExtensions;
using ImperaBook.Application;
using ImperaBook.Domain;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Infrastructure.Data.Images;

public sealed class GeneratedArtwork(ImageStore images) : IArtwork
{
    public Task<ContentHash> Cover(Title title, CancellationToken ct) =>
        Store(ArtworkSvg.Cover(title.Value), ct);

    public Task<ContentHash> Portrait(
        Maybe<PersonName> firstName,
        PersonName lastName,
        CancellationToken ct
    )
    {
        var name = firstName.TryGetValue(out var first)
            ? $"{first.Value} {lastName.Value}"
            : lastName.Value;

        return Store(ArtworkSvg.Portrait(name), ct);
    }

    private Task<ContentHash> Store(string svg, CancellationToken ct) =>
        images.StoreGenerated(Encoding.UTF8.GetBytes(svg), ArtworkSvg.MediaType, ct);
}
