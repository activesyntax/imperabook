namespace ImperaBook.Domain

type ValidationError =
    | TitleRequired
    | TitleTooLong of maxLength: int
    | SubtitleRequired
    | SubtitleTooLong of maxLength: int
    | SummaryRequired
    | SummaryTooLong of maxLength: int
    | NameRequired
    | NameTooLong of maxLength: int
    | AuthorsRequired
