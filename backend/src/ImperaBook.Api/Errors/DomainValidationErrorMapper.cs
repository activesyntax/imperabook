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

            _ => throw new InvalidOperationException(
                $"Unmapped DomainValidationError: {error.GetType().Name}"
            ),
        };
}
