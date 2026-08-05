using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

public static class TextNode
{
    public static TextBlock H1(params Inline[] content) => new Heading(HeadingLevel.One, content);

    public static TextBlock H2(params Inline[] content) => new Heading(HeadingLevel.Two, content);

    public static TextBlock H3(params Inline[] content) => new Heading(HeadingLevel.Three, content);

    public static TextBlock Para(params Inline[] content) => new Paragraph(content);

    public static Inline Strong(params Inline[] content) => new StrongRun(content);

    public static Inline Em(params Inline[] content) => new EmphasisRun(content);

    public static Inline Link(string href, params Inline[] content) => new LinkRun(href, content);

    public static TextBlock Command(string command, string? description = null) =>
        new CommandBlock(command, description);

    public static TextBlock Finding(string value, string text, string command) =>
        new Finding(value, text, command);

    public static TextBlock Hint(IReadOnlyList<string> keys, string text) => new Hint(keys, text);
}
