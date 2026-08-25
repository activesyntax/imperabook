using CSharpFunctionalExtensions;

namespace ImperaBook.Domain.Catalog;

public sealed record Author
{
    public Id<Author> Id { get; }
    public Id<User> Owner { get; }
    public Maybe<PersonName> FirstName { get; }
    public PersonName LastName { get; }
    public LifeRange LifeRange { get; }
    public Maybe<ContentHash> Portrait { get; }

    private Author(
        Id<Author> id,
        Id<User> owner,
        Maybe<PersonName> firstName,
        PersonName lastName,
        LifeRange lifeRange,
        Maybe<ContentHash> portrait
    )
    {
        Id = id;
        Owner = owner;
        FirstName = firstName;
        LastName = lastName;
        LifeRange = lifeRange;
        Portrait = portrait;
    }

    public static Author Create(
        Id<Author> id,
        Id<User> owner,
        Maybe<PersonName> firstName,
        PersonName lastName,
        LifeRange lifeRange,
        Maybe<ContentHash> portrait
    ) => new(id, owner, firstName, lastName, lifeRange, portrait);
}
