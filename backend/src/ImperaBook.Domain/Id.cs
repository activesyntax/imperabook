using System;

namespace ImperaBook.Domain;

/// <summary>
/// Strongly-typed, phantom identity. TEntity is never stored — it exists only to keep
/// Id&lt;Book&gt; and Id&lt;Author&gt; distinct at compile time, exactly like F#'s Id&lt;'Entity&gt;.
/// Value semantics come from the record struct (equality by the wrapped Guid).
/// </summary>
public readonly record struct Id<TEntity>(Guid Value)
{
    public static Id<TEntity> New() => new(Guid.NewGuid());
    public static Id<TEntity> From(Guid value) => new(value);
}
