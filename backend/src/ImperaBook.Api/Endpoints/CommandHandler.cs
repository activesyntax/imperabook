using ImperaBook.API.Views;
using ImperaBook.Application.Authors;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Endpoints;

public static class CommandHandler
{
    public static async Task<CommandResult> ListBooks(
        Application.Books.IBookQueries books,
        CancellationToken ct
    )
    {
        var bookList = await books.List(null, null, ct);
        return bookList.ToCommandResult(
            "All books",
            "No books yet. Add one to start your library.",
            new PageInfo(1, 1, bookList.Count(), "books")
        );
    }

    internal static async Task<CommandResult?> ListAuthors(
        IAuthorQueries authors,
        CancellationToken ct
    )
    {
        var authorList = await authors.List(null, null, ct);

        return authorList.ToCommandResult(
            "All authors",
            "No authors yet.",
            new PageInfo(1, 1, authorList.Count(), "authors")
        );
    }
}
