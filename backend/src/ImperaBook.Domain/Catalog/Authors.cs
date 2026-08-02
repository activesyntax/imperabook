using CSharpFunctionalExtensions;

namespace ImperaBook.Domain.Catalog;

public sealed record Authors
{
    public Id<Author> Primary { get; }
    public IReadOnlyList<Id<Author>> Rest { get; }

    private Authors(Id<Author> primary, IReadOnlyList<Id<Author>> rest)
    {
        Primary = primary;
        Rest = rest;
    }

    public static Maybe<Authors> Create(IEnumerable<Id<Author>> ids)
    {
        var distinct = ids.Distinct().ToList();
        return distinct.Count == 0
            ? Maybe<Authors>.None
            : new Authors(distinct[0], distinct.Skip(1).ToList());
    }

    public IReadOnlyList<Id<Author>> ToList()
    {
        var all = new List<Id<Author>>(Rest.Count + 1) { Primary };
        all.AddRange(Rest);
        return all;
    }
}
