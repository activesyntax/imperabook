namespace ImperaBook.Domain.Catalog;

public abstract record Attribution
{
    private Attribution() { }

    public sealed record Unknown : Attribution;

    public sealed record ByAuthors(Authors Authors) : Attribution;

    public static Attribution OfAuthorIds(IEnumerable<Id<Author>> ids)
    {
        var authors = Authors.Create(ids);
        return authors is null ? new Unknown() : new ByAuthors(authors);
    }

    public IReadOnlyList<Id<Author>> AuthorIds() =>
        this switch
        {
            ByAuthors b => b.Authors.ToList(),
            Unknown => Array.Empty<Id<Author>>(),
            _ => throw new InvalidOperationException("Unhandled Attribution case."),
        };
}
