using ImperaBook.Application;
using ImperaBook.Application.Books.ReadModel;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Repositories;

public class BookReadRepository : IBookReadRepository
{
    private readonly ImperaBookDbContext _db;

    public BookReadRepository(ImperaBookDbContext db) => _db = db;

    public Task<BookListItem[]> ListAll(CancellationToken ct) => Project(_db.Books, ct);

    public Task<BookListItem[]> ListByLibrary(Guid libraryId, CancellationToken ct) =>
        Project(_db.Books.Where(b => b.LibraryId == libraryId), ct);

    public Task<BookListItem[]> List(Guid? libraryId, string? titleContains, CancellationToken ct)
    {
        IQueryable<BookEntity> query = _db.Books;

        if (libraryId is { } id)
            query = query.Where(b => b.LibraryId == id);

        if (titleContains is not null)
            query = query.Where(b => b.Title.Contains(titleContains));

        return Project(query, ct);
    }

    private static Task<BookListItem[]> Project(
        IQueryable<BookEntity> query,
        CancellationToken ct
    ) =>
        query
            .AsNoTracking()
            .OrderBy(b => b.Title)
            .Select(b => new BookListItem
            {
                Id = b.Id,
                Title = b.Title,
                Subtitle = b.Subtitle,
                AuthorIds = Array.Empty<Guid>(),
                LibraryId = b.LibraryId,
            })
            .ToArrayAsync(ct);
}
