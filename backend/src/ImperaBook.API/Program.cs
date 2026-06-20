using ImperaBook.Application;
using ImperaBook.Application.Books;
using ImperaBook.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

var connectionString =
    builder.Configuration.GetConnectionString("ImperaBook")
    ?? throw new InvalidOperationException(
        "Connection string 'ImperaBook' was not found in configuration."
    );

builder.Services.AddApplication();
builder.Services.AddInfrastructure(connectionString);

var app = builder.Build();

app.MapGet(
    "/books",
    async (GetAllBooksQueryHandler handler, CancellationToken ct) =>
    {
        var books = await handler.Handle(ct);
        return Results.Ok(books);
    }
);

app.Run();
