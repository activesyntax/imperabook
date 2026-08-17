using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data;

public class ImperaBookDbContext(DbContextOptions<ImperaBookDbContext> options)
    : IdentityUserContext<UserEntity, Guid>(options)
{
    public DbSet<BookEntity> Books => Set<BookEntity>();
    public DbSet<AuthorEntity> Authors => Set<AuthorEntity>();
    public DbSet<LibraryEntity> Libraries => Set<LibraryEntity>();
    public DbSet<ImageEntity> Images => Set<ImageEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ImperaBookDbContext).Assembly);
    }
}
