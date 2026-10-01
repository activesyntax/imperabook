# About and help are offered before sign-in (the side nav shows them signed out), so they
# answer without a session.

GET {{host}}/api/about
HTTP 200
[Asserts]
header "Content-Type" contains "application/json"
jsonpath "$.views" count > 0

GET {{host}}/api/help
HTTP 200
[Asserts]
header "Content-Type" contains "application/json"
jsonpath "$.views" count > 0
