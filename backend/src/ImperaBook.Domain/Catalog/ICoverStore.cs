using CSharpFunctionalExtensions;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application.Covers;

public interface ICoverStore
{
    Task<Maybe<Cover>> Find(ContentHash hash, CancellationToken ct);
}
