using ImperaBook.Application.Dashboard;
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
                    Caption: "Your library, at your fingertips.",
                    Variant: "logo"
                ),
                new CardCollectionView(
                    new[]
                    {
                        new CardView("All Books", s.TotalBooks.ToString(), "books in your library"),
                        new CardView("Authors", s.AuthorCount.ToString(), "across your collection"),
                        new CardView(
                            "Languages",
                            s.LanguageCount.ToString(),
                            "languages represented"
                        ),
                    }
                ),
                new TextView(
                    "Help — add book",
                    [
                        TextNode.H1("add book"),
                        TextNode.Para(
                            "Catalogs a new book. ",
                            TextNode.Strong("Title"),
                            " and ",
                            TextNode.Strong("Author"),
                            " are required."
                        ),
                        TextNode.H2("Notes"),
                        TextNode.Para(
                            "Inline parameters arrive in MVP2 — see ",
                            TextNode.Link("https://…/COMMANDS.md", "the reference"),
                            "."
                        ),
                    ]
                ),
            }
        );
}
