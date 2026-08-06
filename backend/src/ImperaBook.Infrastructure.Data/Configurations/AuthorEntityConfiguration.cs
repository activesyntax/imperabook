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
    }
}
