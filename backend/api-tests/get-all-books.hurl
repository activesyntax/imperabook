# GET /books — lists every book regardless of library.
# Seeded data guarantees the three titles below, including the orphan
# (libraryId == null) which exercises the Location.Unknown read path.

GET {{host}}/books

HTTP 200
[Asserts]
header "Content-Type" contains "application/json"
jsonpath "$" isCollection
jsonpath "$" count >= 3
# Membership checks: project all titles into a nodeset, assert presence.
jsonpath "$[*].title" contains "The Pragmatic Programmer"
jsonpath "$[*].title" contains "Domain-Driven Design"
jsonpath "$[*].title" contains "Orphan Book"
# Unique-match field checks: a single-match filter collapses to the bare
# value in Hurl, so compare the scalar directly (no count / no nth).
jsonpath "$[?(@.title=='Domain-Driven Design')].subtitle" == "Tackling Complexity"
jsonpath "$[?(@.title=='Orphan Book')].libraryId" == null
# Read model shape: authorIds is always an array.
jsonpath "$[0].authorIds" isCollection
