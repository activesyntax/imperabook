using System.Text.Json;
using System.Text.Json.Serialization;
using ImperaBook.API.Endpoints;
using ImperaBook.Application;
using ImperaBook.Infrastructure.Data;
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
builder.Services.AddOpenApi();
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(
        new JsonStringEnumConverter(JsonNamingPolicy.CamelCase)
    );
});

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

// app.MapDashboardEndpoints();
// app.MapCatalogEndpoints();
app.MapCommandEndpoints();

app.Run();
