using ImperaBook.Domain.Catalog;

namespace ImperaBook.Domain.Tests;

// ---- Required text: blank is an error -------------------------------------

[Trait("Category", "Unit")]
public class TitleTests
{
    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Create_blank_is_TitleRequired(string? raw) =>
        Assert.Equal(
            new DomainValidationError.TitleRequired(),
            ResultAssert.ExpectError(Title.Create(raw))
        );

    [Fact]
    public void Create_over_max_length_is_TitleTooLong() =>
        Assert.Equal(
            new DomainValidationError.TitleTooLong(Title.MaxLength),
            ResultAssert.ExpectError(Title.Create(new string('a', Title.MaxLength + 1)))
        );

    [Fact]
    public void Create_at_max_length_succeeds()
    {
        var raw = new string('a', Title.MaxLength);
        Assert.Equal(raw, ResultAssert.ExpectOk(Title.Create(raw)).Value);
    }

    [Fact]
    public void Create_trims_surrounding_whitespace() =>
        Assert.Equal("Dune", ResultAssert.ExpectOk(Title.Create("  Dune  ")).Value);
}

[Trait("Category", "Unit")]
public class PersonNameTests
{
    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Create_blank_is_NameRequired(string? raw) =>
        Assert.Equal(
            new DomainValidationError.NameRequired(),
            ResultAssert.ExpectError(PersonName.Create(raw))
        );

    [Fact]
    public void Create_over_max_length_is_NameTooLong() =>
        Assert.Equal(
            new DomainValidationError.NameTooLong(PersonName.MaxLength),
            ResultAssert.ExpectError(PersonName.Create(new string('a', PersonName.MaxLength + 1)))
        );

    [Fact]
    public void Create_valid_succeeds() =>
        Assert.Equal("Tolkien", ResultAssert.ExpectOk(PersonName.Create("Tolkien")).Value);
}

[Trait("Category", "Unit")]
public class LibraryNameTests
{
    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Create_blank_is_LibraryNameRequired(string? raw) =>
        Assert.Equal(
            new DomainValidationError.LibraryNameRequired(),
            ResultAssert.ExpectError(LibraryName.Create(raw))
        );

    [Fact]
    public void Create_over_max_length_is_LibraryNameTooLong() =>
        Assert.Equal(
            new DomainValidationError.LibraryNameTooLong(LibraryName.MaxLength),
            ResultAssert.ExpectError(LibraryName.Create(new string('a', LibraryName.MaxLength + 1)))
        );

    [Fact]
    public void Create_valid_succeeds() =>
        Assert.Equal(
            "Home Library",
            ResultAssert.ExpectOk(LibraryName.Create("Home Library")).Value
        );
}

// ---- Optional text: blank is None (Ok null), not an error -----------------

[Trait("Category", "Unit")]
public class SubtitleTests
{
    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Create_blank_is_Ok_None(string? raw) =>
        OptionAssert.ExpectNone(ResultAssert.ExpectOk(Subtitle.Create(raw)));

    [Fact]
    public void Create_valid_is_Ok_Some_and_trims()
    {
        var subtitle = OptionAssert.ExpectSome(
            ResultAssert.ExpectOk(Subtitle.Create("  A Tale  "))
        );
        Assert.Equal("A Tale", subtitle.Value);
    }

    [Fact]
    public void Create_over_max_length_is_SubtitleTooLong() =>
        Assert.Equal(
            new DomainValidationError.SubtitleTooLong(Subtitle.MaxLength),
            ResultAssert.ExpectError(Subtitle.Create(new string('a', Subtitle.MaxLength + 1)))
        );
}

[Trait("Category", "Unit")]
public class SummaryTests
{
    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Create_blank_is_Ok_None(string? raw) =>
        OptionAssert.ExpectNone(ResultAssert.ExpectOk(Summary.Create(raw)));

    [Fact]
    public void Create_valid_is_Ok_Some()
    {
        var summary = OptionAssert.ExpectSome(
            ResultAssert.ExpectOk(Summary.Create("A short summary."))
        );
        Assert.Equal("A short summary.", summary.Value);
    }

    [Fact]
    public void Create_over_max_length_is_SummaryTooLong() =>
        Assert.Equal(
            new DomainValidationError.SummaryTooLong(Summary.MaxLength),
            ResultAssert.ExpectError(Summary.Create(new string('a', Summary.MaxLength + 1)))
        );
}
