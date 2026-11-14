# GET /api/books?languageOp=is|not&language=… — "list books whose language is [not] …". The
# language may be its English name, its own name or its code, in any case; the server stores
# codes. Each run adds a Hungarian, an English and a language-less book; the library holds
# others too, so each case checks which of these three are listed and which are not.
#
# Mutates state: adds three books per run.

POST {{host}}/api/auth/login
{ "username": "bill", "password": "{{password}}" }
HTTP 200


POST {{host}}/api/books
Content-Type: application/json
{ "title": "Magyar {{newUuid}}", "language": "hu" }
HTTP 201
[Captures]
hu_book: header "Location" regex "/api/books/(.+)$"

POST {{host}}/api/books
Content-Type: application/json
{ "title": "English {{newUuid}}", "language": "en" }
HTTP 201
[Captures]
en_book: header "Location" regex "/api/books/(.+)$"

POST {{host}}/api/books
Content-Type: application/json
{ "title": "Unknown Tongue {{newUuid}}" }
HTTP 201
[Captures]
no_lang: header "Location" regex "/api/books/(.+)$"


# --- By English name, any case ------------------------------------------------------
GET {{host}}/api/books?languageOp=is&language=Hungarian
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Books whose language is Hungarian"
jsonpath "$.views[1].items[*].ref" contains "{{hu_book}}"
jsonpath "$.views[1].items[*].ref" not contains "{{en_book}}"
jsonpath "$.views[1].items[*].ref" not contains "{{no_lang}}"

# --- By code, and by its own name ----------------------------------------------------
GET {{host}}/api/books?languageOp=is&language=hu
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].ref" contains "{{hu_book}}"

GET {{host}}/api/books?languageOp=is&language=magyar
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].ref" contains "{{hu_book}}"

# --- is not: another language, and a known one -----------------------------------------
GET {{host}}/api/books?languageOp=not&language=english
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Books whose language is not English"
jsonpath "$.views[1].items[*].ref" contains "{{hu_book}}"
jsonpath "$.views[1].items[*].ref" not contains "{{en_book}}"
jsonpath "$.views[1].items[*].ref" not contains "{{no_lang}}"

# --- With the page filter: both "whose" clauses in the heading --------------------------
GET {{host}}/api/books?languageOp=is&language=hu&pagesOp=atLeast&pages=1
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Books whose language is Hungarian and whose page count is at least 1"


# --- The catalog's languages, for suggestions ---------------------------------------------
GET {{host}}/api/books/languages
HTTP 200
[Asserts]
jsonpath "$[?(@.code=='hu')].name" == "Hungarian"
jsonpath "$[?(@.code=='en')].name" == "English"


# --- A language no one goes by is an error, not "all books" --------------------------------
GET {{host}}/api/books?languageOp=is&language=klingonese
HTTP 400
[Asserts]
jsonpath "$.code" == "invalid_language_filter"

GET {{host}}/api/books?languageOp=sounds&language=hu
HTTP 400
[Asserts]
jsonpath "$.code" == "invalid_language_filter"
