using ImperaBook.API.Views;
using ImperaBook.Application.Dashboard;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Endpoints.Public;

public static class DashboardEndpoints
{
    public static IEndpointRouteBuilder MapDashboardEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet(
                "/api/dashboard",
                async (IDashboardQueries queries, CancellationToken ct) =>
                {
                    var summary = await queries.GetSummaryAsync(ct);
                    return TypedResults.Ok(summary.ToCommandResult());
                }
            )
            .WithName("GetDashboard")
            .Produces<CommandResult>(StatusCodes.Status200OK);

        return app;
    }
}
