using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ImperaBook.Infrastructure.Data.Configurations;

public class BookEntityConfiguration : IEntityTypeConfiguration<BookEntity>
{
    public void Configure(EntityTypeBuilder<BookEntity> builder)
    {
        builder.ToTable("books");
        builder.HasKey(b => b.Id);

        builder.Property(b => b.Title)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(b => b.Subtitle)
            .HasMaxLength(500);

        builder.Property(b => b.Summary)
            .HasMaxLength(4000);

        // LibraryId stays a plain nullable Guid for now — no FK yet,
        // because the libraries table doesn't exist. That comes later.
    }
}