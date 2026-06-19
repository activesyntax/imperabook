using ImperaBook.Application;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Repositories;

public class LibraryRepository : ILibraryRepository
{
    private readonly ImperaBookDbContext _db;

    public LibraryRepository(ImperaBookDbContext db) => _db = db;

    public Task<bool> Exists(Guid id, CancellationToken ct) =>
        _db.Libraries.AnyAsync(l => l.Id == id, ct);
}
