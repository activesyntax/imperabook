namespace ImperaBook.Application.Books;

public sealed record BookListItem
{
    public required Guid Id { get; init; }
    public required string Title { get; init; }
    public string? Subtitle { get; init; }

    // public required IReadOnlyList<Guid> AuthorIds { get; init; }
    public required IReadOnlyList<string> AuthorNames { get; init; }
    public Guid? LibraryId { get; init; }
    public string? CoverHash { get; init; }
}
