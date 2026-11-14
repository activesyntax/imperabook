# DELETE /api/books/{id} — removes a book from the current user's library. Answers with a
# message view naming it. The author stays in the catalog, only the book's link to them goes.
#
# Mutates state: adds one book and one author per run, then removes the book.

POST {{host}}/api/auth/login
{ "username": "bill", "password": "{{password}}" }
HTTP 200


POST {{host}}/api/books
Content-Type: application/json
{
  "title": "Doomed {{newUuid}}",
  "author": "Remaining Author{{newUuid}}"
}
HTTP 201
[Captures]
book_url: header "Location"
book_id: header "Location" regex "/api/books/(.+)$"
title: jsonpath "$.views[0].text" regex "Added \"(Doomed [0-9a-fA-F-]{36})\""
author: jsonpath "$.views[0].text" regex "by (Remaining Author[0-9a-fA-F-]{36}) \\(new author\\)"


# --- Remove it -----------------------------------------------------------------
DELETE {{host}}{{book_url}}
HTTP 200
[Asserts]
jsonpath "$.views[0].type" == "message"
jsonpath "$.views[0].kind" == "success"
jsonpath "$.views[0].text" == "Removed \"{{title}}\"."

# Gone from the detail and from the list.
GET {{host}}{{book_url}}
HTTP 404
[Asserts]
jsonpath "$.code" == "book_not_found"

GET {{host}}/api/books
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].ref" not contains "{{book_id}}"

# The author is still in the catalog, now with no books.
GET {{host}}/api/authors/search
[Query]
q: {{author}}
HTTP 200
[Captures]
author_id: jsonpath "$[0].id"
[Asserts]
jsonpath "$" count == 1

GET {{host}}/api/authors/{{author_id}}
HTTP 200
[Asserts]
jsonpath "$.views[?(@.type=='itemCollection')].emptyMessage" exists
jsonpath "$.views[?(@.type=='itemCollection')].items[*]" not exists


# --- Removing it again, or a book that is not there ---------------------------
DELETE {{host}}{{book_url}}
HTTP 404
[Asserts]
jsonpath "$.code" == "book_not_found"

DELETE {{host}}/api/books/99999999-9999-9999-9999-999999999999
HTTP 404
[Asserts]
jsonpath "$.code" == "book_not_found"
