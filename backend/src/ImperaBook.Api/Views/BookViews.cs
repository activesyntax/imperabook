using ImperaBook.Application;
using ImperaBook.Contracts.Views;

namespace ImperaBook.API.Views;

public static class BookViews
{
    public static CommandResult ToCommandResult(
        this IReadOnlyList<BookListItem> books,
        string title,
        string emptyMessage,
        PageInfo? page = null
    ) =>
        new(
            new ViewNode[]
            {
                new ItemCollectionView(
                    Title: title,
                    EmptyMessage: emptyMessage,
                    Items: books.Select(ToItem).ToArray(),
                    Page: page
                ),
            }
        );

    public static CommandResult ToCommandResult(this BookDetail book) =>
        new(new ViewNode[] { ToDetail(book) });

    private static BookItemView ToItem(BookListItem b) =>
        new(
            Id: b.Id,
            Title: b.Title,
            Subtitle: b.Subtitle,
            Authors: b.Authors.Select(ToPerson).ToArray(),
            CoverSrc: ImageSrcOf(b.CoverHash)
        );

    private static BookDetailView ToDetail(BookDetail b) =>
        new(
            Id: b.Id,
            Title: b.Title,
            Subtitle: b.Subtitle,
            Authors: b.Authors.Select(ToPerson).ToArray(),
            Summary: b.Summary,
            CoverSrc: ImageSrcOf(b.CoverHash),
            Isbn: b.Isbn,
            Published: b.Published,
            Publisher: b.Publisher,
            Language: b.Language,
            Pages: b.Pages
        );

    // Name parts stay separate. Joining them is a presentation decision that differs by locale —
    // "George Orwell" against "Jókai Mór" — and the client is the side that knows which it wants.
    private static PersonRef ToPerson(BookAuthor a) => new(a.Id, a.FirstName, a.LastName);

    // An absent cover sends no URL, not a placeholder one (ADR 20). The same rule now covers the
    // empty author list: no "Unknown" string is composed here, because what an unattributed book
    // looks like is a rendering question.
    private static string? ImageSrcOf(string? hash) => hash is { } h ? $"/api/images/{h}" : null;
}
