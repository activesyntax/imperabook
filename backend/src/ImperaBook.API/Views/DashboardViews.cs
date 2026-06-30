using ImperaBook.Application.Dashboard;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

// View composition is an API-layer concern (DECISIONS 15) — the same seam that maps
// domain DUs to ProblemDetails (DECISIONS 12). One composer per composed read model;
// book views follow the same shape once their ViewNodes land.
public static class DashboardViews
{
    public static CommandResult ToCommandResult(this DashboardSummary s) =>
        new(
            new ViewNode[]
            {
                new ImageView(
                    Src: "assets/img/imperabook-logo-dark.svg",
                    Alt: "ImperaBook",
                    Caption: "Your library, at your fingertips.",
                    Variant: "logo"
                ),
                new CardCollectionView(
                    new[]
                    {
                        new CardView(
                            "All Books",
                            s.TotalBooks.ToString(),
                            "books in your sanctuary"
                        ),
                        new CardView("Authors", s.AuthorCount.ToString(), "across your collection"),
                        new CardView(
                            "Languages",
                            s.LanguageCount.ToString(),
                            "languages represented"
                        ),
                    }
                ),
                new GuidanceView(
                    Title: "Getting started",
                    Intro: "ImperaBook is a keyboard-driven catalog for your personal library. "
                        + "Type a command to add, find, and organize your books — anything that "
                        + "isn't a command runs as a search.",
                    Hints: new[]
                    {
                        new GuidanceHint(new[] { "Enter" }, "run the typed command"),
                        new GuidanceHint(
                            new[] { "Tab", "Enter" },
                            "pick a suggestion, then accept"
                        ),
                        new GuidanceHint(new[] { "Ctrl + K" }, "focus the command bar"),
                    }
                ),
            }
        );
}
