namespace ImperaBook.Domain

open System

// ---------------------------------------------------------------------------
// IDENTITIES
// ---------------------------------------------------------------------------

type Id<'Entity> = Id of Guid

module Id =
    let create<'Entity> () : Id<'Entity> = Id(Guid.NewGuid())
    let value (Id guid) = guid

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

type Author =
    private
        { Id: Id<Author>
          FirstName: PersonName option
          LastName: PersonName }

type Authors = private Authors of Id<Author> * Id<Author> list // at least one author must be there

module Authors =
    let create (ids: Id<Author> list) : Result<Authors, ValidationError> =
        match List.distinct ids with
        | [] -> Error AuthorsRequired
        | head :: tail -> Ok(Authors(head, tail))

    let toList (Authors(head, tail)) = head :: tail
    let primary (Authors(head, _)) = head



// ---------------------------------------------------------------------------
// AGGREGATES
// ---------------------------------------------------------------------------

type LibraryOwner =
    private
        { Id: Id<LibraryOwner>
          FIrstName: PersonName
          LastName: PersonName }

type LibraryName = private LibraryName of string

type Library =
    private
        { Owner: LibraryOwner
          Name: LibraryName }


type Location = Library of Library | Unknown

type Attribution =
    | Unknown
    | ByAuthors of Authors

module Author =
    let create (firstName: PersonName option) (lastName: PersonName) : Author =
        { Id = Id.create ()
          FirstName = firstName
          LastName = lastName }

    let id (a: Author) = a.Id
    let firstName (a: Author) = a.FirstName
    let lastName (a: Author) = a.LastName

type Book =
    private
        { Id: Id<Book>
          Title: Title
          Subtitle: Subtitle option
          Summary: Summary option
          Attribution: Attribution
          Location:Location } 

module Book =
    let create
        (title: Title)
        (subtitle: Subtitle option)
        (summary: Summary option)
        (attribution: Attribution)
        (location: Location)
        : Book =
        { Id = Id.create ()
          Title = title
          Subtitle = subtitle
          Summary = summary
          Attribution = attribution
          Location = location }

    let id (b: Book) = b.Id
    let title (b: Book) = b.Title
    let subtitle (b: Book) = b.Subtitle
    let summary (b: Book) = b.Summary
    let attribution (b: Book) = b.Attribution

module Attribution =
    let ofAuthorIds (ids: Id<Author> list) : Attribution =
        match Authors.create ids with
        | Ok authors -> ByAuthors authors
        | Error _ -> Unknown // the only error is "empty" -> treated as Unknown

    let authorIds (attribution: Attribution) : Id<Author> list =
        match attribution with
        | Unknown -> []
        | ByAuthors authors -> Authors.toList authors



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
