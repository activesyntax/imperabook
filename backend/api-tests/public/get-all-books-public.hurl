# The catalog without a session. Every book and author endpoint is closed; each answers the
# same 401 problem with the login screen, never data and never a partial result.

GET {{host}}/api/books
HTTP 401
[Asserts]
header "Content-Type" contains "application/problem+json"
jsonpath "$.code" == "not_authenticated"
jsonpath "$.views[*].type" contains "loginForm"

GET {{host}}/api/books/00000000-0000-0000-0000-000000000000
HTTP 401
[Asserts]
jsonpath "$.code" == "not_authenticated"

POST {{host}}/api/books
Content-Type: application/json
{ "title": "Anonymous Attempt" }
HTTP 401
[Asserts]
jsonpath "$.code" == "not_authenticated"

DELETE {{host}}/api/books/00000000-0000-0000-0000-000000000000
HTTP 401
[Asserts]
jsonpath "$.code" == "not_authenticated"

GET {{host}}/api/authors
HTTP 401
[Asserts]
jsonpath "$.code" == "not_authenticated"

GET {{host}}/api/authors/00000000-0000-0000-0000-000000000000
HTTP 401
[Asserts]
jsonpath "$.code" == "not_authenticated"

GET {{host}}/api/authors/search?q=a
HTTP 401
[Asserts]
jsonpath "$.code" == "not_authenticated"

POST {{host}}/api/authors
Content-Type: application/json
{ "lastName": "Anonymous" }
HTTP 401
[Asserts]
jsonpath "$.code" == "not_authenticated"
