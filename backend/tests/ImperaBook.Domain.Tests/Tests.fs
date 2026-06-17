module DomainTests

open System
open Xunit
open ImperaBook.Domain

// --- helpers ---------------------------------------------------------------

let private expectOk result =
    match result with
    | Ok v -> v
    | Error e -> failwithf "Expected Ok but got Error: %A" e

let private expectError result =
    match result with
    | Ok v -> failwithf "Expected Error but got Ok: %A" v
    | Error e -> e

let private expectSome opt =
    match opt with
    | Some v -> v
    | None -> failwith "Expected Some but got None"

// Id.create () can't infer 'Entity with no context, so pin it here.
let private authorId () : Id<Author> = Id.create ()
let private aTitle () = Title.create "The Hobbit" |> expectOk
let private aName raw = PersonName.create raw |> expectOk
let private aLibraryName () = LibraryName.create "Home Library" |> expectOk
let private anOwner () = LibraryOwner.create (Id.create ()) (aName "Jane") (aName "Doe")
let private aLibrary () = Library.create (Id.create ()) (anOwner ()) (aLibraryName ())


// --- Id<'Entity> -----------------------------------------------------------

[<Fact; Trait("Category", "Unit")>]
let ``Id.value round-trips the guid`` () =
    let guid = Guid.NewGuid()
    let id: Id<Book> = Id guid
    Assert.Equal(guid, Id.value id)

[<Fact; Trait("Category", "Unit")>]
let ``Id.ofGuid wraps an existing guid`` () =
    let guid = Guid.NewGuid()
    let id: Id<Book> = Id.ofGuid guid
    Assert.Equal(guid, Id.value id)

[<Fact; Trait("Category", "Unit")>]
let ``Id.create generates a unique id each time`` () =
    let a: Id<Author> = Id.create ()
    let b: Id<Author> = Id.create ()
    Assert.NotEqual(a, b)


// --- Title -----------------------------------------------------------------

[<Fact; Trait("Category", "Unit")>]
let ``Title.create trims and accepts a valid title`` () =
    let title = Title.create "  The Hobbit  " |> expectOk
    Assert.Equal("The Hobbit", Title.value title)

[<Theory; Trait("Category", "Unit")>]
[<InlineData("")>]
[<InlineData("   ")>]
let ``Title.create rejects blank input with TitleRequired`` (raw: string) =
    Assert.Equal(TitleRequired, Title.create raw |> expectError)

[<Fact; Trait("Category", "Unit")>]
let ``Title.create treats null as blank`` () =
    Assert.Equal(TitleRequired, Title.create (null: string) |> expectError)

[<Fact; Trait("Category", "Unit")>]
let ``Title.create rejects titles over the max length`` () =
    let raw = String('a', Title.MaxLength + 1)
    Assert.Equal(TitleTooLong Title.MaxLength, Title.create raw |> expectError)

[<Fact; Trait("Category", "Unit")>]
let ``Title.create accepts exactly the max length`` () =
    let raw = String('a', Title.MaxLength)
    let title = Title.create raw |> expectOk
    Assert.Equal(Title.MaxLength, (Title.value title).Length)


// --- Subtitle (optional: blank -> None) ------------------------------------

[<Fact; Trait("Category", "Unit")>]
let ``Subtitle.create trims and accepts a valid subtitle`` () =
    let s = Subtitle.create "  There and Back Again  " |> expectOk |> expectSome
    Assert.Equal("There and Back Again", Subtitle.value s)

[<Theory; Trait("Category", "Unit")>]
[<InlineData("")>]
[<InlineData("   ")>]
let ``Subtitle.create maps blank to None`` (raw: string) =
    Assert.True(Subtitle.create raw |> expectOk |> Option.isNone)

[<Fact; Trait("Category", "Unit")>]
let ``Subtitle.create treats null as None`` () =
    Assert.True(Subtitle.create (null: string) |> expectOk |> Option.isNone)

[<Fact; Trait("Category", "Unit")>]
let ``Subtitle.create rejects over-long input`` () =
    let raw = String('a', Subtitle.MaxLength + 1)
    Assert.Equal(SubtitleTooLong Subtitle.MaxLength, Subtitle.create raw |> expectError)


// --- Summary (optional: blank -> None) -------------------------------------

[<Fact; Trait("Category", "Unit")>]
let ``Summary.create trims and accepts a valid summary`` () =
    let s = Summary.create "  A hobbit goes on an adventure.  " |> expectOk |> expectSome
    Assert.Equal("A hobbit goes on an adventure.", Summary.value s)

[<Theory; Trait("Category", "Unit")>]
[<InlineData("")>]
[<InlineData("   ")>]
let ``Summary.create maps blank to None`` (raw: string) =
    Assert.True(Summary.create raw |> expectOk |> Option.isNone)

[<Fact; Trait("Category", "Unit")>]
let ``Summary.create treats null as None`` () =
    Assert.True(Summary.create (null: string) |> expectOk |> Option.isNone)

[<Fact; Trait("Category", "Unit")>]
let ``Summary.create rejects over-long input`` () =
    let raw = String('a', Summary.MaxLength + 1)
    Assert.Equal(SummaryTooLong Summary.MaxLength, Summary.create raw |> expectError)


// --- PersonName (required) -------------------------------------------------

[<Fact; Trait("Category", "Unit")>]
let ``PersonName.create accepts a valid name`` () =
    let n = PersonName.create "Tolkien" |> expectOk
    Assert.Equal("Tolkien", PersonName.value n)

[<Fact; Trait("Category", "Unit")>]
let ``PersonName.create rejects blank with NameRequired`` () =
    Assert.Equal(NameRequired, PersonName.create "   " |> expectError)

[<Fact; Trait("Category", "Unit")>]
let ``PersonName.create rejects over-long input`` () =
    let raw = String('a', PersonName.MaxLength + 1)
    Assert.Equal(NameTooLong PersonName.MaxLength, PersonName.create raw |> expectError)


// --- Authors (non-empty, de-duplicated, ordered; empty -> None) ------------

[<Fact; Trait("Category", "Unit")>]
let ``Authors.create returns None for an empty list`` () =
    Assert.True(Authors.create [] |> Option.isNone)

[<Fact; Trait("Category", "Unit")>]
let ``Authors.create keeps a single author as primary`` () =
    let id = authorId ()
    let authors = Authors.create [ id ] |> expectSome
    Assert.True([ id ] = Authors.toList authors)
    Assert.Equal(id, Authors.primary authors)

[<Fact; Trait("Category", "Unit")>]
let ``Authors.create de-duplicates while preserving order`` () =
    let a = authorId ()
    let b = authorId ()
    let authors = Authors.create [ a; b; a ] |> expectSome
    Assert.True([ a; b ] = Authors.toList authors)
    Assert.Equal(a, Authors.primary authors)


// --- Attribution -----------------------------------------------------------

[<Fact; Trait("Category", "Unit")>]
let ``Attribution.ofAuthorIds with no ids is Unknown`` () =
    Assert.Equal(Attribution.Unknown, Attribution.ofAuthorIds [])

[<Fact; Trait("Category", "Unit")>]
let ``Attribution.ofAuthorIds with ids is ByAuthors`` () =
    let id = authorId ()

    match Attribution.ofAuthorIds [ id ] with
    | Attribution.ByAuthors authors -> Assert.True([ id ] = Authors.toList authors)
    | Attribution.Unknown -> failwith "Expected ByAuthors"

[<Fact; Trait("Category", "Unit")>]
let ``Attribution.authorIds of Unknown is empty`` () =
    Assert.Empty(Attribution.authorIds Attribution.Unknown)

[<Fact; Trait("Category", "Unit")>]
let ``Attribution.authorIds round-trips known authors in order`` () =
    let a = authorId ()
    let b = authorId ()
    let attribution = Attribution.ofAuthorIds [ a; b ]
    Assert.True([ a; b ] = Attribution.authorIds attribution)


// --- Author ----------------------------------------------------------------

[<Fact; Trait("Category", "Unit")>]
let ``Author.create exposes first and last name`` () =
    let first = PersonName.create "J.R.R." |> expectOk
    let last = PersonName.create "Tolkien" |> expectOk
    let author = Author.create (Id.create ()) (Some first) last
    Assert.Equal(Some first, Author.firstName author)
    Assert.Equal(last, Author.lastName author)

[<Fact; Trait("Category", "Unit")>]
let ``Author.create allows an absent first name`` () =
    let last = PersonName.create "Homer" |> expectOk
    let author = Author.create (Id.create ()) None last
    Assert.True(Author.firstName author |> Option.isNone)
    Assert.Equal(last, Author.lastName author)

[<Fact; Trait("Category", "Unit")>]
let ``Author.create stores the supplied id`` () =
    let id: Id<Author> = Id.create ()
    let author = Author.create id None (aName "Tolkien")
    Assert.Equal(id, Author.id author)


// --- Book ------------------------------------------------------------------

[<Fact; Trait("Category", "Unit")>]
let ``Book.create exposes its fields through accessors`` () =
    let title = aTitle ()
    let book = Book.create (Id.create ()) title None None Attribution.Unknown Location.Unknown
    Assert.Equal(title, Book.title book)
    Assert.True(Book.subtitle book |> Option.isNone)
    Assert.True(Book.summary book |> Option.isNone)
    Assert.Equal(Attribution.Unknown, Book.attribution book)

[<Fact; Trait("Category", "Unit")>]
let ``Book.create stores subtitle, summary and attribution`` () =
    let title = aTitle ()
    let subtitle = Subtitle.create "There and Back Again" |> expectOk
    let summary = Summary.create "A hobbit goes on an adventure." |> expectOk
    let attribution = Attribution.ofAuthorIds [ authorId () ]
    let book = Book.create (Id.create ()) title subtitle summary attribution Location.Unknown
    Assert.Equal(subtitle, Book.subtitle book)
    Assert.Equal(summary, Book.summary book)
    Assert.Equal(attribution, Book.attribution book)

[<Fact; Trait("Category", "Unit")>]
let ``Book.create stores the supplied id`` () =
    let id: Id<Book> = Id.create ()
    let book = Book.create id (aTitle ()) None None Attribution.Unknown Location.Unknown
    Assert.Equal(id, Book.id book)


// --- LibraryName -----------------------------------------------------------

[<Fact; Trait("Category", "Unit")>]
let ``LibraryName.create trims and accepts a valid name`` () =
    let name = LibraryName.create "  Home Library  " |> expectOk
    Assert.Equal("Home Library", LibraryName.value name)

[<Theory; Trait("Category", "Unit")>]
[<InlineData("")>]
[<InlineData("   ")>]
let ``LibraryName.create rejects blank with LibraryNameRequired`` (raw: string) =
    Assert.Equal(LibraryNameRequired, LibraryName.create raw |> expectError)

[<Fact; Trait("Category", "Unit")>]
let ``LibraryName.create treats null as blank`` () =
    Assert.Equal(LibraryNameRequired, LibraryName.create (null: string) |> expectError)

[<Fact; Trait("Category", "Unit")>]
let ``LibraryName.create rejects names over the max length`` () =
    let raw = String('a', LibraryName.MaxLength + 1)
    Assert.Equal(LibraryNameTooLong LibraryName.MaxLength, LibraryName.create raw |> expectError)

[<Fact; Trait("Category", "Unit")>]
let ``LibraryName.create accepts exactly the max length`` () =
    let raw = String('a', LibraryName.MaxLength)
    let name = LibraryName.create raw |> expectOk
    Assert.Equal(LibraryName.MaxLength, (LibraryName.value name).Length)


// --- LibraryOwner ----------------------------------------------------------

[<Fact; Trait("Category", "Unit")>]
let ``LibraryOwner.create exposes id and both names`` () =
    let id: Id<LibraryOwner> = Id.create ()
    let first = aName "Jane"
    let last = aName "Doe"
    let owner = LibraryOwner.create id first last
    Assert.Equal(id, LibraryOwner.id owner)
    Assert.Equal(first, LibraryOwner.firstName owner)
    Assert.Equal(last, LibraryOwner.lastName owner)


// --- Library ---------------------------------------------------------------

[<Fact; Trait("Category", "Unit")>]
let ``Library.create exposes id, owner and name`` () =
    let id: Id<Library> = Id.create ()
    let owner = anOwner ()
    let name = aLibraryName ()
    let library = Library.create id owner name
    Assert.Equal(id, Library.id library)
    Assert.Equal(owner, Library.owner library)
    Assert.Equal(name, Library.name library)

[<Fact; Trait("Category", "Unit")>]
let ``Library.create lets one owner hold multiple libraries with distinct ids`` () =
    let owner = anOwner ()
    let fiction = Library.create (Id.create ()) owner (LibraryName.create "Fiction" |> expectOk)
    let reference = Library.create (Id.create ()) owner (LibraryName.create "Reference" |> expectOk)
    Assert.NotEqual(Library.id fiction, Library.id reference)
    Assert.Equal(Library.owner fiction, Library.owner reference)


// --- Location --------------------------------------------------------------

[<Fact; Trait("Category", "Unit")>]
let ``Location.Library wraps a library`` () =
    let library = aLibrary ()
    let libraryId = Library.id library 

    match Location.Library libraryId with
    | Location.Library l -> Assert.Equal(libraryId, l)
    | Location.Unknown -> failwith "Expected Library"