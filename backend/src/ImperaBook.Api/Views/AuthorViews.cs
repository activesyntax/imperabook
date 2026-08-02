using ImperaBook.Application.Authors;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

public static class AuthorViews
{
    public static CommandResult ToCommandResult(this IReadOnlyList<AuthorListItem> authors) =>
        new(new ViewNode[] { new ItemCollectionView(authors.Select(ToItem).ToArray()) });

    private static ItemView ToItem(AuthorListItem a)
    {
        var name = string.IsNullOrWhiteSpace(a.FirstName)
            ? a.LastName
            : $"{a.FirstName} {a.LastName}";

        var properties = new List<ItemProperty> { new("Name", name, PropertyRole.Primary) };

        return new ItemView(Ref: a.Id.ToString(), Properties: properties);
    }
}
