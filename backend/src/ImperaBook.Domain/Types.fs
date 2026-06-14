namespace ImperaBook.Domain

open System

// ---------------------------------------------------------------------------
// IDENTITIES
// ---------------------------------------------------------------------------

type AuthorId = AuthorId of Guid
type BookId = BookId of Guid

module AuthorId =
    let create () = AuthorId(Guid.NewGuid())
    let value (AuthorId id) = id

module BookId =
    let create () = BookId(Guid.NewGuid())
    let value (BookId id) = id


// ---------------------------------------------------------------------------
// CONSTRAINED TEXT
// ---------------------------------------------------------------------------

type Title = private Title of string
type Subtitle = private Subtitle of string
type Summary = private Summary of string
type PersonName = private PersonName of string

module Title =
    [<Literal>]
    let MaxLength = 500

    let create (raw: string) : Result<Title, ValidationError> =
        match TextRules.check MaxLength raw with
        | TextRules.Empty -> Error TitleRequired
        | TextRules.TooLong -> Error(TitleTooLong MaxLength)
        | TextRules.Valid s -> Ok(Title s)

    let value (Title t) = t

module Subtitle =
    [<Literal>]
    let MaxLength = 500

    let create (raw: string) : Result<Subtitle, ValidationError> =
        match TextRules.check MaxLength raw with
        | TextRules.Empty -> Error SubtitleRequired
        | TextRules.TooLong -> Error(SubtitleTooLong MaxLength)
        | TextRules.Valid s -> Ok(Subtitle s)

    let value (Subtitle t) = t

module Summary =
    [<Literal>]
    let MaxLength = 4000

    let create (raw: string) : Result<Summary, ValidationError> =
        match TextRules.check MaxLength raw with
        | TextRules.Empty -> Error SummaryRequired
        | TextRules.TooLong -> Error(SummaryTooLong MaxLength)
        | TextRules.Valid s -> Ok(Summary s)

    let value (Summary t) = t

module PersonName =
    [<Literal>]
    let MaxLength = 300

    let create (raw: string) : Result<PersonName, ValidationError> =
        match TextRules.check MaxLength raw with
        | TextRules.Empty -> Error NameRequired
        | TextRules.TooLong -> Error(NameTooLong MaxLength)
        | TextRules.Valid s -> Ok(PersonName s)

    let value (PersonName t) = t


// ---------------------------------------------------------------------------
// AUTHORS
// ---------------------------------------------------------------------------

type Authors = private Authors of AuthorId * AuthorId list // at least one author must be there

module Authors =
    let create (ids: AuthorId list) : Result<Authors, ValidationError> =
        match List.distinct ids with
        | [] -> Error AuthorsRequired
        | head :: tail -> Ok(Authors(head, tail))

    let toList (Authors(head, tail)) = head :: tail
    let primary (Authors(head, _)) = head


// ---------------------------------------------------------------------------
// ATTRIBUTION
// ---------------------------------------------------------------------------

type Attribution =
    | Unknown
    | ByAuthors of Authors

module Attribution =
    let ofAuthorIds (ids: AuthorId list) : Attribution =
        match Authors.create ids with
        | Ok authors -> ByAuthors authors
        | Error _ -> Unknown // the only error is "empty" -> treated as Unknown

    let authorIds (attribution: Attribution) : AuthorId list =
        match attribution with
        | Unknown -> []
        | ByAuthors authors -> Authors.toList authors


// ---------------------------------------------------------------------------
// AGGREGATES
// ---------------------------------------------------------------------------

type Author =
    private
        { Id: AuthorId
          FirstName: PersonName option
          LastName: PersonName }

module Author =
    let create (firstName: PersonName option) (lastName: PersonName) : Author =
        { Id = AuthorId.create ()
          FirstName = firstName
          LastName = lastName }

    let id (a: Author) = a.Id
    let firstName (a: Author) = a.FirstName
    let lastName (a: Author) = a.LastName

type Book =
    private
        { Id: BookId
          Title: Title
          Subtitle: Subtitle option
          Summary: Summary option
          Attribution: Attribution }

module Book =
    let create (title: Title) (subtitle: Subtitle option) (summary: Summary option) (attribution: Attribution) : Book =
        { Id = BookId.create ()
          Title = title
          Subtitle = subtitle
          Summary = summary
          Attribution = attribution }

    let id (b: Book) = b.Id
    let title (b: Book) = b.Title
    let subtitle (b: Book) = b.Subtitle
    let summary (b: Book) = b.Summary
    let attribution (b: Book) = b.Attribution


// ---------------------------------------------------------------------------
// PARSING HELPER (for the command layer)
// Optional fields share the same `create`: blank input becomes None, present
// input is validated. One combinator instead of an "optional" variant per type.
//   Parse.optional Subtitle.create raw   : Result<Subtitle option, ValidationError>
//   Parse.optional PersonName.create raw : Result<PersonName option, ValidationError>
// ---------------------------------------------------------------------------

module Parse =
    let optional (create: string -> Result<'T, ValidationError>) (raw: string) : Result<'T option, ValidationError> =
        let s = if isNull raw then "" else raw.Trim()
        if s = "" then Ok None else create s |> Result.map Some
