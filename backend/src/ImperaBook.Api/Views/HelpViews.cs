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
                            + "You type a command and what it needs on the same line; a command "
                            + "with more to say takes a detail per line below it. To look "
                            + "something up, start with find."
                    ),
                    TextNode.Hint(["add book Dune"], "the title, then a detail per line: by author, with isbn…"),
                    TextNode.Hint(["list books"], "see the whole catalog"),
                    TextNode.Hint(["list books whose page count is more than 300"], "only the long ones — also less than, at least, at most, not"),
                    TextNode.Hint(["list books whose page count is between 100 and 200"], "a range, both ends included; or just is 120"),
                    TextNode.Hint(["list books written by herbert"], "by any part of an author's name; a second filter goes on a new line"),
                    TextNode.Hint(["find orwell"], "search books and authors by any word"),
                    TextNode.H2("Finding commands"),
                    TextNode.Para(
                        "You never have to remember a full command name. An empty bar "
                            + "suggests the book and author commands; the pinned ones sit in the "
                            + "side nav. Start typing and the suggestions narrow to what begins "
                            + "with it, then go on to what can follow — the next word, or the "
                            + "next parameter. A dot beside the bar turns green once what you "
                            + "typed is a command that can run."
                    ),
                    TextNode.Hint(["Ctrl + K"], "focus the command bar"),
                    TextNode.Hint(["ad"], "suggests add book and add author"),
                    TextNode.Hint(["Ctrl + `", "Ctrl + ~"], "highlight the next or previous suggestion"),
                    TextNode.Hint(["Tab"], "accept the highlighted one"),
                    TextNode.Hint(["Enter"], "run the command, or start a new line for the next parameter"),
                    TextNode.Hint(["Enter", "Enter"], "run once the last parameter is typed"),
                    TextNode.Hint(["Ctrl + Enter"], "run now, whatever is typed"),
                    TextNode.Hint(["Shift + Enter"], "start a new line"),
                    TextNode.H2("Moving around"),
                    TextNode.Para(
                        "The command bar always holds focus, so plain letters are typing, "
                            + "never shortcuts. Movement is split by key instead: PgUp and "
                            + "PgDn move the view, Alt with the arrows moves the selection, "
                            + "Ctrl fetches more results."
                    ),
                    TextNode.Hint(["PgUp", "PgDn"], "scroll the workspace"),
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
