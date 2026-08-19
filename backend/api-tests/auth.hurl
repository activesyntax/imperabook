# api-tests/auth.hurl

# Bootstrap is public: no session, still answers.
GET {{host}}/api/auth/bootstrap
HTTP 200
[Asserts]
jsonpath "$.command.command" == "login"
jsonpath "$.command.endpoint" == "/api/auth/login"
jsonpath "$.views" count > 0

# The control channel is closed before sign-in. This is the assertion that would have
# caught the self-locking bootstrap problem.
GET {{host}}/api/commands
HTTP 401

POST {{host}}/api/command
{ "command": "dashboard" }
HTTP 401

# Wrong password returns the login screen on the problem, not a bare error (ADR 26).
POST {{host}}/api/auth/login
{ "username": "john", "password": "wrong" }
HTTP 401
[Asserts]
jsonpath "$.code" == "invalid_credentials"
jsonpath "$.views" count > 0

POST {{host}}/api/auth/login
{ "username": "john", "password": "{{password}}" }
HTTP 200
[Asserts]
header "Set-Cookie" contains "imperabook.session"
header "Set-Cookie" contains "httponly"
jsonpath "$.views" count > 0

# Hurl carries the cookie forward automatically from here.
GET {{host}}/api/commands
HTTP 200
[Asserts]
jsonpath "$[*].command" includes "login"

POST {{host}}/api/command
{ "command": "dashboard" }
HTTP 200

# The already-signed-in branch: same route, different answer.
POST {{host}}/api/auth/login
{ "username": "john", "password": "{{password}}" }
HTTP 200
[Asserts]
jsonpath "$.views[0].text" contains "already signed in"
