using ImperaBook.Domain;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ImperaBook.Infrastructure.Data.Configurations;

public class LibraryEntityConfiguration : IEntityTypeConfiguration<LibraryEntity>
{
    public void Configure(EntityTypeBuilder<LibraryEntity> builder)
    {
        builder.ToTable("libraries");
        builder.HasKey(l => l.Id);

        builder.Property(l => l.Name).IsRequired().HasMaxLength(LibraryName.MaxLength);

        builder
            .HasOne<UserEntity>()
            .WithMany()
            .HasForeignKey(l => l.OwnerId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
