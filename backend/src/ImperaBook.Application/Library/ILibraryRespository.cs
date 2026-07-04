namespace ImperaBook.Application;

public interface ILibraryRepository
{
    Task<bool> Exists(Guid id, CancellationToken ct);
}
