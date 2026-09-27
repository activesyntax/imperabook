namespace ImperaBook.Application;

public enum VitalityKind
{
    Unknown = 0,
    Living = 1,
    Deceased = 2,
}

public sealed record AuthorName(string? FirstName, string LastName);

public sealed record AuthorListItem(
    Guid Id,
    string? FirstName,
    string LastName,
    string? PortraitHash,
    int? BirthYear,
    VitalityKind Vitality,
    int? DeathYear
);

public interface IAuthorQueries
{
    Task<AuthorListItem[]> List(CancellationToken ct);

    /// <summary>
    /// The current user's authors whose full name contains <paramref name="term"/>, ignoring case.
    /// </summary>
    Task<AuthorListItem[]> Search(string term, CancellationToken ct);
}
