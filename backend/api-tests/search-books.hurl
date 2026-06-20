# GET /books/search — the unified filter endpoint (libraryId and/or titleContains).
# Note: EF translates string.Contains to a case-SENSITIVE LIKE on Postgres,
# so the substrings below match the seeded casing exactly.

# --- Filter by title substring -------------------------------------------------
GET {{host}}/books/search?titleContains=Design

HTTP 200
[Asserts]
jsonpath "$" isCollection
jsonpath "$[*].title" includes "Domain-Driven Design"
# Real filtering, not pass-through: an unrelated seeded title is absent.
jsonpath "$[*].title" not includes "The Pragmatic Programmer"


# --- Filter by library ---------------------------------------------------------
GET {{host}}/books/search?libraryId={{libraryId}}

HTTP 200
[Asserts]
jsonpath "$" isCollection
jsonpath "$[*].title" includes "The Pragmatic Programmer"
# The orphan (null library) is excluded.
jsonpath "$[*].title" not includes "Orphan Book"
jsonpath "$[*].libraryId" not includes null


# --- Both filters together -----------------------------------------------------
GET {{host}}/books/search?libraryId={{libraryId}}&titleContains=Pragmatic

HTTP 200
[Asserts]
jsonpath "$[*].title" includes "The Pragmatic Programmer"
jsonpath "$[*].title" not includes "Domain-Driven Design"


# --- Empty filters behave like list-all ----------------------------------------
# Whitespace-only titleContains is trimmed to null by the handler.
GET {{host}}/books/search?titleContains=%20

HTTP 200
[Asserts]
jsonpath "$[*].title" includes "Orphan Book"
