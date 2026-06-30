using ImperaBook.Application.Books;
using ImperaBook.Application.Books.ReadModel;

namespace ImperaBook.API.Endpoints;

public static class CatalogEndpoints
{
    public static IEndpointRouteBuilder MapCatalogEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet(
                "api/books",
                async (IBookQueries books, CancellationToken ct) =>
                    TypedResults.Ok(await books.List(null, null, ct))
            )
            .WithName("ListBooks")
            .Produces<BookListItem[]>(StatusCodes.Status200OK);

        app.MapGet(
                "api/books/search",
                async (
                    IBookQueries books,
                    Guid? libraryId,
                    string? titleContains,
                    CancellationToken ct
                ) => TypedResults.Ok(await books.List(libraryId, titleContains, ct))
            )
            .WithName("SearchBooks")
            .Produces<BookListItem[]>(StatusCodes.Status200OK);

        app.MapGet(
                "api/libraries/{libraryId:guid}/books",
                async (IBookQueries books, Guid libraryId, CancellationToken ct) =>
                    TypedResults.Ok(await books.List(libraryId, null, ct))
            )
            .WithName("ListLibraryBooks")
            .Produces<BookListItem[]>(StatusCodes.Status200OK);

        return app;
    }
}
