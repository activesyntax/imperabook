using ImperaBook.Application;
using ImperaBook.Domain;
using ImperaBook.Infrastructure.Data.Entities;

namespace ImperaBook.Infrastructure.Data.Repositories;

public class BookWriteRepository : IBookWriteRepository
{
    private readonly ImperaBookDbContext _db;

    public BookWriteRepository(ImperaBookDbContext db) => _db = db;

    public async Task Add(Book book, CancellationToken ct)
    {
        var entity = new BookEntity
        {
            Id = book.Id.Value,
            Title = book.Title.Value,
            Subtitle = book.Subtitle?.Value,
            Summary = book.Summary?.Value,
            LibraryId = book.Location switch
            {
                Location.Library lib => lib.LibraryId.Value,
                Location.Unknown => null,
                _ => throw new InvalidOperationException("Unhandled Location case."),
            },
        };

        _db.Books.Add(entity);
        await _db.SaveChangesAsync(ct);
    }
}
