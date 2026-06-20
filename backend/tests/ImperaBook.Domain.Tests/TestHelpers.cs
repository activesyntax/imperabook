using Xunit.Sdk;

namespace ImperaBook.Domain.Tests;

internal static class ResultAssert
{
    public static T ExpectOk<T>(Result<T> result) =>
        result.Match(
            onOk: value => value,
            onError: error => throw new XunitException($"Expected Ok but was Error: {error}")
        );

    public static DomainValidationError ExpectError<T>(Result<T> result) =>
        result.Match(
            onOk: value => throw new XunitException($"Expected Error but was Ok: {value}"),
            onError: error => error
        );
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
