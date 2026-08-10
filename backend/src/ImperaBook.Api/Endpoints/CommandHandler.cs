using CSharpFunctionalExtensions;
using ImperaBook.API.Views;
using ImperaBook.Application;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Endpoints;

public static class CommandHandler
{
    public static async Task<CommandResult> ListBooks(IBookQueries books, CancellationToken ct)
    {
        var bookList = await books.List(null, null, ct);
        return bookList.ToCommandResult(
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
            "No authors yet.",
            new PageInfo(1, 1, authorList.Count(), "authors")
        );
    }

    internal static async Task<CommandResult> Library(
        ILibraryQueries libraries,
        Guid libraryId,
        CancellationToken ct
    )
    {
        var statistics = await libraries.GetStatistics(libraryId, ct);
        var libraryDetails = await libraries.GetLibrary(libraryId, ct);

        return libraryDetails.Match(
            library => library.ToCommandResult(statistics),
            () => CommandResult.Empty
        );
    }

    internal static CommandResult Login() =>
        new([
            new ImageView(
                "/static/imperabook-login-dark.svg",
                "ImperaBook",
                ImageRole.Illustration
            ),
        ]);
}
