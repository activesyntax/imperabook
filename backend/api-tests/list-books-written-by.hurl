# GET /api/books?author=… — "list books written by …". A book matches when one of its authors'
# full name contains the text, ignoring case and accents (as "by author" does); the filter
# combines with the page filter. Each run adds two books by a new author with a unique name,
# and one by nobody, so the checks are about these three books only.
#
# Mutates state: adds three books and one author per run.

POST {{host}}/api/auth/login
{ "username": "bill", "password": "{{password}}" }
HTTP 200


POST {{host}}/api/books
Content-Type: application/json
{ "title": "Short One {{newUuid}}", "author": "Éva Írónő{{newUuid}}", "pages": "90" }
HTTP 201
[Captures]
short: header "Location" regex "/api/books/(.+)$"
writer: jsonpath "$.views[0].text" regex "by (Éva Írónő[0-9a-fA-F-]{36}) \\(new author\\)"
suffix: jsonpath "$.views[0].text" regex "by Éva Írónő([0-9a-fA-F-]{36}) \\(new author\\)"

POST {{host}}/api/books
Content-Type: application/json
{ "title": "Long One {{newUuid}}", "author": "{{writer}}", "pages": "400" }
HTTP 201
[Captures]
long: header "Location" regex "/api/books/(.+)$"

POST {{host}}/api/books
Content-Type: application/json
{ "title": "Nobody's {{newUuid}}" }
HTTP 201
[Captures]
anonymous: header "Location" regex "/api/books/(.+)$"


# --- Part of the name, any case, without accents ----------------------------------
GET {{host}}/api/books
[Query]
author: ironO{{suffix}}
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Books written by ironO{{suffix}}"
jsonpath "$.views[1].items[*].ref" contains "{{short}}"
jsonpath "$.views[1].items[*].ref" contains "{{long}}"
jsonpath "$.views[1].items[*].ref" not contains "{{anonymous}}"


# --- Together with the page filter: both must hold ------------------------------------
GET {{host}}/api/books
[Query]
author: {{writer}}
pagesOp: atLeast
pages: 100
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Books written by {{writer}} whose page count is at least 100"
jsonpath "$.views[1].items[*].ref" contains "{{long}}"
jsonpath "$.views[1].items[*].ref" not contains "{{short}}"
jsonpath "$.views[1].items[?(@.ref=='{{long}}')].properties[?(@.name=='Pages')].value" == "400 pages"


# --- Nobody by that name ------------------------------------------------------------------
GET {{host}}/api/books
[Query]
author: Nobody{{suffix}}
HTTP 200
[Asserts]
jsonpath "$.views[1].items" count == 0
jsonpath "$.views[1].emptyMessage" == "No books written by Nobody{{suffix}}."
