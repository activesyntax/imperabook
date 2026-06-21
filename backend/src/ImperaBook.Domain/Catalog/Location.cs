namespace ImperaBook.Domain.Catalog;

public abstract record Location
{
    private Location() { }

    public sealed record AtLibrary(Id<Library> LibraryId) : Location;

    public sealed record Unknown : Location;
}
