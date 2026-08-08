namespace ImperaBook.Contracts.Views;

public sealed record CommandResult(IReadOnlyList<ViewNode> Views)
{
    public static readonly CommandResult Empty = new(Array.Empty<ViewNode>());
}
