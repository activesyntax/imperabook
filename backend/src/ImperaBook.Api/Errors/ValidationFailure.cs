namespace ImperaBook.Api.Errors;

public sealed record ValidationFailure(string Code, string Message);
