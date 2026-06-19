using System;
using Xunit;
using ImperaBook.Domain;

namespace ImperaBook.Domain.Tests;

[Trait("Category", "Unit")]
public class IdTests
{
    [Fact]
    public void From_wraps_the_supplied_guid()
    {
        var g = Guid.NewGuid();
        Assert.Equal(g, Id<Book>.From(g).Value);
    }

    [Fact]
    public void New_produces_distinct_ids() =>
        Assert.NotEqual(Id<Book>.New(), Id<Book>.New());

    [Fact]
    public void Equality_is_by_wrapped_value()
    {
        var g = Guid.NewGuid();
        Assert.Equal(Id<Book>.From(g), Id<Book>.From(g));
    }

    // Note: Id<Book> and Id<Author> are distinct closed generic types, so comparing them
    // is a compile error, not a runtime failure — that's the phantom-type guarantee, and it
    // can't be expressed as a runtime assertion here.
}
