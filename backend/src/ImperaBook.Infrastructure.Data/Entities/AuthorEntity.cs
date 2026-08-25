using ImperaBook.Application;

namespace ImperaBook.Infrastructure.Data.Entities;

public class AuthorEntity
{
    public Guid Id { get; set; }
    public Guid OwnerId { get; set; }
    public string? FirstName { get; set; }
    public string LastName { get; set; } = "";
    public string? PortraitHash { get; set; }

    public int? BirthYear { get; set; }
    public VitalityKind Vitality { get; set; } = VitalityKind.Unknown;
    public int? DeathYear { get; set; }
}
