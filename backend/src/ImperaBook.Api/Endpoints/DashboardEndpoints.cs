using ImperaBook.API.Views;
using ImperaBook.Application;
using ImperaBook.Contracts.Views;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ImperaBook.API.Endpoints;

public static class DashboardEndpoints
{
    public static IEndpointRouteBuilder MapDashboardEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/dashboard", GetDashboard)
            .WithName("GetDashboard")
            .Produces<CommandResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        return app;
    }

    private static async Task<Ok<CommandResult>> GetDashboard(
        IDashboardQueries dashboard,
        CancellationToken ct
    ) => TypedResults.Ok(await Summary(dashboard, ct));

    // Also the landing view after a successful sign-in.
    internal static async Task<CommandResult> Summary(
        IDashboardQueries dashboard,
        CancellationToken ct
    ) => (await dashboard.GetSummaryAsync(ct)).ToCommandResult();
}
