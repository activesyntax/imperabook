using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ImperaBook.Domain;

namespace ImperaBook.Infrastructure.Data.Configurations;

public class BookEntityConfiguration : IEntityTypeConfiguration<BookEntity>
{
    public void Configure(EntityTypeBuilder<BookEntity> builder)
    {
        builder.ToTable("books");
        builder.HasKey(b => b.Id);

        builder.Property(b => b.Title)
            .IsRequired()
            .HasMaxLength(TitleModule.MaxLength);

        builder.Property(b => b.Subtitle)
            .HasMaxLength(SubtitleModule.MaxLength);

        builder.Property(b => b.Summary)
            .HasMaxLength(SummaryModule.MaxLength);

        // LibraryId stays a plain nullable Guid for now — no FK yet,
        // because the libraries table doesn't exist. That comes later.
    }
}