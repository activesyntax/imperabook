# GET /libraries/{libraryId}/books — books scoped to one library.

# --- Seeded library returns its two books, never the orphan --------------------
GET {{host}}/libraries/{{libraryId}}/books

HTTP 200
[Asserts]
jsonpath "$" isCollection
jsonpath "$[*].title" includes "The Pragmatic Programmer"
jsonpath "$[*].title" includes "Domain-Driven Design"
jsonpath "$[*].title" not includes "Orphan Book"
jsonpath "$[*].libraryId" not includes null


# --- Unknown library: empty result, not an error ------------------------------
# The read side doesn't check existence, so a missing library yields [].
GET {{host}}/libraries/99999999-9999-9999-9999-999999999999/books

HTTP 200
[Asserts]
jsonpath "$" isCollection
jsonpath "$" count == 0


# --- Non-guid id is rejected by the route constraint --------------------------
# The {libraryId:guid} constraint means "not-a-guid" doesn't match the route.
GET {{host}}/libraries/not-a-guid/books

HTTP 404
