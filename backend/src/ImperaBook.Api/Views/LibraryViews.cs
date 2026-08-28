using CSharpFunctionalExtensions;
using ImperaBook.Application;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

public static class LibraryViews
{
    public static CommandResult ToCommandResult(this LibraryDetail library, LibraryStatistics stats)
    {
        var nodes = new List<ViewNode>(capacity: 4) { new HeadingView(library.Name) };

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

        nodes.Add(new CardCollectionView(BuildCards(stats)));

        return new CommandResult(nodes.ToArray());
    }

    private static CardView[] BuildCards(LibraryStatistics stats)
    {
        var languageCount = stats.TotalLanguages;
        var (longestBookPageCount, longestBookDescription) = stats.LongestBook.Match(
            l =>
                (
                    l.PageCount.ToString("N0"),
                    $"{"page".Plural(l.PageCount)}, {l.Book.Title} by {l.Book.Authors.AsText()}"
                ),
            () => ("—", "unknown")
        );

        return
        [
            new CardView(
                "All Books",
                stats.TotalBooks.ToString("N0"),
                $"{"book".Plural(stats.TotalBooks)} in your library"
            ),
            new CardView("Pages", stats.TotalPages.ToString("N0"), PageCaption(stats)),
            new CardView(
                "Book length",
                stats.AvgPagesPerBook.ToString("N0"),
                $"{"page".Plural(stats.TotalBooks)} per book"
            ),
            new CardView("Longest book", longestBookPageCount, longestBookDescription),
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

    private static string PageCaption(LibraryStatistics stats) =>
        $"{"page".Plural(stats.TotalPages)} across your books";
    // stats.BooksWithPageCount > 0
    // ? $"{"page".Plural(stats.TotalPages)}, {stats.TotalPages / stats.BooksWithPageCount:N0} per book"
    // : $"{"page".Plural(stats.TotalPages)} across your books";
}
