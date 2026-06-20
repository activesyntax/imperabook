using Microsoft.Extensions.DependencyInjection;
using ImperaBook.Application.Books.Commands;
using ImperaBook.Application.Books.Queries;

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
