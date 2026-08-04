namespace ImperaBook.API.Endpoints;

public static class ImageRoutes
{
    public const string Collection = "/api/images";

    public static string For(string hash) => $"{Collection}/{hash}";
}
