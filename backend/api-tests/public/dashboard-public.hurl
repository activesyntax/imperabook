# GET /api/dashboard without a session. The dashboard is private: an anonymous caller gets a
# 401 problem that carries the login screen, so the client can show it without a second
# request. The signed-in shape is asserted in ../dashboard.hurl.
GET {{host}}/api/dashboard
HTTP 401
[Asserts]
header "Content-Type" contains "application/problem+json"
jsonpath "$.code" == "not_authenticated"
jsonpath "$.views[*].type" contains "image"
jsonpath "$.views[*].type" contains "loginForm"
