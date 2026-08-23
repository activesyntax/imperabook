using ImperaBook.API.Endpoints;
using ImperaBook.Application;

namespace ImperaBook.API.Views;

internal static class SessionViews
{
    internal static SessionView ToSessionView(this SessionOwner owner) =>
        new(
            DisplayName: string.IsNullOrWhiteSpace(owner.FirstName)
                ? owner.LastName
                : $"{owner.FirstName} {owner.LastName}",
            LibraryName: owner.LibraryName ?? "Home Library"
        );
}
