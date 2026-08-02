using CSharpFunctionalExtensions;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Domain.Tests;

[Trait("Category", "Unit")]
public class AuthorsTests
{
    [Fact]
    public void Create_empty_returns_none() =>
        Assert.Equal(Maybe<Authors>.None, Authors.Create(Array.Empty<Id<Author>>()));

    [Fact]
    public void Create_single_sets_primary_with_empty_rest()
    {
        var id = Id<Author>.New();

        var authors = Authors.Create(new[] { id }).Value;

        Assert.Equal(id, authors.Primary);
        Assert.Empty(authors.Rest);
    }

    [Fact]
    public void Create_splits_head_and_tail_in_order()
    {
        var a = Id<Author>.New();
        var b = Id<Author>.New();
        var c = Id<Author>.New();

        var authors = Authors.Create(new[] { a, b, c }).Value;

        Assert.Equal(a, authors.Primary);
        Assert.Equal(new[] { b, c }, authors.Rest);
    }

    [Fact]
    public void Create_deduplicates_keeping_first_occurrence()
    {
        var a = Id<Author>.New();
        var b = Id<Author>.New();

        var authors = Authors.Create(new[] { a, b, a, b }).Value;

        Assert.Equal(new[] { a, b }, authors.ToList());
    }

    [Fact]
    public void Create_survives_a_duplicate_only_input()
    {
        // Emptiness is decided after deduplication, so a list of one repeated id is a valid
        // single-author attribution rather than None.
        var a = Id<Author>.New();

        var authors = Authors.Create(new[] { a, a, a }).Value;

        Assert.Equal(a, authors.Primary);
        Assert.Empty(authors.Rest);
    }

    [Fact]
    public void ToList_round_trips_primary_then_rest()
    {
        var a = Id<Author>.New();
        var b = Id<Author>.New();

        var authors = Authors.Create(new[] { a, b }).Value;

        Assert.Equal(new[] { a, b }, authors.ToList());
    }
}
