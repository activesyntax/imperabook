using ImperaBook.Domain;
using ImperaBook.Domain.Catalog;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ImperaBook.Infrastructure.Data.Configurations;

public class AuthorEntityConfiguration : IEntityTypeConfiguration<AuthorEntity>
{
    public void Configure(EntityTypeBuilder<AuthorEntity> builder)
    {
        builder.ToTable("authors");
        builder.HasKey(a => a.Id);

        builder.Property(a => a.FirstName).HasMaxLength(PersonName.MaxLength);

        builder.Property(a => a.LastName).HasMaxLength(PersonName.MaxLength);

        builder.Property(b => b.PortraitHash).HasMaxLength(ContentHash.Length).IsFixedLength();
        builder.Property(a => a.Vitality).HasConversion<string>().HasMaxLength(16).IsRequired();

        builder.ToTable(t =>
            t.HasCheckConstraint(
                "ck_authors_vitality_death",
                "vitality = 'Deceased' or death_year is null"
            )
        );
    }
}
