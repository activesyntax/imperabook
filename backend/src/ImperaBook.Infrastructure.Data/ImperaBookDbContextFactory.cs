using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace ImperaBook.Infrastructure.Data;

public class ImperaBookDbContextFactory : IDesignTimeDbContextFactory<ImperaBookDbContext>
{
    public ImperaBookDbContext CreateDbContext(string[] args)
    {
        var connectionString =
            Environment.GetEnvironmentVariable("IMPERABOOK_DB")
            ?? "Host=localhost;Port=5432;Database=imperabook;Username=imperabook;Password=imperabook";

        var options = new DbContextOptionsBuilder<ImperaBookDbContext>()
            .UseNpgsql(connectionString)
            .Options;

        return new ImperaBookDbContext(options);
    }
} 