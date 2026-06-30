using System.Text.Json.Serialization;

namespace ImperaBook.Contracts.Views;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[JsonDerivedType(typeof(ImageView), "image")]
[JsonDerivedType(typeof(CardCollectionView), "cardCollection")]
[JsonDerivedType(typeof(MessageView), "message")]
[JsonDerivedType(typeof(GuidanceView), "guidance")]
public abstract record ViewNode;

// NOTE: `Src` and `Variant` — `src` is the known soft spot from DECISIONS 15
// (an asset path is a frontend fact). Left as-is for now; resolve from `variant`
// on the frontend later.
public sealed record ImageView(string Src, string Alt, string? Caption, string? Variant) : ViewNode;

public sealed record CardCollectionView(IReadOnlyList<CardView> Items) : ViewNode;

/// <summary>
/// A card is a sub-vocabulary item inside a CardCollectionView, not a top-level
/// ViewNode — so it is not in the polymorphic hierarchy and carries its own literal
/// `type` to match the frontend's card shape.
/// </summary>
public sealed record CardView(string Heading, string Value, string? Caption)
{
    [JsonPropertyName("type")]
    public string Type => "card";
}

public sealed record MessageView(string Kind, string Text) : ViewNode;

public sealed record GuidanceView(string Title, string Intro, IReadOnlyList<GuidanceHint> Hints)
    : ViewNode;

// NOTE: `Keys` is the second soft spot from DECISIONS 15 (a literal keybinding is a
// frontend fact). Left literal for now; move to an action reference later.
public sealed record GuidanceHint(IReadOnlyList<string> Keys, string Label);
