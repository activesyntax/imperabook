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

let private aTitle () = Title.create "The Hobbit" |> expectOk


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


// --- Subtitle / Summary / PersonName (same shape, spot-checked) ------------

[<Fact; Trait("Category", "Unit")>]
let ``Subtitle.create accepts a valid subtitle`` () =
    let s = Subtitle.create "There and Back Again" |> expectOk
    Assert.Equal("There and Back Again", Subtitle.value s)

[<Fact; Trait("Category", "Unit")>]
let ``Subtitle.create rejects blank with SubtitleRequired`` () =
    Assert.Equal(SubtitleRequired, Subtitle.create "  " |> expectError)

[<Fact; Trait("Category", "Unit")>]
let ``Subtitle.create rejects over-long input`` () =
    let raw = String('a', Subtitle.MaxLength + 1)
    Assert.Equal(SubtitleTooLong Subtitle.MaxLength, Subtitle.create raw |> expectError)

[<Fact; Trait("Category", "Unit")>]
let ``Summary.create accepts a valid summary`` () =
    let s = Summary.create "A hobbit goes on an adventure." |> expectOk
    Assert.Equal("A hobbit goes on an adventure.", Summary.value s)

[<Fact; Trait("Category", "Unit")>]
let ``Summary.create rejects blank with SummaryRequired`` () =
    Assert.Equal(SummaryRequired, Summary.create "" |> expectError)

[<Fact; Trait("Category", "Unit")>]
let ``Summary.create rejects over-long input`` () =
    let raw = String('a', Summary.MaxLength + 1)
    Assert.Equal(SummaryTooLong Summary.MaxLength, Summary.create raw |> expectError)

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


// --- Authors (non-empty, de-duplicated, ordered) ---------------------------

[<Fact; Trait("Category", "Unit")>]
let ``Authors.create rejects an empty list with AuthorsRequired`` () =
    Assert.Equal(AuthorsRequired, Authors.create [] |> expectError)

[<Fact; Trait("Category", "Unit")>]
let ``Authors.create keeps a single author as primary`` () =
    let id = AuthorId.create ()
    let authors = Authors.create [ id ] |> expectOk
    Assert.True([ id ] = Authors.toList authors)
    Assert.Equal(id, Authors.primary authors)

[<Fact; Trait("Category", "Unit")>]
let ``Authors.create de-duplicates while preserving order`` () =
    let a = AuthorId.create ()
    let b = AuthorId.create ()
    let authors = Authors.create [ a; b; a ] |> expectOk
    Assert.True([ a; b ] = Authors.toList authors)
    Assert.Equal(a, Authors.primary authors)


// --- Attribution -----------------------------------------------------------

[<Fact; Trait("Category", "Unit")>]
let ``Attribution.ofAuthorIds with no ids is Unknown`` () =
    Assert.Equal(Unknown, Attribution.ofAuthorIds [])

[<Fact; Trait("Category", "Unit")>]
let ``Attribution.ofAuthorIds with ids is ByAuthors`` () =
    let id = AuthorId.create ()

    match Attribution.ofAuthorIds [ id ] with
    | ByAuthors authors -> Assert.True([ id ] = Authors.toList authors)
    | Unknown -> failwith "Expected ByAuthors"

[<Fact; Trait("Category", "Unit")>]
let ``Attribution.authorIds of Unknown is empty`` () =
    Assert.Empty(Attribution.authorIds Unknown)

[<Fact; Trait("Category", "Unit")>]
let ``Attribution.authorIds round-trips known authors in order`` () =
    let a = AuthorId.create ()
    let b = AuthorId.create ()
    let attribution = Attribution.ofAuthorIds [ a; b ]
    Assert.True([ a; b ] = Attribution.authorIds attribution)


// --- Author ----------------------------------------------------------------

[<Fact; Trait("Category", "Unit")>]
let ``Author.create exposes first and last name`` () =
    let first = PersonName.create "J.R.R." |> expectOk
    let last = PersonName.create "Tolkien" |> expectOk
    let author = Author.create (Some first) last
    Assert.Equal(Some first, Author.firstName author)
    Assert.Equal(last, Author.lastName author)

[<Fact; Trait("Category", "Unit")>]
let ``Author.create allows an absent first name`` () =
    let last = PersonName.create "Homer" |> expectOk
    let author = Author.create None last
    Assert.True(Author.firstName author |> Option.isNone)
    Assert.Equal(last, Author.lastName author)

[<Fact; Trait("Category", "Unit")>]
let ``Author.create generates a unique id each time`` () =
    let last = PersonName.create "Tolkien" |> expectOk
    let a1 = Author.create None last
    let a2 = Author.create None last
    Assert.NotEqual(Author.id a1, Author.id a2)


// --- Book ------------------------------------------------------------------

[<Fact; Trait("Category", "Unit")>]
let ``Book.create exposes its fields through accessors`` () =
    let title = aTitle ()
    let book = Book.create title None None Unknown
    Assert.Equal(title, Book.title book)
    Assert.True(Book.subtitle book |> Option.isNone)
    Assert.True(Book.summary book |> Option.isNone)
    Assert.Equal(Unknown, Book.attribution book)

[<Fact; Trait("Category", "Unit")>]
let ``Book.create stores subtitle, summary and attribution`` () =
    let title = aTitle ()
    let subtitle = Subtitle.create "There and Back Again" |> expectOk
    let summary = Summary.create "A hobbit goes on an adventure." |> expectOk
    let attribution = Attribution.ofAuthorIds [ AuthorId.create () ]
    let book = Book.create title (Some subtitle) (Some summary) attribution
    Assert.Equal(Some subtitle, Book.subtitle book)
    Assert.Equal(Some summary, Book.summary book)
    Assert.Equal(attribution, Book.attribution book)

[<Fact; Trait("Category", "Unit")>]
let ``Book.create generates a unique id each time`` () =
    let title = aTitle ()
    let b1 = Book.create title None None Unknown
    let b2 = Book.create title None None Unknown
    Assert.NotEqual(Book.id b1, Book.id b2)


// --- Parse.optional --------------------------------------------------------

[<Theory; Trait("Category", "Unit")>]
[<InlineData("")>]
[<InlineData("   ")>]
let ``Parse.optional maps blank to None`` (raw: string) =
    let result = Parse.optional Subtitle.create raw |> expectOk
    Assert.True(result |> Option.isNone)

[<Fact; Trait("Category", "Unit")>]
let ``Parse.optional maps null to None`` () =
    let result = Parse.optional Subtitle.create (null: string) |> expectOk
    Assert.True(result |> Option.isNone)

[<Fact; Trait("Category", "Unit")>]
let ``Parse.optional validates and wraps present input`` () =
    match Parse.optional Subtitle.create "A Subtitle" |> expectOk with
    | Some s -> Assert.Equal("A Subtitle", Subtitle.value s)
    | None -> failwith "Expected Some"

[<Fact; Trait("Category", "Unit")>]
let ``Parse.optional propagates validation errors`` () =
    let raw = String('a', Subtitle.MaxLength + 1)
    Assert.Equal(SubtitleTooLong Subtitle.MaxLength, Parse.optional Subtitle.create raw |> expectError)


// --- Identities ------------------------------------------------------------

[<Fact; Trait("Category", "Unit")>]
let ``BookId.value round-trips the guid`` () =
    let guid = Guid.NewGuid()
    Assert.Equal(guid, BookId.value (BookId guid))

[<Fact; Trait("Category", "Unit")>]
let ``AuthorId.create generates unique ids`` () =
    Assert.NotEqual(AuthorId.create (), AuthorId.create ())
