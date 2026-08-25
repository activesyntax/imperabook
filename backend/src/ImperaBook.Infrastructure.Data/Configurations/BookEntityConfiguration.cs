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
        builder.Property(x => x.Isbn).HasMaxLength(13).IsFixedLength();
        builder.Property(x => x.Publisher).HasMaxLength(Publisher.MaxLength);
        builder.Property(x => x.Language).HasMaxLength(2).IsFixedLength();

        builder.ToTable(t =>
        {
            t.HasCheckConstraint(
                "ck_books_page_count",
                "page_count is null or (page_count between 1 and 20000)"
            );
            t.HasCheckConstraint(
                "ck_books_published_year",
                "published_year is null or (published_year between -3000 and 2200)"
            );
        });

        builder.HasIndex(x => x.Language);
    }
}
