using System.Text.Json.Serialization;

namespace ImperaBook.API.Data;

public enum CommandGroup
{
    Dynamic,
    Fixed,
    Account,
    Application,
}

public enum CredentialRole
{
    Username,
    Password,
}

public enum CommandAccess
{
    Authenticated,
    Anonymous,
}

public sealed record CommandDescriptor(
    string Command,
    string Description,
    IReadOnlyList<CommandParameter> Parameters
)
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public CommandGroup? Group { get; init; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? Order { get; init; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Endpoint { get; init; }

    [JsonIgnore]
    public CommandAccess Access { get; init; }

    public bool RefreshesSession { get; init; }
}

public sealed record CommandParameter(
    string Name,
    string DisplayName,
    string Connective,
    bool Required
)
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Hint { get; init; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Example { get; init; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public CredentialRole? Credential { get; init; }
}

public static class CommandCatalog
{
    static CommandCatalog()
    {
        // Static field initializers run in declaration order, so a descriptor referenced
        // by All before its own field is initialized lands in the list as null — and the
        // failure surfaces later, elsewhere, as a NullReferenceException over the catalog.
        // Better here, at startup, naming the problem.
        if (All.Any(c => c is null))
        {
            throw new InvalidOperationException(
                "CommandCatalog.All contains a null entry: a referenced descriptor is declared after All."
            );
        }
    }

    public static readonly CommandDescriptor Login = new(
        "login",
        "Enter into your library",
        [
            // new("username", "Username", true)
            // {
            //     Hint = "Please provide your username",
            //     Example = "johndoe",
            //     Credential = CredentialRole.Username,
            // },
            // new("password", "Password", true)
            // {
            //     Hint = "Please provide your password",
            //     Credential = CredentialRole.Password,
            // },
        ]
    )
    {
        Group = CommandGroup.Account,
        Order = 2,
        Endpoint = "/api/auth/login",
        Access = CommandAccess.Anonymous,
        RefreshesSession = true,
    };

    public static readonly IReadOnlyList<CommandDescriptor> All =
    [
        new(
            "add book",
            "Catalog a new book",
            [
                new("title", "Title", "", true),
                new("author", "Author", "by author", false),
                new("subtitle", "Subtitle", "subtitled", false),
                new("language", "Language", "in language", false),
                new("publicationYear", "Publication year", "published in", false),
                new("isbn", "ISBN", "with isbn", false),
                new("summary", "Summary", "with summary", false),
            ]
        )
        {
            Group = CommandGroup.Dynamic,
        },
        new("update book", "Edit an existing book", []) { Group = CommandGroup.Dynamic },
        new("remove book", "Delete a book", []) { Group = CommandGroup.Dynamic },
        new("list books", "List all books", []),
        new("add author", "Create an author record", []),
        new("update author", "Rename an author", []),
        new("remove author", "Delete an author", []),
        new("list authors", "List all authors", []),
        // FIXED
        new("dashboard", "Your library at a glance, and what needs attention", [])
        {
            Group = CommandGroup.Fixed,
            Order = 1,
        },
        new("library", "Show library info: images, statistics", [])
        {
            Group = CommandGroup.Fixed,
            Order = 2,
        },
        // APPLICATION
        new("settings", "Show and edit user settings", [])
        {
            Group = CommandGroup.Application,
            Order = 1,
        },
        new("about", "Shows information about software", [])
        {
            Group = CommandGroup.Application,
            Order = 2,
        },
        new("help", "Show available commands", []) { Group = CommandGroup.Application, Order = 3 },
        // ACCOUNT
        new("account", "Account settings", []) { Group = CommandGroup.Account, Order = 1 },
        Login,
        new("logout", "Leave your library", [])
        {
            Group = CommandGroup.Account,
            Order = 3,
            RefreshesSession = true,
        },
    ];
}
