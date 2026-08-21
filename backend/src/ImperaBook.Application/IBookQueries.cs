namespace ImperaBook.Application;

public sealed record BookListAuthor
{
    public required Guid Id { get; init; }
    public string? FirstName { get; init; }
    public required string LastName { get; init; }
}

public sealed record BookListItem
{
    public required Guid Id { get; init; }
    public required string Title { get; init; }
    public string? Subtitle { get; init; }
    public required IReadOnlyList<BookListAuthor> Authors { get; init; }
    public Guid? LibraryId { get; init; }
    public string? CoverHash { get; init; }
}

public interface IBookQueries
{
    Task<BookListItem[]> List(string? titleContains, CancellationToken ct);
}
