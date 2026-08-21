namespace ImperaBook.Infrastructure.Data.Entities;

public class AuthorEntity
{
    public Guid Id { get; set; }
    public Guid OwnerId { get; set; }
    public string? FirstName { get; set; }
    public string LastName { get; set; } = "";
    public string? PortraitHash { get; set; }
}
