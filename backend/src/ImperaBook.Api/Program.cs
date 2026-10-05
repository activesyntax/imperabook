using System.Text.Json;
using System.Text.Json.Serialization;
using ImperaBook.Api.Authentication;
using ImperaBook.API.Endpoints;
using ImperaBook.API.Endpoints.Data;
using ImperaBook.Application;
using ImperaBook.Contracts.Views;
using ImperaBook.Infrastructure.Data;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.WebUtilities;
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
builder.Services.AddScoped<AddBookCommandHandler>();
builder.Services.AddScoped<AddAuthorCommandHandler>();
builder.Services.AddScoped<RemoveBookCommandHandler>();
builder.Services.AddScoped<RemoveAuthorCommandHandler>();

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

    // Only bodiless errors reach here; each status says what it actually means.
    var (title, detail, code) = response.StatusCode switch
    {
        StatusCodes.Status401Unauthorized => (
            "Not signed in",
            "This command requires a session. Sign in to continue.",
            "not_authenticated"
        ),
        StatusCodes.Status403Forbidden => (
            "Forbidden",
            "This session is not permitted to perform that action.",
            "forbidden"
        ),
        StatusCodes.Status404NotFound => ("Not found", "Nothing is at this address.", "not_found"),
        var status => (
            ReasonPhrases.GetReasonPhrase(status),
            (string?)null,
            status >= 500 ? "server_error" : "request_error"
        ),
    };

    var problem = new ProblemDetails
    {
        Status = response.StatusCode,
        Title = title,
        Detail = detail,
    };

    problem.Extensions["code"] = code;

    if (response.StatusCode == StatusCodes.Status401Unauthorized)
    {
        IReadOnlyList<ViewNode> views = AuthEndpoints.LoginScreen().Views;
        problem.Extensions["views"] = views;
    }

    // Passed explicitly: WriteAsJsonAsync would otherwise replace it with application/json.
    await response.WriteAsJsonAsync(
        problem,
        options: null,
        contentType: "application/problem+json",
        cancellationToken: context.HttpContext.RequestAborted
    );
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
app.MapSearchEndpoints();
app.MapHelpEndpoints();
app.MapAboutEndpoints();
app.MapSettingsEndpoints();
app.MapImageEndpoints();

// Unknown /api paths answer 404 as a problem instead of falling through to the SPA shell, which
// would be a 200 of HTML to a client expecting JSON. The literal "api" segment outranks the SPA
// fallback's catch-all, so this wins for every /api path no endpoint claims.
app.MapFallback(
        "/api/{**path}",
        (HttpContext http) =>
            Results.Problem(
                statusCode: StatusCodes.Status404NotFound,
                title: "Not found",
                detail: $"There is no API endpoint at {http.Request.Path}.",
                extensions: new Dictionary<string, object?> { ["code"] = "not_found" }
            )
    )
    .AllowAnonymous();

app.MapFallbackToFile("index.html").AllowAnonymous();

app.Run();
