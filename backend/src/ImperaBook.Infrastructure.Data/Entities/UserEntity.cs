namespace ImperaBook.Infrastructure.Data.Entities;

public class UserEntity
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
}
