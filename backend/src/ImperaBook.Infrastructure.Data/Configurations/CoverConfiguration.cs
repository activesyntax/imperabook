using ImperaBook.Domain.Catalog;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public sealed class CoverConfiguration : IEntityTypeConfiguration<CoverEntity>
{
    public void Configure(EntityTypeBuilder<CoverEntity> builder)
    {
        builder.ToTable("covers");
        builder.HasKey(c => c.Hash);

        builder.Property(c => c.Hash).HasMaxLength(ContentHash.Length).IsFixedLength();
        builder.Property(c => c.Blurhash).HasMaxLength(Blurhash.MaxLength);
        builder.Property(c => c.MediaType).HasMaxLength(100);
        builder.Property(c => c.CreatedAt).HasDefaultValueSql("now()");

        builder.Property(c => c.Bytes).HasColumnType("bytea");
    }
}
