using ImperaBook.Application.Books.ReadModel;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

public static class BookViews
{
    public static CommandResult ToCommandResult(this IReadOnlyList<BookListItem> books) =>
        new(new ViewNode[] { new ItemCollectionView(books.Select(ToItem).ToArray()) });

    private static ItemView ToItem(BookListItem b)
    {
        var properties = new List<ItemProperty> { new("Title", b.Title, PropertyRole.Primary) };

        // Author join formatting lives here, not in the query (DECISIONS 8 / 15): the read
        // model carries names as data, the wire shape decides how they read. Empty until the
        // author feature lands — AuthorNames is [] from BookQueries today, so the property is
        // absent rather than blank.
        if (b.AuthorNames.Count > 0)
            properties.Add(new("Author", string.Join(", ", b.AuthorNames), PropertyRole.Secondary));

        if (!string.IsNullOrWhiteSpace(b.Subtitle))
            properties.Add(new("Subtitle", b.Subtitle, PropertyRole.Secondary));

        return new ItemView(Ref: b.Id.ToString(), Properties: properties);
    }
}
