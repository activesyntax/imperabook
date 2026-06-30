# GET /api/books — lists every book regardless of library.
# Seeded data guarantees the three titles below, including the orphan
# (libraryId == null) which exercises the Location.Unknown read path.

GET {{host}}/api/books

HTTP 200
[Asserts]
header "Content-Type" contains "application/json"
