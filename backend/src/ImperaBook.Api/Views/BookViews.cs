using ImperaBook.Application.Books;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

public static class BookViews
{
    public static CommandResult ToCommandResult(this IReadOnlyList<BookListItem> books) =>
        new(new ViewNode[] { new ItemCollectionView(books.Select(ToItem).ToArray()) });

    private static ItemView ToItem(BookListItem b)
    {
        var properties = new List<ItemProperty> { new("Title", b.Title, PropertyRole.Primary) };

        if (b.AuthorNames.Count > 0)
            properties.Add(new("Author", string.Join(", ", b.AuthorNames), PropertyRole.Secondary));

        if (!string.IsNullOrWhiteSpace(b.Subtitle))
            properties.Add(new("Subtitle", b.Subtitle, PropertyRole.Secondary));

        return new ItemView(Ref: b.Id.ToString(), Properties: properties, Image: ImageOf(b));
    }

    private static ImageSource? ImageOf(BookListItem b) =>
        b is { CoverHash: { } hash, CoverBlurhash: { } blurhash }
            ? new ImageSource.CoverImage(hash, blurhash)
            : null;
}
