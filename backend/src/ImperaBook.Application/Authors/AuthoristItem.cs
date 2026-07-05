namespace ImperaBook.Application.Authors;

// TODO: use maybe<string> for first name
public sealed record AuthorListItem
{
    public required Guid Id { get; init; }
    public string? FirstName { get; init; }
    public required string LastName { get; init; }
}
