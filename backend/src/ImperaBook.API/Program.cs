using ImperaBook.API.Endpoints;
using ImperaBook.Application;
using ImperaBook.Application.Dashboard;
using ImperaBook.Infrastructure.Data;
using ImperaBook.Infrastructure.Data.Dashboard;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString =
    builder.Configuration.GetConnectionString("ImperaBook")
    ?? throw new InvalidOperationException(
        "Connection string 'ImperaBook' was not found in configuration."
    );

builder.Services.AddApplication();
builder.Services.AddInfrastructure(connectionString);

builder.Services.AddProblemDetails();

// --- service registration (before builder.Build()) --------------------------

builder.Services.AddScoped<IDashboardQueries, DashboardQueries>();

// Optional but recommended (DECISIONS-adjacent): built-in OpenAPI for TS codegen.
// Requires the Microsoft.AspNetCore.OpenApi package (10.0.x).
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi(); // serves /openapi/v1.json (OpenAPI 3.1) in dev only

    await using var scope = app.Services.CreateAsyncScope();
    var db = scope.ServiceProvider.GetRequiredService<ImperaBookDbContext>();
    await db.Database.MigrateAsync();
    await DevelopmentDataSeeder.SeedAsync(db, CancellationToken.None);
}

app.MapDashboardEndpoints();
app.MapCatalogEndpoints();

app.Run();
