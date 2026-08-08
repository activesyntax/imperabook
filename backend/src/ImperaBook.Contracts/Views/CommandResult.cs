namespace ImperaBook.Contracts.Views;

public sealed record CommandResult(string? Heading, IReadOnlyList<ViewNode> Views)
{
    public static readonly CommandResult Empty = new(null, Array.Empty<ViewNode>());
}
