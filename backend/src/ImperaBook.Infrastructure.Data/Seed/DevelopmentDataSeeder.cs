using ImperaBook.Application;
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

        // Vitality coverage is deliberate — the seed exercises every branch the view
        // and the Needs attention panel will have to render:
        //   Deceased + both years   — the majority
        //   Deceased + no birth     — Shelley, Stoker
        //   Deceased + no death     — Christie: the row the panel exists to surface
        //   Deceased + neither      — Dostoevsky
        //   Living                  — Harari, Martin, Obama (no death column at all)
        //   Unknown                 — Hunt, Thomas, Evans: we don't know if they're alive
        var authors = new List<AuthorEntity>
        {
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "George",
                LastName = "Orwell",
                BirthYear = 1903,
                Vitality = VitalityKind.Deceased,
                DeathYear = 1950,
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_02,
                FirstName = "Jane",
                LastName = "Austen",
                BirthYear = 1775,
                Vitality = VitalityKind.Deceased,
                DeathYear = 1817,
            },
            // Deceased, neither year recorded.
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Fyodor",
                LastName = "Dostoevsky",
                Vitality = VitalityKind.Deceased,
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Leo",
                LastName = "Tolstoy",
                BirthYear = 1828,
                Vitality = VitalityKind.Deceased,
                DeathYear = 1910,
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Gabriel",
                LastName = "García Márquez",
                BirthYear = 1927,
                Vitality = VitalityKind.Deceased,
                DeathYear = 2014,
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Harper",
                LastName = "Lee",
                BirthYear = 1926,
                Vitality = VitalityKind.Deceased,
                DeathYear = 2016,
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "J.R.R.",
                LastName = "Tolkien",
                BirthYear = 1892,
                Vitality = VitalityKind.Deceased,
                DeathYear = 1973,
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Frank",
                LastName = "Herbert",
                BirthYear = 1920,
                Vitality = VitalityKind.Deceased,
                DeathYear = 1986,
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Isaac",
                LastName = "Asimov",
                BirthYear = 1920,
                Vitality = VitalityKind.Deceased,
                DeathYear = 1992,
            },
            // Deceased, death year missing — a Needs attention row.
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Agatha",
                LastName = "Christie",
                BirthYear = 1890,
                Vitality = VitalityKind.Deceased,
            },
            // Living — no death column to fill.
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Yuval Noah",
                LastName = "Harari",
                BirthYear = 1976,
                Vitality = VitalityKind.Living,
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Carl",
                LastName = "Sagan",
                BirthYear = 1934,
                Vitality = VitalityKind.Deceased,
                DeathYear = 1996,
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Stephen",
                LastName = "Hawking",
                BirthYear = 1942,
                Vitality = VitalityKind.Deceased,
                DeathYear = 2018,
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Daniel",
                LastName = "Kahneman",
                BirthYear = 1934,
                Vitality = VitalityKind.Deceased,
                DeathYear = 2024,
            },
            // Living.
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Robert C.",
                LastName = "Martin",
                BirthYear = 1952,
                Vitality = VitalityKind.Living,
            },
            // Unknown — we don't know whether they're alive. Zero value, set explicitly
            // here so the case is visible rather than inherited from the default.
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Andrew",
                LastName = "Hunt",
                Vitality = VitalityKind.Unknown,
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "David",
                LastName = "Thomas",
                Vitality = VitalityKind.Unknown,
            },
            // Unknown vitality, but the birth year is on record.
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Eric",
                LastName = "Evans",
                BirthYear = 1962,
                Vitality = VitalityKind.Unknown,
            },
            // Deceased, birth year missing.
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Mary",
                LastName = "Shelley",
                Vitality = VitalityKind.Deceased,
                DeathYear = 1851,
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_01,
                FirstName = "Bram",
                LastName = "Stoker",
                Vitality = VitalityKind.Deceased,
                DeathYear = 1912,
            },
            // Living.
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_02,
                FirstName = "Michelle",
                LastName = "Obama",
                BirthYear = 1964,
                Vitality = VitalityKind.Living,
            },
            new AuthorEntity
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId_02,
                FirstName = "Anthony",
                LastName = "Bourdain",
                BirthYear = 1956,
                Vitality = VitalityKind.Deceased,
                DeathYear = 2018,
            },
        };

        // Book completeness is deliberate, the same way the author Vitality set is.
        // Most rows are complete — a catalog where every book is missing something makes
        // the Needs attention panel meaningless, because "needs attention" stops
        // selecting anything. The gaps are therefore few and each one is placed:
        //
        //   Complete                    — 18 of 24 rows
        //   No language                 — Foundation
        //   No ISBN, published 1980     — Cosmos: the row the ISBN finding must surface
        //   No ISBN, published 1934     — Murder on the Orient Express: the row it must
        //                                 NOT surface, since the pre-1970 exclusion
        //                                 (ADR 23) is what keeps the list reachable-zero
        //   No publication year         — Thinking, Fast and Slow
        //   No page count               — Kitchen Confidential
        //   Several gaps at once        — Murder on the Orient Express (no ISBN,
        //                                 publisher, page count, summary or cover) and
        //                                 Orphan Book (nothing but a title, and no
        //                                 author either — Attribution.Unknown)
        //
        // Years are the year of the *work*, not of the copy on the shelf; the publisher
        // is the copy's. That is what a person cataloguing at home actually records, and
        // it is the reading the ISBN cutoff assumes.
        var books = new List<BookEntity>
        {
            // Classic literature
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Pride and Prejudice",
                Summary =
                    "Five sisters, a small fortune in play, and a courtship that has to survive "
                    + "both parties being right about each other.",
                LibraryId = libraryId_02,
                Isbn = "9780141439518",
                PublishedYear = 1813,
                Publisher = "Penguin Classics",
                Language = "en",
                PageCount = 435,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Crime and Punishment",
                Summary =
                    "A destitute student murders a pawnbroker to prove a theory about himself, "
                    + "then spends the rest of the novel being disproved.",
                LibraryId = libraryId_01,
                Isbn = "9780099112549",
                PublishedYear = 1866,
                Publisher = "Vintage Classics",
                Language = "en",
                PageCount = 671,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "War and Peace",
                Summary =
                    "Four families carried through the Napoleonic invasion of Russia, with a long "
                    + "argument underneath about what actually moves history.",
                LibraryId = libraryId_01,
                Isbn = "9780199538645",
                PublishedYear = 1869,
                Publisher = "Oxford University Press",
                Language = "en",
                PageCount = 1392,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "One Hundred Years of Solitude",
                Summary =
                    "Seven generations of the Buendía family in a town that keeps repeating its "
                    + "own names and its own mistakes.",
                LibraryId = libraryId_01,
                Isbn = "9780060883287",
                PublishedYear = 1967,
                Publisher = "Harper Perennial",
                Language = "en",
                PageCount = 417,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "To Kill a Mockingbird",
                Summary =
                    "A small-town lawyer defends a black man against a charge nobody expects him "
                    + "to survive, narrated by his daughter years later.",
                LibraryId = libraryId_01,
                Isbn = "9780099549482",
                PublishedYear = 1960,
                Publisher = "Arrow Books",
                Language = "en",
                PageCount = 309,
            },
            // Dystopian / political fiction
            new()
            {
                Id = Guid.NewGuid(),
                Title = "1984",
                Subtitle = "Nineteen Eighty-Four",
                Summary =
                    "Winston Smith edits the past for a living and starts keeping a diary, which "
                    + "is where the trouble begins.",
                LibraryId = libraryId_01,
                Isbn = "9780141036144",
                PublishedYear = 1949,
                Publisher = "Penguin Books",
                Language = "en",
                PageCount = 328,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Animal Farm",
                Subtitle = "A Fairy Story",
                Summary =
                    "The animals overthrow the farmer and rebuild the same hierarchy under new "
                    + "slogans.",
                LibraryId = libraryId_01,
                Isbn = "9780141036137",
                PublishedYear = 1945,
                Publisher = "Penguin Books",
                Language = "en",
                PageCount = 112,
            },
            // Fantasy
            new()
            {
                Id = Guid.NewGuid(),
                Title = "The Lord of the Rings",
                Subtitle = "The Fellowship of the Ring",
                Summary =
                    "The ring leaves the Shire, and the company assembled to carry it is broken "
                    + "before it gets far.",
                LibraryId = libraryId_01,
                Isbn = "9780008263966",
                PublishedYear = 1954,
                Publisher = "HarperCollins",
                Language = "en",
                PageCount = 423,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "The Hobbit",
                Subtitle = "There and Back Again",
                Summary =
                    "A comfortable hobbit is talked into a dragon burglary and comes home a "
                    + "different person.",
                LibraryId = libraryId_01,
                Isbn = "9780008458683",
                PublishedYear = 1937,
                Publisher = "HarperCollins",
                Language = "en",
                PageCount = 310,
            },
            // Science fiction
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Dune",
                Summary =
                    "A noble house is handed a desert planet, destroyed on it, and its heir "
                    + "becomes what the planet needs him to be.",
                LibraryId = libraryId_01,
                Isbn = "9780575112933",
                PublishedYear = 1965,
                Publisher = "Gollancz",
                Language = "en",
                PageCount = 604,
            },
            // No language recorded — a single-gap row.
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Foundation",
                Summary =
                    "A psychohistorian predicts the empire's collapse and plants a colony to "
                    + "shorten the dark age that follows it.",
                LibraryId = libraryId_01,
                Isbn = "9780553293357",
                PublishedYear = 1951,
                Publisher = "Bantam Spectra",
                PageCount = 244,
            },
            // Mystery / crime
            // The multi-gap shelf copy: no ISBN, publisher, page count, summary or cover.
            // Published 1934, so the ISBN finding excludes it (ADR 23) while the general
            // `list incomplete books` still returns it.
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Murder on the Orient Express",
                LibraryId = libraryId_01,
                PublishedYear = 1934,
                Language = "en",
            },
            // Horror / gothic
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Frankenstein",
                Subtitle = "The Modern Prometheus",
                Summary =
                    "A student assembles a living man out of dead parts and abandons him the "
                    + "moment he opens his eyes.",
                LibraryId = libraryId_01,
                Isbn = "9780141439471",
                PublishedYear = 1818,
                Publisher = "Penguin Classics",
                Language = "en",
                PageCount = 273,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Dracula",
                Summary =
                    "Letters, diaries and telegrams assembled by the people hunting a "
                    + "Transylvanian count through England.",
                LibraryId = libraryId_01,
                Isbn = "9780141439846",
                PublishedYear = 1897,
                Publisher = "Penguin Classics",
                Language = "en",
                PageCount = 454,
            },
            // History / non-fiction
            // The one non-English copy on the shelves, so the dashboard's language
            // breakdown has more than one bar to draw.
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Sapiens",
                Subtitle = "Az emberiség rövid története",
                Summary =
                    "How an unremarkable African primate talked its way into running the planet, "
                    + "told as three revolutions.",
                LibraryId = libraryId_01,
                Isbn = "9789639324718",
                PublishedYear = 2011,
                Publisher = "Animus Kiadó",
                Language = "hu",
                PageCount = 444,
            },
            // Science / popular science
            // No ISBN, published 1980 — above the cutoff, so this is the row the ISBN
            // finding is supposed to surface.
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Cosmos",
                Summary =
                    "The companion to the television series: the universe from the first second "
                    + "to the library of Alexandria and back.",
                LibraryId = libraryId_01,
                PublishedYear = 1980,
                Publisher = "Ballantine Books",
                Language = "en",
                PageCount = 396,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "A Brief History of Time",
                Subtitle = "From the Big Bang to Black Holes",
                Summary =
                    "Cosmology for readers who will not be doing the mathematics, and an argument "
                    + "that they do not need to.",
                LibraryId = libraryId_01,
                Isbn = "9780553176988",
                PublishedYear = 1988,
                Publisher = "Bantam Books",
                Language = "en",
                PageCount = 212,
            },
            // Psychology
            // No publication year — a single-gap row.
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Thinking, Fast and Slow",
                Summary =
                    "Two systems of thought — one fast and confident, one slow and lazy — and the "
                    + "errors that follow from letting the first one answer.",
                LibraryId = libraryId_01,
                Isbn = "9780141033570",
                Publisher = "Penguin",
                Language = "en",
                PageCount = 499,
            },
            // Technology / software
            new()
            {
                Id = Guid.NewGuid(),
                Title = "The Pragmatic Programmer",
                Subtitle = "Your Journey to Mastery",
                Summary =
                    "Working habits for programmers, written as short rules that are hard to "
                    + "argue with and easy to ignore.",
                LibraryId = libraryId_01,
                Isbn = "9780135957059",
                PublishedYear = 1999,
                Publisher = "Addison-Wesley",
                Language = "en",
                PageCount = 352,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Clean Code",
                Subtitle = "A Handbook of Agile Software Craftsmanship",
                Summary =
                    "How to write code other people can read, with long worked examples of doing "
                    + "it badly first.",
                LibraryId = libraryId_01,
                Isbn = "9780132350884",
                PublishedYear = 2008,
                Publisher = "Prentice Hall",
                Language = "en",
                PageCount = 464,
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Domain-Driven Design",
                Subtitle = "Tackling Complexity in the Heart of Software",
                Summary =
                    "Modelling software around the language the business already speaks, and "
                    + "keeping that model honest as it grows.",
                LibraryId = libraryId_01,
                Isbn = "9780321125217",
                PublishedYear = 2003,
                Publisher = "Addison-Wesley",
                Language = "en",
                PageCount = 560,
            },
            // Biography / memoir
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Becoming",
                Summary =
                    "A memoir in three parts: a childhood on the South Side, a marriage, and "
                    + "eight years in a house she did not choose.",
                LibraryId = libraryId_02,
                Isbn = "9781524763138",
                PublishedYear = 2018,
                Publisher = "Crown",
                Language = "en",
                PageCount = 448,
            },
            // Food / travel
            // No page count — a single-gap row.
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Kitchen Confidential",
                Subtitle = "Adventures in the Culinary Underbelly",
                Summary =
                    "What restaurant kitchens are actually like, from a chef who had nothing left "
                    + "to lose by saying so.",
                LibraryId = libraryId_02,
                Isbn = "9780747535461",
                PublishedYear = 2000,
                Publisher = "Bloomsbury",
                Language = "en",
            },
            // Nothing but a title: no author link rows (Attribution.Unknown), no cover,
            // and every optional field empty. The far end of the completeness range.
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

        // Books deliberately left without cover artwork, so the "having no cover" finding
        // has rows to return. Listed by title rather than excluded one by one, because the
        // set is data now and not a single special case.
        string[] withoutCover = ["Orphan Book", "Murder on the Orient Express"];

        // SeedImage.LogManifest();
        foreach (var book in books.Where(b => !withoutCover.Contains(b.Title)))
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
