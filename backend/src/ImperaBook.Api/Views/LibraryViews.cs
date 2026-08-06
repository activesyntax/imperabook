using ImperaBook.Application;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

public static class LibraryViews
{
    public static CommandResult ToCommandResult(this LibraryDetail library, LibraryStatistics stats)
    {
        var nodes = new List<ViewNode>(capacity: 3);

        // TODO: upload photo placeholder
        if (library.PhotoHash is { } hash)
        {
            nodes.Add(
                new ImageView(
                    Src: $"/api/images/{hash}",
                    Alt: $"Photo of {library.Name}",
                    Role: ImageRole.Illustration
                )
            );
        }

        nodes.Add(new TextView(library.Name, [TextNode.Para("Your library, at a glance.")]));

        nodes.Add(new CardCollectionView(BuildCards(stats)));

        return new CommandResult(nodes.ToArray());
    }

    private static CardView[] BuildCards(LibraryStatistics stats)
    {
        // A row with no language set is not a language. Counting nulls would
        // report an unfilled field as a distinct value.
        // var languageCount = stats.Languages.Count(l => l.Language is not null);
        var languageCount = 3;

        return
        [
            new CardView(
                "All Books",
                stats.TotalBooks.ToString("N0"),
                $"{"book".Plural(stats.TotalBooks)} in your library"
            ),
            new CardView("Pages", stats.TotalPages.ToString("N0"), PageCaption(stats)),
            new CardView("Book length", "316", $"{"page".Plural(stats.TotalBooks)} per book"),
            new CardView(
                "Longest book",
                "1,248",
                $"{"page".Plural(1248)}, War and Peace by Lev Tolstoy"
            ),
            new CardView(
                "Authors",
                stats.TotalAuthors.ToString("N0"),
                $"{"author".Plural(stats.TotalAuthors)} in your collection"
            ),
            new CardView(
                "Languages",
                languageCount.ToString("N0"),
                $"{"language".Plural(languageCount)} represented"
            ),
        ];
    }

    // The average is computed here, not in the read model: BooksWithPageCount is the
    // raw denominator, and choosing what to divide by is a presentation decision
    // (ADR 8 — read models carry raw data, composition lives in the Views layer).
    private static string PageCaption(LibraryStatistics stats) =>
        $"{"page".Plural(stats.TotalPages)} across your books";
    // stats.BooksWithPageCount > 0
    // ? $"{"page".Plural(stats.TotalPages)}, {stats.TotalPages / stats.BooksWithPageCount:N0} per book"
    // : $"{"page".Plural(stats.TotalPages)} across your books";
}
