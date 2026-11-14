# GET /api/authors — "list authors" with no filter: every author in the signed-in user's
# catalog, and nobody else's. The filters are in list-authors-filters.hurl and
# list-authors-having-no.hurl.

POST {{host}}/api/auth/login
{ "username": "bill", "password": "{{password}}" }
HTTP 200


GET {{host}}/api/authors
HTTP 200
[Asserts]
jsonpath "$.views" count == 2
jsonpath "$.views[0].type" == "heading"
jsonpath "$.views[0].text" == "All authors"
jsonpath "$.views[1].type" == "itemCollection"
jsonpath "$.views[1].items[*].properties[0].value" contains "George Orwell"
# Seeded for the other user: scoped out.
jsonpath "$.views[1].items[*].properties[0].value" not contains "Jane Austen"
jsonpath "$.views[1].items[0].open" startsWith "/api/authors/"
