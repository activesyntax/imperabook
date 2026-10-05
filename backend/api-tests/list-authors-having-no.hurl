# GET /api/authors?missing=books — "list authors having no books", the dashboard finding's
# command. Each run adds an author with no books and one credited on a new book.
#
# Mutates state: adds two authors and one book per run.

POST {{host}}/api/auth/login
{ "username": "john", "password": "{{password}}" }
HTTP 200


POST {{host}}/api/authors
Content-Type: application/json
{ "firstName": "Idle", "lastName": "Writer{{newUuid}}" }
HTTP 201
[Captures]
idle: header "Location" regex "/api/authors/(.+)$"

POST {{host}}/api/books
Content-Type: application/json
{ "title": "Busy Book {{newUuid}}", "author": "Busy Writer{{newUuid}}" }
HTTP 201
[Captures]
busy_name: jsonpath "$.views[0].text" regex "by (Busy Writer[0-9a-f-]{36}) \\(new author\\)"

GET {{host}}/api/authors/search
[Query]
q: {{busy_name}}
HTTP 200
[Captures]
busy: jsonpath "$[0].id"


# --- Only authors no book credits -----------------------------------------------------
GET {{host}}/api/authors?missing=books
HTTP 200
[Captures]
without_books: jsonpath "$.views[1].items" count
[Asserts]
jsonpath "$.views[0].text" == "Authors having no books"
jsonpath "$.views[1].items[*].ref" contains "{{idle}}"
jsonpath "$.views[1].items[*].ref" not contains "{{busy}}"

# The plain list still has both.
GET {{host}}/api/authors
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "All authors"
jsonpath "$.views[1].items[*].ref" contains "{{idle}}"
jsonpath "$.views[1].items[*].ref" contains "{{busy}}"

# The dashboard counts the same authors its finding lists.
GET {{host}}/api/dashboard
HTTP 200
[Asserts]
jsonpath "$.views[2].blocks[?(@.command=='list authors having no books')].value" == "{{without_books}}"


# --- An author can only lack books -------------------------------------------------------
GET {{host}}/api/authors?missing=cover
HTTP 400
[Asserts]
jsonpath "$.code" == "invalid_missing_filter"
