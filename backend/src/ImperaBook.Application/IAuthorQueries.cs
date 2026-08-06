namespace ImperaBook.Application;

public sealed record AuthorListItem
{
    public required Guid Id { get; init; }
    public string? FirstName { get; init; }
    public required string LastName { get; init; }
}

public interface IAuthorQueries
{
    Task<AuthorListItem[]> List(Guid? libraryId, string? query, CancellationToken ct);
}
