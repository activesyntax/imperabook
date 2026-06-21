using CSharpFunctionalExtensions;
using ImperaBook.Api.Errors;
using ImperaBook.Application;
using ImperaBook.Application.Books;
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

var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages();

if (app.Environment.IsDevelopment())
{
    await using var scope = app.Services.CreateAsyncScope();
    var db = scope.ServiceProvider.GetRequiredService<ImperaBookDbContext>();
    await db.Database.MigrateAsync();
    await DevelopmentDataSeeder.SeedAsync(db, CancellationToken.None);
}

// GET all books
app.MapGet(
    "/books",
    async (GetAllBooksQueryHandler handler, CancellationToken ct) =>
        Results.Ok(await handler.Handle(ct))
);

// GET books filtered by library and/or title
app.MapGet(
    "/books/search",
    async (
        GetBooksQueryHandler handler,
        Guid? libraryId,
        string? titleContains,
        CancellationToken ct
    ) =>
    {
        var query = new GetBooksQuery { LibraryId = libraryId, TitleContains = titleContains };
        return Results.Ok(await handler.Handle(query, ct));
    }
);

// GET books in a specific library
app.MapGet(
    "/libraries/{libraryId:guid}/books",
    async (GetLibraryBooksQueryHandler handler, Guid libraryId, CancellationToken ct) =>
        Results.Ok(await handler.Handle(libraryId, ct))
);

// POST a new book
app.MapPost(
    "/books",
    async (AddBookCommandHandler handler, AddBookCommand command, CancellationToken ct) =>
    {
        var result = await handler.Handle(command, ct);
        return result.Match(id => Results.Created($"/books/{id}", id), error => error.ToProblem());
    }
);

app.Run();
