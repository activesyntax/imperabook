using ImperaBook.Domain;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ImperaBook.Infrastructure.Data.Configurations;

public class UserEntityConfiguration : IEntityTypeConfiguration<UserEntity>
{
    public void Configure(EntityTypeBuilder<UserEntity> builder)
    {
        builder.ToTable("users");

        builder.Property(u => u.FirstName).IsRequired().HasMaxLength(PersonName.MaxLength);

        builder.Property(u => u.LastName).IsRequired().HasMaxLength(PersonName.MaxLength);

        builder
            .HasIndex(u => u.NormalizedUserName)
            .HasDatabaseName("ix_users_normalized_user_name");
        builder.HasIndex(u => u.NormalizedEmail).HasDatabaseName("ix_users_normalized_email");
    }
}
