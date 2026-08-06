using ImperaBook.Application.Books;
using Microsoft.Extensions.DependencyInjection;

namespace ImperaBook.Application;

public static class ApplicationServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        return services;
    }
}
