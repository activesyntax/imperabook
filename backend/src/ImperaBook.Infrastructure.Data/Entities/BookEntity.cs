namespace ImperaBook.Infrastructure.Data.Entities;

public class BookEntity
{
    public Guid Id { get; set; }
    public string Title { get; set; } = "";
    public string? Subtitle { get; set; }
    public string? Summary { get; set; }
    public Guid LibraryId { get; set; }

    public string? CoverHash { get; set; }

    public string? Isbn { get; set; }
    public int? PublishedYear { get; set; }
    public string? Publisher { get; set; }
    public string? Language { get; set; }
    public int? PageCount { get; set; }

    public List<BookAuthorEntity> Authors { get; set; } = [];
}
