using CSharpFunctionalExtensions;
using ImperaBook.Application;
using ImperaBook.Domain;
using ImperaBook.Domain.Catalog;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data.Commands;

public class AuthorCommands : IAuthorCommands
{
    private readonly ImperaBookDbContext _db;
    private readonly ICurrentUser _user;

    public AuthorCommands(ImperaBookDbContext db, ICurrentUser user) => (_db, _user) = (db, user);

    // One transaction: the links go first (book_authors restricts deleting an author still
    // linked), then the author. A book whose only author this was keeps its place in the
    // library with its attribution now unknown — "list books having no author" finds it. The
    // portrait stays: images are content-addressed and may be shared.
    public async Task<int?> Remove(Id<Author> id, CancellationToken ct)
    {
        await using var tx = await _db.Database.BeginTransactionAsync(ct);

        var owned = await _db.Authors.AnyAsync(a => a.Id == id.Value && a.OwnerId == _user.Id, ct);
        if (!owned)
            return null;

        var links = _db.Set<BookAuthorEntity>();
        var leftWithoutAuthor = await _db.Books.CountAsync(
            b => links.Any(ba => ba.BookId == b.Id && ba.AuthorId == id.Value)
                && !links.Any(ba => ba.BookId == b.Id && ba.AuthorId != id.Value),
            ct
        );

        await links.Where(ba => ba.AuthorId == id.Value).ExecuteDeleteAsync(ct);
        await _db.Authors.Where(a => a.Id == id.Value).ExecuteDeleteAsync(ct);

        await tx.CommitAsync(ct);
        return leftWithoutAuthor;
    }

    public async Task Add(Author author, CancellationToken ct)
    {
        var entity = new AuthorEntity
        {
            Id = author.Id.Value,
            OwnerId = author.Owner.Value,
            FirstName = author.FirstName.Map(fn => fn.Value).GetValueOrDefault(),
            LastName = author.LastName.Value,
            PortraitHash = author.Portrait.Map(h => h.Value).GetValueOrDefault(),
        };

        ApplyLifeRange(entity, author.LifeRange);

        _db.Authors.Add(entity);
        await _db.SaveChangesAsync(ct);
    }

    private static void ApplyLifeRange(AuthorEntity e, LifeRange lifeRange)
    {
        e.BirthYear = lifeRange.Birth.Map(y => (int?)y.Value).GetValueOrDefault(null);

        switch (lifeRange.Vitality)
        {
            case Vitality.Unknown:
                e.Vitality = VitalityKind.Unknown;
                e.DeathYear = null;
                break;

            case Vitality.Living:
                e.Vitality = VitalityKind.Living;
                e.DeathYear = null;
                break;

            case Vitality.Deceased d:
                e.Vitality = VitalityKind.Deceased;
                e.DeathYear = d.Death.Map(y => (int?)y.Value).GetValueOrDefault(null);
                break;

            default:
                throw new InvalidOperationException(
                    $"Unmapped vitality case: {lifeRange.Vitality.GetType().Name}"
                );
        }
    }

    private static LifeRange ToLifeRange(AuthorEntity e) =>
        LifeRange
            .Create(ToYear(e.BirthYear), ToVitality(e))
            .Match(
                ok => ok,
                error =>
                    throw new InvalidOperationException(
                        $"Corrupt life range on author {e.Id}: {error}"
                    )
            );

    private static Vitality ToVitality(AuthorEntity e) =>
        e.Vitality switch
        {
            VitalityKind.Unknown => new Vitality.Unknown(),
            VitalityKind.Living => new Vitality.Living(),
            VitalityKind.Deceased => new Vitality.Deceased(ToYear(e.DeathYear)),
            _ => throw new InvalidOperationException($"Unmapped vitality kind: {e.Vitality}"),
        };

    private static Maybe<Year> ToYear(int? value)
    {
        return value switch
        {
            null => Maybe<Year>.None,
            int y => Year.Create(y)
                .Match(
                    ok => Maybe<Year>.From(ok),
                    error => throw new InvalidOperationException($"Corrupt year {y}: {error}")
                ),
        };
    }
}
