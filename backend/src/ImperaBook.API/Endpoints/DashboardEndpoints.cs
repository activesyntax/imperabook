using ImperaBook.Application.Dashboard;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Endpoints;

public static class DashboardEndpoints
{
    public static IEndpointRouteBuilder MapDashboardEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet(
                "/api/dashboard",
                async (IDashboardQueries queries, CancellationToken ct) =>
                {
                    var summary = await queries.GetSummaryAsync(ct);
                    return TypedResults.Ok(Compose(summary));
                }
            )
            .WithName("GetDashboard")
            .Produces<CommandResult>(StatusCodes.Status200OK);

        return app;
    }

    // Composition of read data into the semantic view union is an API-layer concern
    // (DECISIONS 15) — same seam that maps domain DUs to ProblemDetails (DECISIONS 12).
    // Kept as a private method rather than its own type until a second composed view
    // exists; extract a composer at that point, not before.
    private static CommandResult Compose(DashboardSummary s) =>
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
