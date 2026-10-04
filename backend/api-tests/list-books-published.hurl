# GET /api/books?publishedOp=…&published=…[&publishedTo=…] — "list books published …". Each
# run adds books published in 1940, 1950 and 1960, and one with no year; the library holds
# other books too, so each case checks which of these four are listed and which are not.
#
# Mutates state: adds four books per run.

POST {{host}}/api/auth/login
{ "username": "john", "password": "{{password}}" }
HTTP 200


POST {{host}}/api/books
Content-Type: application/json
{ "title": "Year1940 {{newUuid}}", "published": "1940" }
HTTP 201
[Captures]
y1940: header "Location" regex "/api/books/(.+)$"

POST {{host}}/api/books
Content-Type: application/json
{ "title": "Year1950 {{newUuid}}", "published": "1950" }
HTTP 201
[Captures]
y1950: header "Location" regex "/api/books/(.+)$"

POST {{host}}/api/books
Content-Type: application/json
{ "title": "Year1960 {{newUuid}}", "published": "1960" }
HTTP 201
[Captures]
y1960: header "Location" regex "/api/books/(.+)$"

POST {{host}}/api/books
Content-Type: application/json
{ "title": "YearUnknown {{newUuid}}" }
HTTP 201
[Captures]
ynone: header "Location" regex "/api/books/(.+)$"


# --- in: that year only -------------------------------------------------------------
GET {{host}}/api/books?publishedOp=in&published=1950
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Books published in 1950"
jsonpath "$.views[1].items[*].ref" contains "{{y1950}}"
jsonpath "$.views[1].items[*].ref" not contains "{{y1940}}"
jsonpath "$.views[1].items[*].ref" not contains "{{y1960}}"
# What the list is filtered by is on each item.
jsonpath "$.views[1].items[?(@.ref=='{{y1950}}')].properties[?(@.name=='Published')].value" == "published 1950"

# --- before: the year itself left out ----------------------------------------------------
GET {{host}}/api/books?publishedOp=before&published=1950
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Books published before 1950"
jsonpath "$.views[1].items[*].ref" contains "{{y1940}}"
jsonpath "$.views[1].items[*].ref" not contains "{{y1950}}"
jsonpath "$.views[1].items[*].ref" not contains "{{ynone}}"

# --- after: the year itself left out -----------------------------------------------------
GET {{host}}/api/books?publishedOp=after&published=1950
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].ref" contains "{{y1960}}"
jsonpath "$.views[1].items[*].ref" not contains "{{y1950}}"
jsonpath "$.views[1].items[*].ref" not contains "{{ynone}}"

# --- between: both ends kept, given either way round ----------------------------------
GET {{host}}/api/books?publishedOp=between&published=1960&publishedTo=1950
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Books published between 1950 and 1960"
jsonpath "$.views[1].items[*].ref" contains "{{y1950}}"
jsonpath "$.views[1].items[*].ref" contains "{{y1960}}"
jsonpath "$.views[1].items[*].ref" not contains "{{y1940}}"


# --- A filter that cannot be read is an error, not "all books" ----------------------------
GET {{host}}/api/books?publishedOp=during&published=1950
HTTP 400
[Asserts]
jsonpath "$.code" == "invalid_published_filter"

GET {{host}}/api/books?publishedOp=before&published=fifties
HTTP 400
[Asserts]
jsonpath "$.code" == "invalid_published_filter"

GET {{host}}/api/books?publishedOp=between&published=1950
HTTP 400
[Asserts]
jsonpath "$.code" == "invalid_published_filter"
