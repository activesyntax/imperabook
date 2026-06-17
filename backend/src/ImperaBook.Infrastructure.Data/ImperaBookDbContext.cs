using Microsoft.EntityFrameworkCore;
using ImperaBook.Infrastructure.Data.Entities;

namespace ImperaBook.Infrastructure.Data;

public class ImperaBookDbContext(DbContextOptions<ImperaBookDbContext> options) : DbContext(options)
{
    public DbSet<BookEntity> Books => Set<BookEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ImperaBookDbContext).Assembly);
    }
}