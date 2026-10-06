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
                    TextNode.Hint(["add author Plato"], "the name, then born in, died in (or just died), living; years may end in BC"),
                    TextNode.Hint(["list books"], "see the whole catalog"),
                    TextNode.Hint(["list books whose page count is more than 300"], "only the long ones — also less than, at least, at most, not"),
                    TextNode.Hint(["list books whose language is hungarian"], "by name or code (hu); or is not english"),
                    TextNode.Hint(["list books having no page count"], "what still needs filling in — also author, publication year, language, isbn, cover"),
                    TextNode.Hint(["list authors having no books"], "authors no book is credited to"),
                    TextNode.Hint(["list authors born before 1900"], "also in, after, between; the same for died; or list authors living"),
                    TextNode.Hint(["list books whose page count is between 100 and 200"], "a range, both ends included; or just is 120"),
                    TextNode.Hint(["list books written by herbert"], "by any part of an author's name; a second filter goes on a new line"),
                    TextNode.Hint(["list books published before 1950"], "also published in, after, between 1950 and 1960"),
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
                            + "and Enter and Esc on an empty bar open and go back."
                    ),
                    TextNode.Hint(["PgUp", "PgDn"], "scroll the workspace"),
                    TextNode.Hint(["Home", "End"], "jump to the top or bottom, while the command fits on one line"),
                    TextNode.Hint(["Alt + ↑ ↓ ← →"], "move the selection through the grid"),
                    TextNode.Hint(["Enter", "Esc"], "open the selection, or go back"),
                    TextNode.Hint(["Esc"], "with text in the bar, clear it"),
                    TextNode.H2("All commands"),
                    TextNode.Para(
                        "The full grammar. Nothing else is a command: text that is not one "
                            + "does not run, and the status bar says why."
                    ),
                    TextNode.Command("add book", "catalog a new book"),
                    TextNode.Command("add author", "add an author to your catalog"),
                    TextNode.Command("list books", "the whole catalog, or the books matching a filter"),
                    TextNode.Command("list authors", "everyone in your catalog, or those matching a filter"),
                    TextNode.Command("find", "search books and authors by keywords"),
                    TextNode.Command("remove book", "remove the selected book, after a yes or no"),
                    TextNode.Command("remove author", "remove the selected author; their books stay"),
                    TextNode.Command(
                        "dashboard",
                        "your library at a glance, and what needs attention"
                    ),
                    TextNode.Command("library", "statistics about your library"),
                    TextNode.Command("settings", "your settings"),
                    TextNode.Command("about", "about ImperaBook"),
                    TextNode.Command("help", "this page"),
                    TextNode.Command("logout", "sign out and leave your library"),
                ]),
            }
        );
}
