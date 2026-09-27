# api-tests/auth.hurl — the session lifecycle: signed out → rejected → signed in → signed out.
# Hurl carries the session cookie from one request to the next within this file.

# The login screen is public: no session, still answers.
GET {{host}}/api/auth/login
HTTP 200
[Asserts]
jsonpath "$.views[*].type" contains "loginForm"

# Everything else is closed before sign-in, and the 401 carries the login screen so the
# client can show it without a second request.
GET {{host}}/api/dashboard
HTTP 401
[Asserts]
jsonpath "$.code" == "not_authenticated"
jsonpath "$.views[*].type" contains "loginForm"

# Wrong password returns the login screen with the error on the problem, not a bare error.
# The successful sign-in below resets the failure count, so re-runs never trigger lockout.
POST {{host}}/api/auth/login
{ "username": "john", "password": "wrong" }
HTTP 401
[Asserts]
jsonpath "$.code" == "invalid_credentials"
jsonpath "$.views[*].type" contains "loginForm"
jsonpath "$.views[?(@.type=='message')].kind" contains "error"

POST {{host}}/api/auth/login
{ "username": "john", "password": "{{password}}" }
HTTP 200
[Asserts]
header "Set-Cookie" contains "imperabook.session"
header "Set-Cookie" contains "httponly"
jsonpath "$.views" count > 0

GET {{host}}/api/dashboard
HTTP 200

# The already-signed-in branch: same route, different answer.
POST {{host}}/api/auth/login
{ "username": "john", "password": "{{password}}" }
HTTP 200
[Asserts]
jsonpath "$.views[0].text" contains "already signed in"

# Signing out says so and hands back the login screen.
POST {{host}}/api/auth/logout
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Signed out."
jsonpath "$.views[*].type" contains "loginForm"

GET {{host}}/api/dashboard
HTTP 401
