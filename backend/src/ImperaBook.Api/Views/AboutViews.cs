using System.Reflection;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

public sealed class About
{
    public static About Instance { get; } = new();

    internal About() { }

    public string Version { get; } =
        typeof(About)
            .Assembly.GetCustomAttribute<AssemblyInformationalVersionAttribute>()
            ?.InformationalVersion.Split('+')[0]
        ?? "0.1.0";
}

public static class AboutViews
{
    private const string Vendor = "ActiveSyntax";
    private const string VendorUrl = "https://www.activesyntax.net";
    private const int CopyrightYear = 2026;

    public static CommandResult ToCommandResult(this About about) =>
        new([
            new HeadingView("About"),
            new TextView([
                TextNode.Para(TextNode.Strong("ImperaBook"), $" {about.Version}"),
                TextNode.Para("Your library, at your fingertips."),
                TextNode.H3("Developer"),
                TextNode.Para($"{Vendor} — ", TextNode.Link(VendorUrl, "www.activesyntax.net")),
                TextNode.Para($"Copyright © {CopyrightYear} {Vendor}. All rights reserved."),
                TextNode.H3("Licence"),
                TextNode.Para(
                    TextNode.Strong("ImperaBook is proprietary software."),
                    " Personal use is free: you may run the self-hosted edition at no cost ",
                    "for your own private, non-commercial use."
                ),
                TextNode.Para(
                    "Any other use requires a licence. Use by or on behalf of a company, ",
                    "institution, or other organisation — including purely internal use, ",
                    "and including non-profits — is commercial use."
                ),
                TextNode.Para(
                    TextNode.Link("/static/eula.html", "End User License Agreement"),
                    " · ",
                    TextNode.Link("/static/notices.html", "Third-party notices")
                ),
            ]),
        ]);
}
