using System.Globalization;
using ImperaBook.Application;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

public static class BookViews
{
    public static CommandResult ToCommandResult(
        this IReadOnlyList<BookListItem> books,
        string emptyMessage,
        PageInfo? page = null
    ) =>
        new(
            new ViewNode[]
            {
                new HeadingView("All books", page),
                new ItemCollectionView(books.Select(ToItem).ToArray(), emptyMessage),
            }
        );

    /// <summary>
    /// The detail of one book, composed from the same nodes every other view uses. Fields that are
    /// absent contribute no block at all rather than a block reading "—": an unset publisher is not
    /// a publisher whose name is a dash, and what an empty slot should look like is the frontend's
    /// question (ADR 20).
    /// </summary>
    public static CommandResult ToCommandResult(this BookDetail b)
    {
        var nodes = new List<ViewNode> { new HeadingView(b.Title) };

        if (ImageSrcOf(b.CoverHash) is { } src)
            nodes.Add(new ImageView(src, $"Cover of {b.Title}", ImageRole.Illustration));

        var blocks = new List<TextBlock>();

        if (!string.IsNullOrWhiteSpace(b.Subtitle))
            blocks.Add(new Paragraph([new EmphasisRun([b.Subtitle])]));

        blocks.Add(Field(b.Authors.Count > 1 ? "Authors" : "Author", AuthorValue(b.Authors)));

        AddField(blocks, "ISBN", b.Isbn);
        AddField(blocks, "Published", b.Published?.ToString(CultureInfo.InvariantCulture));
        AddField(blocks, "Publisher", b.Publisher);
        AddField(blocks, "Language", LanguageValue(b.Language));
        AddField(blocks, "Pages", b.Pages?.ToString(CultureInfo.InvariantCulture));

        if (!string.IsNullOrWhiteSpace(b.Summary))
        {
            blocks.Add(new Heading(HeadingLevel.Two, ["Summary"]));
            blocks.Add(new Paragraph([b.Summary]));
        }

        nodes.Add(new TextView(blocks));
        return new CommandResult(nodes);
    }

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

        return new ItemView(
            Ref: b.Id.ToString(),
            Properties: properties,
            ImageSrc: ImageSrcOf(b.CoverHash)
        );
    }

    private static void AddField(List<TextBlock> blocks, string label, string? value)
    {
        if (!string.IsNullOrWhiteSpace(value))
            blocks.Add(Field(label, value));
    }

    // A labelled fact is a paragraph whose label is emphasised — the closest the current block set
    // comes to a key/value pair, and enough while a detail is a short list of them.
    private static Paragraph Field(string label, string value) =>
        new([new StrongRun([label]), $" {value}"]);

    private static string AuthorValue(IReadOnlyList<BookAuthor> authors) =>
        authors.Count == 0 ? "Unknown" : string.Join(", ", authors.Select(FullName));

    private static string FullName(BookAuthor a) =>
        string.IsNullOrWhiteSpace(a.FirstName) ? a.LastName : $"{a.FirstName} {a.LastName}";

    /// <summary>
    /// An ISO 639-1 code is stored; a reader wants a language. Resolution is invariant rather than
    /// request-culture-dependent, so the same catalog reads the same way regardless of who asks —
    /// and an unrecognised code falls back to itself rather than throwing.
    /// </summary>
    private static string? LanguageValue(string? code)
    {
        if (string.IsNullOrWhiteSpace(code))
            return null;

        try
        {
            return CultureInfo.GetCultureInfo(code).EnglishName;
        }
        catch (CultureNotFoundException)
        {
            return code;
        }
    }

    private static string? ImageSrcOf(string? hash) => hash is { } h ? $"/api/images/{h}" : null;
}
