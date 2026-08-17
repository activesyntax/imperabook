using ImperaBook.Domain.Catalog;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ImperaBook.Infrastructure.Data.Configurations;

public sealed class LibraryEntityConfiguration : IEntityTypeConfiguration<LibraryEntity>
{
    public void Configure(EntityTypeBuilder<LibraryEntity> builder)
    {
        builder.ToTable("libraries");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Name).HasMaxLength(LibraryName.MaxLength).IsRequired();

        builder.Property(x => x.OwnerId).IsRequired();

        builder.Property(x => x.PhotoHash).HasColumnType("char(64)");

        builder.HasIndex(x => x.OwnerId);

        builder
            .HasOne<UserEntity>()
            .WithMany()
            .HasForeignKey(x => x.OwnerId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
