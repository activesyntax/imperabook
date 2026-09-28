# GET /api/books/{id} — one book in full, as a CommandResult. List items point here through
# their "open" field, so the client never builds the URL itself.
#
# Mutates state: adds one book per run to have a known id to open.

# --- Requires a session -------------------------------------------------------
GET {{host}}/api/books/00000000-0000-0000-0000-000000000000
HTTP 401


POST {{host}}/api/auth/login
{ "username": "john", "password": "{{password}}" }
HTTP 200


POST {{host}}/api/books
Content-Type: application/json
{
  "title": "Detail {{newUuid}}",
  "subtitle": "Opened From The List",
  "published": "1999"
}
HTTP 201
[Captures]
detail_url: header "Location"
book_id: header "Location" regex "/api/books/(.+)$"
title: jsonpath "$.views[0].text" regex "Added \"(Detail [0-9a-f-]{36})\""


# --- The list links each item to its detail -----------------------------------
GET {{host}}/api/books
HTTP 200
[Asserts]
jsonpath "$.views[1].items[?(@.ref=='{{book_id}}')].open" == "{{detail_url}}"


# --- Following the link shows the book ----------------------------------------
GET {{host}}{{detail_url}}
HTTP 200
[Asserts]
jsonpath "$.views[0].type" == "heading"
jsonpath "$.views[0].text" == "{{title}}"
jsonpath "$.views[1].type" == "image"
jsonpath "$.views[1].src" startsWith "/api/images/"
jsonpath "$.views[2].type" == "textView"


# --- A book's author links to the author's page, and back to the book --------
POST {{host}}/api/books
Content-Type: application/json
{
  "title": "Linked {{newUuid}}",
  "author": "Linked Author{{newUuid}}"
}
HTTP 201
[Captures]
linked_book_url: header "Location"

GET {{host}}{{linked_book_url}}
HTTP 200
[Captures]
author_link: jsonpath "$.views[2].blocks[?(@.type=='paragraph')].content[?(@.type=='link')].href" nth 0
[Asserts]
jsonpath "$.views[2].blocks[?(@.type=='paragraph')].content[?(@.type=='link')].href" nth 0 startsWith "/api/authors/"

GET {{host}}{{author_link}}
HTTP 200
[Asserts]
jsonpath "$.views[0].text" startsWith "Linked Author"
jsonpath "$.views[3].items[*].open" contains "{{linked_book_url}}"


# --- Not in this user's library -----------------------------------------------
GET {{host}}/api/books/99999999-9999-9999-9999-999999999999
HTTP 404
[Asserts]
jsonpath "$.code" == "book_not_found"
