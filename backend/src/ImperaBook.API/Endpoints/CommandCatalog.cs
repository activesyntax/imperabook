using System.Text.Json.Serialization;

namespace ImperaBook.API.Endpoints;

public enum CommandGroup
{
    Dynamic,
    Fixed,
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
}

public sealed record CommandParameter(string Name, string Connective, string Prompt, bool Required);

public static class CommandCatalog
{
    public static readonly IReadOnlyList<CommandDescriptor> All =
    [
        new(
            "add book",
            "Catalog a new book",
            [
                new("title", "with title", "Title", true),
                new("subtitle", "with subtitle", "Subtitle", false),
                new("author", "by author", "Author", true),
                new("language", "in language", "Language", false),
                new("publicationYear", "published in", "Publication year", false),
                new("isbn", "with isbn", "ISBN", false),
                new("summary", "summarized as", "Summary", false),
            ]
        )
        {
            Group = CommandGroup.Dynamic,
        },
        new("update book", "Edit an existing book", []) { Group = CommandGroup.Dynamic },
        new("remove book", "Delete a book", []) { Group = CommandGroup.Dynamic },
        new("show book", "Show full detail for one book", []),
        new("list books", "List all books", []),
        new("add author", "Create an author record", [new("name", "named", "Name", true)]),
        new("update author", "Rename an author", []),
        new("remove author", "Delete an author", []),
        new("list authors", "List all authors", []),
        new("dashboard", "Render analytical widgets", []),
        new("settings", "Show and edit user settings", [])
        {
            Group = CommandGroup.Fixed,
            Order = 1,
        },
        new("help", "Show available commands", []) { Group = CommandGroup.Fixed, Order = 2 },
    ];
}
