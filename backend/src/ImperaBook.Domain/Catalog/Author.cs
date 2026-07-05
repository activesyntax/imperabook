using CSharpFunctionalExtensions;

namespace ImperaBook.Domain.Catalog;

public sealed record Author
{
    public Id<Author> Id { get; }
    public Maybe<PersonName> FirstName { get; }
    public PersonName LastName { get; }

    private Author(Id<Author> id, Maybe<PersonName> firstName, PersonName lastName)
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
    }

    public static Author Create(Id<Author> id, Maybe<PersonName> firstName, PersonName lastName) =>
        new(id, firstName, lastName);
}
