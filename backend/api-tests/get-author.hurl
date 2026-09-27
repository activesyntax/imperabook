# GET /api/authors/{id} — one author in full, as a CommandResult: name, portrait, life range,
# then their books as items that open like any book. Author list items point here through
# their "open" field.
#
# Mutates state: adds one author and one book per run.

POST {{host}}/api/auth/login
{ "username": "john", "password": "{{password}}" }
HTTP 200


POST {{host}}/api/authors
Content-Type: application/json
{
  "firstName": "Detail",
  "lastName": "Author{{newUuid}}",
  "birthYear": "1950",
  "vitality": "living"
}
HTTP 201
[Captures]
author_url: header "Location"
author_id: header "Location" regex "/api/authors/(.+)$"
name: jsonpath "$.views[0].text" regex "Added author (Detail Author[0-9a-f-]{36})\\."


# --- The list links each author to their detail -------------------------------
GET {{host}}/api/authors
HTTP 200
[Asserts]
jsonpath "$.views[1].items[?(@.ref=='{{author_id}}')].open" == "{{author_url}}"


# --- A new author: generated portrait, life range, no books yet ---------------
GET {{host}}{{author_url}}
HTTP 200
[Asserts]
jsonpath "$.views[0].type" == "heading"
jsonpath "$.views[0].text" == "{{name}}"
jsonpath "$.views[1].type" == "image"
jsonpath "$.views[1].src" startsWith "/api/images/"
jsonpath "$.views[2].type" == "textView"
jsonpath "$.views[2].blocks[0].content[1].text" == " 1950–"
jsonpath "$.views[3].type" == "itemCollection"
jsonpath "$.views[3].items" count == 0
jsonpath "$.views[3].emptyMessage" == "No books by {{name}} yet."


# --- Credit a book to them: it shows up, and opens to the book ----------------
POST {{host}}/api/books
Content-Type: application/json
{
  "title": "Written By Detail",
  "author": "{{name}}"
}
HTTP 201
[Captures]
book_url: header "Location"

GET {{host}}{{author_url}}
HTTP 200
[Asserts]
jsonpath "$.views[3].items" count == 1
jsonpath "$.views[3].items[0].open" == "{{book_url}}"


# --- Not in this user's catalog -----------------------------------------------
GET {{host}}/api/authors/99999999-9999-9999-9999-999999999999
HTTP 404
[Asserts]
jsonpath "$.code" == "author_not_found"
