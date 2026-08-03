using CSharpFunctionalExtensions;
using ImperaBook.Application.Images;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Infrastructure.Data.Images;

/// <summary>
/// Placeholder until the imaging dependency is chosen. Returns None, so Store() reports
/// Undecodable for every upload — the upload path is closed, loudly, rather than silently
/// storing images without placeholders.
/// </summary>
public sealed class UnavailableBlurhashEncoder : IBlurhashEncoder
{
    public Maybe<Blurhash> Encode(byte[] imageBytes) => Maybe<Blurhash>.None;
}
