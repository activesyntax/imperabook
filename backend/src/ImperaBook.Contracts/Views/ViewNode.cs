using System.Text.Json.Serialization;

namespace ImperaBook.Contracts.Views;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[JsonDerivedType(typeof(ImageView), "image")]
[JsonDerivedType(typeof(CardCollectionView), "cardCollection")]
[JsonDerivedType(typeof(MessageView), "message")]
[JsonDerivedType(typeof(GuidanceView), "guidance")]
[JsonDerivedType(typeof(ItemCollectionView), "itemCollection")]
public abstract record ViewNode;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[JsonDerivedType(typeof(AssetImage), "asset")]
[JsonDerivedType(typeof(CoverImage), "cover")]
public abstract record ImageSource
{
    private ImageSource() { }

    public sealed record AssetImage(string Name) : ImageSource;

    public sealed record CoverImage(string Hash, string Blurhash) : ImageSource;
}

public sealed record ImageView(ImageSource Source, string Alt, string? Caption, string? Variant)
    : ViewNode;

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

public sealed record ItemCollectionView(IReadOnlyList<ItemView> Items) : ViewNode;

public sealed record ItemView(
    string Ref,
    IReadOnlyList<ItemProperty> Properties,
    ImageSource? Image = null
);

public sealed record ItemProperty(string Name, string Value, PropertyRole Role);

public enum PropertyRole
{
    Primary,
    Secondary,
    Meta,
}
