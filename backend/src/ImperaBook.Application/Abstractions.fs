namespace ImperaBook.Application

open System
open System.Threading
open System.Threading.Tasks

type BookRecord =
    { Id: Guid
      Title: string
      Subtitle: string option
      Summary: string option
      AuthorIds: Guid list
      LibraryId: Guid option }

type BookListItem =
    { Id: Guid
      Title: string
      Subtitle: string option
      AuthorIds: Guid list
      LibraryId: Guid option }

type IBookWriteRepository =
    abstract member Add: book: BookRecord * ct: CancellationToken -> Task

type IBookReadRepository =
    abstract member List:
        libraryId: Guid option * titleContains: string option * ct: CancellationToken -> Task<BookListItem[]>

    abstract member ListAll: ct: CancellationToken -> Task<BookListItem[]>

    abstract member ListByLibrary: libraryId: Guid * ct: CancellationToken -> Task<BookListItem[]>

type ILibraryRepository =
    abstract member Exists: id: Guid * ct: CancellationToken -> Task<bool>
