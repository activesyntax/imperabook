using CSharpFunctionalExtensions;
using Xunit.Sdk;

namespace ImperaBook.Domain.Tests;

internal static class ResultAssert
{
    public static T ExpectOk<T>(Result<T, DomainValidationError> result)
    {
        if (result.IsFailure)
            throw new XunitException($"Expected Ok but was Error: {result.Error}");
        return result.Value;
    }

    public static DomainValidationError ExpectError<T>(Result<T, DomainValidationError> result)
    {
        if (result.IsSuccess)
            throw new XunitException($"Expected Error but was Ok: {result.Value}");
        return result.Error;
    }
}

internal static class OptionAssert
{
    public static T ExpectSome<T>(T? value)
        where T : struct
    {
        Assert.True(value.HasValue, "Expected Some but was None.");
        return value.Value;
    }

    public static void ExpectNone<T>(T? value)
        where T : struct => Assert.False(value.HasValue, "Expected None but was Some.");
}

internal static class Builders
{
    public static Title ValidTitle(string value = "A Valid Title") =>
        ResultAssert.ExpectOk(Title.Create(value));

    public static PersonName ValidName(string value = "Valid") =>
        ResultAssert.ExpectOk(PersonName.Create(value));
}
