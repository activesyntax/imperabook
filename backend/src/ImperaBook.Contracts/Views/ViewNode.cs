using System.Text.Json.Serialization;

namespace ImperaBook.Contracts.Views;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[JsonDerivedType(typeof(ImageView), "image")]
[JsonDerivedType(typeof(CardCollectionView), "cardCollection")]
[JsonDerivedType(typeof(MessageView), "message")]
[JsonDerivedType(typeof(GuidanceView), "guidance")]
[JsonDerivedType(typeof(ItemCollectionView), "itemCollection")]
[JsonDerivedType(typeof(TextView), "textView")]
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

public sealed record PageInfo(int Current, int Count, int TotalItems, string ItemsPlural);

public sealed record ItemCollectionView(
    string Title,
    string EmptyMessage,
    IReadOnlyList<ItemView> Items,
    PageInfo? Page = null
) : ViewNode;

// ========== ITEM VIEW =================
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

// ============ TEXT VIEW =================
public sealed record TextView(string Title, IReadOnlyList<TextBlock> Blocks) : ViewNode;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[JsonDerivedType(typeof(Heading), "heading")]
[JsonDerivedType(typeof(Paragraph), "paragraph")]
public abstract record TextBlock;

public enum HeadingLevel
{
    One,
    Two,
    Three,
}

public sealed record Heading(HeadingLevel Level, IReadOnlyList<Inline> Content) : TextBlock;

public sealed record Paragraph(IReadOnlyList<Inline> Content) : TextBlock;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[JsonDerivedType(typeof(TextRun), "text")]
[JsonDerivedType(typeof(StrongRun), "strong")]
[JsonDerivedType(typeof(EmphasisRun), "emphasis")]
[JsonDerivedType(typeof(LinkRun), "link")]
public abstract record Inline
{
    /// Sugar so composition reads as prose: Para("Runs on ", Strong("PostgreSQL"), ".")
    public static implicit operator Inline(string text) => new TextRun(text);
}

public sealed record TextRun(string Text) : Inline;

public sealed record StrongRun(IReadOnlyList<Inline> Content) : Inline;

public sealed record EmphasisRun(IReadOnlyList<Inline> Content) : Inline;

public sealed record LinkRun(string Href, IReadOnlyList<Inline> Content) : Inline;
