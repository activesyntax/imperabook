using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application;

public sealed record BookListItem
{
    public required Guid Id { get; init; }
    public required string Title { get; init; }
    public string? Subtitle { get; init; }
    public required IReadOnlyList<Guid> AuthorIds { get; init; }
    public Guid? LibraryId { get; init; }
}

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
