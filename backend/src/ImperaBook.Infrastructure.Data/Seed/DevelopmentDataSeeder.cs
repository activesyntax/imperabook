using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data;

public static class DevelopmentDataSeeder
{
    public static async Task SeedAsync(DbContext ctx, CancellationToken ct)
    {
        Console.WriteLine(
            ctx.Model.FindEntityType(typeof(ImageEntity)) is null ? "NOT MAPPED" : "mapped"
        );

        if (await ctx.Set<BookEntity>().AnyAsync(ct))
            return;

        var ownerId = Guid.Parse("22222222-2222-2222-2222-222222222222");
        var libraryId = Guid.Parse("11111111-1111-1111-1111-111111111111");

        ctx.Set<UserEntity>()
            .Add(
                new UserEntity
                {
                    Id = ownerId,
                    FirstName = "John",
                    LastName = "Doe",
                }
            );

        ctx.Set<LibraryEntity>()
            .Add(
                new LibraryEntity
                {
                    Id = libraryId,
                    Name = "Home Library",
                    OwnerId = ownerId,

                    PhotoHash = await SeedImage.Register("library-photo.jpg", ctx, ct),
                }
            );

        var authors = new List<AuthorEntity>
        {
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "George",
                LastName = "Orwell",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "Jane",
                LastName = "Austen",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "Fyodor",
                LastName = "Dostoevsky",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "Leo",
                LastName = "Tolstoy",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "Gabriel",
                LastName = "García Márquez",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "Harper",
                LastName = "Lee",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "J.R.R.",
                LastName = "Tolkien",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "Frank",
                LastName = "Herbert",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "Isaac",
                LastName = "Asimov",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "Agatha",
                LastName = "Christie",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "Yuval Noah",
                LastName = "Harari",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "Carl",
                LastName = "Sagan",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "Stephen",
                LastName = "Hawking",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "Daniel",
                LastName = "Kahneman",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "Robert C.",
                LastName = "Martin",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "Andrew",
                LastName = "Hunt",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "David",
                LastName = "Thomas",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "Eric",
                LastName = "Evans",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "Mary",
                LastName = "Shelley",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "Bram",
                LastName = "Stoker",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "Michelle",
                LastName = "Obama",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                FirstName = "Anthony",
                LastName = "Bourdain",
            },
        };

        var books = new List<BookEntity>
        {
            // Classic literature
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Pride and Prejudice",
                LibraryId = libraryId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Crime and Punishment",
                LibraryId = libraryId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "War and Peace",
                LibraryId = libraryId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "One Hundred Years of Solitude",
                LibraryId = libraryId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "To Kill a Mockingbird",
                LibraryId = libraryId,
            },
            // Dystopian / political fiction
            new()
            {
                Id = Guid.NewGuid(),
                Title = "1984",
                Subtitle = "Nineteen Eighty-Four",
                LibraryId = libraryId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Animal Farm",
                Subtitle = "A Fairy Story",
                LibraryId = libraryId,
            },
            // Fantasy
            new()
            {
                Id = Guid.NewGuid(),
                Title = "The Lord of the Rings",
                Subtitle = "The Fellowship of the Ring",
                LibraryId = libraryId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "The Hobbit",
                Subtitle = "There and Back Again",
                LibraryId = libraryId,
            },
            // Science fiction
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Dune",
                LibraryId = libraryId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Foundation",
                LibraryId = libraryId,
            },
            // Mystery / crime
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Murder on the Orient Express",
                LibraryId = libraryId,
            },
            // Horror / gothic
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Frankenstein",
                Subtitle = "The Modern Prometheus",
                LibraryId = libraryId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Dracula",
                LibraryId = libraryId,
            },
            // History / non-fiction
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Sapiens",
                Subtitle = "A Brief History of Humankind",
                LibraryId = libraryId,
            },
            // Science / popular science
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Cosmos",
                LibraryId = libraryId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "A Brief History of Time",
                Subtitle = "From the Big Bang to Black Holes",
                LibraryId = libraryId,
            },
            // Psychology
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Thinking, Fast and Slow",
                LibraryId = libraryId,
            },
            // Technology / software
            new()
            {
                Id = Guid.NewGuid(),
                Title = "The Pragmatic Programmer",
                Subtitle = "Your Journey to Mastery",
                LibraryId = libraryId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Clean Code",
                Subtitle = "A Handbook of Agile Software Craftsmanship",
                LibraryId = libraryId,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Domain-Driven Design",
                Subtitle = "Tackling Complexity in the Heart of Software",
                LibraryId = libraryId,
            },
            // Biography / memoir
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Becoming",
                LibraryId = libraryId,
            },
            // Food / travel
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Kitchen Confidential",
                Subtitle = "Adventures in the Culinary Underbelly",
                LibraryId = libraryId,
            },
            // Unshelved book (no library)
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Orphan Book",
                LibraryId = null,
            },
        };

        SeedImage.LogManifest();
        foreach (var book in books.Where(b => b.Title != "Orphan Book"))
            book.CoverHash = await SeedArtwork.Register(ctx, book.Title, SeedImageKind.Cover, ct);

        foreach (var author in authors)
            author.PortraitHash = await SeedArtwork.Register(
                ctx,
                $"{author.FirstName} {author.LastName}",
                SeedImageKind.Portrait,
                ct
            );

        ctx.Set<BookEntity>().AddRange(books);
        ctx.Set<AuthorEntity>().AddRange(authors);

        await ctx.SaveChangesAsync(ct);
    }
}
