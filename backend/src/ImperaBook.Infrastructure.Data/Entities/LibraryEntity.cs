namespace ImperaBook.Infrastructure.Data.Entities;

public class LibraryEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; } = "";
    public Guid OwnerId { get; set; }
}
