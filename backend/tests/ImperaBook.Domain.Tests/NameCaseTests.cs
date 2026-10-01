namespace ImperaBook.Domain.Tests;

[Trait("Category", "Unit")]
public class NameCaseTests
{
    [Theory]
    [InlineData("frank herbert", "Frank Herbert")]
    [InlineData("ursula k. le guin", "Ursula K. Le Guin")]
    [InlineData("jean-paul sartre", "Jean-Paul Sartre")]
    [InlineData("éva  bárány", "Éva  Bárány")]
    public void Every_word_starts_with_a_capital(string typed, string stored) =>
        Assert.Equal(stored, NameCase.Capitalize(typed));

    [Theory]
    [InlineData("McDonald")]
    [InlineData("Y.N. Harari")]
    [InlineData("HOMER")]
    public void Only_first_letters_change(string typed) =>
        Assert.Equal(typed, NameCase.Capitalize(typed));

    [Theory]
    [InlineData("ludwig van beethoven", "Ludwig van Beethoven")]
    [InlineData("rogier VAN DER weyden", "Rogier van der Weyden")]
    [InlineData("johann wolfgang von goethe", "Johann Wolfgang von Goethe")]
    [InlineData("gérard de nerval", "Gérard de Nerval")]
    public void Particles_inside_a_name_stay_lower_case(string typed, string stored) =>
        Assert.Equal(stored, NameCase.Capitalize(typed));

    [Theory]
    [InlineData("van gogh", "Van Gogh")]
    [InlineData("de gaulle", "De Gaulle")]
    public void A_particle_that_begins_the_name_is_capitalized(string typed, string stored) =>
        Assert.Equal(stored, NameCase.Capitalize(typed));

    [Fact]
    public void A_last_name_after_a_first_name_does_not_begin_the_name() =>
        Assert.Equal("van Beethoven", NameCase.Capitalize("van beethoven", startsName: false));

    [Fact]
    public void Only_whole_words_are_particles() =>
        Assert.Equal("Vander Devon", NameCase.Capitalize("vander devon"));

    [Fact]
    public void Nothing_typed_stays_nothing()
    {
        Assert.Null(NameCase.Capitalize(null));
        Assert.Equal("", NameCase.Capitalize(""));
    }
}
