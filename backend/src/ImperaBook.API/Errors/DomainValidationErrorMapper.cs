using ImperaBook.Domain.Catalog;

namespace ImperaBook.Api.Errors;

internal static class DomainValidationErrorMapper
{
    public static ValidationFailure ToFailure(this DomainValidationError error) =>
        error switch
        {
            DomainValidationError.TitleRequired => new("title_required", "Title is required."),
            DomainValidationError.TitleTooLong e => new(
                "title_too_long",
                $"Title must be at most {e.MaxLength} characters."
            ),
            DomainValidationError.SubtitleRequired => new(
                "subtitle_required",
                "Subtitle must not be blank when provided."
            ),
            DomainValidationError.SubtitleTooLong e => new(
                "subtitle_too_long",
                $"Subtitle must be at most {e.MaxLength} characters."
            ),
            DomainValidationError.SummaryTooLong e => new(
                "summary_too_long",
                $"Summary must be at most {e.MaxLength} characters."
            ),
            DomainValidationError.NameRequired => new("name_required", "Name is required."),
            DomainValidationError.NameTooLong e => new(
                "name_too_long",
                $"Name must be at most {e.MaxLength} characters."
            ),
            DomainValidationError.LibraryNameRequired => new(
                "library_name_required",
                "Library name is required."
            ),
            DomainValidationError.LibraryNameTooLong e => new(
                "library_name_too_long",
                $"Library name must be at most {e.MaxLength} characters."
            ),

            _ => throw new InvalidOperationException(
                $"Unmapped DomainValidationError: {error.GetType().Name}"
            ),
        };
}
