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

// ADR 26: any ProblemDetails may carry `views`, and when it does, that array is the view
// the client renders. Two producers reach this point with no body at all: the cookie
// handler's 401 (a session that expired mid-session, or a request that never had one) and
// the 403. Formatting them as a bare problem would leave the shell holding a status code
// and no instruction — which is exactly the interpretation the client must not do. The
// login screen is composed by the same CommandHandler.LoginScreen the auth channel uses,
// so there is still one producer per view.
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
        IReadOnlyList<ViewNode> views = CommandHandler.LoginScreen().Views;
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

// The SPA bundle at the root. Both calls read wwwroot; the prefixed one runs first, so a
// /static request is answered there and never reaches this one.
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

// Order between these two is not stylistic. UseAuthentication reads the cookie and
// populates HttpContext.User; UseAuthorization decides whether that user may proceed.
// Reversed, every request is evaluated as anonymous and the FallbackPolicy denies
// everything — including a valid session.
app.UseAuthentication();
app.UseAuthorization();

// The bootstrap surface: what a browser needs before it can prove who it is. Two routes
// inside — the login descriptor plus its view, and the sign-in itself — both marked
// AllowAnonymous in AuthEndpoints. Everything else is behind the default-deny fallback
// policy, including the control channel.
app.MapAuthEndpoints();

app.MapCommandEndpoints();
app.MapImageEndpoints();

// The SPA shell is an endpoint, so the fallback policy applies to it. Left as-is, an
// anonymous browser gets a 401 for the very document that would let it sign in. The shell
// is public; what it can *do* is decided per command inside the dispatcher (ADR 24).
app.MapFallbackToFile("index.html").AllowAnonymous();

app.Run();
