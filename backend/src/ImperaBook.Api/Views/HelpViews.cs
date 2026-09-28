using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

public sealed class GeneralHelp { }

public static class HelpViews
{
    public static CommandResult ToCommandResult(this GeneralHelp generalHelp) =>
        new(
            new ViewNode[]
            {
                new HeadingView("Help"),
                new TextView([
                    TextNode.H2("Getting started"),
                    TextNode.Para(
                        "ImperaBook is a keyboard-driven catalog for your personal library. "
                            + "You type a command, it asks for what it needs, one field at a "
                            + "time. Anything that isn't a command runs as a search."
                    ),
                    TextNode.Hint(["add book"], "catalog a book, prompt by prompt"),
                    TextNode.Hint(["list books"], "see the whole catalog"),
                    TextNode.Hint(["orwell"], "no command matches — so it searches"),
                    TextNode.H2("Finding commands"),
                    TextNode.Para(
                        "You never have to remember a full command name. An empty bar shows "
                            + "pinned commands — the few you reach for most. Start typing and "
                            + "they give way to suggestions ranked against what you've typed, "
                            + "matched on any word in the name, not just the first."
                    ),
                    TextNode.Hint(["Ctrl + K"], "focus the command bar"),
                    TextNode.Hint(["book"], "surfaces every book command"),
                    TextNode.Hint(["Ctrl + `", "Ctrl + ~"], "highlight the next or previous suggestion"),
                    TextNode.Hint(["Tab"], "accept the highlighted one"),
                    TextNode.Hint(["Enter"], "run the typed command"),
                    TextNode.H2("Moving around"),
                    TextNode.Para(
                        "The command bar always holds focus, so plain letters are typing, "
                            + "never shortcuts. Movement is split by modifier instead: bare "
                            + "arrows move the view, Alt moves the selection, Ctrl fetches "
                            + "more results."
                    ),
                    TextNode.Hint(["↑", "↓"], "scroll the workspace"),
                    TextNode.Hint(["Alt + ↑ ↓ ← →"], "move the selection through the grid"),
                    TextNode.Hint(["Ctrl + ←", "Ctrl + →"], "previous or next page"),
                    TextNode.Hint(["Enter", "Esc"], "open the selection, or go back"),
                    TextNode.H2("All commands"),
                    TextNode.Para(
                        "The full grammar. Nothing else is a command — anything not on this list runs as a search."
                    ),
                    TextNode.Command("add book", "catalog a new book"),
                    TextNode.Command("list books", "the whole catalog"),
                    TextNode.Command("list incomplete books", "books with a missing field"),
                    TextNode.Command("list authors", "everyone in your collection"),
                    TextNode.Command("search", "multi-token full-text search"),
                    TextNode.Command(
                        "dashboard",
                        "your library at a glance, and what needs attention"
                    ),
                    TextNode.Command("help", "this page, or one command in detail"),
                ]),
            }
        );
}
