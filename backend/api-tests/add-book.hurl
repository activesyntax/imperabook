# POST /api/books — AddBookCommand. Returns 201 Created with a success message view and a
# Location header. "author" is search text, resolved on the server:
#   blank / absent       -> unknown author
#   no match             -> the author is created
#   exactly one match    -> that author is attached
#   several matches      -> 409, nothing added (see the end of this file)
#
# Mutates state: every run adds books and authors. Names that must be unique per run are
# built from a captured uuid, so re-runs stay correct.

# --- Requires a session -------------------------------------------------------
POST {{host}}/api/books
Content-Type: application/json
{ "title": "Anonymous Attempt" }
HTTP 401


POST {{host}}/api/auth/login
{ "username": "john", "password": "{{password}}" }
HTTP 200


# --- No author: unknown author, generated cover -------------------------------
POST {{host}}/api/books
Content-Type: application/json
{ "title": "Beowulf" }
HTTP 201
[Captures]
beowulf_id: header "Location" regex "/api/books/(.+)$"
[Asserts]
header "Location" matches /^\/api\/books\/[0-9a-f-]{36}$/
jsonpath "$.views[0].kind" == "success"
jsonpath "$.views[0].text" == "Added \"Beowulf\", author unknown."

GET {{host}}/api/books
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].ref" contains "{{beowulf_id}}"
jsonpath "$.views[1].items[?(@.ref=='{{beowulf_id}}')].imageSrc" startsWith "/api/images/"


# --- Author not in the catalog: created on the fly ----------------------------
POST {{host}}/api/books
Content-Type: application/json
{
  "title": "Clean Architecture",
  "author": "Robert Smith{{newUuid}}"
}
HTTP 201
[Captures]
new_author: jsonpath "$.views[0].text" regex "by (Robert Smith[0-9a-f-]{36}) \\(new author\\)"
[Asserts]
jsonpath "$.views[0].text" contains "(new author)"

GET {{host}}/api/authors
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].properties[0].value" contains "{{new_author}}"


# --- Same author again: the one match is attached, no second author created ---
POST {{host}}/api/books
Content-Type: application/json
{
  "title": "Clean Code",
  "author": "{{new_author}}"
}
HTTP 201
[Asserts]
jsonpath "$.views[0].text" == "Added \"Clean Code\" by {{new_author}}."


# --- Every optional field filled in -------------------------------------------
POST {{host}}/api/books
Content-Type: application/json
{
  "title": "Refactoring",
  "subtitle": "Improving the Design of Existing Code",
  "summary": "A catalog of behaviour-preserving transformations.",
  "author": "{{new_author}}",
  "isbn": "9780134757599",
  "published": " 2018 ",
  "publisher": "Addison-Wesley",
  "language": "en",
  "pages": "448"
}
HTTP 201
[Asserts]
jsonpath "$.views[0].text" contains "by {{new_author}}."


# --- Several matches: nothing added, choices listed, query kept ---------------
# Two authors sharing a unique last name; searching that last name matches both.
POST {{host}}/api/authors
Content-Type: application/json
{ "firstName": "Ann", "lastName": "Twin{{newUuid}}" }
HTTP 201
[Captures]
twin: jsonpath "$.views[0].text" regex "Added author Ann (Twin[0-9a-f-]{36})\\."

POST {{host}}/api/authors
Content-Type: application/json
{ "firstName": "Bob", "lastName": "{{twin}}" }
HTTP 201

POST {{host}}/api/books
Content-Type: application/json
{
  "title": "Which Twin",
  "author": "{{twin}}"
}
HTTP 409
[Asserts]
jsonpath "$.code" == "author_ambiguous"
jsonpath "$.keepQuery" == true
jsonpath "$.views[0].type" == "message"
jsonpath "$.views[0].kind" == "warning"
jsonpath "$.views[1].type" == "textView"
jsonpath "$.views[1].blocks" count == 2

# A whole-name match settles it even though the last name alone is ambiguous.
POST {{host}}/api/books
Content-Type: application/json
{
  "title": "Which Twin",
  "author": "ann {{twin}}"
}
HTTP 201
[Asserts]
jsonpath "$.views[0].text" == "Added \"Which Twin\" by Ann {{twin}}."
