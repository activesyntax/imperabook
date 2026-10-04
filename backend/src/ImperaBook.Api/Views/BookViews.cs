using System.Globalization;
using ImperaBook.API.Endpoints;
using ImperaBook.Application;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

public static class BookViews
{
    /// <param name="showPages">
    /// Puts each book's page count on its item — for a list filtered by pages, where the count
    /// is what the list is about.
    /// </param>
    /// <param name="showYear">The same for the publication year, for a list filtered by it.</param>
    public static CommandResult ToCommandResult(
        this IReadOnlyList<BookListItem> books,
        string emptyMessage,
        PageInfo? page = null,
        string heading = "All books",
        bool showPages = false,
        bool showYear = false
    ) =>
        new(
            new ViewNode[]
            {
                new HeadingView(heading, page),
                new ItemCollectionView(
                    books.Select(b => ToItem(b, showPages, showYear)).ToArray(),
                    emptyMessage
                ),
            }
        );

    /// <summary>A year filter as typed, for headings: "published before 1950".</summary>
    public static string Describe(this YearFilter f) =>
        f.Comparison switch
        {
            YearComparison.In => $"published in {f.Year}",
            YearComparison.Before => $"published before {f.Year}",
            YearComparison.After => $"published after {f.Year}",
            YearComparison.Between => $"published between {f.Year} and {f.UpTo}",
            _ => throw new InvalidOperationException($"Unhandled year comparison: {f.Comparison}"),
        };

    /// <summary>
    /// A page filter as the clause it was typed as, for headings: "whose page count is at least
    /// 120" — so the list says back what was asked.
    /// </summary>
    public static string Describe(this PageFilter f) =>
        "whose page count is "
        + f.Comparison switch
        {
            PageComparison.Over => $"more than {f.Pages}",
            PageComparison.Under => $"less than {f.Pages}",
            PageComparison.Equal => $"{f.Pages}",
            PageComparison.AtLeast => $"at least {f.Pages}",
            PageComparison.AtMost => $"at most {f.Pages}",
            PageComparison.OtherThan => $"not {f.Pages}",
            PageComparison.Between => $"between {f.Pages} and {f.UpTo}",
            _ => throw new InvalidOperationException($"Unhandled page comparison: {f.Comparison}"),
        };

    public static CommandResult ToCommandResult(this BookDetail b)
    {
        var nodes = new List<ViewNode> { new HeadingView(b.Title) };

        if (ImageSrcOf(b.CoverHash) is { } src)
            nodes.Add(new ImageView(src, $"Cover of {b.Title}", ImageRole.Illustration));

        var blocks = new List<TextBlock>();

        if (!string.IsNullOrWhiteSpace(b.Subtitle))
            blocks.Add(new Paragraph([new EmphasisRun([b.Subtitle])]));

        blocks.Add(AuthorsField(b.Authors));

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

    internal static ItemView ToItem(BookListItem b) => ToItem(b, showPages: false, showYear: false);

    private static ItemView ToItem(BookListItem b, bool showPages, bool showYear)
    {
        var properties = new List<ItemProperty>
        {
            new("Title", b.Title, PropertyRole.Primary),
            new(
                b.Authors.Count > 1 ? "Authors" : "Author",
                b.Authors.AsText(),
                PropertyRole.Secondary
            ),
        };

        if (showYear && b.Published is { } year)
            properties.Add(new("Published", $"published {year}", PropertyRole.Meta));

        if (showPages && b.Pages is { } pages)
            properties.Add(new("Pages", $"{pages} {"page".Plural(pages)}", PropertyRole.Meta));

        return new ItemView(
            Ref: b.Id.ToString(),
            Properties: properties,
            ImageSrc: ImageSrcOf(b.CoverHash),
            Open: BookEndpoints.DetailPath(b.Id)
        );
    }

    private static void AddField(List<TextBlock> blocks, string label, string? value)
    {
        if (!string.IsNullOrWhiteSpace(value))
            blocks.Add(Field(label, value));
    }

    // Each author links to their own page; an unknown author is plain text, since there is
    // nowhere to go.
    private static Paragraph AuthorsField(IReadOnlyList<BookAuthor> authors)
    {
        var label = authors.Count > 1 ? "Authors" : "Author";
        if (authors.Count == 0)
            return Field(label, authors.AsText());

        var content = new List<Inline> { new StrongRun([label]), " " };
        foreach (var (author, i) in authors.Select((a, i) => (a, i)))
        {
            if (i > 0)
                content.Add(", ");
            content.Add(new LinkRun(AuthorEndpoints.DetailPath(author.Id), [author.FullName()]));
        }

        return new Paragraph(content);
    }

    // A labelled fact is a paragraph whose label is emphasised — the closest the current block set
    // comes to a key/value pair, and enough while a detail is a short list of them.
    private static Paragraph Field(string label, string value) =>
        new([new StrongRun([label]), $" {value}"]);

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
