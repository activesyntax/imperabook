using System;

namespace ImperaBook.Domain;

/// <summary>
/// Success-or-single-error result. The C# analog of F#'s Result&lt;T, DomainValidationError&gt;.
/// Domain-scoped: the error is always a <see cref="DomainValidationError"/>.
/// Construct only via <see cref="Ok"/> / <see cref="Fail"/>.
/// </summary>
public readonly record struct Result<T>
{
    private readonly T _value;
    private readonly DomainValidationError? _error;

    public bool IsOk { get; }

    private Result(T value)
    {
        _value = value;
        _error = null;
        IsOk = true;
    }

    private Result(DomainValidationError error)
    {
        _value = default!;
        _error = error;
        IsOk = false;
    }

    public static Result<T> Ok(T value) => new(value);

    public static Result<T> Fail(DomainValidationError error) => new(error);

    public T Value =>
        IsOk
            ? _value
            : throw new InvalidOperationException("Result is in an error state; check IsOk first.");

    public DomainValidationError Error =>
        IsOk ? throw new InvalidOperationException("Result is in a success state.") : _error!;

    public TOut Match<TOut>(Func<T, TOut> onOk, Func<DomainValidationError, TOut> onError) =>
        IsOk ? onOk(_value) : onError(_error!);
}
