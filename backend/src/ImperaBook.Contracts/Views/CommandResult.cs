namespace ImperaBook.Contracts.Views;

/// <summary>
/// The shape every command returns over the wire: an ordered list of semantic
/// view nodes. The frontend owns one renderer per node type and all styling
/// (DECISIONS 15). The backend never describes how a node looks, only what it is.
/// </summary>
public sealed record CommandResult(IReadOnlyList<ViewNode> Views);
