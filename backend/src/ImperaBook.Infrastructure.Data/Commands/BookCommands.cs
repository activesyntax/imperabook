using CSharpFunctionalExtensions;
using ImperaBook.Application;
using ImperaBook.Domain;
using ImperaBook.Domain.Catalog;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Commands;

public class BookCommands : IBookCommands
{
    private readonly ImperaBookDbContext _db;
    private readonly ICurrentUser _user;

    public BookCommands(ImperaBookDbContext db, ICurrentUser user) => (_db, _user) = (db, user);

    // Scoped by owner here too, not only by the caller: a delete is the last place a missing
    // check would do harm. book_authors rows go by the database's ON DELETE CASCADE. The cover
    // stays: images are content-addressed and may be another book's too.
    public async Task<bool> Remove(Id<Book> id, CancellationToken ct) =>
        await _db
            .Books.Where(b =>
                b.Id == id.Value
                && _db.Libraries.Any(l => l.Id == b.LibraryId && l.OwnerId == _user.Id)
            )
            .ExecuteDeleteAsync(ct) > 0;

    public async Task Add(Book book, CancellationToken ct)
    {
        var entity = new BookEntity
        {
            Id = book.Id.Value,
            Title = book.Title.Value,
            Subtitle = book.Subtitle.Map(s => s.Value).GetValueOrDefault(),
            Summary = book.Summary.Map(s => s.Value).GetValueOrDefault(),
            LibraryId = book.Library.Value,
            CoverHash = book.Cover.Map(h => h.Value).GetValueOrDefault(),
            Isbn = book.Isbn.Map(i => i.Value).GetValueOrDefault(),
            PublishedYear = book.Published.Map(y => (int?)y.Value).GetValueOrDefault(null),
            Publisher = book.Publisher.Map(p => p.Value).GetValueOrDefault(),
            Language = book.Language.Map(l => l.Value).GetValueOrDefault(),
            PageCount = book.Pages.Map(p => (int?)p.Value).GetValueOrDefault(null),
            Authors = book
                .Attribution.AuthorIds()
                .Select((author, i) => new BookAuthorEntity { AuthorId = author.Value, Ordinal = i })
                .ToList(),
        };

        _db.Books.Add(entity);
        await _db.SaveChangesAsync(ct);
    }
}
