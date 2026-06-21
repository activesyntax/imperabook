using ImperaBook.Domain.Catalog;

namespace ImperaBook.Domain.Tests;

[Trait("Category", "Unit")]
public class AttributionTests
{
    [Fact]
    public void OfAuthorIds_empty_is_Unknown() =>
        Assert.IsType<Attribution.Unknown>(Attribution.OfAuthorIds(Array.Empty<Id<Author>>()));

    [Fact]
    public void OfAuthorIds_nonempty_is_ByAuthors()
    {
        var id = Id<Author>.New();

        var byAuthors = Assert.IsType<Attribution.ByAuthors>(Attribution.OfAuthorIds(new[] { id }));

        Assert.Equal(id, byAuthors.Authors.Primary);
    }

    [Fact]
    public void AuthorIds_of_Unknown_is_empty() =>
        Assert.Empty(new Attribution.Unknown().AuthorIds());

    [Fact]
    public void AuthorIds_round_trips_through_OfAuthorIds()
    {
        var a = Id<Author>.New();
        var b = Id<Author>.New();

        var attribution = Attribution.OfAuthorIds(new[] { a, b });

        Assert.Equal(new[] { a, b }, attribution.AuthorIds());
    }

    [Fact]
    public void OfAuthorIds_deduplicates()
    {
        var a = Id<Author>.New();

        var attribution = Attribution.OfAuthorIds(new[] { a, a });

        Assert.Equal(new[] { a }, attribution.AuthorIds());
    }
}
