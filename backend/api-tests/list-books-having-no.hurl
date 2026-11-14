# GET /api/books?missing=… — "list books having no …", the form the dashboard's findings use.
# Each listed property must be absent. Each run adds a bare book (no author, pages, year,
# language or ISBN; a cover is always generated) and a complete one; the library holds
# others too, so each case checks which of these two are listed and which are not.
#
# Mutates state: adds two books and one author per run.

POST {{host}}/api/auth/login
{ "username": "bill", "password": "{{password}}" }
HTTP 200


POST {{host}}/api/books
Content-Type: application/json
{ "title": "Bare {{newUuid}}" }
HTTP 201
[Captures]
bare: header "Location" regex "/api/books/(.+)$"

POST {{host}}/api/books
Content-Type: application/json
{
  "title": "Complete {{newUuid}}",
  "author": "Complete Writer{{newUuid}}",
  "pages": "200",
  "published": "1990",
  "language": "en",
  "isbn": "9780134757599"
}
HTTP 201
[Captures]
complete: header "Location" regex "/api/books/(.+)$"


# --- One property at a time --------------------------------------------------------
GET {{host}}/api/books?missing=pages
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Books having no page count"
jsonpath "$.views[1].items[*].ref" contains "{{bare}}"
jsonpath "$.views[1].items[*].ref" not contains "{{complete}}"

GET {{host}}/api/books?missing=author
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].ref" contains "{{bare}}"
jsonpath "$.views[1].items[*].ref" not contains "{{complete}}"

GET {{host}}/api/books?missing=published
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].ref" contains "{{bare}}"
jsonpath "$.views[1].items[*].ref" not contains "{{complete}}"

GET {{host}}/api/books?missing=language
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].ref" contains "{{bare}}"
jsonpath "$.views[1].items[*].ref" not contains "{{complete}}"

GET {{host}}/api/books?missing=isbn
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].ref" contains "{{bare}}"
jsonpath "$.views[1].items[*].ref" not contains "{{complete}}"

# Added books always get a generated cover, so neither of these lacks one.
GET {{host}}/api/books?missing=cover
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Books having no cover"
jsonpath "$.views[1].items[*].ref" not contains "{{bare}}"
jsonpath "$.views[1].items[*].ref" not contains "{{complete}}"


# --- Several together, all must be missing; with another filter ----------------------
GET {{host}}/api/books?missing=cover,pages
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Books having no page count and no cover"
jsonpath "$.views[1].items[*].ref" not contains "{{bare}}"

GET {{host}}/api/books?missing=pages,isbn&languageOp=is&language=en
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].ref" not contains "{{bare}}"
jsonpath "$.views[1].items[*].ref" not contains "{{complete}}"


# --- Something a book cannot lack is an error, not "all books" ------------------------
GET {{host}}/api/books?missing=pages,publisher
HTTP 400
[Asserts]
jsonpath "$.code" == "invalid_missing_filter"
