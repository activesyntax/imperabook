using CSharpFunctionalExtensions;

namespace ImperaBook.Domain.Catalog;

public sealed record Book
{
    public Id<Book> Id { get; }
    public Title Title { get; }
    public Maybe<Subtitle> Subtitle { get; }
    public Maybe<Summary> Summary { get; }
    public Attribution Attribution { get; }
    public Location Location { get; }
    public Maybe<Cover> Cover { get; }

    private Book(
        Id<Book> id,
        Title title,
        Maybe<Subtitle> subtitle,
        Maybe<Summary> summary,
        Attribution attribution,
        Location location,
        Maybe<Cover> cover
    )
    {
        Id = id;
        Title = title;
        Subtitle = subtitle;
        Summary = summary;
        Attribution = attribution;
        Location = location;
        Cover = cover;
    }

    public static Book Create(
        Id<Book> id,
        Title title,
        Maybe<Subtitle> subtitle,
        Maybe<Summary> summary,
        Attribution attribution,
        Location location,
        Maybe<Cover> cover
    ) => new(id, title, subtitle, summary, attribution, location, cover);
}
