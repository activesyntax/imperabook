using Microsoft.AspNetCore.Identity;

namespace ImperaBook.Infrastructure.Data.Entities;

public class UserEntity : IdentityUser<Guid>
{
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
}
