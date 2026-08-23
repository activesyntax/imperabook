using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data;

public static class DevelopmentDataSeeder
{
    public static async Task SeedAsync(
        DbContext ctx,
        UserManager<UserEntity> users,
        string password,
        CancellationToken ct
    )
    {
        if (await ctx.Set<BookEntity>().AnyAsync(ct))
            return;

        var ownerId_01 = Guid.NewGuid();
        var ownerId_02 = Guid.NewGuid();
        var libraryId_01 = Guid.NewGuid();
        var libraryId_02 = Guid.NewGuid();

        var owner1 = new UserEntity
        {
            Id = ownerId_01,
            UserName = "bill",
            Email = "bill.taylor@activesyntax.net",
            FirstName = "Bill",
            LastName = "Taylor",
        };

        var owner2 = new UserEntity
        {
            Id = ownerId_02,
            UserName = "mary",
            Email = "mary.johnson@activesyntax.net",
            FirstName = "Mary",
            LastName = "Johnson",
        };

        var createdOwner1 = await users.CreateAsync(owner1, password);
        var createdOwner2 = await users.CreateAsync(owner2, password);

        if (!createdOwner1.Succeeded || !createdOwner2.Succeeded)
        {
            var reasons = string.Join(
                "; ",
                createdOwner1.Errors.Select(e => $"{e.Code}: {e.Description}"),
                createdOwner2.Errors.Select(e => $"{e.Code}: {e.Description}")
            );
            throw new InvalidOperationException($"Seeding the development user failed. {reasons}");
        }

        var libraries = new List<LibraryEntity>()
        {
            new LibraryEntity
            {
                Id = libraryId_01,
                Name = "Home Library",
                OwnerId = ownerId_01,

                PhotoHash = await SeedImage.Register("library-photo.jpg", ctx, ct),
            },
            new LibraryEntity
            {
                Id = libraryId_02,
                Name = "Home Library",
                OwnerId = ownerId_02,

                PhotoHash = await SeedImage.Register("library-photo-2.jpg", ctx, ct),
            },
        };

        ctx.Set<LibraryEntity>().AddRange(libraries);

        var authors = new List<AuthorEntity>
        {
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "George",
                LastName = "Orwell",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_02,
                FirstName = "Jane",
                LastName = "Austen",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Fyodor",
                LastName = "Dostoevsky",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Leo",
                LastName = "Tolstoy",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Gabriel",
                LastName = "García Márquez",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Harper",
                LastName = "Lee",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "J.R.R.",
                LastName = "Tolkien",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Frank",
                LastName = "Herbert",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Isaac",
                LastName = "Asimov",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Agatha",
                LastName = "Christie",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Yuval Noah",
                LastName = "Harari",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Carl",
                LastName = "Sagan",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Stephen",
                LastName = "Hawking",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Daniel",
                LastName = "Kahneman",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Robert C.",
                LastName = "Martin",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Andrew",
                LastName = "Hunt",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "David",
                LastName = "Thomas",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Eric",
                LastName = "Evans",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Mary",
                LastName = "Shelley",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Bram",
                LastName = "Stoker",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_02,
                FirstName = "Michelle",
                LastName = "Obama",
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_02,
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
                LibraryId = libraryId_02,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Crime and Punishment",
                LibraryId = libraryId_01,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "War and Peace",
                LibraryId = libraryId_01,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "One Hundred Years of Solitude",
                LibraryId = libraryId_01,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "To Kill a Mockingbird",
                LibraryId = libraryId_01,
            },
            // Dystopian / political fiction
            new()
            {
                Id = Guid.NewGuid(),
                Title = "1984",
                Subtitle = "Nineteen Eighty-Four",
                LibraryId = libraryId_01,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Animal Farm",
                Subtitle = "A Fairy Story",
                LibraryId = libraryId_01,
            },
            // Fantasy
            new()
            {
                Id = Guid.NewGuid(),
                Title = "The Lord of the Rings",
                Subtitle = "The Fellowship of the Ring",
                LibraryId = libraryId_01,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "The Hobbit",
                Subtitle = "There and Back Again",
                LibraryId = libraryId_01,
            },
            // Science fiction
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Dune",
                LibraryId = libraryId_01,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Foundation",
                LibraryId = libraryId_01,
            },
            // Mystery / crime
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Murder on the Orient Express",
                LibraryId = libraryId_01,
            },
            // Horror / gothic
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Frankenstein",
                Subtitle = "The Modern Prometheus",
                LibraryId = libraryId_01,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Dracula",
                LibraryId = libraryId_01,
            },
            // History / non-fiction
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Sapiens",
                Subtitle = "A Brief History of Humankind",
                LibraryId = libraryId_01,
            },
            // Science / popular science
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Cosmos",
                LibraryId = libraryId_01,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "A Brief History of Time",
                Subtitle = "From the Big Bang to Black Holes",
                LibraryId = libraryId_01,
            },
            // Psychology
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Thinking, Fast and Slow",
                LibraryId = libraryId_01,
            },
            // Technology / software
            new()
            {
                Id = Guid.NewGuid(),
                Title = "The Pragmatic Programmer",
                Subtitle = "Your Journey to Mastery",
                LibraryId = libraryId_01,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Clean Code",
                Subtitle = "A Handbook of Agile Software Craftsmanship",
                LibraryId = libraryId_01,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Domain-Driven Design",
                Subtitle = "Tackling Complexity in the Heart of Software",
                LibraryId = libraryId_01,
            },
            // Biography / memoir
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Becoming",
                LibraryId = libraryId_02,
            },
            // Food / travel
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Kitchen Confidential",
                Subtitle = "Adventures in the Culinary Underbelly",
                LibraryId = libraryId_02,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Orphan Book",
                LibraryId = libraryId_01,
            },
        };

        // Title → author last names, in credit order. A book absent from this map has no
        // link rows, which is exactly Attribution.Unknown ("Orphan Book" is the case here).
        var attribution = new Dictionary<string, string[]>
        {
            ["Pride and Prejudice"] = ["Austen"],
            ["Crime and Punishment"] = ["Dostoevsky"],
            ["War and Peace"] = ["Tolstoy"],
            ["One Hundred Years of Solitude"] = ["García Márquez"],
            ["To Kill a Mockingbird"] = ["Lee"],
            ["1984"] = ["Orwell"],
            ["Animal Farm"] = ["Orwell"],
            ["The Lord of the Rings"] = ["Tolkien"],
            ["The Hobbit"] = ["Tolkien"],
            ["Dune"] = ["Herbert"],
            ["Foundation"] = ["Asimov"],
            ["Murder on the Orient Express"] = ["Christie"],
            ["Frankenstein"] = ["Shelley"],
            ["Dracula"] = ["Stoker"],
            ["Sapiens"] = ["Harari"],
            ["Cosmos"] = ["Sagan"],
            ["A Brief History of Time"] = ["Hawking"],
            ["Thinking, Fast and Slow"] = ["Kahneman"],
            ["The Pragmatic Programmer"] = ["Hunt", "Thomas"],
            ["Clean Code"] = ["Martin"],
            ["Domain-Driven Design"] = ["Evans"],
            ["Becoming"] = ["Obama"],
            ["Kitchen Confidential"] = ["Bourdain"],
        };

        var authorIdByLastName = authors.ToDictionary(a => a.LastName, a => a.Id);

        foreach (var (bookTitle, lastNames) in attribution)
        {
            var book = books.Single(b => b.Title == bookTitle);

            book.Authors = lastNames
                .Select(
                    (lastName, i) =>
                        new BookAuthorEntity
                        {
                            BookId = book.Id,
                            AuthorId = authorIdByLastName[lastName],
                            Ordinal = i,
                        }
                )
                .ToList();
        }

        // SeedImage.LogManifest();
        foreach (var book in books.Where(b => b.Title != "Orphan Book"))
            book.CoverHash = await SeedArtwork.Register(ctx, book.Title, SeedImageKind.Cover, ct);

        foreach (var author in authors)
            author.PortraitHash = await SeedArtwork.Register(
                ctx,
                $"{author.FirstName} {author.LastName}",
                SeedImageKind.Portrait,
                ct
            );

        ctx.Set<AuthorEntity>().AddRange(authors);
        ctx.Set<BookEntity>().AddRange(books);

        await ctx.SaveChangesAsync(ct);
    }
}
