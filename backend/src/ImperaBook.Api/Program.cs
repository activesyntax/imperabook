using System.Text.Json;
using System.Text.Json.Serialization;
using ImperaBook.Api.Authentication;
using ImperaBook.API.Endpoints;
using ImperaBook.API.Endpoints.Data;
using ImperaBook.Contracts.Views;
using ImperaBook.Infrastructure.Data;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString =
    builder.Configuration.GetConnectionString("ImperaBook")
    ?? throw new InvalidOperationException(
        "Connection string 'ImperaBook' was not found in configuration."
    );

builder.Services.AddInfrastructure(connectionString);
builder.Services.AddImperaBookAuthentication(builder.Environment);

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

// First in the pipeline, before anything reads the scheme or the client address. Behind a
// reverse proxy the app sees plain HTTP on the inside, and without this the auth cookie is
// never set under SecurePolicy.Always — a login that reports success and does nothing,
// visible only in the deployed environment.
if (!app.Environment.IsDevelopment())
{
    app.UseForwardedHeaders(
        new ForwardedHeadersOptions
        {
            ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto,
        }
    );
}

app.UseExceptionHandler();

app.UseStatusCodePages(async context =>
{
    var response = context.HttpContext.Response;

    if (response.HasStarted || response.ContentLength > 0)
    {
        return;
    }

    var problem = new ProblemDetails
    {
        Status = response.StatusCode,
        Title =
            response.StatusCode == StatusCodes.Status401Unauthorized
                ? "Not signed in"
                : "Forbidden",
        Detail =
            response.StatusCode == StatusCodes.Status401Unauthorized
                ? "This command requires a session. Sign in to continue."
                : "This session is not permitted to perform that action.",
    };

    problem.Extensions["code"] =
        response.StatusCode == StatusCodes.Status401Unauthorized
            ? "not_authenticated"
            : "forbidden";

    if (response.StatusCode == StatusCodes.Status401Unauthorized)
    {
        IReadOnlyList<ViewNode> views = AuthEndpoints.LoginScreen().Views;
        problem.Extensions["views"] = views;
    }

    response.ContentType = "application/problem+json";
    await response.WriteAsJsonAsync(problem);
});

app.UseStaticFiles(
    new StaticFileOptions
    {
        RequestPath = "/static",
        OnPrepareResponse = ctx =>
            ctx.Context.Response.Headers.CacheControl = "public, max-age=3600",
    }
);

app.UseStaticFiles();

if (app.Configuration.GetValue("RunMigrationsOnStartup", false))
{
    using var scope = app.Services.CreateScope();
    scope.ServiceProvider.GetRequiredService<ImperaBookDbContext>().Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    await app.AddDevelopmentData();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "ImperaBook v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapAuthEndpoints();

app.MapLibraryEndpoints();
app.MapDashboardEndpoints();
app.MapBookEndpoints();
app.MapAuthorEndpoints();
app.MapHelpEndpoints();
app.MapAboutEndpoints();
app.MapSettingsEndpoints();
app.MapImageEndpoints();

app.MapFallbackToFile("index.html").AllowAnonymous();

app.Run();
