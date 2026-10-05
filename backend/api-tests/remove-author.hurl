# DELETE /api/authors/{id} — removes an author from the catalog. Their books stay: a book
# whose only author this was is left with its author unknown, so "list books having no author"
# finds it. The reply says how many books that happened to.
#
# Mutates state: adds two authors and one book per run, then removes both authors.

POST {{host}}/api/auth/login
{ "username": "john", "password": "{{password}}" }
HTTP 200


POST {{host}}/api/books
Content-Type: application/json
{ "title": "Orphaned {{newUuid}}", "author": "Leaving Writer{{newUuid}}" }
HTTP 201
[Captures]
book_url: header "Location"
book_id: header "Location" regex "/api/books/(.+)$"
writer: jsonpath "$.views[0].text" regex "by (Leaving Writer[0-9a-f-]{36}) \\(new author\\)"

GET {{host}}/api/authors/search
[Query]
q: {{writer}}
HTTP 200
[Captures]
writer_id: jsonpath "$[0].id"

POST {{host}}/api/authors
Content-Type: application/json
{ "firstName": "Bookless", "lastName": "Writer{{newUuid}}" }
HTTP 201
[Captures]
bookless_url: header "Location"
bookless: jsonpath "$.views[0].text" regex "Added author (Bookless Writer[0-9a-f-]{36})\\."


# --- An author with a book: removed, the book stays with no author ----------------------
DELETE {{host}}/api/authors/{{writer_id}}
HTTP 200
[Asserts]
jsonpath "$.views[0].kind" == "success"
jsonpath "$.views[0].text" == "Removed {{writer}}. 1 book no longer has an author."

GET {{host}}/api/authors/{{writer_id}}
HTTP 404
[Asserts]
jsonpath "$.code" == "author_not_found"

GET {{host}}{{book_url}}
HTTP 200

GET {{host}}/api/books?missing=author
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].ref" contains "{{book_id}}"


# --- An author with no books: just removed ------------------------------------------------
DELETE {{host}}{{bookless_url}}
HTTP 200
[Asserts]
jsonpath "$.views[0].text" == "Removed {{bookless}}."


# --- Removing again, or an author that is not there ----------------------------------------
DELETE {{host}}{{bookless_url}}
HTTP 404
[Asserts]
jsonpath "$.code" == "author_not_found"

DELETE {{host}}/api/authors/99999999-9999-9999-9999-999999999999
HTTP 404
[Asserts]
jsonpath "$.code" == "author_not_found"
