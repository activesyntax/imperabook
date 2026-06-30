using CSharpFunctionalExtensions;
using ImperaBook.Api.Errors;
using ImperaBook.Application.Books;

namespace ImperaBook.API.Endpoints;

public static class CatalogEndpoints
{
    public static IEndpointRouteBuilder MapCatalogEndpoints(this IEndpointRouteBuilder app)
    {
        // GET all books
        app.MapGet(
            "api/books",
            async (GetAllBooksQueryHandler handler, CancellationToken ct) =>
                Results.Ok(await handler.Handle(ct))
        );

        // GET books filtered by library and/or title
        app.MapGet(
            "api/books/search",
            async (
                GetBooksQueryHandler handler,
                Guid? libraryId,
                string? titleContains,
                CancellationToken ct
            ) =>
            {
                var query = new GetBooksQuery
                {
                    LibraryId = libraryId,
                    TitleContains = titleContains,
                };
                return Results.Ok(await handler.Handle(query, ct));
            }
        );

        // GET books in a specific library
        app.MapGet(
            "api/libraries/{libraryId:guid}/books",
            async (GetLibraryBooksQueryHandler handler, Guid libraryId, CancellationToken ct) =>
                Results.Ok(await handler.Handle(libraryId, ct))
        );

        // POST a new book
        app.MapPost(
            "api/books",
            async (AddBookCommandHandler handler, AddBookCommand command, CancellationToken ct) =>
            {
                var result = await handler.Handle(command, ct);
                return result.Match(
                    id => Results.Created($"/books/{id}", id),
                    error => error.ToProblem()
                );
            }
        );

        return app;
    }
}
