namespace ImperaBook.Domain;

public sealed record LibraryOwner
{
    public Id<LibraryOwner> Id { get; }
    public PersonName FirstName { get; }
    public PersonName LastName { get; }

    private LibraryOwner(Id<LibraryOwner> id, PersonName firstName, PersonName lastName)
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
    }

    public static LibraryOwner Create(Id<LibraryOwner> id, PersonName firstName, PersonName lastName) =>
        new(id, firstName, lastName);
}

public sealed record Library
{
    public Id<Library> Id { get; }
    public LibraryOwner Owner { get; }
    public LibraryName Name { get; }

    private Library(Id<Library> id, LibraryOwner owner, LibraryName name)
    {
        Id = id;
        Owner = owner;
        Name = name;
    }

    public static Library Create(Id<Library> id, LibraryOwner owner, LibraryName name) =>
        new(id, owner, name);
}
