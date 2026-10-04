# GET /api/books?pagesOp=…&pages=…[&pagesTo=…] — "list books whose page count is …". Each run adds
# books of 100, 150 and 300 pages and one with no page count; the library holds other books
# too, so each case checks which of these four are in the list and which are not.
#
# Mutates state: adds four books per run.

POST {{host}}/api/auth/login
{ "username": "john", "password": "{{password}}" }
HTTP 200


POST {{host}}/api/books
Content-Type: application/json
{ "title": "Pages100 {{newUuid}}", "pages": "100" }
HTTP 201
[Captures]
b100: header "Location" regex "/api/books/(.+)$"

POST {{host}}/api/books
Content-Type: application/json
{ "title": "Pages150 {{newUuid}}", "pages": "150" }
HTTP 201
[Captures]
b150: header "Location" regex "/api/books/(.+)$"

POST {{host}}/api/books
Content-Type: application/json
{ "title": "Pages300 {{newUuid}}", "pages": "300" }
HTTP 201
[Captures]
b300: header "Location" regex "/api/books/(.+)$"

POST {{host}}/api/books
Content-Type: application/json
{ "title": "PagesUnknown {{newUuid}}" }
HTTP 201
[Captures]
bnone: header "Location" regex "/api/books/(.+)$"


# --- over 120 -------------------------------------------------------------------
GET {{host}}/api/books?pagesOp=over&pages=120
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Books whose page count is more than 120"
jsonpath "$.views[1].items[*].ref" contains "{{b150}}"
# What the list is filtered by is on each item.
jsonpath "$.views[1].items[?(@.ref=='{{b150}}')].properties[?(@.name=='Pages')].value" == "150 pages"
jsonpath "$.views[1].items[?(@.ref=='{{b150}}')].properties[?(@.name=='Pages')].role" == "meta"
jsonpath "$.views[1].items[*].ref" contains "{{b300}}"
jsonpath "$.views[1].items[*].ref" not contains "{{b100}}"
jsonpath "$.views[1].items[*].ref" not contains "{{bnone}}"

# --- under 120 ------------------------------------------------------------------
GET {{host}}/api/books?pagesOp=under&pages=120
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].ref" contains "{{b100}}"
jsonpath "$.views[1].items[*].ref" not contains "{{b150}}"
jsonpath "$.views[1].items[*].ref" not contains "{{bnone}}"

# --- equal to 150 ---------------------------------------------------------------
GET {{host}}/api/books?pagesOp=equal&pages=150
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Books whose page count is 150"
jsonpath "$.views[1].items[*].ref" contains "{{b150}}"
jsonpath "$.views[1].items[*].ref" not contains "{{b100}}"
jsonpath "$.views[1].items[*].ref" not contains "{{b300}}"

# --- 150 or over: both ends included ---------------------------------------------
GET {{host}}/api/books?pagesOp=atLeast&pages=150
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].ref" contains "{{b150}}"
jsonpath "$.views[1].items[*].ref" contains "{{b300}}"
jsonpath "$.views[1].items[*].ref" not contains "{{b100}}"

# --- 150 or under ---------------------------------------------------------------
GET {{host}}/api/books?pagesOp=atMost&pages=150
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].ref" contains "{{b100}}"
jsonpath "$.views[1].items[*].ref" contains "{{b150}}"
jsonpath "$.views[1].items[*].ref" not contains "{{b300}}"

# --- other than 150: an unknown page count is not "other" ---------------------------
GET {{host}}/api/books?pagesOp=otherThan&pages=150
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].ref" contains "{{b100}}"
jsonpath "$.views[1].items[*].ref" contains "{{b300}}"
jsonpath "$.views[1].items[*].ref" not contains "{{b150}}"
jsonpath "$.views[1].items[*].ref" not contains "{{bnone}}"

# --- between, ends included, given either way round ------------------------------------
GET {{host}}/api/books?pagesOp=between&pages=300&pagesTo=150
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Books whose page count is between 150 and 300"
jsonpath "$.views[1].items[*].ref" contains "{{b150}}"
jsonpath "$.views[1].items[*].ref" contains "{{b300}}"
jsonpath "$.views[1].items[*].ref" not contains "{{b100}}"

# --- no filter: every book, under the usual heading ----------------------------------
GET {{host}}/api/books
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "All books"
jsonpath "$.views[1].items[*].ref" contains "{{bnone}}"
# Unfiltered, the page count is not part of the list.
jsonpath "$.views[1].items[?(@.ref=='{{b150}}')].properties[?(@.name=='Pages')]" count == 0


# --- A filter that cannot be read is an error, not "all books" -------------------------
GET {{host}}/api/books?pagesOp=sideways&pages=120
HTTP 400
[Asserts]
jsonpath "$.code" == "invalid_page_filter"

GET {{host}}/api/books?pagesOp=over&pages=many
HTTP 400
[Asserts]
jsonpath "$.code" == "invalid_page_filter"

GET {{host}}/api/books?pagesOp=between&pages=100
HTTP 400
[Asserts]
jsonpath "$.code" == "invalid_page_filter"
