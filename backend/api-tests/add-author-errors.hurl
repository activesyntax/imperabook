# POST /api/authors — the same full name twice. Ignoring case and extra blanks, an author
# already in the catalog is not added again: 409, nothing created, the command handed back
# (keepQuery), and the existing author shown as an item that opens.
#
# Mutates state: adds two authors per run under a unique last name.

POST {{host}}/api/auth/login
{ "username": "john", "password": "{{password}}" }
HTTP 200


POST {{host}}/api/authors
Content-Type: application/json
{ "firstName": "Ann", "lastName": "Dup{{newUuid}}" }
HTTP 201
[Captures]
existing_url: header "Location"
family: jsonpath "$.views[0].text" regex "Added author Ann (Dup[0-9a-f-]{36})\\."
suffix: jsonpath "$.views[0].text" regex "Added author Ann Dup([0-9a-f-]{36})\\."


# --- Same name, different case and spacing: refused ---------------------------
POST {{host}}/api/authors
Content-Type: application/json
{ "firstName": "  ANN ", "lastName": "  {{family}}" }
HTTP 409
[Asserts]
jsonpath "$.code" == "author_exists"
jsonpath "$.keepQuery" == true
jsonpath "$.views[0].type" == "message"
jsonpath "$.views[0].kind" == "warning"
jsonpath "$.views[1].type" == "itemCollection"
jsonpath "$.views[1].items" count == 1
jsonpath "$.views[1].items[0].open" == "{{existing_url}}"

# Still just the one.
GET {{host}}/api/authors/search
[Query]
q: {{family}}
HTTP 200
[Asserts]
jsonpath "$" count == 1


# --- Same name with accents: still the same author ----------------------------
POST {{host}}/api/authors
Content-Type: application/json
{ "firstName": "Ánn", "lastName": "Dúp{{suffix}}" }
HTTP 409
[Asserts]
jsonpath "$.code" == "author_exists"
jsonpath "$.views[1].items[0].open" == "{{existing_url}}"


# --- A different full name is a different author ------------------------------
# Only the last name matches: not the same author.
POST {{host}}/api/authors
Content-Type: application/json
{ "lastName": "{{family}}" }
HTTP 201
