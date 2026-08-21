using CSharpFunctionalExtensions;

namespace ImperaBook.Domain.Catalog;

public sealed record Book
{
    public Id<Book> Id { get; }
    public Title Title { get; }
    public Maybe<Subtitle> Subtitle { get; }
    public Maybe<Summary> Summary { get; }
    public Attribution Attribution { get; }
    public Maybe<ContentHash> Cover { get; }
    public Id<Library> Library { get; }

    private Book(
        Id<Book> id,
        Title title,
        Maybe<Subtitle> subtitle,
        Maybe<Summary> summary,
        Attribution attribution,
        Maybe<ContentHash> cover,
        Id<Library> libraryId
    )
    {
        Id = id;
        Title = title;
        Subtitle = subtitle;
        Summary = summary;
        Attribution = attribution;
        Cover = cover;
        Library = libraryId;
    }

    public static Book Create(
        Id<Book> id,
        Title title,
        Maybe<Subtitle> subtitle,
        Maybe<Summary> summary,
        Attribution attribution,
        Maybe<ContentHash> cover,
        Id<Library> libraryId
    ) => new(id, title, subtitle, summary, attribution, cover, libraryId);
}
