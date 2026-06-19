using System;
using Xunit;
using ImperaBook.Domain;

namespace ImperaBook.Domain.Tests;

[Trait("Category", "Unit")]
public class AuthorsTests
{
    [Fact]
    public void Create_empty_returns_null() =>
        Assert.Null(Authors.Create(Array.Empty<Id<Author>>()));

    [Fact]
    public void Create_single_sets_primary_with_empty_rest()
    {
        var id = Id<Author>.New();

        var authors = Authors.Create(new[] { id });

        Assert.NotNull(authors);
        Assert.Equal(id, authors!.Primary);
        Assert.Empty(authors.Rest);
    }

    [Fact]
    public void Create_splits_head_and_tail_in_order()
    {
        var a = Id<Author>.New();
        var b = Id<Author>.New();
        var c = Id<Author>.New();

        var authors = Authors.Create(new[] { a, b, c })!;

        Assert.Equal(a, authors.Primary);
        Assert.Equal(new[] { b, c }, authors.Rest);
    }

    [Fact]
    public void Create_deduplicates_keeping_first_occurrence()
    {
        var a = Id<Author>.New();
        var b = Id<Author>.New();

        var authors = Authors.Create(new[] { a, b, a, b })!;

        Assert.Equal(new[] { a, b }, authors.ToList());
    }

    [Fact]
    public void ToList_round_trips_primary_then_rest()
    {
        var a = Id<Author>.New();
        var b = Id<Author>.New();

        var authors = Authors.Create(new[] { a, b })!;

        Assert.Equal(new[] { a, b }, authors.ToList());
    }
}
