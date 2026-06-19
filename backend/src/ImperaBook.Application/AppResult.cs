using System;

namespace ImperaBook.Application;

/// <summary>
/// Success-or-error result for the Application layer. The implicit conversions let a handler
/// return a value or an <see cref="ApplicationError"/> directly (`return value;` / `return error;`),
/// so orchestration reads as straight-line code instead of explicit result-wrapping.
/// </summary>
public readonly record struct AppResult<T>
{
    private readonly T _value;
    private readonly ApplicationError? _error;

    private AppResult(T value)
    {
        _value = value;
        _error = null;
    }

    private AppResult(ApplicationError error)
    {
        _value = default!;
        _error = error;
    }

    public bool IsError => _error is not null;
    public bool IsOk => _error is null;

    public T Value => _error is null
        ? _value
        : throw new InvalidOperationException("Result is in an error state; check IsError first.");

    public ApplicationError Error =>
        _error ?? throw new InvalidOperationException("Result is in a success state.");

    public static implicit operator AppResult<T>(T value) => new(value);
    public static implicit operator AppResult<T>(ApplicationError error) => new(error);

    public TOut Match<TOut>(Func<T, TOut> onOk, Func<ApplicationError, TOut> onError) =>
        _error is null ? onOk(_value) : onError(_error);
}
