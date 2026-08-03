using ImperaBook.Application;
using ImperaBook.Application.Authors;
using ImperaBook.Application.Books;
using ImperaBook.Application.Dashboard;
using ImperaBook.Application.Images;
using ImperaBook.Infrastructure.Data.Images;
using ImperaBook.Infrastructure.Data.Queries;
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
        services.AddScoped<IAuthorWriteRepository, AuthorWriteRepository>();
        services.AddScoped<ILibraryRepository, LibraryRepository>();

        services.AddScoped<IDashboardQueries, DashboardQueries>();
        services.AddScoped<IBookQueries, BookQueries>();
        services.AddScoped<IAuthorQueries, AuthorQueries>();
        services.AddScoped<IImageStore, ImageStore>();

        return services;
    }
}
