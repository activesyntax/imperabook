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
        var properties = new List<ItemProperty>
        {
            new("Title", b.Title, PropertyRole.Primary),
            new(
                b.Authors.Count > 1 ? "Authors" : "Author",
                AuthorValue(b.Authors),
                PropertyRole.Secondary
            ),
        };

        // if (!string.IsNullOrWhiteSpace(b.Subtitle))
        //     properties.Add(new("Subtitle", b.Subtitle, PropertyRole.Secondary));

        return new ItemView(Ref: b.Id.ToString(), Properties: properties, ImageSrc: ImageSrcOf(b));
    }

    private static string AuthorValue(IReadOnlyList<BookListAuthor> authors) =>
        authors.Count == 0 ? "Unknown" : string.Join(", ", authors.Select(FullName));

    private static string FullName(BookListAuthor a) =>
        string.IsNullOrWhiteSpace(a.FirstName) ? a.LastName : $"{a.FirstName} {a.LastName}";

    private static string? ImageSrcOf(BookListItem b) =>
        b.CoverHash is { } hash ? $"/api/images/{hash}" : null;
}
