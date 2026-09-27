using ImperaBook.Application;
using ImperaBook.Infrastructure.Data.Commands;
using ImperaBook.Infrastructure.Data.Images;
using ImperaBook.Infrastructure.Data.Queries;
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
        services.AddDbContext<ImperaBookDbContext>(options =>
            options.UseNpgsql(connectionString).UseSnakeCaseNamingConvention()
        );

        services.AddScoped<IBookCommands, BookCommands>();
        services.AddScoped<IAuthorCommands, AuthorCommands>();
        services.AddScoped<ILibraryQueries, LibraryQueries>();
        services.AddScoped<IUserQueries, UserQueries>();

        services.AddScoped<IDashboardQueries, DashboardQueries>();
        services.AddScoped<IBookQueries, BookQueries>();
        services.AddScoped<IAuthorQueries, AuthorQueries>();
        services.AddScoped<ImageStore>();
        services.AddScoped<IImageStore>(sp => sp.GetRequiredService<ImageStore>());
        services.AddScoped<IArtwork, GeneratedArtwork>();

        return services;
    }
}
