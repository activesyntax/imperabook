using CSharpFunctionalExtensions;
using ImperaBook.Application.Images;
using ImperaBook.Domain.Catalog;
using SkiaSharp;

namespace ImperaBook.Infrastructure.Data.Images;

/// <summary>
/// Derives a BlurHash from encoded image bytes using SkiaSharp for decoding. The BlurHash algorithm
/// itself is implemented here rather than taken from a package: it is short, it has no state, and it
/// keeps the dependency surface to one library whose licence has been checked.
/// </summary>
public sealed class SkiaBlurhashEncoder : IBlurhashEncoder
{
    private const string Base83 =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~";

    // 4x3 components: the conventional default for landscape-ish artwork, and cheap to encode.
    private const int ComponentsX = 4;
    private const int ComponentsY = 3;

    // The hash describes low-frequency colour, so full resolution is wasted work. Downscaling first
    // turns a multi-megapixel decode into a fixed, small cost regardless of the upload's size.
    private const int WorkingSize = 32;

    public Maybe<Blurhash> Encode(byte[] imageBytes)
    {
        using var source = SKBitmap.Decode(imageBytes);
        if (source is null)
            return Maybe<Blurhash>.None;

        var info = new SKImageInfo(
            WorkingSize,
            WorkingSize,
            SKColorType.Rgba8888,
            SKAlphaType.Unpremul
        );
        using var scaled = source.Resize(info, new SKSamplingOptions(SKFilterMode.Linear));
        if (scaled is null)
            return Maybe<Blurhash>.None;

        var pixels = ToLinearRgb(scaled);
        var factors = ComputeFactors(pixels, scaled.Width, scaled.Height);
        var encoded = Serialize(factors);

        // Round-trips through the domain type: if the algorithm ever produces something the value
        // object rejects, that is a bug here, and it surfaces as None rather than as a stored lie.
        return Blurhash.Create(encoded).Match(Maybe<Blurhash>.From, _ => Maybe<Blurhash>.None);
    }

    /// <summary>
    /// sRGB is gamma-encoded; averaging it directly gives muddy, too-dark results. BlurHash is
    /// defined over linear light, so every sample is converted before any arithmetic happens.
    /// </summary>
    private static double[][] ToLinearRgb(SKBitmap bitmap)
    {
        var pixels = new double[bitmap.Width * bitmap.Height][];

        for (var y = 0; y < bitmap.Height; y++)
        {
            for (var x = 0; x < bitmap.Width; x++)
            {
                var c = bitmap.GetPixel(x, y);
                pixels[(y * bitmap.Width) + x] =
                [
                    SrgbToLinear(c.Red),
                    SrgbToLinear(c.Green),
                    SrgbToLinear(c.Blue),
                ];
            }
        }

        return pixels;
    }

    private static double[][] ComputeFactors(double[][] pixels, int width, int height)
    {
        var factors = new double[ComponentsX * ComponentsY][];

        for (var j = 0; j < ComponentsY; j++)
        {
            for (var i = 0; i < ComponentsX; i++)
            {
                // The DC term (i=0, j=0) is a plain average; the rest are cosine-weighted and
                // therefore normalised by 2 rather than 1.
                var normalisation = i == 0 && j == 0 ? 1.0 : 2.0;
                double r = 0,
                    g = 0,
                    b = 0;

                for (var y = 0; y < height; y++)
                {
                    for (var x = 0; x < width; x++)
                    {
                        var basis =
                            Math.Cos(Math.PI * i * x / width) * Math.Cos(Math.PI * j * y / height);
                        var pixel = pixels[(y * width) + x];
                        r += basis * pixel[0];
                        g += basis * pixel[1];
                        b += basis * pixel[2];
                    }
                }

                var scale = normalisation / (width * height);
                factors[(j * ComponentsX) + i] = [r * scale, g * scale, b * scale];
            }
        }

        return factors;
    }

    private static string Serialize(double[][] factors)
    {
        var dc = factors[0];
        var ac = factors[1..];

        var sizeFlag = ComponentsX - 1 + ((ComponentsY - 1) * 9);
        var hash = new System.Text.StringBuilder(4 + (2 * ac.Length));
        hash.Append(Encode83(sizeFlag, 1));

        // AC components are stored relative to the largest one, so the quantisation adapts to how
        // much variation the image actually has.
        var maximumValue = 0.0;
        foreach (var component in ac)
        {
            foreach (var channel in component)
                maximumValue = Math.Max(maximumValue, Math.Abs(channel));
        }

        var quantisedMax =
            ac.Length == 0
                ? 0
                : Math.Max(0, Math.Min(82, (int)Math.Floor((maximumValue * 166) - 0.5)));
        var actualMax = ac.Length == 0 ? 1.0 : (quantisedMax + 1) / 166.0;

        hash.Append(Encode83(quantisedMax, 1));
        hash.Append(Encode83(EncodeDc(dc), 4));

        foreach (var component in ac)
            hash.Append(Encode83(EncodeAc(component, actualMax), 2));

        return hash.ToString();
    }

    private static int EncodeDc(double[] value) =>
        (LinearToSrgb(value[0]) << 16) + (LinearToSrgb(value[1]) << 8) + LinearToSrgb(value[2]);

    private static int EncodeAc(double[] value, double maximumValue)
    {
        var r = QuantiseAc(value[0], maximumValue);
        var g = QuantiseAc(value[1], maximumValue);
        var b = QuantiseAc(value[2], maximumValue);
        return (r * 19 * 19) + (g * 19) + b;
    }

    private static int QuantiseAc(double value, double maximumValue) =>
        (int)Math.Max(0, Math.Min(18, Math.Floor((SignPow(value / maximumValue, 0.5) * 9) + 9.5)));

    private static double SignPow(double value, double exponent) =>
        Math.Sign(value) * Math.Pow(Math.Abs(value), exponent);

    private static string Encode83(int value, int length)
    {
        var result = new char[length];
        for (var i = 0; i < length; i++)
        {
            var digit = (value / (int)Math.Pow(83, length - i - 1)) % 83;
            result[i] = Base83[digit];
        }

        return new string(result);
    }

    private static double SrgbToLinear(byte value)
    {
        var v = value / 255.0;
        return v <= 0.04045 ? v / 12.92 : Math.Pow((v + 0.055) / 1.055, 2.4);
    }

    private static int LinearToSrgb(double value)
    {
        var v = Math.Max(0.0, Math.Min(1.0, value));
        var srgb = v <= 0.0031308 ? v * 12.92 : (1.055 * Math.Pow(v, 1 / 2.4)) - 0.055;
        return (int)Math.Round(srgb * 255);
    }
}
