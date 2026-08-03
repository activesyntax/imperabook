using CSharpFunctionalExtensions;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application.Images;

public interface IImageStore
{
    Task<Maybe<ImageRef>> Find(ContentHash hash, CancellationToken ct);
}
