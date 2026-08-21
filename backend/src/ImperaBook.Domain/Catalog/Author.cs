using CSharpFunctionalExtensions;

namespace ImperaBook.Domain.Catalog;

public sealed record Author
{
    public Id<Author> Id { get; }
    public Id<User> Owner { get; }
    public Maybe<PersonName> FirstName { get; }
    public PersonName LastName { get; }

    private Author(Id<Author> id, Id<User> owner, Maybe<PersonName> firstName, PersonName lastName)
    {
        Id = id;
        Owner = owner;
        FirstName = firstName;
        LastName = lastName;
    }

    public static Author Create(
        Id<Author> id,
        Id<User> owner,
        Maybe<PersonName> firstName,
        PersonName lastName
    ) => new(id, owner, firstName, lastName);
}
