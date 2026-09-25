using System.Text.Json.Serialization;

namespace ImperaBook.Contracts.Views;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[JsonDerivedType(typeof(HeadingView), "heading")]
[JsonDerivedType(typeof(ImageView), "image")]
[JsonDerivedType(typeof(CardCollectionView), "cardCollection")]
[JsonDerivedType(typeof(MessageView), "message")]
[JsonDerivedType(typeof(GuidanceView), "guidance")]
[JsonDerivedType(typeof(ItemCollectionView), "itemCollection")]
[JsonDerivedType(typeof(TextView), "textView")]
[JsonDerivedType(typeof(LoginFormView), "loginForm")]
public abstract record ViewNode;

public sealed record HeadingView(string Text, PageInfo? Page = null) : ViewNode;

public enum ImageRole
{
    Branding,
    Illustration,
}

public sealed record ImageView(string Src, string Alt, ImageRole Role, string? Caption = null)
    : ViewNode;

public sealed record CardCollectionView(IReadOnlyList<CardView> Items) : ViewNode;

public sealed record CardView(string Heading, string Value, string? Caption)
{
    [JsonPropertyName("type")]
    public string Type => "card";
}

public enum MessageKind
{
    Info,
    Success,
    Warning,
    Error,
}

public sealed record MessageView(string Text, MessageKind Kind) : ViewNode;

// Asks for credentials in place of the command bar. Carries no data: the form is the same
// every time, and a new instance of it restarts the sign-in from the username.
public sealed record LoginFormView : ViewNode;

public sealed record GuidanceView(string Title, string Intro, IReadOnlyList<GuidanceHint> Hints)
    : ViewNode;

public sealed record GuidanceHint(IReadOnlyList<string> Keys, string Label);

public sealed record PageInfo(int Current, int Count, int TotalItems, string ItemsPlural);

public sealed record ItemCollectionView(IReadOnlyList<ItemView> Items, string EmptyMessage)
    : ViewNode;

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
public sealed record TextView(IReadOnlyList<TextBlock> Blocks) : ViewNode;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[JsonDerivedType(typeof(Heading), "heading")]
[JsonDerivedType(typeof(Paragraph), "paragraph")]
[JsonDerivedType(typeof(CommandBlock), "command")]
[JsonDerivedType(typeof(Finding), "finding")]
[JsonDerivedType(typeof(Hint), "hint")]
public abstract record TextBlock;

public enum HeadingLevel
{
    One,
    Two,
    Three,
}

public sealed record Heading(HeadingLevel Level, IReadOnlyList<Inline> Content) : TextBlock;

public sealed record Paragraph(IReadOnlyList<Inline> Content) : TextBlock;

public sealed record CommandBlock(string Command, string? Description = null) : TextBlock;

public sealed record Hint(IReadOnlyList<string> Keys, string Text) : TextBlock;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[JsonDerivedType(typeof(TextRun), "text")]
[JsonDerivedType(typeof(StrongRun), "strong")]
[JsonDerivedType(typeof(EmphasisRun), "emphasis")]
[JsonDerivedType(typeof(LinkRun), "link")]
public abstract record Inline
{
    public static implicit operator Inline(string text) => new TextRun(text);
}

public sealed record TextRun(string Text) : Inline;

public sealed record StrongRun(IReadOnlyList<Inline> Content) : Inline;

public sealed record EmphasisRun(IReadOnlyList<Inline> Content) : Inline;

public sealed record LinkRun(string Href, IReadOnlyList<Inline> Content) : Inline;

public sealed record Finding(string Value, string Text, string Command) : TextBlock;
