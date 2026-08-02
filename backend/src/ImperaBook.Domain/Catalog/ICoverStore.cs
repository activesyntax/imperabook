using CSharpFunctionalExtensions;
using ImperaBook.Domain.Catalog;

namespace ImperaBook.Application.Covers;

/// <summary>
/// The write-side port onto the content channel's cover storage (DECISIONS 19). It answers one
/// question — <em>is there a stored image at this content address, and what is its BlurHash?</em> —
/// which is deliberately one question rather than two: existence and the derived BlurHash are the
/// same fact, so collapsing them avoids a second round trip and removes any window in which one is
/// known and the other is not.
/// </summary>
/// <remarks>
/// The port lives under <c>Covers</c> rather than a generic <c>Content</c> namespace, for the same
/// reason ADR 19 rejected a generic blob route: with one content type there is nothing to generalize
/// from. A second content type is what makes the abstraction earn its name.
/// <para>
/// This port never serves image bytes. Serving is the API layer's job on the content channel; the
/// Application layer only needs to know that a reference resolves.
/// </para>
/// </remarks>
public interface ICoverStore
{
    /// <summary>
    /// Resolves a content address to the cover it names, or <see cref="Maybe{T}.None"/> if nothing
    /// is stored under it. Composing the <see cref="Cover"/> here rather than returning a bare
    /// BlurHash keeps callers free of a composition step whose only possible outcome is success.
    /// </summary>
    Task<Maybe<Cover>> Find(ContentHash hash, CancellationToken ct);
}
