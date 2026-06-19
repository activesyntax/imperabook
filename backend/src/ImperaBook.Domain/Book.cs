namespace ImperaBook.Domain;

public sealed record Book
{
    public Id<Book> Id { get; }
    public Title Title { get; }
    public Subtitle? Subtitle { get; }
    public Summary? Summary { get; }
    public Attribution Attribution { get; }
    public Location Location { get; }

    private Book(
        Id<Book> id,
        Title title,
        Subtitle? subtitle,
        Summary? summary,
        Attribution attribution,
        Location location)
    {
        Id = id;
        Title = title;
        Subtitle = subtitle;
        Summary = summary;
        Attribution = attribution;
        Location = location;
    }

    public static Book Create(
        Id<Book> id,
        Title title,
        Subtitle? subtitle,
        Summary? summary,
        Attribution attribution,
        Location location) =>
        new(id, title, subtitle, summary, attribution, location);
}
