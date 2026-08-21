using CSharpFunctionalExtensions;
using ImperaBook.API.Views;
using ImperaBook.Application;
using ImperaBook.Contracts.Views;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace ImperaBook.API.Endpoints;

public static class CommandHandler
{
    private static readonly ImageView LoginIllustration = new(
        "/static/imperabook-login-dark.svg",
        "ImperaBook",
        ImageRole.Illustration
    );

    internal static async Task<CommandResult> ListBooks(IBookQueries books, CancellationToken ct)
    {
        var bookList = await books.List(null, ct);
        return bookList.ToCommandResult(
            "No books yet. Add one to start your library.",
            new PageInfo(1, 1, bookList.Count(), "books")
        );
    }

    internal static async Task<CommandResult> ListAuthors(
        IAuthorQueries authors,
        CancellationToken ct
    )
    {
        var authorList = await authors.List(ct);

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
        var statistics = await libraries.GetStatisticsAsync(ct);
        var libraryDetails = await libraries.GetLibraryAsync(ct);

        return libraryDetails.Match(
            library => library.ToCommandResult(statistics),
            () => CommandResult.Empty
        );
    }

    internal static async Task<CommandResult> Dashboard(
        IDashboardQueries dashboard,
        CancellationToken ct
    ) => (await dashboard.GetSummaryAsync(ct)).ToCommandResult();

    /// <summary>
    /// The login screen. <paramref name="error"/> is non-null only when a sign-in attempt was
    /// rejected — the same surface comes back, carrying the reason.
    /// </summary>
    internal static CommandResult LoginScreen(string? error = null) =>
        new(
            error is null
                ? [LoginIllustration]
                : [LoginIllustration, new MessageView(error, MessageKind.Error)]
        );

    internal static CommandResult AlreadySignedIn(string? username) =>
        new([
            new MessageView(
                username is null
                    ? "You are already signed in."
                    : $"You are already signed in as {username}.",
                MessageKind.Info
            ),
        ]);

    internal static async Task<CommandResult> LoggedIn(
        IDashboardQueries dashboard,
        string displayName,
        CancellationToken ct
    )
    {
        var summary = await Dashboard(dashboard, ct);

        ViewNode[] views =
        [
            // new MessageView($"Welcome back, {displayName}.", MessageKind.Success),
            .. summary.Views,
        ];

        return new CommandResult(views);
    }

    internal static async Task<CommandResult> Logout(SignInManager<UserEntity> signIn)
    {
        await signIn.SignOutAsync();

        return new CommandResult([
            new MessageView("Signed out.", MessageKind.Info),
            .. LoginScreen().Views,
        ]);
    }

    internal static async Task<CommandResult> Library(
        ILibraryQueries libraries,
        CancellationToken ct
    )
    {
        var statistics = await libraries.GetStatisticsAsync(ct);
        var libraryDetails = await libraries.GetLibraryAsync(ct);

        return libraryDetails.Match(
            library => library.ToCommandResult(statistics),
            () => CommandResult.Empty
        );
    }
}
