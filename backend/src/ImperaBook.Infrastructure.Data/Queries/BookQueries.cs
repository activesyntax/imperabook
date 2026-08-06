using ImperaBook.Application;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Queries;

public sealed class BookQueries(ImperaBookDbContext db) : IBookQueries
{
    public Task<BookListItem[]> List(Guid? libraryId, string? titleContains, CancellationToken ct)
    {
        var title = string.IsNullOrWhiteSpace(titleContains) ? null : titleContains.Trim();

        var q = db.Books.AsNoTracking();

        if (libraryId is { } lib)
            q = q.Where(b => b.LibraryId == lib);

        if (title is not null)
            q = q.Where(b => EF.Functions.ILike(b.Title, $"%{title}%"));

        return q.OrderBy(b => b.Title)
            .Select(b => new BookListItem
            {
                Id = b.Id,
                Title = b.Title,
                Subtitle = b.Subtitle,
                // TODO(author-feature): project real author names once the Book↔Author
                // relationship lands. Empty until then — the read path carries no author
                // data rather than a wrong one. See COMMANDS.md open question (find-or-create).
                AuthorNames = Array.Empty<string>(),
                LibraryId = b.LibraryId,
                CoverHash = b.CoverHash,
            })
            .ToArrayAsync(ct);
    }
}
