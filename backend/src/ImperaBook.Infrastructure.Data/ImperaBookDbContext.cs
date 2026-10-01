using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.AspNetCore.DataProtection.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data;

public class ImperaBookDbContext(DbContextOptions<ImperaBookDbContext> options)
    : IdentityUserContext<UserEntity, Guid>(options),
        IDataProtectionKeyContext
{
    public DbSet<BookEntity> Books => Set<BookEntity>();
    public DbSet<AuthorEntity> Authors => Set<AuthorEntity>();
    public DbSet<LibraryEntity> Libraries => Set<LibraryEntity>();
    public DbSet<ImageEntity> Images => Set<ImageEntity>();

    // The auth cookie is encrypted with this key ring. Kept in the database rather than
    // on a mounted volume for the reason ADR 19 gave the image bytes: with split storage
    // the characteristic self-hosting accident is a pg_dump taken without the volume,
    // restored — and every session silently invalid. One artifact, one backup.
    public DbSet<DataProtectionKey> DataProtectionKeys => Set<DataProtectionKey>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Accent-insensitive search: "barany" finds Bárány (see CatalogSearch, AuthorQueries).
        modelBuilder.HasPostgresExtension("unaccent");

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ImperaBookDbContext).Assembly);
    }
}
