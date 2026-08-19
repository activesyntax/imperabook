using ImperaBook.Infrastructure.Data;
using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;

namespace ImperaBook.Api.Authentication;

public static class AuthenticationServiceCollectionExtensions
{
    // Identity registration lives in the API layer, not in Infrastructure: SignInManager
    // and SecurityStampValidator ship in the ASP.NET Core shared framework because their
    // job is HTTP — issuing and validating a cookie on an HttpContext. Putting them in
    // the persistence library would mean a FrameworkReference to the whole web stack
    // from a project whose only concern is rows. The EF store below is the one line that
    // reaches back into Infrastructure, and it reaches only for the DbContext.
    public static IServiceCollection AddImperaBookAuthentication(
        this IServiceCollection services,
        IWebHostEnvironment environment
    )
    {
        services
            .AddIdentityCore<UserEntity>(options =>
            {
                options.User.RequireUniqueEmail = true;

                // Defaults, restated explicitly. The point is not the values — it is that
                // a password policy silently inherited from a framework default is a
                // policy nobody decided on.
                options.Password.RequiredLength = 8;
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = false;

                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
            })
            .AddEntityFrameworkStores<ImperaBookDbContext>()
            .AddSignInManager();

        // AddIdentityCore does not register this; AddIdentity would. The Identity cookie's
        // OnValidatePrincipal calls into it on every request, so its absence is a runtime
        // failure on the first authenticated call, not a startup one.
        services.AddScoped<ISecurityStampValidator, SecurityStampValidator<UserEntity>>();

        // The default is 30 minutes, which would mean a session survives half an hour past
        // a password change. Revocation is the reason cookie auth was chosen over JWT
        // (ADR 24), so the interval is what makes that claim true.
        services.Configure<SecurityStampValidatorOptions>(options =>
        {
            options.ValidationInterval = TimeSpan.FromMinutes(5);
        });

        services
            .AddDataProtection()
            .PersistKeysToDbContext<ImperaBookDbContext>()
            // Without this the key ring is scoped to the entry assembly name. Renaming the
            // assembly would then silently invalidate every existing cookie — a rename is not
            // supposed to be a logout event.
            .SetApplicationName("ImperaBook");

        services.AddAuthentication(IdentityConstants.ApplicationScheme).AddIdentityCookies();

        services.ConfigureApplicationCookie(options =>
        {
            options.Cookie.Name = "imperabook.session";
            options.Cookie.HttpOnly = true;
            options.Cookie.SameSite = SameSiteMode.Lax;

            // Always in production, where the demo runs behind HTTPS. SameAsRequest in
            // development because a browser will not store a Secure cookie over plain
            // http://localhost — the login would report success and the session would
            // never exist. A self-hosted LAN instance on plain HTTP is the case this
            // will have to answer for again; today it is served by not being production.
            options.Cookie.SecurePolicy = environment.IsDevelopment()
                ? CookieSecurePolicy.SameAsRequest
                : CookieSecurePolicy.Always;

            options.ExpireTimeSpan = TimeSpan.FromDays(14);
            options.SlidingExpiration = true;

            // Without these, an unauthenticated call gets a 302 to a Razor page that does
            // not exist, and the frontend parses an HTML 404 as a command response.
            options.Events.OnRedirectToLogin = context =>
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return Task.CompletedTask;
            };

            options.Events.OnRedirectToAccessDenied = context =>
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                return Task.CompletedTask;
            };
        });

        services.AddAuthorization(options =>
        {
            // Default-deny: an endpoint added later without AllowAnonymous is closed.
            // Opening one is an explicit, greppable act.
            options.FallbackPolicy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .Build();
        });

        return services;
    }
}
