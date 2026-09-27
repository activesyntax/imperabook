using System.Globalization;
using CSharpFunctionalExtensions;
using ImperaBook.Domain;
using ImperaBook.Domain.Catalog;
using Authors = ImperaBook.Domain.Catalog.Authors;

namespace ImperaBook.Application;

public sealed record AddBookCommand
{
    public required string Title { get; init; }

    /// <summary>
    /// Search text for the author, not an exact name. Blank means the author is unknown; no match
    /// adds the author; one match attaches it; several are ambiguous and nothing is added.
    /// </summary>
    public string? Author { get; init; }

    public string? Subtitle { get; init; }
    public string? Summary { get; init; }
    public string? CoverHash { get; init; }
    public string? Isbn { get; init; }
    public string? Published { get; init; }
    public string? Publisher { get; init; }
    public string? Language { get; init; }
    public string? Pages { get; init; }
}

/// <summary>How the book's author was settled, so the reply can say so.</summary>
public abstract record AuthorResolution
{
    private AuthorResolution() { }

    public sealed record Unknown : AuthorResolution;

    public sealed record Existing(Guid Id, string Name) : AuthorResolution;

    public sealed record Created(Guid Id, string Name) : AuthorResolution;
}

public sealed record BookAdded(Guid Id, string Title, AuthorResolution Author);

public sealed class AddBookCommandHandler(
    IBookCommands books,
    ILibraryQueries libraries,
    IAuthorQueries authors,
    AddAuthorCommandHandler addAuthor,
    IImageStore images,
    IArtwork artwork
)
{
    public async Task<Result<BookAdded, ApplicationError>> Handle(
        AddBookCommand command,
        CancellationToken ct
    )
    {
        var library = await ResolveLibrary(ct);
        if (library.IsFailure)
            return library.Error;

        var book = BuildBook(command, Id<Book>.New(), library.Value);
        if (book.IsFailure)
            return book.Error;

        // Checked before the author is settled: a book that cannot be added must not leave a
        // freshly created author behind.
        var cover = await VerifyCover(book.Value.Cover, ct);
        if (cover.IsFailure)
            return cover.Error;

        var author = await ResolveAuthor(command.Author, ct);
        if (author.IsFailure)
            return author.Error;

        var finished = book.Value with
        {
            Attribution = Attribution.Of(AuthorsOf(author.Value)),
            Cover = book.Value.Cover.HasValue
                ? book.Value.Cover
                : await artwork.Cover(book.Value.Title, ct),
        };

        await books.Add(finished, ct);
        return new BookAdded(finished.Id.Value, finished.Title.Value, author.Value);
    }

    private async Task<Result<Id<Library>, ApplicationError>> ResolveLibrary(CancellationToken ct)
    {
        var libraryId = await libraries.GetIdAsync(ct);

        return libraryId.Match(
            id => Result.Success<Id<Library>, ApplicationError>(Id<Library>.From(id)),
            () => Result.Failure<Id<Library>, ApplicationError>(new ApplicationError.NoLibrary())
        );
    }

    private async Task<UnitResult<ApplicationError>> VerifyCover(
        Maybe<ContentHash> cover,
        CancellationToken ct
    )
    {
        if (!cover.TryGetValue(out var hash))
            return UnitResult.Success<ApplicationError>();

        return await images.Exists(hash, ct)
            ? UnitResult.Success<ApplicationError>()
            : UnitResult.Failure<ApplicationError>(new ApplicationError.ImageNotFound(hash));
    }

    private async Task<Result<AuthorResolution, ApplicationError>> ResolveAuthor(
        string? search,
        CancellationToken ct
    )
    {
        var term = Normalize(search);
        if (term.Length == 0)
            return new AuthorResolution.Unknown();

        var matches = await authors.Search(term, ct);

        // Contains-matching alone could never single out "John Smith" next to "John Smithson",
        // so a whole-name match wins when there is exactly one.
        var exact = matches
            .Where(a => string.Equals(FullName(a), term, StringComparison.OrdinalIgnoreCase))
            .ToList();

        return (matches.Length, exact.Count) switch
        {
            (0, _) => await CreateAuthor(term, ct),
            (1, _) => new AuthorResolution.Existing(matches[0].Id, FullName(matches[0])),
            (_, 1) => new AuthorResolution.Existing(exact[0].Id, FullName(exact[0])),
            _ => new ApplicationError.AmbiguousAuthor(term, matches),
        };
    }

    /// <summary>
    /// The search text becomes the new author's name: the last word is the last name, anything
    /// before it the first name. Compound last names ("Le Guin") split wrongly.
    /// </summary>
    private async Task<Result<AuthorResolution, ApplicationError>> CreateAuthor(
        string name,
        CancellationToken ct
    )
    {
        var split = name.LastIndexOf(' ');
        var command = new AddAuthorCommand
        {
            FirstName = split < 0 ? null : name[..split],
            LastName = name[(split + 1)..],
        };

        var created = await addAuthor.Handle(command, ct);

        return created.Map(id => (AuthorResolution)new AuthorResolution.Created(id, name));
    }

    private static Maybe<Authors> AuthorsOf(AuthorResolution author) =>
        author switch
        {
            AuthorResolution.Existing e => Authors.Create([Id<Author>.From(e.Id)]),
            AuthorResolution.Created c => Authors.Create([Id<Author>.From(c.Id)]),
            _ => Maybe<Authors>.None,
        };

    private static string Normalize(string? search) =>
        string.Join(' ', (search ?? "").Split(' ', StringSplitOptions.RemoveEmptyEntries));

    private static string FullName(AuthorListItem a) =>
        string.IsNullOrWhiteSpace(a.FirstName) ? a.LastName : $"{a.FirstName} {a.LastName}";

    private static Result<Book, ApplicationError> BuildBook(
        AddBookCommand command,
        Id<Book> id,
        Id<Library> library
    )
    {
        var title = Title.Create(command.Title);

        var subtitle = Subtitle.Create(command.Subtitle);
        var summary = Summary.Create(command.Summary);
        var isbn = Isbn.Create(command.Isbn);
        var publisher = Publisher.Create(command.Publisher);
        var language = LanguageCode.Create(command.Language);
        var cover = ParseCover(command.CoverHash);
        var published = ParseYear(command.Published);
        var pages = ParsePageCount(command.Pages);

        CatalogValidationError?[] errors =
        [
            title.IsFailure ? title.Error : null,
            subtitle.IsFailure ? subtitle.Error : null,
            summary.IsFailure ? summary.Error : null,
            cover.IsFailure ? cover.Error : null,
            isbn.IsFailure ? isbn.Error : null,
            publisher.IsFailure ? publisher.Error : null,
            language.IsFailure ? language.Error : null,
            published.IsFailure ? published.Error : null,
            pages.IsFailure ? pages.Error : null,
        ];

        var failures = errors.OfType<CatalogValidationError>().ToList();
        if (failures.Count > 0)
            return new ApplicationError.Validation(failures);

        return new Book
        {
            Id = id,
            Library = library,
            Title = title.Value,
            Subtitle = subtitle.Value,
            Summary = summary.Value,
            Cover = cover.Value,
            Isbn = isbn.Value,
            Published = published.Value,
            Publisher = publisher.Value,
            Language = language.Value,
            Pages = pages.Value,
        };
    }

    private static Result<Maybe<ContentHash>, CatalogValidationError> ParseCover(string? raw) =>
        string.IsNullOrWhiteSpace(raw)
            ? Maybe<ContentHash>.None
            : ContentHash.Create(raw).Map(Maybe<ContentHash>.From);

    private static Result<Maybe<Year>, CatalogValidationError> ParseYear(string? raw)
    {
        if (string.IsNullOrWhiteSpace(raw))
            return Maybe<Year>.None;

        var trimmed = raw.Trim();

        return int.TryParse(trimmed, CultureInfo.InvariantCulture, out var value)
            ? Year.Create(value).Map(Maybe<Year>.From)
            : new CatalogValidationError.NotANumber(trimmed);
    }

    private static Result<Maybe<PageCount>, CatalogValidationError> ParsePageCount(string? raw)
    {
        if (string.IsNullOrWhiteSpace(raw))
            return Maybe<PageCount>.None;

        var trimmed = raw.Trim();

        return uint.TryParse(trimmed, CultureInfo.InvariantCulture, out var value)
            ? PageCount.Create(value).Map(Maybe<PageCount>.From)
            : new CatalogValidationError.NotANumber(trimmed);
    }
}
