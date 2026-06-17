namespace ImperaBook.Infrastructure.Data.Entities;

public class BookEntity
{
    public Guid Id { get; set; }
    public string Title { get; set; } = "";
    public string? Subtitle { get; set; }
    public string? Summary { get; set; }

    // Location.Unknown -> null, Location.Library id -> the guid.
    // The DTO already flattened this for us.
    public Guid? LibraryId { get; set; }
}