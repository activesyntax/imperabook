namespace ImperaBook.Application.Authors;

public interface IAuthorQueries
{
    Task<AuthorListItem[]> List(Guid? libraryId, string? titleContains, CancellationToken ct);
}
