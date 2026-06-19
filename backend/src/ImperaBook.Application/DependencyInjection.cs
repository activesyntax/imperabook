using Microsoft.Extensions.DependencyInjection;
using ImperaBook.Application.Books;

namespace ImperaBook.Application;

public static class ApplicationServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<AddBookHandler>();
        services.AddScoped<GetBooksHandler>();
        services.AddScoped<GetAllBooksHandler>();
        services.AddScoped<GetLibraryBooksHandler>();
        return services;
    }
}
