using System.Reflection;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

public sealed class About
{
    public static About Instance { get; } = new();

    private About() { }

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
                    "ImperaBook is proprietary software. Self-hosted use is free for ",
                    "personal and internal use under the End User License Agreement. ",
                    "Redistribution, resale, white-labeling, and hosting the software as ",
                    "a service for third parties require a separate commercial agreement."
                ),
                TextNode.Para(
                    TextNode.Link("/static/eula.html", "End User License Agreement"),
                    " · ",
                    TextNode.Link("/static/notices.html", "Third-party notices")
                ),
            ]),
        ]);
}
