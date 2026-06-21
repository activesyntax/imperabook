using ImperaBook.Domain.Catalog;

namespace ImperaBook.Domain;

public sealed record User
{
    public Id<User> Id { get; }
    public PersonName FirstName { get; }
    public PersonName LastName { get; }

    private User(Id<User> id, PersonName firstName, PersonName lastName)
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
    }

    public static User Create(Id<User> id, PersonName firstName, PersonName lastName) =>
        new(id, firstName, lastName);
}
