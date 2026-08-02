using ImperaBook.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.API.Endpoints.Data;

internal static class DevelopmentData
{
    internal static async Task AddDevelopmentData(this WebApplication app)
    {
        await using var scope = app.Services.CreateAsyncScope();
        var db = scope.ServiceProvider.GetRequiredService<ImperaBookDbContext>();

        if (app.Configuration.GetValue<bool>("ResetDatabaseOnStartup"))
            await db.Database.EnsureDeletedAsync();

        await db.Database.MigrateAsync();
        await DevelopmentDataSeeder.SeedAsync(db, CancellationToken.None);
    }
}
