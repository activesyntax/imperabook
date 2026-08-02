using CSharpFunctionalExtensions;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Domain.Tests;

[Trait("Category", "Unit")]
public class AttributionTests
{
    [Fact]
    public void Of_none_is_Unknown() =>
        Assert.IsType<Attribution.Unknown>(Attribution.Of(Maybe<Authors>.None));

    [Fact]
    public void Of_authors_is_ByAuthors_preserving_the_list()
    {
        var a = Id<Author>.New();
        var b = Id<Author>.New();
        var authors = Authors.Create(new[] { a, b }).Value;

        var attribution = Attribution.Of(authors);

        var byAuthors = Assert.IsType<Attribution.ByAuthors>(attribution);
        Assert.Equal(authors, byAuthors.Authors);
    }

    [Fact]
    public void AuthorIds_of_Unknown_is_empty() =>
        Assert.Empty(new Attribution.Unknown().AuthorIds());

    [Fact]
    public void AuthorIds_of_ByAuthors_returns_primary_then_rest()
    {
        var a = Id<Author>.New();
        var b = Id<Author>.New();
        var attribution = Attribution.Of(Authors.Create(new[] { a, b }));

        Assert.Equal(new[] { a, b }, attribution.AuthorIds());
    }

    [Fact]
    public void Of_is_total_over_the_Maybe()
    {
        // The point of routing construction through Maybe<Authors> rather than a raw id list:
        // there is no input for which Of has to decide what a failure means. An empty list is
        // rejected once, by Authors.Create, and never silently degrades to Unknown here.
        var a = Id<Author>.New();

        Assert.IsType<Attribution.Unknown>(
            Attribution.Of(Authors.Create(Array.Empty<Id<Author>>()))
        );
        Assert.IsType<Attribution.ByAuthors>(Attribution.Of(Authors.Create(new[] { a })));
    }
}
