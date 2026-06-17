namespace ImperaBook.Application.Books

open System.Threading
open System.Threading.Tasks
open ImperaBook.Application

module GetAllBooks =

    let handle (books: IBookReadRepository) (ct: CancellationToken) : Task<BookListItem[]> =
        books.ListAll ct
