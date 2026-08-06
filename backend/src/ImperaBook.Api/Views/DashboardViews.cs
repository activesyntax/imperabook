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
                new TextView(
                    "Needs attention",
                    [
                        TextNode.Para(
                            TextNode.Strong("17"),
                            " of your ",
                            TextNode.Strong("24"),
                            " books are missing something."
                        ),
                        TextNode.Finding(
                            "3",
                            "books have no page count",
                            "list books having no page count"
                        ),
                        TextNode.Finding("12", "books have no ISBN", "list books having no isbn"),
                        TextNode.Finding("8", "books have no cover", "list books having no cover"),
                        TextNode.Finding(
                            "5",
                            "books have no publication year",
                            "list books having no publication year"
                        ),
                        TextNode.Finding(
                            "3",
                            "authors have no books",
                            "list authors having no books"
                        ),
                    ]
                ),
            }
        );
}
