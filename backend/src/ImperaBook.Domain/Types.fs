namespace ImperaBook.Domain

open System

// TYPES

type AuthorId = AuthorId of Guid
type BookId = BookId of Guid
type Title = private Title of string

type Book = private { Id: BookId; Title: Title }

type Author =
    private
        { Id: AuthorId
          FirstName: string option
          LastName: string }

type ValidationError =
    | TitleRequired
    | TitleTooLong of maxLength: int
    | AuthorRequired
    | AuthorTooLong of maxLength: int


// FACTORIES

module BookId =
    let create () = BookId(Guid.NewGuid())
    let value (BookId id) = id

module AuthorId =
    let create () = AuthorId(Guid.NewGuid())
    let value (AuthorId id) = id

module Title =
    [<Literal>]
    let MaxLength = 500

    let create (raw: string) : Result<Title, ValidationError> =
        let trimmed = if isNull raw then "" else raw.Trim()

        if trimmed = "" then
            Error TitleRequired
        elif trimmed.Length > MaxLength then
            Error(TitleTooLong MaxLength)
        else
            Ok(Title trimmed)

    let value (Title t) = t


module Author =
    [<Literal>]
    let MaxLength = 300

    let create (firstName: string option) (lastName: string) : Result<Author, ValidationError> =
        let trimmedLast = if isNull lastName then "" else lastName.Trim()

        // A present-but-blank first name is treated as absent.
        let normalizedFirst =
            firstName
            |> Option.map (fun s -> if isNull s then "" else s.Trim())
            |> Option.filter (fun s -> s <> "")

        let firstNameTooLong =
            match normalizedFirst with
            | Some f -> f.Length > MaxLength
            | None -> false

        if trimmedLast = "" then
            Error AuthorRequired
        elif trimmedLast.Length > MaxLength || firstNameTooLong then
            Error(AuthorTooLong MaxLength)
        else
            Ok
                { Id = AuthorId.create ()
                  FirstName = normalizedFirst
                  LastName = trimmedLast }

module Book =
    let create (rawTitle: string) : Result<Book, ValidationError> =
        Title.create rawTitle
        |> Result.map (fun title -> { Id = BookId.create (); Title = title })
