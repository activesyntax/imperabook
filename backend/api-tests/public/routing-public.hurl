# Fallback routing, no session needed. Unknown /api paths are a JSON 404, never the SPA shell.
# (Non-/api paths serve index.html only where the frontend build is deployed into wwwroot; in
# development ng serve owns them, so they are not asserted here.)

GET {{host}}/api/no-such-endpoint
HTTP 404
[Asserts]
header "Content-Type" contains "application/problem+json"
jsonpath "$.code" == "not_found"

# A route whose constraint does not match is unknown too, not a page.
GET {{host}}/api/books/not-a-guid
HTTP 404
[Asserts]
jsonpath "$.code" == "not_found"

GET {{host}}/api
HTTP 404
[Asserts]
jsonpath "$.code" == "not_found"
