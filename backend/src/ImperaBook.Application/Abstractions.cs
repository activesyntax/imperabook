using ImperaBook.Domain;

namespace ImperaBook.Application;

// Read model: a flat projection for the query (CQRS read) side, queried straight from the store.
// This is NOT a boundary adapter — it exists so read paths don't hydrate full aggregates just to flatten them.
public sealed record BookListItem
{
    public required Guid Id { get; init; }
    public required string Title { get; init; }
    public string? Subtitle { get; init; }
    public required IReadOnlyList<Guid> AuthorIds { get; init; }
    public Guid? LibraryId { get; init; }
}

// The write repository speaks in domain terms. Flattening Book -> persistence shape (BookEntity)
// is an Infrastructure concern; Application only hands over the aggregate.
public interface IBookWriteRepository
{
    Task Add(Book book, CancellationToken ct);
}

public interface IBookReadRepository
{
    Task<BookListItem[]> List(Guid? libraryId, string? titleContains, CancellationToken ct);
    Task<BookListItem[]> ListAll(CancellationToken ct);
    Task<BookListItem[]> ListByLibrary(Guid libraryId, CancellationToken ct);
}

public interface ILibraryRepository
{
    Task<bool> Exists(Guid id, CancellationToken ct);
}
