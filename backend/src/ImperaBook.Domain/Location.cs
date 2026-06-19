namespace ImperaBook.Domain;

public abstract record Location
{
    private Location() { }

    // The case is Location.Library; the payload is the Library aggregate.
    // Inside this type the bare name "Library" would resolve to the nested case, so the
    // aggregate is fully qualified. This is the C# counterpart of the F# [<RequireQualifiedAccess>] collision.
    public sealed record Library(Id<ImperaBook.Domain.Library> LibraryId) : Location;
    public sealed record Unknown : Location;
}
