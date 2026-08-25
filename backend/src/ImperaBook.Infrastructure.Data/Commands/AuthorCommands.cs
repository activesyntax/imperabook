using CSharpFunctionalExtensions;
using ImperaBook.Application;
using ImperaBook.Domain.Catalog;
using ImperaBook.Infrastructure.Data.Entities;

namespace ImperaBook.Infrastructure.Data.Commands;

public class AuthorWriteRepository : IAuthorWriteRepository
{
    private readonly ImperaBookDbContext _db;

    public AuthorWriteRepository(ImperaBookDbContext db) => _db = db;

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
