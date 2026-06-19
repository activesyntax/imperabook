using Xunit;
using ImperaBook.Domain;

namespace ImperaBook.Domain.Tests;

// The C# analogs of the F# expectOk / expectError helpers. They unwrap a Result and assert its
// shape, returning the inner value/error so a test can make further assertions on it.
internal static class ResultAssert
{
    public static T ExpectOk<T>(Result<T> result)
    {
        Assert.True(result.IsOk, $"Expected Ok but was Error: {(result.IsOk ? "" : result.Error.ToString())}");
        return result.Value;
    }

    public static DomainValidationError ExpectError<T>(Result<T> result)
    {
        Assert.False(result.IsOk, "Expected Error but was Ok.");
        return result.Error;
    }
}

// The option (None/Some) analogs. The domain's optional value objects are Nullable<T> (e.g. Subtitle?),
// so these operate on Nullable<T> after the Result has been unwrapped.
internal static class OptionAssert
{
    public static T ExpectSome<T>(T? value) where T : struct
    {
        Assert.True(value.HasValue, "Expected Some but was None.");
        return value.Value;
    }

    public static void ExpectNone<T>(T? value) where T : struct =>
        Assert.False(value.HasValue, "Expected None but was Some.");
}

// Private builders for valid domain values, so aggregate tests don't repeat the unwrap dance.
internal static class Builders
{
    public static Title ValidTitle(string value = "A Valid Title") =>
        ResultAssert.ExpectOk(Title.Create(value));

    public static PersonName ValidName(string value = "Valid") =>
        ResultAssert.ExpectOk(PersonName.Create(value));
}
