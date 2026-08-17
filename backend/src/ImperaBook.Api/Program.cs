using System.Text.Json;
using System.Text.Json.Serialization;
using ImperaBook.Api.Authentication;
using ImperaBook.API.Endpoints;
using ImperaBook.API.Endpoints.Data;
using ImperaBook.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString =
    builder.Configuration.GetConnectionString("ImperaBook")
    ?? throw new InvalidOperationException(
        "Connection string 'ImperaBook' was not found in configuration."
    );

builder.Services.AddInfrastructure(connectionString);
builder.Services.AddImperaBookAuthentication();

builder.Services.AddProblemDetails();
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(
        new JsonStringEnumConverter(JsonNamingPolicy.CamelCase)
    );
});

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
}

var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages();

// todo: remove duplilcate UseStaticFiles
app.UseStaticFiles(
    new StaticFileOptions
    {
        RequestPath = "/static",
        OnPrepareResponse = ctx =>
            ctx.Context.Response.Headers.CacheControl = "public, max-age=3600",
    }
);
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    await app.AddDevelopmentData();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "ImperaBook v1");
        c.RoutePrefix = string.Empty;
    });
}

app.MapAuthEndpoints();
app.MapCommandEndpoints();
app.MapImageEndpoints();

if (app.Configuration.GetValue("RunMigrationsOnStartup", false))
{
    using var scope = app.Services.CreateScope();
    scope.ServiceProvider.GetRequiredService<ImperaBookDbContext>().Database.Migrate();
}
app.MapFallbackToFile("index.html");

app.Run();
