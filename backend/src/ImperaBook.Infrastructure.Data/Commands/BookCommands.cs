using CSharpFunctionalExtensions;
using ImperaBook.Application;
using ImperaBook.Domain.Catalog;
using ImperaBook.Infrastructure.Data.Entities;

namespace ImperaBook.Infrastructure.Data.Commands;

public class BookCommands : IBookCommands
{
    private readonly ImperaBookDbContext _db;

    public BookCommands(ImperaBookDbContext db) => _db = db;

    public async Task Add(Book book, CancellationToken ct)
    {
        var entity = new BookEntity
        {
            Id = book.Id.Value,
            Title = book.Title.Value,
            Subtitle = book.Subtitle.Map(s => s.Value).GetValueOrDefault(),
            Summary = book.Summary.Map(s => s.Value).GetValueOrDefault(),
            LibraryId = book.Library.Value,
        };

        _db.Books.Add(entity);
        await _db.SaveChangesAsync(ct);
    }
}
