namespace ImperaBook.Application.Authors;

public sealed record AuthorListItem
{
    public required Guid Id { get; init; }
    public string? FirstName { get; init; }
    public required string LastName { get; init; }
}
