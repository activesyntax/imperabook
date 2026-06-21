using ImperaBook.Domain.Catalog;

namespace ImperaBook.Domain.Tests;

[Trait("Category", "Unit")]
public class AggregatesTests
{
    [Fact]
    public void Book_Create_exposes_all_components()
    {
        var id = Id<Book>.New();
        var title = Builders.ValidTitle("Dune");
        var subtitle = OptionAssert.ExpectSome(
            ResultAssert.ExpectOk(Subtitle.Create("The Spice Must Flow"))
        );
        var attribution = Attribution.OfAuthorIds(new[] { Id<Author>.New() });
        var book = Book.Create(
            id,
            title,
            subtitle,
            summary: null,
            attribution,
            new Location.Unknown()
        );
        Assert.Equal(id, book.Id);
        Assert.Equal(title, book.Title);
        Assert.Equal(subtitle, OptionAssert.ExpectSome(book.Subtitle));
        Assert.Null(book.Summary);
        Assert.Equal(attribution, book.Attribution);
        Assert.IsType<Location.Unknown>(book.Location);
    }

    [Fact]
    public void Author_Create_allows_optional_first_name()
    {
        var id = Id<Author>.New();
        var last = Builders.ValidName("Tolkien");
        var author = Author.Create(id, firstName: null, last);
        Assert.Equal(id, author.Id);
        Assert.Null(author.FirstName);
        Assert.Equal(last, author.LastName);
    }

    [Fact]
    public void User_Create_exposes_components()
    {
        var id = Id<User>.New();
        var first = Builders.ValidName("Jane");
        var last = Builders.ValidName("Doe");
        var user = User.Create(id, first, last);
        Assert.Equal(id, user.Id);
        Assert.Equal(first, user.FirstName);
        Assert.Equal(last, user.LastName);
    }

    [Fact]
    public void Library_Create_exposes_owner_id_and_name()
    {
        var ownerId = Id<User>.New();
        var name = ResultAssert.ExpectOk(LibraryName.Create("Home Library"));
        var library = Library.Create(Id<Library>.New(), ownerId, name);
        Assert.Equal(ownerId, library.OwnerId);
        Assert.Equal(name, library.Name);
    }
}
