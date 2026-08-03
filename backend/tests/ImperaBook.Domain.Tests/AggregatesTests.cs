using CSharpFunctionalExtensions;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Domain.Tests;

[Trait("Category", "Unit")]
public class AggregatesTests
{
    private const string SampleHash =
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
    private const string SampleBlurhash = "LEHV6nWB2yk8pyo0adR*.7kCMdnj";

    private static ImageRef SampleCover() =>
        ImageRef.Create(
            ContentHash.Create(SampleHash).Value,
            Blurhash.Create(SampleBlurhash).Value
        );

    [Fact]
    public void Book_Create_exposes_all_components()
    {
        var id = Id<Book>.New();
        var title = Title.Create("Dune").Value;
        var subtitle = Subtitle.Create("The Spice Must Flow").Value;
        var attribution = Attribution.Of(Authors.Create(new[] { Id<Author>.New() }));
        var summary = Summary.Create("A book about Dune.").Value;
        var cover = SampleCover();

        var book = Book.Create(
            id,
            title,
            subtitle,
            summary,
            attribution,
            new Location.Unknown(),
            cover
        );

        Assert.Equal(id, book.Id);
        Assert.Equal(title, book.Title);
        Assert.Equal(subtitle, book.Subtitle.Value);
        Assert.Equal(summary, book.Summary.Value);
        Assert.Equal(attribution, book.Attribution);
        Assert.IsType<Location.Unknown>(book.Location);
        Assert.Equal(cover, book.Cover.Value);
    }

    [Fact]
    public void Book_Create_allows_absent_cover()
    {
        var book = Book.Create(
            Id<Book>.New(),
            Title.Create("Dune").Value,
            Maybe<Subtitle>.None,
            Maybe<Summary>.None,
            Attribution.Of(Authors.Create(new[] { Id<Author>.New() })),
            new Location.Unknown(),
            Maybe<ImageRef>.None
        );

        Assert.Equal(Maybe<ImageRef>.None, book.Cover);
    }

    [Fact]
    public void Author_Create_allows_optional_first_name()
    {
        var id = Id<Author>.New();
        var last = PersonName.Create("Tolkien").Value;

        var author = Author.Create(id, firstName: Maybe<PersonName>.None, last);

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
