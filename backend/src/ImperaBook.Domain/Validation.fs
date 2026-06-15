namespace ImperaBook.Domain

type DomainValidationError =
    | TitleRequired
    | TitleTooLong of maxLength: int
    | SubtitleRequired
    | SubtitleTooLong of maxLength: int
    | SummaryRequired
    | SummaryTooLong of maxLength: int
    | NameRequired
    | NameTooLong of maxLength: int
    | AuthorsRequired
    | LibraryNameRequired
    | LibraryNameTooLong of maxLength: int
