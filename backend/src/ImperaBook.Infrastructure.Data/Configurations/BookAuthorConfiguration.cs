using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public sealed class BookAuthorConfiguration : IEntityTypeConfiguration<BookAuthorEntity>
{
    public void Configure(EntityTypeBuilder<BookAuthorEntity> builder)
    {
        builder.ToTable("book_authors");

        builder.HasKey(ba => new { ba.BookId, ba.AuthorId });

        builder
            .HasOne(ba => ba.Book)
            .WithMany(b => b.Authors)
            .HasForeignKey(ba => ba.BookId)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasOne(ba => ba.Author)
            .WithMany()
            .HasForeignKey(ba => ba.AuthorId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
