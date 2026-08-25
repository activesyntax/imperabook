using ImperaBook.Application;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

public static class AuthorViews
{
    public static CommandResult ToCommandResult(
        this IReadOnlyList<AuthorListItem> authors,
        string emptyMessage,
        PageInfo? page = null
    ) =>
        new(
            new ViewNode[]
            {
                new HeadingView("All authors", page),
                new ItemCollectionView(authors.Select(ToItem).ToArray(), emptyMessage),
            }
        );

    private static ItemView ToItem(AuthorListItem a)
    {
        var properties = new List<ItemProperty>
        {
            new("Name", a.DisplayName(), PropertyRole.Primary),
            new("LifeRange", a.LifeRange(), PropertyRole.Secondary),
        };

        return new ItemView(Ref: a.Id.ToString(), Properties: properties, ImageSrc: a.ImageSrc());
    }

    private static string DisplayName(this AuthorListItem a) =>
        string.IsNullOrWhiteSpace(a.FirstName) ? a.LastName : $"{a.FirstName} {a.LastName}";

    private static string? ImageSrc(this AuthorListItem a) =>
        a.PortraitHash is { } hash ? $"/api/images/{hash}" : null;

    private static string LifeRange(this AuthorListItem a) =>
        a.Vitality switch
        {
            VitalityKind.Living => $"{a.BirthYear?.ToString() ?? "?"}–",
            VitalityKind.Deceased =>
                $"{a.BirthYear?.ToString() ?? "?"}–{a.DeathYear?.ToString() ?? "?"}",
            VitalityKind.Unknown when a.BirthYear is { } b => $"{b}–",
            VitalityKind.Unknown => "",
            _ => throw new InvalidOperationException($"Unmapped vitality kind: {a.Vitality}"),
        };
}
