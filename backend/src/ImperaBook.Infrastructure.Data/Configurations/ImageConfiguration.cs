using ImperaBook.Domain.Catalog;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public sealed class ImageConfiguration : IEntityTypeConfiguration<ImageEntity>
{
    public void Configure(EntityTypeBuilder<ImageEntity> builder)
    {
        builder.ToTable("images");
        builder.HasKey(c => c.Hash);

        builder.Property(c => c.Hash).HasMaxLength(ContentHash.Length).IsFixedLength();
        builder.Property(c => c.MediaType).HasMaxLength(100);
        builder.Property(c => c.CreatedAt).HasDefaultValueSql("now()");

        builder.Property(c => c.Bytes).HasColumnType("bytea");
    }
}
