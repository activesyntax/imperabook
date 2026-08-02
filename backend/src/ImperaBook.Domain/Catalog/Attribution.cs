using CSharpFunctionalExtensions;

namespace ImperaBook.Domain.Catalog;

public abstract record Attribution
{
    private Attribution() { }

    public sealed record Unknown : Attribution;

    public sealed record ByAuthors(Authors Authors) : Attribution;

    public static Attribution Of(Maybe<Authors> authors) =>
        authors.TryGetValue(out var a) ? new ByAuthors(a) : new Unknown();

    public IReadOnlyList<Id<Author>> AuthorIds() =>
        this switch
        {
            ByAuthors b => b.Authors.ToList(),
            Unknown => Array.Empty<Id<Author>>(),
            _ => throw new InvalidOperationException("Unhandled Attribution case."),
        };
}
