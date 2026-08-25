using CSharpFunctionalExtensions;

namespace ImperaBook.Domain.Catalog;

public sealed record Book
{
    public required Id<Book> Id { get; init; }
    public required Id<Library> Library { get; init; }
    public required Title Title { get; init; }

    public Maybe<Subtitle> Subtitle { get; init; }
    public Attribution Attribution { get; init; } = new Attribution.Unknown();
    public Maybe<Summary> Summary { get; init; }
    public Maybe<ContentHash> Cover { get; init; }

    public Maybe<Isbn> Isbn { get; init; }
    public Maybe<Year> Published { get; init; }
    public Maybe<Publisher> Publisher { get; init; }
    public Maybe<LanguageCode> Language { get; init; }
    public Maybe<PageCount> Pages { get; init; }
}
