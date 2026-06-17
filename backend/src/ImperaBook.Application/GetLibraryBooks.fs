namespace ImperaBook.Application.Books

open System
open System.Threading
open System.Threading.Tasks
open ImperaBook.Application

module GetLibraryBooks =

    let handle (books: IBookReadRepository) (ct: CancellationToken) (libraryId: Guid) : Task<BookListItem[]> =
        books.ListByLibrary(libraryId, ct)
