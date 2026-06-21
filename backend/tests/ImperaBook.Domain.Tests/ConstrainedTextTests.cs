using CSharpFunctionalExtensions;
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
        Assert.Equal(new DomainValidationError.TitleRequired(), Title.Create(raw).Error);

    [Fact]
    public void Create_over_max_length_is_TitleTooLong() =>
        Assert.Equal(
            new DomainValidationError.TitleTooLong(Title.MaxLength),
            Title.Create(new string('a', Title.MaxLength + 1)).Error
        );

    [Fact]
    public void Create_at_max_length_succeeds()
    {
        var raw = new string('a', Title.MaxLength);
        Assert.Equal(raw, Title.Create(raw).Value.Value);
    }

    [Fact]
    public void Create_trims_surrounding_whitespace() =>
        Assert.Equal("Dune", Title.Create("  Dune  ").Value.Value);
}

[Trait("Category", "Unit")]
public class PersonNameTests
{
    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Create_blank_is_NameRequired(string? raw) =>
        Assert.Equal(new DomainValidationError.NameRequired(), PersonName.Create(raw).Error);

    [Fact]
    public void Create_over_max_length_is_NameTooLong() =>
        Assert.Equal(
            new DomainValidationError.NameTooLong(PersonName.MaxLength),
            PersonName.Create(new string('a', PersonName.MaxLength + 1)).Error
        );

    [Fact]
    public void Create_valid_succeeds() =>
        Assert.Equal("Tolkien", PersonName.Create("Tolkien").Value.Value);
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
            LibraryName.Create(raw).Error
        );

    [Fact]
    public void Create_over_max_length_is_LibraryNameTooLong() =>
        Assert.Equal(
            new DomainValidationError.LibraryNameTooLong(LibraryName.MaxLength),
            LibraryName.Create(new string('a', LibraryName.MaxLength + 1)).Error
        );

    [Fact]
    public void Create_valid_succeeds() =>
        Assert.Equal("Home Library", LibraryName.Create("Home Library").Value.Value);
}

// ---- Optional text: blank is None (Ok None), not an error -----------------

[Trait("Category", "Unit")]
public class SubtitleTests
{
    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Create_blank_is_Ok_None(string? raw) =>
        Assert.True(Subtitle.Create(raw).Value.HasNoValue);

    [Fact]
    public void Create_valid_is_Ok_Some_and_trims()
    {
        var subtitle = Subtitle.Create("  A Tale  ").Value;
        Assert.Equal(Maybe.From("A Tale"), subtitle.Map(s => s.Value));
    }

    [Fact]
    public void Create_over_max_length_is_SubtitleTooLong() =>
        Assert.Equal(
            new DomainValidationError.SubtitleTooLong(Subtitle.MaxLength),
            Subtitle.Create(new string('a', Subtitle.MaxLength + 1)).Error
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
        Assert.True(Summary.Create(raw).Value.HasNoValue);

    [Fact]
    public void Create_valid_is_Ok_Some()
    {
        var summary = Summary.Create("A short summary.").Value;
        Assert.Equal(Maybe.From("A short summary."), summary.Map(s => s.Value));
    }

    [Fact]
    public void Create_over_max_length_is_SummaryTooLong() =>
        Assert.Equal(
            new DomainValidationError.SummaryTooLong(Summary.MaxLength),
            Summary.Create(new string('a', Summary.MaxLength + 1)).Error
        );
}
