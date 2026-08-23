namespace ImperaBook.Application;

public sealed record SessionOwner(string? FirstName, string LastName, string? LibraryName);

public interface IUserQueries
{
    Task<SessionOwner> GetOwner(CancellationToken ct);
}
