namespace ImperaBook.Domain;

public sealed record Author
{
    public Id<Author> Id { get; }
    public PersonName? FirstName { get; }
    public PersonName LastName { get; }

    private Author(Id<Author> id, PersonName? firstName, PersonName lastName)
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
    }

    public static Author Create(Id<Author> id, PersonName? firstName, PersonName lastName) =>
        new(id, firstName, lastName);
}
