using CSharpFunctionalExtensions;
using ImperaBook.Application;
using ImperaBook.Domain.Catalog;
using ImperaBook.Infrastructure.Data.Entities;

namespace ImperaBook.Infrastructure.Data.Repositories;

public class AuthorWriteRepository : IAuthorWriteRepository
{
    private readonly ImperaBookDbContext _db;

    public AuthorWriteRepository(ImperaBookDbContext db) => _db = db;

    public async Task Add(Author author, CancellationToken ct)
    {
        var entity = new AuthorEntity
        {
            Id = author.Id.Value,
            FisrtName = author.FirstName.Map(fn => fn.Value).GetValueOrDefault(),
            LastName = author.LastName.Value,
        };

        _db.Authors.Add(entity);
        await _db.SaveChangesAsync(ct);
    }
}
