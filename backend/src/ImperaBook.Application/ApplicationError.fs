namespace ImperaBook.Application

open System
open ImperaBook.Domain

type ApplicationError =
    | Validation of DomainValidationError list
    | LibraryNotFound of libraryId: Guid
