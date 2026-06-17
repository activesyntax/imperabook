namespace ImperaBook.Domain

open System

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

type Id<'Entity> = Id of Guid

type Title = private Title of string
type Subtitle = private Subtitle of string
type Summary = private Summary of string
type PersonName = private PersonName of string

type Author =
    private
        { Id: Id<Author>
          FirstName: PersonName option
          LastName: PersonName }

type Authors = private Authors of Id<Author> * Id<Author> list // at least one author must be there

type LibraryOwner =
    private
        { Id: Id<LibraryOwner>
          FirstName: PersonName
          LastName: PersonName }

type LibraryName = private LibraryName of string

type Library =
    private
        { Id: Id<Library>
          Owner: LibraryOwner
          Name: LibraryName }
[<RequireQualifiedAccess>]
type Location =
    | Library of Id<Library>
    | Unknown

[<RequireQualifiedAccess>]
type Attribution =
    | Unknown
    | ByAuthors of Authors

type Book =
    private
        { Id: Id<Book>
          Title: Title
          Subtitle: Subtitle option
          Summary: Summary option
          Attribution: Attribution
          Location: Location }


// ---------------------------------------------------------------------------
// IDENTITIES
// ---------------------------------------------------------------------------

module Id =
    let create<'Entity> () : Id<'Entity> = Id(Guid.NewGuid())
    let value (Id guid) = guid
    let ofGuid<'Entity> (g: Guid) : Id<'Entity> = Id g

// ---------------------------------------------------------------------------
// CONSTRAINED TEXT
// ---------------------------------------------------------------------------

module Title =
    [<Literal>]
    let MaxLength = 500

    let create (raw: string) : Result<Title, DomainValidationError> =
        match TextRules.check MaxLength raw with
        | TextRules.Empty -> Error TitleRequired
        | TextRules.TooLong -> Error(TitleTooLong MaxLength)
        | TextRules.Valid s -> Ok(Title s)

    let value (Title t) = t

module Subtitle =
    [<Literal>]
    let MaxLength = 500

    let create (raw: string) : Result<Subtitle option, DomainValidationError> =
        match TextRules.check MaxLength raw with
        | TextRules.Empty -> Ok None
        | TextRules.TooLong -> Error(SubtitleTooLong MaxLength)
        | TextRules.Valid s -> Ok(Some(Subtitle s))

    let value (Subtitle t) = t

module Summary =
    [<Literal>]
    let MaxLength = 4000

    let create (raw: string) : Result<Summary option, DomainValidationError> =
        match TextRules.check MaxLength raw with
        | TextRules.Empty -> Ok None 
        | TextRules.TooLong -> Error(SummaryTooLong MaxLength)
        | TextRules.Valid s -> Ok(Some(Summary s))

    let value (Summary t) = t

module PersonName =
    [<Literal>]
    let MaxLength = 300

    let create (raw: string) : Result<PersonName, DomainValidationError> =
        match TextRules.check MaxLength raw with
        | TextRules.Empty -> Error NameRequired
        | TextRules.TooLong -> Error(NameTooLong MaxLength)
        | TextRules.Valid s -> Ok(PersonName s)

    let value (PersonName t) = t


// ---------------------------------------------------------------------------
// AUTHORS
// ---------------------------------------------------------------------------

module Authors =
    let create (ids: Id<Author> list) : Authors option =   // option, not Result
        match List.distinct ids with
        | [] -> None
        | head :: tail -> Some(Authors(head, tail))

    let toList (Authors(head, tail)) = head :: tail
    let primary (Authors(head, _)) = head



// ---------------------------------------------------------------------------
// AGGREGATES
// ---------------------------------------------------------------------------

module Author =
    let create (id: Id<Author>) (firstName: PersonName option) (lastName: PersonName) : Author =
        { Id = id
          FirstName = firstName
          LastName = lastName }

    let id (a: Author) = a.Id
    let firstName (a: Author) = a.FirstName
    let lastName (a: Author) = a.LastName

module Book =
    let create
        (id: Id<Book>)
        (title: Title)
        (subtitle: Subtitle option)
        (summary: Summary option)
        (attribution: Attribution)
        (location: Location)
        : Book =
        { Id = id
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
    let location (b: Book) = b.Location

module Attribution =
    let ofAuthorIds (ids: Id<Author> list) : Attribution =
        match Authors.create ids with
        | Some authors -> Attribution.ByAuthors authors
        | None -> Attribution.Unknown

    let authorIds (attribution: Attribution) : Id<Author> list =
        match attribution with
        | Attribution.Unknown -> []
        | Attribution.ByAuthors authors -> Authors.toList authors


module LibraryOwner =
    let create (id: Id<LibraryOwner>) (firstName: PersonName) (lastName: PersonName) : LibraryOwner =
        { Id = id; FirstName = firstName; LastName = lastName }

    let id (o: LibraryOwner) = o.Id
    let firstName (o: LibraryOwner) = o.FirstName
    let lastName (o: LibraryOwner) = o.LastName

module LibraryName =
    [<Literal>]
    let MaxLength = 200

    let create (raw: string) : Result<LibraryName, DomainValidationError> =
        match TextRules.check MaxLength raw with
        | TextRules.Empty -> Error LibraryNameRequired
        | TextRules.TooLong -> Error(LibraryNameTooLong MaxLength)
        | TextRules.Valid s -> Ok(LibraryName s)

    let value (LibraryName n) = n



module Library =
    let create (id: Id<Library>) (owner: LibraryOwner) (name: LibraryName) : Library =
        { Id = id; Owner = owner; Name = name }

    let id (l: Library) = l.Id
    let owner (l: Library) = l.Owner
    let name (l: Library) = l.Name 