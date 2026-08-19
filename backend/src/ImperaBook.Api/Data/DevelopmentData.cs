using ImperaBook.Infrastructure.Data;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.API.Endpoints.Data;

internal static class DevelopmentData
{
    internal static async Task AddDevelopmentData(this WebApplication app)
    {
        await using var scope = app.Services.CreateAsyncScope();
        var db = scope.ServiceProvider.GetRequiredService<ImperaBookDbContext>();
        var users = scope.ServiceProvider.GetRequiredService<UserManager<UserEntity>>();

        if (app.Configuration.GetValue<bool>("ResetDatabaseOnStartup"))
            await db.Database.EnsureDeletedAsync();

        await db.Database.MigrateAsync();

        var password =
            app.Configuration["Seed:Password"]
            ?? throw new InvalidOperationException(
                "Seed:Password is not configured. Set it in appsettings.Development.json, "
                    + "user secrets, or the Seed__Password environment variable."
            );

        await DevelopmentDataSeeder.SeedAsync(db, users, password, CancellationToken.None);
    }
}
