using CSharpFunctionalExtensions;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Domain.Tests;

[Trait("Category", "Unit")]
public class AggregatesTests
{
    private const string SampleHash =
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

    private static ContentHash SampleCover() => ContentHash.Create(SampleHash).Value;

    [Fact]
    public void Book_carries_every_component_it_was_given()
    {
        var id = Id<Book>.New();
        var library = Id<Library>.New();
        var title = Title.Create("Dune").Value;
        var subtitle = Subtitle.Create("The Spice Must Flow").Value;
        var summary = Summary.Create("A book about Dune.").Value;
        var attribution = Attribution.Of(Authors.Create([Id<Author>.New()]));
        var cover = SampleCover();
        var isbn = Isbn.Create("978-0-441-01359-3").Value;
        var published = Year.Create(1965).Value;
        var publisher = Publisher.Create("Chilton Books").Value;
        var language = LanguageCode.Create("en").Value;
        var pages = PageCount.Create(412).Value;

        var book = new Book
        {
            Id = id,
            Library = library,
            Title = title,
            Subtitle = subtitle,
            Attribution = attribution,
            Summary = summary,
            Cover = cover,
            Isbn = isbn,
            Published = published,
            Publisher = publisher,
            Language = language,
            Pages = pages,
        };

        Assert.Equal(id, book.Id);
        Assert.Equal(library, book.Library);
        Assert.Equal(title, book.Title);
        Assert.Equal(subtitle, book.Subtitle.Value);
        Assert.Equal(summary, book.Summary.Value);
        Assert.Equal(attribution, book.Attribution);
        Assert.Equal(cover, book.Cover.Value);
        Assert.Equal(isbn, book.Isbn.Value);
        Assert.Equal(published, book.Published.Value);
        Assert.Equal(publisher, book.Publisher.Value);
        Assert.Equal(language, book.Language.Value);
        Assert.Equal(pages, book.Pages.Value);
    }

    /// <summary>
    /// Every optional field is left unset. The assertion is that an unset <c>Maybe</c> is
    /// <c>None</c> rather than a zero-valued instance — the property the object initializer form
    /// relies on, and the one that would break silently if <c>Maybe</c> ever stopped being a
    /// struct whose default is empty.
    /// </summary>
    [Fact]
    public void Book_omitting_every_optional_field_yields_None_throughout()
    {
        var book = new Book
        {
            Id = Id<Book>.New(),
            Library = Id<Library>.New(),
            Title = Title.Create("Dune").Value,
            Attribution = Attribution.Of(Authors.Create([Id<Author>.New()])),
        };

        Assert.Equal(Maybe<Subtitle>.None, book.Subtitle);
        Assert.Equal(Maybe<Summary>.None, book.Summary);
        Assert.Equal(Maybe<ContentHash>.None, book.Cover);
        Assert.Equal(Maybe<Isbn>.None, book.Isbn);
        Assert.Equal(Maybe<Year>.None, book.Published);
        Assert.Equal(Maybe<Publisher>.None, book.Publisher);
        Assert.Equal(Maybe<LanguageCode>.None, book.Language);
        Assert.Equal(Maybe<PageCount>.None, book.Pages);
    }

    /// <summary>
    /// Attribution is the one optional-looking field that is not a <c>Maybe</c>: an omitted
    /// attribution is <c>Unknown</c>, a positive domain statement (ADR 11).
    /// </summary>
    [Fact]
    public void Book_without_attribution_is_Unknown_rather_than_absent()
    {
        var book = new Book
        {
            Id = Id<Book>.New(),
            Library = Id<Library>.New(),
            Title = Title.Create("Beowulf").Value,
        };

        Assert.IsType<Attribution.Unknown>(book.Attribution);
    }

    [Fact]
    public void Author_Create_allows_optional_first_name()
    {
        var id = Id<Author>.New();
        var ownerId = Id<User>.New();
        var last = PersonName.Create("Tolkien").Value;
        var lifeRange = LifeRange.Create(Year.Create(1892).Value, new Vitality.Living()).Value;
        var portrait = Maybe<ContentHash>.None;

        var author = Author.Create(
            id,
            ownerId,
            firstName: Maybe<PersonName>.None,
            last,
            lifeRange,
            portrait
        );

        Assert.Equal(id, author.Id);
        Assert.Equal(Maybe<PersonName>.None, author.FirstName);
        Assert.Equal(last, author.LastName);
    }

    [Fact]
    public void User_Create_exposes_components()
    {
        var id = Id<User>.New();
        var first = PersonName.Create("Jane").Value;
        var last = PersonName.Create("Doe").Value;

        var user = User.Create(id, first, last);

        Assert.Equal(id, user.Id);
        Assert.Equal(first, user.FirstName);
        Assert.Equal(last, user.LastName);
    }

    [Fact]
    public void Library_Create_exposes_owner_id_and_name()
    {
        var ownerId = Id<User>.New();
        var name = LibraryName.Create("Home Library").Value;

        var library = Library.Create(Id<Library>.New(), ownerId, name);

        Assert.Equal(ownerId, library.OwnerId);
        Assert.Equal(name, library.Name);
    }
}
