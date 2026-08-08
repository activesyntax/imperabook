using ImperaBook.Application;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

public static class AuthorViews
{
    public static CommandResult ToCommandResult(
        this IReadOnlyList<AuthorListItem> authors,
        string emptyMessage,
        PageInfo? page = null,
        string? heading = null
    ) =>
        new(
            new ViewNode[]
            {
                new ItemCollectionView(
                    emptyMessage,
                    authors.Select(ToItem).ToArray(),
                    page,
                    heading
                ),
            }
        );

    private static ItemView ToItem(AuthorListItem a)
    {
        var name = string.IsNullOrWhiteSpace(a.FirstName)
            ? a.LastName
            : $"{a.FirstName} {a.LastName}";

        var properties = new List<ItemProperty> { new("Name", name, PropertyRole.Primary) };

        return new ItemView(Ref: a.Id.ToString(), Properties: properties, ImageSrc: ImageSrcOf(a));
    }

    private static string? ImageSrcOf(AuthorListItem a) =>
        a.PortraitHash is { } hash ? $"/api/images/{hash}" : null;
}
