namespace ImperaBook.Infrastructure.Data.Entities;

public class ImageEntity
{
    public string Hash { get; set; } = "";
    public byte[] Bytes { get; set; } = [];
    public string MediaType { get; set; } = "";
    public int ByteSize { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}
