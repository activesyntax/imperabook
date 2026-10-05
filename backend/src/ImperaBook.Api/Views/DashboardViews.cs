using ImperaBook.Application;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

public static class DashboardViews
{
    public static CommandResult ToCommandResult(this DashboardSummary s) =>
        new(
            new ViewNode[]
            {
                new ImageView(
                    Src: "/static/imperabook-logo-dark.svg",
                    Alt: "ImperaBook",
                    Role: ImageRole.Branding,
                    Caption: "Your library, at your fingertips."
                ),
                new CardCollectionView(
                    new[]
                    {
                        new CardView(
                            "All Books",
                            s.TotalBooks.ToString("N0"),
                            $"{"book".Plural(s.TotalBooks)} in your library"
                        ),
                        new CardView(
                            "Pages",
                            s.TotalPages.ToString("N0"),
                            $"{"page".Plural(s.TotalPages)} across your books"
                        ),
                        new CardView(
                            "Authors",
                            s.TotalAuthors.ToString("N0"),
                            $"{"author".Plural(s.TotalAuthors)} in your collection"
                        ),
                    }
                ),
                new TextView(NeedsAttention(s)),
            }
        );

    /// <summary>
    /// What the catalog lacks, counted for real: one finding per gap that has anything in it,
    /// each running the command that lists those books. Nothing lacking says so.
    /// </summary>
    private static IReadOnlyList<TextBlock> NeedsAttention(DashboardSummary s)
    {
        var gaps = s.Gaps;
        var blocks = new List<TextBlock> { TextNode.H1("Needs attention") };

        if (gaps.BooksLackingAny > 0)
            blocks.Add(
                TextNode.Para(
                    TextNode.Strong(gaps.BooksLackingAny.ToString("N0")),
                    " of your ",
                    TextNode.Strong(s.TotalBooks.ToString("N0")),
                    $" {"book".Plural(s.TotalBooks)} {(gaps.BooksLackingAny == 1 ? "is" : "are")} missing something."
                )
            );
        else if (s.TotalBooks > 0)
            blocks.Add(TextNode.Para("Every book has its page count, ISBN, cover and publication year."));

        AddFinding(blocks, gaps.BooksWithoutPageCount, "book", "no page count", "list books having no page count");
        AddFinding(blocks, gaps.BooksWithoutIsbn, "book", "no ISBN", "list books having no isbn");
        AddFinding(blocks, gaps.BooksWithoutCover, "book", "no cover", "list books having no cover");
        AddFinding(
            blocks,
            gaps.BooksWithoutPublicationYear,
            "book",
            "no publication year",
            "list books having no publication year"
        );
        AddFinding(blocks, gaps.AuthorsWithoutBooks, "author", "no books", "list authors having no books");

        if (blocks.Count == 1)
            blocks.Add(TextNode.Para("Nothing needs attention."));

        return blocks;
    }

    // "1 book has no ISBN", "12 books have no ISBN"; a gap with nothing in it is not listed.
    private static void AddFinding(List<TextBlock> blocks, int count, string noun, string lack, string command)
    {
        if (count == 0)
            return;

        var verb = count == 1 ? "has" : "have";
        blocks.Add(TextNode.Finding(count.ToString("N0"), $"{noun.Plural(count)} {verb} {lack}", command));
    }
}
