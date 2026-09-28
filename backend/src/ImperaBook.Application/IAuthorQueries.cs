using CSharpFunctionalExtensions;

namespace ImperaBook.Application;

public enum VitalityKind
{
    Unknown = 0,
    Living = 1,
    Deceased = 2,
}

public sealed record AuthorListItem(
    Guid Id,
    string? FirstName,
    string LastName,
    string? PortraitHash,
    int? BirthYear,
    VitalityKind Vitality,
    int? DeathYear
);

/// <summary>One author in full: the list row's facts plus the books they are credited on.</summary>
public sealed record AuthorDetail(AuthorListItem Author, IReadOnlyList<BookListItem> Books);

public interface IAuthorQueries
{
    Task<AuthorListItem[]> List(CancellationToken ct);

    /// <summary>The current user's author with that id, or none.</summary>
    Task<Maybe<AuthorDetail>> Get(Guid id, CancellationToken ct);

    /// <summary>
    /// The current user's authors whose full name contains <paramref name="term"/>, ignoring case.
    /// </summary>
    Task<AuthorListItem[]> Search(string term, CancellationToken ct);
}
