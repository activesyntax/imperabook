using CSharpFunctionalExtensions;

namespace ImperaBook.Domain.Catalog;

public abstract record Vitality
{
    private Vitality() { }

    public sealed record Unknown : Vitality;

    public sealed record Living : Vitality;

    public sealed record Deceased(Maybe<Year> Death) : Vitality;
}

public sealed record LifeRange
{
    public Maybe<Year> Birth { get; }
    public Vitality Vitality { get; }

    private LifeRange(Maybe<Year> birth, Vitality vitality) =>
        (Birth, Vitality) = (birth, vitality);

    public static LifeRange Unrecorded { get; } = new(Maybe<Year>.None, new Vitality.Unknown());

    public static Result<LifeRange, CatalogValidationError> Create(
        Maybe<Year> birth,
        Vitality vitality
    )
    {
        if (
            birth.TryGetValue(out var b)
            && vitality is Vitality.Deceased { Death: { HasValue: true } death }
            && death.Value.Value < b.Value
        )
            return new CatalogValidationError.DeathBeforeBirth(b.Value, death.Value.Value);

        return new LifeRange(birth, vitality);
    }
}
