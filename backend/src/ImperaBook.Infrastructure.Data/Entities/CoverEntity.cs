namespace ImperaBook.Infrastructure.Data.Entities;

public class CoverEntity
{
    public string Hash { get; set; } = "";
    public string Blurhash { get; set; } = "";
    public byte[] Bytes { get; set; } = [];
    public string MediaType { get; set; } = "";
    public DateTimeOffset CreatedAt { get; set; }
}
