# POST /api/books — error paths. ApplicationError cases map to:
#   Validation     -> 400 (validation problem, codes under "failures")
#   NoLibrary      -> 409 (not reachable with the dev seed: john owns a library)
#   ImageNotFound  -> 422
#   AuthorsNotFound -> 422

POST {{host}}/api/auth/login
{ "username": "john", "password": "{{password}}" }
HTTP 200

GET {{host}}/api/authors
HTTP 200
[Captures]
author_id: jsonpath "$.views[1].items[0].ref"


# --- Blank title, bad pages: every failure is reported at once ----------------
POST {{host}}/api/books
Content-Type: application/json
{
  "title": "",
  "authorIds": [],
  "pages": "0"
}
HTTP 400
[Asserts]
jsonpath "$.failures" count == 2
jsonpath "$.failures[*].code" includes "title_required"
jsonpath "$.failures[*].code" includes "page_count_out_of_range"


# --- Non-numeric pages --------------------------------------------------------
POST {{host}}/api/books
Content-Type: application/json
{
  "title": "Pages Are Words",
  "authorIds": ["{{author_id}}"],
  "pages": "many"
}
HTTP 400
[Asserts]
jsonpath "$.failures" count == 1
jsonpath "$.failures[0].code" == "not_a_number"


# --- Malformed cover hash -----------------------------------------------------
POST {{host}}/api/books
Content-Type: application/json
{
  "title": "Bad Cover",
  "authorIds": ["{{author_id}}"],
  "coverHash": "not-a-hash"
}
HTTP 400
[Asserts]
jsonpath "$.failures" count == 1
jsonpath "$.failures[0].code" == "content_hash_malformed"


# --- Well-formed cover hash that was never uploaded ---------------------------
POST {{host}}/api/books
Content-Type: application/json
{
  "title": "Missing Cover",
  "authorIds": ["{{author_id}}"],
  "coverHash": "0000000000000000000000000000000000000000000000000000000000000000"
}
HTTP 422
[Asserts]
jsonpath "$.code" == "image_not_found"


# --- Author id that isn't in this user's catalog ------------------------------
# Only the unknown id is reported back; the real one is fine.
POST {{host}}/api/books
Content-Type: application/json
{
  "title": "Ghost Written",
  "authorIds": ["{{author_id}}", "99999999-9999-9999-9999-999999999999"]
}
HTTP 422
[Asserts]
jsonpath "$.code" == "author_not_found"
jsonpath "$.authorIds" count == 1
jsonpath "$.authorIds[0]" == "99999999-9999-9999-9999-999999999999"


# --- Missing required member ('title') ----------------------------------------
# A required init member absent from the JSON fails binding => 400.
POST {{host}}/api/books
Content-Type: application/json
{
  "authorIds": []
}
HTTP 400


# --- Malformed JSON -----------------------------------------------------------
POST {{host}}/api/books
Content-Type: application/json
```
{ "title": "broken",, }
```
HTTP 400
