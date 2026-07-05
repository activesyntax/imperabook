namespace ImperaBook.Infrastructure.Data.Entities;

public class AuthorEntity
{
    public Guid Id { get; set; }
    public string? FisrtName { get; set; }
    public string LastName { get; set; } = "";
}

