using System.Text.Json.Serialization;

namespace ImperaBook.Contracts.Views;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[JsonDerivedType(typeof(ImageView), "image")]
[JsonDerivedType(typeof(CardCollectionView), "cardCollection")]
[JsonDerivedType(typeof(MessageView), "message")]
[JsonDerivedType(typeof(GuidanceView), "guidance")]
[JsonDerivedType(typeof(ItemCollectionView), "itemCollection")]
public abstract record ViewNode;

public sealed record ImageView(string Src, string Alt, string? Caption, string? Variant) : ViewNode;

public sealed record CardCollectionView(IReadOnlyList<CardView> Items) : ViewNode;

public sealed record CardView(string Heading, string Value, string? Caption)
{
    [JsonPropertyName("type")]
    public string Type => "card";
}

public sealed record MessageView(string Kind, string Text) : ViewNode;

public sealed record GuidanceView(string Title, string Intro, IReadOnlyList<GuidanceHint> Hints)
    : ViewNode;

public sealed record GuidanceHint(IReadOnlyList<string> Keys, string Label);

public sealed record PageInfo(int From, int To, int Total);

public sealed record ItemCollectionView(
    string Title,
    string EmptyMessage,
    IReadOnlyList<ItemView> Items,
    PageInfo? Page = null
) : ViewNode;

public sealed record ItemView(
    string Ref,
    IReadOnlyList<ItemProperty> Properties,
    string? ImageSrc = null
);

public sealed record ItemProperty(string Name, string Value, PropertyRole Role);

public enum PropertyRole
{
    Primary,
    Secondary,
    Meta,
}
