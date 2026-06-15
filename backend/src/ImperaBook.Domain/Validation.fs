namespace ImperaBook.Domain

type DomainValidationError =
    | TitleRequired
    | TitleTooLong of maxLength: int
    | SubtitleTooLong of maxLength: int
    | SummaryTooLong of maxLength: int
    | NameRequired
    | NameTooLong of maxLength: int
    | LibraryNameRequired
    | LibraryNameTooLong of maxLength: int
