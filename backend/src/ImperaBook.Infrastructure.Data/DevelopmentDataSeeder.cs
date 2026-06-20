using ImperaBook.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ImperaBook.Infrastructure.Data;

public static class DevelopmentDataSeeder
{
    public static async Task SeedAsync(DbContext ctx, CancellationToken ct)
    {
        if (await ctx.Set<BookEntity>().AnyAsync(ct))
            return;

        var ownerId = Guid.Parse("22222222-2222-2222-2222-222222222222");
        var libraryId = Guid.Parse("11111111-1111-1111-1111-111111111111");

        ctx.Set<UserEntity>()
            .Add(
                new UserEntity
                {
                    Id = ownerId,
                    FirstName = "József",
                    LastName = "Owner",
                }
            );

        ctx.Set<LibraryEntity>()
            .Add(
                new LibraryEntity
                {
                    Id = libraryId,
                    Name = "Home Library",
                    OwnerId = ownerId,
                }
            );

        ctx.Set<BookEntity>()
            .AddRange(
                new BookEntity
                {
                    Id = Guid.NewGuid(),
                    Title = "The Pragmatic Programmer",
                    LibraryId = libraryId,
                },
                new BookEntity
                {
                    Id = Guid.NewGuid(),
                    Title = "Domain-Driven Design",
                    Subtitle = "Tackling Complexity",
                    LibraryId = libraryId,
                },
                new BookEntity
                {
                    Id = Guid.NewGuid(),
                    Title = "Orphan Book",
                    LibraryId = null,
                }
            );

        await ctx.SaveChangesAsync(ct);
    }
}
