# GET /api/authors/search?q=… — the command bar's author suggestions. Plain data
# ({ id, name }[]), not a view. Same matching as "by author": the user's own
# authors whose full name contains the text, ignoring case; at most 8.
#
# Mutates state: adds two authors per run, sharing a unique last name.

POST {{host}}/api/auth/login
{ "username": "john", "password": "{{password}}" }
HTTP 200


POST {{host}}/api/authors
Content-Type: application/json
{ "firstName": "Ann", "lastName": "Suggest{{newUuid}}" }
HTTP 201
[Captures]
family: jsonpath "$.views[0].text" regex "Added author Ann (Suggest[0-9a-f-]{36})\\."

POST {{host}}/api/authors
Content-Type: application/json
{ "firstName": "Bob", "lastName": "{{family}}" }
HTTP 201


# --- Part of a name, any case, finds both -------------------------------------
GET {{host}}/api/authors/search
[Query]
q: {{family}}
HTTP 200
[Asserts]
header "Content-Type" contains "application/json"
jsonpath "$" count == 2
jsonpath "$[*].name" contains "Ann {{family}}"
jsonpath "$[*].name" contains "Bob {{family}}"
jsonpath "$[0].id" matches /^[0-9a-f-]{36}$/

GET {{host}}/api/authors/search
[Query]
q: bob {{family}}
HTTP 200
[Asserts]
jsonpath "$" count == 1
jsonpath "$[0].name" == "Bob {{family}}"


# --- Nothing typed, nothing suggested ------------------------------------------
GET {{host}}/api/authors/search?q=%20%20
HTTP 200
[Asserts]
jsonpath "$" count == 0


# --- Accents ignored: typed without them, found with them -----------------------------
POST {{host}}/api/authors
Content-Type: application/json
{ "firstName": "Éva", "lastName": "Bárány{{newUuid}}" }
HTTP 201
[Captures]
accented_suffix: jsonpath "$.views[0].text" regex "Added author Éva Bárány([0-9a-f-]{36})\\."

GET {{host}}/api/authors/search
[Query]
q: eva barany{{accented_suffix}}
HTTP 200
[Asserts]
jsonpath "$" count == 1
jsonpath "$[0].name" == "Éva Bárány{{accented_suffix}}"
