using ImperaBook.Domain.Catalog;
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

        builder.Property(b => b.Title).IsRequired().HasMaxLength(Title.MaxLength);

        builder.Property(b => b.Subtitle).HasMaxLength(Subtitle.MaxLength);

        builder.Property(b => b.Summary).HasMaxLength(Summary.MaxLength);

        builder.Property(b => b.CoverHash).HasMaxLength(ContentHash.Length).IsFixedLength();

        // LibraryId stays a plain nullable Guid for now — no FK yet,
        // because the libraries table doesn't exist. That comes later.
        //
    }
}
