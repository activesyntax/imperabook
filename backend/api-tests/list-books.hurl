# GET /api/books — "list books" with no filter: every book in the signed-in user's catalog,
# under the plain heading, and nobody else's. The filters have files of their own
# (list-books-*.hurl).

POST {{host}}/api/auth/login
{ "username": "bill", "password": "{{password}}" }
HTTP 200


GET {{host}}/api/books
HTTP 200
[Asserts]
jsonpath "$.views" count == 2
jsonpath "$.views[0].type" == "heading"
jsonpath "$.views[0].text" == "All books"
jsonpath "$.views[1].type" == "itemCollection"
jsonpath "$.views[1].items[*].properties[0].value" contains "Crime and Punishment"
# Seeded into the other user's library: scoped out, not merely filtered.
jsonpath "$.views[1].items[*].properties[0].value" not contains "Pride and Prejudice"
# Every item opens its own detail.
jsonpath "$.views[1].items[0].open" startsWith "/api/books/"
