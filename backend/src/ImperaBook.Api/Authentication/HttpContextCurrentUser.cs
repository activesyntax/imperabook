using System.Security.Claims;
using ImperaBook.Application;

namespace ImperaBook.Api.Authentication;

public sealed class HttpContextCurrentUser(IHttpContextAccessor accessor) : ICurrentUser
{
    public Guid Id
    {
        get
        {
            var principal = accessor.HttpContext?.User;
            var subject = principal?.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!Guid.TryParse(subject, out var id))
            {
                throw new InvalidOperationException(
                    "No authenticated user on the current request, or the principal carries no parseable user id."
                );
            }

            return id;
        }
    }
}
