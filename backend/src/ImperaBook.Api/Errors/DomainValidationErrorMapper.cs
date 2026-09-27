using ImperaBook.Domain.Catalog;

namespace ImperaBook.Api.Errors;

internal static class DomainValidationErrorMapper
{
    public static ValidationFailure ToFailure(this CatalogValidationError error) =>
        error switch
        {
            CatalogValidationError.TitleRequired => new("title_required", "Title is required."),
            CatalogValidationError.TitleTooLong e => new(
                "title_too_long",
                $"Title must be at most {e.MaxLength} characters."
            ),
            CatalogValidationError.SubtitleRequired => new(
                "subtitle_required",
                "Subtitle must not be blank when provided."
            ),
            CatalogValidationError.SubtitleTooLong e => new(
                "subtitle_too_long",
                $"Subtitle must be at most {e.MaxLength} characters."
            ),
            CatalogValidationError.SummaryTooLong e => new(
                "summary_too_long",
                $"Summary must be at most {e.MaxLength} characters."
            ),
            CatalogValidationError.NameRequired => new("name_required", "Name is required."),
            CatalogValidationError.NameTooLong e => new(
                "name_too_long",
                $"Name must be at most {e.MaxLength} characters."
            ),
            CatalogValidationError.LibraryNameRequired => new(
                "library_name_required",
                "Library name is required."
            ),
            CatalogValidationError.LibraryNameTooLong e => new(
                "library_name_too_long",
                $"Library name must be at most {e.MaxLength} characters."
            ),

            CatalogValidationError.AuthorRequired => new(
                "author_required",
                "At least one author is required."
            ),
            CatalogValidationError.ContentHashRequired => new(
                "content_hash_required",
                "Image hash is required."
            ),
            CatalogValidationError.ContentHashMalformed e => new(
                "content_hash_malformed",
                $"Image hash must be {e.ExpectedLength} hexadecimal characters."
            ),
            CatalogValidationError.YearOutOfRange e => new(
                "year_out_of_range",
                $"Year must be between {e.Min} and {e.Max}."
            ),
            CatalogValidationError.DeathBeforeBirth e => new(
                "death_before_birth",
                $"Death year ({e.Death}) must not be before birth year ({e.Birth})."
            ),
            CatalogValidationError.DeathYearRequiresDeceased => new(
                "death_year_requires_deceased",
                "A death year can only be given for a deceased author."
            ),
            CatalogValidationError.IsbnInvalid => new("isbn_invalid", "ISBN is not valid."),
            CatalogValidationError.LanguageCodeInvalid => new(
                "language_code_invalid",
                "Language must be a two-letter ISO 639-1 code."
            ),
            CatalogValidationError.PublisherTooLong e => new(
                "publisher_too_long",
                $"Publisher must be at most {e.Max} characters."
            ),
            CatalogValidationError.PageCountInvalid => new(
                "page_count_invalid",
                "Page count is not valid."
            ),
            CatalogValidationError.PageCountOutOfRange e => new(
                "page_count_out_of_range",
                $"Page count must be between {e.Min} and {e.Max}."
            ),
            CatalogValidationError.NotANumber e => new(
                "not_a_number",
                $"\"{e.s}\" is not a number."
            ),
            _ => throw new InvalidOperationException(
                $"Unmapped DomainValidationError: {error.GetType().Name}"
            ),
        };
}
