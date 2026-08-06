using ImperaBook.Application;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

public static class BookViews
{
    public static CommandResult ToCommandResult(
        this IReadOnlyList<BookListItem> books,
        string title,
        string emptyMessage,
        PageInfo? page = null
    ) =>
        new(
            new ViewNode[]
            {
                new ItemCollectionView(title, emptyMessage, books.Select(ToItem).ToArray(), page),
            }
        );

    private static ItemView ToItem(BookListItem b)
    {
        var properties = new List<ItemProperty> { new("Title", b.Title, PropertyRole.Primary) };

        if (b.AuthorNames.Count > 0)
            properties.Add(new("Author", string.Join(", ", b.AuthorNames), PropertyRole.Secondary));

        if (!string.IsNullOrWhiteSpace(b.Subtitle))
            properties.Add(new("Subtitle", b.Subtitle, PropertyRole.Secondary));

        return new ItemView(Ref: b.Id.ToString(), Properties: properties, ImageSrc: ImageSrcOf(b));
    }

    private static string? ImageSrcOf(BookListItem b) =>
        b.CoverHash is { } hash ? $"/api/images/{hash}" : null;
}
