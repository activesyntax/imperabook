using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data;

public class ImperaBookDbContext(DbContextOptions<ImperaBookDbContext> options) : DbContext(options)
{
    public DbSet<BookEntity> Books => Set<BookEntity>();
    public DbSet<UserEntity> Users => Set<UserEntity>();
    public DbSet<LibraryEntity> Libraries => Set<LibraryEntity>();

    public object Authors { get; internal set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ImperaBookDbContext).Assembly);
    }
}
