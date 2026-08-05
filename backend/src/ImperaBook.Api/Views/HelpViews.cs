using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

public sealed class GeneralHelp { }

public static class HelpViews
{
    public static CommandResult ToCommandResult(this GeneralHelp generalHelp) =>
        new(
            new ViewNode[]
            {
                new ImageView(
                    Src: "/static/imperabook-logo-dark.svg",
                    Alt: "ImperaBook",
                    Caption: "Your library, at your fingertips.",
                    Variant: "logo"
                ),
                new GuidanceView(
                    Title: "Getting started",
                    Intro: "ImperaBook is a keyboard-driven catalog for your personal library. "
                        + "You type a command, it asks for what it needs, one field at a time. "
                        + "Anything that isn't a command runs as a search.",
                    Hints: new[]
                    {
                        new GuidanceHint(new[] { "add book" }, "catalog a book, prompt by prompt"),
                        new GuidanceHint(new[] { "list books" }, "see the whole catalog"),
                        new GuidanceHint(new[] { "orwell" }, "no command matches — so it searches"),
                    }
                ),
                new GuidanceView(
                    Title: "Finding commands",
                    Intro: "You never have to remember a full command name. An empty bar shows "
                        + "pinned commands — the few you reach for most. Start typing and they "
                        + "give way to suggestions ranked against what you've typed, matched on "
                        + "any word in the name, not just the first.",
                    Hints: new[]
                    {
                        new GuidanceHint(new[] { "Ctrl + K" }, "focus the command bar"),
                        new GuidanceHint(new[] { "book" }, "surfaces every book command"),
                        new GuidanceHint(new[] { "Tab", "Enter" }, "accept the highlighted one"),
                        new GuidanceHint(new[] { "help" }, "the full command list"),
                    }
                ),
                new GuidanceView(
                    Title: "Moving around",
                    Intro: "The command bar always holds focus, so plain letters are typing, never "
                        + "shortcuts. Movement is split by modifier instead: bare arrows move the "
                        + "view, Alt moves the selection, Ctrl fetches more results.",
                    Hints: new[]
                    {
                        new GuidanceHint(new[] { "↑", "↓" }, "scroll the workspace"),
                        new GuidanceHint(new[] { "Alt + ↑ ↓ ← →" }, "move the selection"),
                        new GuidanceHint(new[] { "Ctrl + ←", "Ctrl + →" }, "previous or next page"),
                        new GuidanceHint(
                            new[] { "Enter", "Esc" },
                            "open the selection, or go back"
                        ),
                    }
                ),
            }
        );
}
