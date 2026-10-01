using ImperaBook.Application;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

public static class SearchViews
{
    /// <summary>
    /// What a search found: a section per kind, only for the kinds it found, each a list whose
    /// items open like any book or author. Nothing found is one message, not empty sections.
    /// </summary>
    public static CommandResult ToCommandResult(this SearchResults found, string query)
    {
        if (found.IsEmpty)
            return new CommandResult([new MessageView($"Nothing matches \"{query}\".", MessageKind.Info)]);

        var nodes = new List<ViewNode>();

        if (found.Books.Count > 0)
        {
            nodes.Add(new HeadingView("Books", new PageInfo(1, 1, found.Books.Count, "books")));
            nodes.Add(new ItemCollectionView(found.Books.Select(BookViews.ToItem).ToArray(), ""));
        }

        if (found.Authors.Count > 0)
        {
            nodes.Add(new HeadingView("Authors", new PageInfo(1, 1, found.Authors.Count, "authors")));
            nodes.Add(new ItemCollectionView(found.Authors.Select(AuthorViews.ToItem).ToArray(), ""));
        }

        return new CommandResult(nodes);
    }

    public static CommandResult NothingToFind() =>
        new([new MessageView("Type what to find: find dune, find herbert.", MessageKind.Info)]);
}
