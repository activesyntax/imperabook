using ImperaBook.Application;
using ImperaBook.Infrastructure.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace ImperaBook.Infrastructure.Data;

public static class InfrastructureServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        string connectionString
    )
    {
        services.AddDbContext<ImperaBookDbContext>(options => options.UseNpgsql(connectionString));

        services.AddScoped<IBookWriteRepository, BookWriteRepository>();
        services.AddScoped<ILibraryRepository, LibraryRepository>();

        return services;
    }
}
