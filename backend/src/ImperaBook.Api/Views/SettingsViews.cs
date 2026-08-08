using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

public sealed class Settings { }

public static class SettingsViews
{
    public static CommandResult ToCommandResult(this Settings settings) =>
        new(new ViewNode[] { new HeadingView("Settigs") });
}
