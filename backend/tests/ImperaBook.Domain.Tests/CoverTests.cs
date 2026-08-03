using ImperaBook.Domain.Catalog;

namespace ImperaBook.Domain.Tests;

[Trait("Category", "Unit")]
public class CoverTests
{
    private const string ValidHash =
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

    // A 4x3 component grid: the leading 'L' encodes the grid, which fixes the length at 4 + 2*4*3 = 28.
    private const string ValidBlurhash = "LEHV6nWB2yk8pyo0adR*.7kCMdnj";

    [Fact]
    public void ContentHash_accepts_a_lowercase_hex_digest()
    {
        var result = ContentHash.Create(ValidHash);

        Assert.True(result.IsSuccess);
        Assert.Equal(ValidHash, result.Value.Value);
    }

    [Fact]
    public void ContentHash_canonicalizes_case()
    {
        var result = ContentHash.Create(ValidHash.ToUpperInvariant());

        Assert.True(result.IsSuccess);
        Assert.Equal(ValidHash, result.Value.Value);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void ContentHash_rejects_missing_input(string? raw)
    {
        var result = ContentHash.Create(raw);

        Assert.True(result.IsFailure);
        Assert.IsType<CatalogValidationError.ContentHashRequired>(result.Error);
    }

    [Theory]
    [InlineData("e3b0c442")] // too short
    [InlineData("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855aa")] // too long
    [InlineData("z3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855")] // right length, not hex
    public void ContentHash_rejects_malformed_input(string raw)
    {
        var result = ContentHash.Create(raw);

        Assert.True(result.IsFailure);
        Assert.IsType<CatalogValidationError.ContentHashMalformed>(result.Error);
    }

    [Fact]
    public void Blurhash_accepts_a_structurally_valid_string()
    {
        var result = Blurhash.Create(ValidBlurhash);

        Assert.True(result.IsSuccess);
        Assert.Equal(ValidBlurhash, result.Value.Value);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Blurhash_rejects_missing_input(string? raw)
    {
        var result = Blurhash.Create(raw);

        Assert.True(result.IsFailure);
        Assert.IsType<CatalogValidationError.BlurhashRequired>(result.Error);
    }

    [Fact]
    public void Blurhash_rejects_characters_outside_base83()
    {
        // '/' is not in the base83 alphabet; the string is otherwise the correct length.
        var raw = string.Concat(ValidBlurhash.AsSpan(0, 27), "/");

        var result = Blurhash.Create(raw);

        Assert.True(result.IsFailure);
        Assert.IsType<CatalogValidationError.BlurhashMalformed>(result.Error);
    }

    [Fact]
    public void Blurhash_rejects_a_length_that_contradicts_its_size_flag()
    {
        // Legal alphabet, within the min/max bounds, but one character short of what the
        // leading 'L' (a 4x3 grid) declares. This is the check that separates "looks like a
        // blurhash" from "decodes as one".
        var raw = ValidBlurhash[..^1];

        var result = Blurhash.Create(raw);

        Assert.True(result.IsFailure);
        Assert.IsType<CatalogValidationError.BlurhashMalformed>(result.Error);
    }

    [Fact]
    public void Cover_composes_validated_components()
    {
        var hash = ContentHash.Create(ValidHash).Value;
        var blurhash = Blurhash.Create(ValidBlurhash).Value;

        var cover = ImageRef.Create(hash, blurhash);

        Assert.Equal(hash, cover.Hash);
        Assert.Equal(blurhash, cover.Blurhash);
    }

    [Fact]
    public void Cover_has_value_equality_over_its_components()
    {
        var a = ImageRef.Create(
            ContentHash.Create(ValidHash).Value,
            Blurhash.Create(ValidBlurhash).Value
        );
        var b = ImageRef.Create(
            ContentHash.Create(ValidHash).Value,
            Blurhash.Create(ValidBlurhash).Value
        );

        Assert.Equal(a, b);
    }
}
