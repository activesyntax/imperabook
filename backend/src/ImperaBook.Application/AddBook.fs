namespace ImperaBook.Application.Books

open System
open System.Threading
open System.Threading.Tasks
open FsToolkit.ErrorHandling
open ImperaBook.Domain
open ImperaBook.Application

type AddBook =
    { Title: string
      Subtitle: string option
      Summary: string option
      AuthorIds: Guid list
      LibraryId: Guid option }

module AddBook =

    /// Independent field validations run together and accumulate *every* error
    /// (`let!` + `and!` = applicative). Domain errors are then lifted into the
    /// application error vocabulary in one place.
    let private validateFields
        (cmd: AddBook)
        : Result<Title * Subtitle option * Summary option, ApplicationError> =
        validation {
            let! title = Title.create cmd.Title
            and! subtitle = Subtitle.create (cmd.Subtitle |> Option.defaultValue "")
            and! summary = Summary.create (cmd.Summary |> Option.defaultValue "")
            return title, subtitle, summary
        }
        |> Result.mapError ApplicationError.Validation

    /// Resolve the optional library placement. Location references the library
    /// by identity, so we only confirm the target exists, then carry the id —
    /// no aggregate load, nothing to reconstruct.
    let private resolveLocation
        (libraries: ILibraryRepository)
        (ct: CancellationToken)
        (libraryId: Guid option)
        : Task<Result<Location, ApplicationError>> =
        match libraryId with
        | None -> TaskResult.ok Location.Unknown
        | Some id ->
            taskResult {
                do!
                    libraries.Exists(id, ct)
                    |> TaskResult.requireTrue (LibraryNotFound id)

                return Location.Library(Id.ofGuid id)
            }

    /// Flatten the validated aggregate into the persistence write model.
    let private toRecord (book: Book) : BookRecord =
        { Id = Book.id book |> Id.value
          Title = Book.title book |> Title.value
          Subtitle = Book.subtitle book |> Option.map Subtitle.value
          Summary = Book.summary book |> Option.map Summary.value
          AuthorIds = Book.attribution book |> Attribution.authorIds |> List.map Id.value
          LibraryId =
            match Book.location book with
            | Location.Unknown -> None
            | Location.Library libraryId -> libraryId |> Id.value |> Some }

    let handle
        (books: IBookWriteRepository)
        (libraries: ILibraryRepository)
        (ct: CancellationToken)
        (cmd: AddBook)
        : Task<Result<Guid, ApplicationError>> =
        taskResult {
            let! (title, subtitle, summary) = validateFields cmd
            let attribution = cmd.AuthorIds |> List.map Id.ofGuid |> Attribution.ofAuthorIds
            let! location = resolveLocation libraries ct cmd.LibraryId

            let bookId = Id.create<Book> ()
            let book = Book.create bookId title subtitle summary attribution location
            do! books.Add(toRecord book, ct)
            return Id.value bookId
        }
