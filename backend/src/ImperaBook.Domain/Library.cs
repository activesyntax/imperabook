namespace ImperaBook.Domain;

public sealed record Library
{
    public Id<Library> Id { get; }
    public Id<User> OwnerId { get; }
    public LibraryName Name { get; }

    private Library(Id<Library> id, Id<User> ownerId, LibraryName name)
    {
        Id = id;
        OwnerId = ownerId;
        Name = name;
    }

    public static Library Create(Id<Library> id, Id<User> ownerId, LibraryName name) =>
        new(id, ownerId, name);
}
