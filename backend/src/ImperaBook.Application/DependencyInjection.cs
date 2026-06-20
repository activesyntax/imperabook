using ImperaBook.Application.Books;
using Microsoft.Extensions.DependencyInjection;

namespace ImperaBook.Application;

public static class ApplicationServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<AddBookCommandHandler>();
        services.AddScoped<GetBooksQueryHandler>();
        services.AddScoped<GetAllBooksQueryHandler>();
        services.AddScoped<GetLibraryBooksQueryHandler>();
        return services;
    }
}
