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

    /// <summary>
    /// Several authors match a book's "by author" text: a warning, then one line per candidate
    /// with its life range, since two authors can share a name.
    /// </summary>
    public static IReadOnlyList<ViewNode> Choices(
        string search,
        IReadOnlyList<AuthorListItem> matches
    ) =>
        [
            new MessageView(
                $"\"{search}\" matches {matches.Count} authors. Nothing was added — make the "
                    + "author more specific, or type one of these names in full:",
                MessageKind.Warning
            ),
            new TextView(matches.Select(Choice).ToArray()),
        ];

    private static TextBlock Choice(AuthorListItem a)
    {
        var lifeRange = a.LifeRange();

        return string.IsNullOrEmpty(lifeRange)
            ? new Paragraph([new StrongRun([a.DisplayName()])])
            : new Paragraph([new StrongRun([a.DisplayName()]), $" ({lifeRange})"]);
    }

    private static ItemView ToItem(AuthorListItem a)
    {
        var properties = new List<ItemProperty>
        {
            new("Name", a.DisplayName(), PropertyRole.Primary),
            new("LifeRange", a.LifeRange(), PropertyRole.Secondary),
        };

        return new ItemView(Ref: a.Id.ToString(), Properties: properties, ImageSrc: a.ImageSrc());
    }

    internal static string DisplayName(this AuthorListItem a) =>
        string.IsNullOrWhiteSpace(a.FirstName) ? a.LastName : $"{a.FirstName} {a.LastName}";

    private static string? ImageSrc(this AuthorListItem a) =>
        a.PortraitHash is { } hash ? $"/api/images/{hash}" : null;

    internal static string LifeRange(this AuthorListItem a) =>
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
