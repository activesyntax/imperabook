using Xunit;
using ImperaBook.Domain;

namespace ImperaBook.Domain.Tests;

[Trait("Category", "Unit")]
public class TextRulesTests
{
    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    [InlineData("\t\n ")]
    public void Check_blank_or_null_is_Empty(string? raw) =>
        Assert.IsType<TextRules.Checked.Empty>(TextRules.Check(10, raw));

    [Fact]
    public void Check_trims_and_returns_Valid()
    {
        var valid = Assert.IsType<TextRules.Checked.Valid>(TextRules.Check(10, "  hello  "));
        Assert.Equal("hello", valid.Value);
    }

    [Fact]
    public void Check_at_max_length_is_Valid()
    {
        var raw = new string('a', 10);
        var valid = Assert.IsType<TextRules.Checked.Valid>(TextRules.Check(10, raw));
        Assert.Equal(raw, valid.Value);
    }

    [Fact]
    public void Check_over_max_length_is_TooLong() =>
        Assert.IsType<TextRules.Checked.TooLong>(TextRules.Check(10, new string('a', 11)));

    [Fact]
    public void Check_measures_length_after_trimming()
    {
        // Surrounding whitespace trims away, leaving exactly maxLength -> Valid.
        var raw = "   " + new string('a', 10) + "   ";
        Assert.IsType<TextRules.Checked.Valid>(TextRules.Check(10, raw));
    }
}
