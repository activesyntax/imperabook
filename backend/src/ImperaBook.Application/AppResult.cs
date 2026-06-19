using System;

namespace ImperaBook.Application;

/// <summary>
/// Success-or-single-error result for the Application layer (error type = <see cref="ApplicationError"/>).
/// Mirrors the domain's Result&lt;T&gt;; kept separate because the error type differs.
/// Construct only via <see cref="Ok"/> / <see cref="Fail"/>.
/// </summary>
public readonly record struct AppResult<T>
{
    private readonly T _value;
    private readonly ApplicationError? _error;

    public bool IsOk { get; }

    private AppResult(T value)
    {
        _value = value;
        _error = null;
        IsOk = true;
    }

    private AppResult(ApplicationError error)
    {
        _value = default!;
        _error = error;
        IsOk = false;
    }

    public static AppResult<T> Ok(T value) => new(value);
    public static AppResult<T> Fail(ApplicationError error) => new(error);

    public T Value =>
        IsOk ? _value : throw new InvalidOperationException("AppResult is in an error state; check IsOk first.");

    public ApplicationError Error =>
        IsOk ? throw new InvalidOperationException("AppResult is in a success state.") : _error!;

    public TOut Match<TOut>(Func<T, TOut> onOk, Func<ApplicationError, TOut> onError) =>
        IsOk ? onOk(_value) : onError(_error!);
}
