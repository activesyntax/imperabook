namespace ImperaBook.Application.Authors;

public interface IAuthorQueries
{
    Task<AuthorListItem[]> List(Guid? libraryId, string? query, CancellationToken ct);
}
