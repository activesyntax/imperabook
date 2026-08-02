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
                    Src: "/assets/imperabook-logo-dark.svg",
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
                        new GuidanceHint(new[] { "↑", "↓" }, "scroll the workspace"),
                        new GuidanceHint(
                            new[] { "Page Up", "Page Down" },
                            "scroll a page at a time"
                        ),
                        new GuidanceHint(new[] { "Home", "End" }, "jump to the top or bottom"),
                    }
                ),
            }
        );
}
