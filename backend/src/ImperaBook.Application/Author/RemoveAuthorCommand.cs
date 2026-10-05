using CSharpFunctionalExtensions;
using ImperaBook.Domain;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application;

/// <param name="BooksLeftWithoutAuthor">Books whose only author this was: their author is now unknown.</param>
public sealed record AuthorRemoved(Guid Id, string Name, int BooksLeftWithoutAuthor);

/// <summary>
/// Removes an author from the current user's catalog. Their books stay; a book they were the
/// only author of is left with its author unknown.
/// </summary>
public sealed class RemoveAuthorCommandHandler(IAuthorQueries authors, IAuthorCommands commands)
{
    public async Task<Result<AuthorRemoved, ApplicationError>> Handle(Guid id, CancellationToken ct)
    {
        // Looked up first for the name the reply gives; owner-scoped, so another user's author is
        // as missing as one that never existed.
        var author = await authors.Get(id, ct);
        if (author.HasNoValue)
            return new ApplicationError.AuthorNotFound();

        var a = author.Value.Author;
        var name = string.IsNullOrWhiteSpace(a.FirstName) ? a.LastName : $"{a.FirstName} {a.LastName}";

        // Gone between the two calls (removed elsewhere): still not found, not an error.
        return await commands.Remove(Id<Author>.From(id), ct) is { } left
            ? new AuthorRemoved(id, name, left)
            : new ApplicationError.AuthorNotFound();
    }
}
