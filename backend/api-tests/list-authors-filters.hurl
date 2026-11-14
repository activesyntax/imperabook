# GET /api/authors?bornOp=…&born=…[&bornTo=…]&diedOp=…&died=…[&diedTo=…]&vitality=living —
# "list authors born before 1900", "… died after 1950", "… living", one per line together. Each run adds an author born 1850 who
# died, one born 1930 still living, and one with no birth year; the catalog holds others too,
# so each case checks which of these three are listed and which are not.
#
# Mutates state: adds three authors per run.

POST {{host}}/api/auth/login
{ "username": "bill", "password": "{{password}}" }
HTTP 200


POST {{host}}/api/authors
Content-Type: application/json
{ "firstName": "Old", "lastName": "Timer{{newUuid}}", "birthYear": "1850", "deathYear": "1920", "vitality": "deceased" }
HTTP 201
[Captures]
old: header "Location" regex "/api/authors/(.+)$"

POST {{host}}/api/authors
Content-Type: application/json
{ "firstName": "Still", "lastName": "Here{{newUuid}}", "birthYear": "1930", "vitality": "living" }
HTTP 201
[Captures]
alive: header "Location" regex "/api/authors/(.+)$"

POST {{host}}/api/authors
Content-Type: application/json
{ "firstName": "No", "lastName": "Birthday{{newUuid}}" }
HTTP 201
[Captures]
unknown: header "Location" regex "/api/authors/(.+)$"


# --- born before: the year itself left out; an unknown year matches nothing ----------
GET {{host}}/api/authors?bornOp=before&born=1900
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Authors born before 1900"
jsonpath "$.views[1].items[*].ref" contains "{{old}}"
jsonpath "$.views[1].items[*].ref" not contains "{{alive}}"
jsonpath "$.views[1].items[*].ref" not contains "{{unknown}}"

# --- born between, ends kept -----------------------------------------------------------
GET {{host}}/api/authors?bornOp=between&born=1930&bornTo=1850
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].ref" contains "{{old}}"
jsonpath "$.views[1].items[*].ref" contains "{{alive}}"

# --- living ---------------------------------------------------------------------------------
GET {{host}}/api/authors?vitality=living
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Living authors"
jsonpath "$.views[1].items[*].ref" contains "{{alive}}"
jsonpath "$.views[1].items[*].ref" not contains "{{old}}"
jsonpath "$.views[1].items[*].ref" not contains "{{unknown}}"

# --- together: both must hold, said back as one phrase -----------------------------------
GET {{host}}/api/authors?vitality=living&bornOp=after&born=1900&missing=books
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Living authors born after 1900 having no books"
jsonpath "$.views[1].items[*].ref" contains "{{alive}}"
jsonpath "$.views[1].items[*].ref" not contains "{{old}}"

# --- died: only authors with a death year can match -------------------------------------
GET {{host}}/api/authors?diedOp=before&died=1950
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Authors who died before 1950"
jsonpath "$.views[1].items[*].ref" contains "{{old}}"
jsonpath "$.views[1].items[*].ref" not contains "{{alive}}"
jsonpath "$.views[1].items[*].ref" not contains "{{unknown}}"

GET {{host}}/api/authors?diedOp=after&died=1950
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].ref" not contains "{{old}}"

# Born and died together read as one phrase.
GET {{host}}/api/authors?bornOp=after&born=1800&diedOp=in&died=1920
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Authors born after 1800 who died in 1920"
jsonpath "$.views[1].items[*].ref" contains "{{old}}"


# --- years before the common era ------------------------------------------------------------
GET {{host}}/api/authors?bornOp=before&born=-400
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Authors born before 400 BC"
jsonpath "$.views[1].items[*].ref" not contains "{{old}}"


# --- A filter that cannot be read is an error, not "all authors" -----------------------------
GET {{host}}/api/authors?bornOp=around&born=1900
HTTP 400
[Asserts]
jsonpath "$.code" == "invalid_born_filter"

GET {{host}}/api/authors?diedOp=around&died=1900
HTTP 400
[Asserts]
jsonpath "$.code" == "invalid_died_filter"

GET {{host}}/api/authors?vitality=dead
HTTP 400
[Asserts]
jsonpath "$.code" == "invalid_vitality_filter"
