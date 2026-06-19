namespace ImperaBook.Domain;

public static class TextRules
{
    public abstract record Checked
    {
        private Checked() { }

        public sealed record Empty : Checked;
        public sealed record TooLong : Checked;
        public sealed record Valid(string Value) : Checked;
    }

    public static Checked Check(int maxLength, string? raw)
    {
        var s = (raw ?? string.Empty).Trim();

        if (s.Length == 0)
            return new Checked.Empty();
        if (s.Length > maxLength)
            return new Checked.TooLong();

        return new Checked.Valid(s);
    }
}
