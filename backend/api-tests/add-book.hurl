# POST /api/books — AddBookCommand. Returns 201 Created with { "id": "<guid>" } and a
# Location header. There is no GET /api/books/{id} yet, so the new book is verified
# through the list endpoint.
#
# Mutates state: every run adds books. Assertions key off the captured id, so re-runs
# stay correct.

# --- Requires a session -------------------------------------------------------
POST {{host}}/api/books
Content-Type: application/json
{
  "title": "Anonymous Attempt",
  "authorIds": []
}
HTTP 401


POST {{host}}/api/auth/login
{ "username": "john", "password": "{{password}}" }
HTTP 200


# Seeded author ids are random per seed, so borrow one from the author list.
GET {{host}}/api/authors
HTTP 200
[Captures]
author_id: jsonpath "$.views[1].items[0].ref"


# --- Minimal book: title + one author -----------------------------------------
POST {{host}}/api/books
Content-Type: application/json
{
  "title": "Clean Architecture",
  "authorIds": ["{{author_id}}"]
}
HTTP 201
[Captures]
book_id: jsonpath "$.id"
[Asserts]
jsonpath "$.id" matches /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
header "Location" == "/api/books/{{book_id}}"

# No cover was given, so one was generated.
GET {{host}}/api/books
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].ref" includes "{{book_id}}"
jsonpath "$.views[1].items[?(@.ref=='{{book_id}}')].imageSrc" startsWith "/api/images/"


# --- No authors: the book is attributed to an unknown author -----------------
POST {{host}}/api/books
Content-Type: application/json
{
  "title": "Beowulf",
  "authorIds": []
}
HTTP 201
[Captures]
anonymous_id: jsonpath "$.id"

GET {{host}}/api/books
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].ref" includes "{{anonymous_id}}"


# --- Every optional field filled in -------------------------------------------
POST {{host}}/api/books
Content-Type: application/json
{
  "title": "Refactoring",
  "subtitle": "Improving the Design of Existing Code",
  "summary": "A catalog of behaviour-preserving transformations.",
  "authorIds": ["{{author_id}}"],
  "isbn": "9780134757599",
  "published": " 2018 ",
  "publisher": "Addison-Wesley",
  "language": "en",
  "pages": "448"
}
HTTP 201
[Captures]
full_book_id: jsonpath "$.id"

GET {{host}}/api/books
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].ref" includes "{{full_book_id}}"
