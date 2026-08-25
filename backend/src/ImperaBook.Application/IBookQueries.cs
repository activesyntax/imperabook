using CSharpFunctionalExtensions;

namespace ImperaBook.Application;

public sealed record BookAuthor
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
    public required IReadOnlyList<BookAuthor> Authors { get; init; }
    public string? CoverHash { get; init; }
}

public sealed record BookDetail
{
    public required Guid Id { get; init; }
    public required string Title { get; init; }
    public string? Subtitle { get; init; }
    public required IReadOnlyList<BookAuthor> Authors { get; init; }
    public string? Summary { get; init; }
    public string? CoverHash { get; init; }
    public string? Isbn { get; init; }
    public int? Published { get; init; }
    public string? Publisher { get; init; }
    public string? Language { get; init; }
    public int? Pages { get; init; }
}

public interface IBookQueries
{
    Task<BookListItem[]> List(CancellationToken ct);

    Task<Maybe<BookDetail>> Get(Guid id, CancellationToken ct);
}
