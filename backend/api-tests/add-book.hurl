# POST /books — the AddBook command. Returns 201 Created with the new id as the
# body and a Location header. There is no GET /books/{id} yet, so verification
# is via the body, the Location header, and a follow-up list query.
# Because the captured id is unique, the single-match filters below collapse to
# a scalar and are compared directly with == (no count / no nth).

# --- Add a book into the seeded library ---------------------------------------
POST {{host}}/books
Content-Type: application/json
{
  "title": "Clean Architecture",
  "subtitle": "A Craftsman's Guide",
  "authorIds": [],
  "libraryId": "{{libraryId}}"
}

HTTP 201
[Asserts]
# Body is the new book id (a JSON string).
jsonpath "$" matches /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
header "Location" matches /^\/books\/[0-9a-fA-F-]{36}$/
[Captures]
created_id: jsonpath "$"

# Confirm the created row is present and correctly shaped.
GET {{host}}/books
HTTP 200
[Asserts]
jsonpath "$[*].id" includes "{{created_id}}"
jsonpath "$[?(@.id=='{{created_id}}')].title" == "Clean Architecture"
jsonpath "$[?(@.id=='{{created_id}}')].libraryId" == "{{libraryId}}"


# --- Add an unshelved book (no library => Location.Unknown) -------------------
POST {{host}}/books
Content-Type: application/json
{
  "title": "Unshelved Title",
  "authorIds": []
}

HTTP 201
[Asserts]
jsonpath "$" matches /^[0-9a-fA-F-]{36}$/
[Captures]
unshelved_id: jsonpath "$"

GET {{host}}/books
HTTP 200
[Asserts]
jsonpath "$[?(@.id=='{{unshelved_id}}')].libraryId" == null
