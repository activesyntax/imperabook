namespace ImperaBook.Application.Books

open System
open System.Threading
open System.Threading.Tasks
open ImperaBook.Application

type GetBooks =
    { LibraryId: Guid option
      TitleContains: string option }

module GetBooks =

    let handle
        (books: IBookReadRepository)
        (ct: CancellationToken)
        (query: GetBooks)
        : Task<BookListItem[]> =
        let titleContains =
            query.TitleContains
            |> Option.map (fun s -> s.Trim())
            |> Option.filter (fun s -> s <> "")

        books.List(query.LibraryId, titleContains, ct)
