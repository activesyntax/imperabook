# GET /api/search?q=… — the "find" command. Every keyword must match. A book matches a keyword
# in its title, subtitle, summary or an author's name, as part of a word or (English stemming)
# as another form of the word; an author matches a keyword in their name. Results come as a
# "Books" and an "Authors" section, each only when it found something.
#
# Mutates state: adds one book and its new author per run, both carrying a unique token.

POST {{host}}/api/auth/login
{ "username": "john", "password": "{{password}}" }
HTTP 200


POST {{host}}/api/books
Content-Type: application/json
{
  "title": "Zeppelin{{newUuid}} Voyage",
  "summary": "Dragons flying over the mountains.",
  "author": "Searchy Writer{{newUuid}}"
}
HTTP 201
[Captures]
book_url: header "Location"
token: jsonpath "$.views[0].text" regex "Added \"(Zeppelin[0-9a-f-]{36}) Voyage\""
author_name: jsonpath "$.views[0].text" regex "by (Searchy Writer[0-9a-f-]{36}) \\(new author\\)"

GET {{host}}/api/authors/search
[Query]
q: {{author_name}}
HTTP 200
[Captures]
author_id: jsonpath "$[0].id"


# --- A title word finds the book --------------------------------------------------
GET {{host}}/api/search
[Query]
q: {{token}}
HTTP 200
[Asserts]
jsonpath "$.views" count == 2
jsonpath "$.views[0].type" == "heading"
jsonpath "$.views[0].text" == "Books"
jsonpath "$.views[1].items" count == 1
jsonpath "$.views[1].items[0].open" == "{{book_url}}"


# --- Part of a word is enough --------------------------------------------------------
GET {{host}}/api/search
[Query]
q: {{token}} voya
HTTP 200
[Asserts]
jsonpath "$.views[1].items[0].open" == "{{book_url}}"


# --- Another form of a summary word, by stemming ("flies" ~ "flying") ---------------
GET {{host}}/api/search
[Query]
q: {{token}} flies
HTTP 200
[Asserts]
jsonpath "$.views[1].items[0].open" == "{{book_url}}"


# --- An author's name finds their books, and the author ----------------------------
GET {{host}}/api/search
[Query]
q: {{author_name}}
HTTP 200
[Asserts]
jsonpath "$.views" count == 4
jsonpath "$.views[0].text" == "Books"
jsonpath "$.views[1].items[0].open" == "{{book_url}}"
jsonpath "$.views[2].text" == "Authors"
jsonpath "$.views[3].items" count == 1
jsonpath "$.views[3].items[0].ref" == "{{author_id}}"


# --- Every keyword must match ---------------------------------------------------------
GET {{host}}/api/search
[Query]
q: {{token}} submarine
HTTP 200
[Asserts]
jsonpath "$.views" count == 1
jsonpath "$.views[0].type" == "message"
jsonpath "$.views[0].text" contains "Nothing matches"


# --- No keywords: a hint, not everything ------------------------------------------------
GET {{host}}/api/search?q=%20
HTTP 200
[Asserts]
jsonpath "$.views[0].type" == "message"
jsonpath "$.views[0].text" contains "Type what to find"
