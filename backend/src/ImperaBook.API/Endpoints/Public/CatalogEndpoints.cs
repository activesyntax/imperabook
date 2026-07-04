using ImperaBook.API.Views;
using ImperaBook.Application.Books;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Endpoints.Public;

public static class CatalogEndpoints
{
    public static IEndpointRouteBuilder MapCatalogEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet(
                "api/books",
                async (IBookQueries books, CancellationToken ct) =>
                    TypedResults.Ok((await books.List(null, null, ct)).ToCommandResult())
            )
            .WithName("ListBooks")
            .Produces<CommandResult>(StatusCodes.Status200OK);

        app.MapGet(
                "api/books/search",
                async (
                    IBookQueries books,
                    Guid? libraryId,
                    string? titleContains,
                    CancellationToken ct
                ) =>
                    TypedResults.Ok(
                        (await books.List(libraryId, titleContains, ct)).ToCommandResult()
                    )
            )
            .WithName("SearchBooks")
            .Produces<CommandResult>(StatusCodes.Status200OK);

        app.MapGet(
                "api/libraries/{libraryId:guid}/books",
                async (IBookQueries books, Guid libraryId, CancellationToken ct) =>
                    TypedResults.Ok((await books.List(libraryId, null, ct)).ToCommandResult())
            )
            .WithName("ListLibraryBooks")
            .Produces<CommandResult>(StatusCodes.Status200OK);

        return app;
    }
}
