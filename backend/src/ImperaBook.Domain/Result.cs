using System;
using System.Diagnostics.CodeAnalysis;

namespace ImperaBook.Domain;

/// <summary>
/// Success-or-single-error result. The C# analog of F#'s Result&lt;T, DomainValidationError&gt;.
/// Domain-scoped: the error is always a <see cref="DomainValidationError"/>.
///
/// Reference type on purpose: there is no zero-value. <c>default(Result&lt;T&gt;)</c> is null and
/// fails loud on first use, so an unconstructed result cannot masquerade as an error state the way
/// a <c>default</c> struct could. Construct only via <see cref="Ok"/> / <see cref="Fail"/>;
/// read only through the gated surface below.
/// </summary>
public sealed record Result<T>
{
    private readonly T _value;
    private readonly DomainValidationError? _error;

    private Result(T value)
    {
        _value = value;
        _error = null;
    }

    private Result(DomainValidationError error)
    {
        _value = default!;
        _error = error;
    }

    public static Result<T> Ok(T value) => new(value);

    public static Result<T> Fail(DomainValidationError error) => new(error);

    public bool IsOk => _error is null;

    // Total read — both branches are mandatory; the only path to the happy value.
    public TOut Match<TOut>(Func<T, TOut> onOk, Func<DomainValidationError, TOut> onError) =>
        _error is null ? onOk(_value) : onError(_error);

    // Side-effecting total branch (e.g. API: Ok -> 200, error -> 400).
    public void Switch(Action<T> onOk, Action<DomainValidationError> onError)
    {
        if (_error is null) onOk(_value);
        else onError(_error);
    }

    // Gated reads — the compiler will not let the bool be ignored.
    public bool TryGetValue([MaybeNullWhen(false)] out T value)
    {
        value = _value;
        return _error is null;
    }

    public bool TryGetError([MaybeNullWhen(false)] out DomainValidationError error)
    {
        error = _error;
        return _error is not null;
    }

    // Transform without unwrapping — every Map removes a hand-written unwrap point.
    public Result<TOut> Map<TOut>(Func<T, TOut> f) =>
        _error is null ? Result<TOut>.Ok(f(_value)) : Result<TOut>.Fail(_error);

    public Result<TOut> Bind<TOut>(Func<T, Result<TOut>> f) =>
        _error is null ? f(_value) : Result<TOut>.Fail(_error);

    // Loud, greppable escape hatch when you truly know it is Ok
    // (a test, a known literal, or "already validated above").
    public T Expect(string because) =>
        _error is null
            ? _value
            : throw new InvalidOperationException($"Expected Ok: {because}. Error: {_error}");
}
