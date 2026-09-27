# POST /api/books — error paths. ApplicationError cases map to:
#   Validation     -> 400 (validation problem, codes under "failures")
#   NoLibrary      -> 409 (not reachable with the dev seed: john owns a library)
#   ImageNotFound  -> 422

POST {{host}}/api/auth/login
{ "username": "john", "password": "{{password}}" }
HTTP 200

GET {{host}}/api/authors
HTTP 200
[Captures]
author_id: jsonpath "$.views[1].items[0].ref"


# --- Blank title and no authors: every failure is reported at once ------------
POST {{host}}/api/books
Content-Type: application/json
{
  "title": "",
  "authorIds": []
}
HTTP 400
[Asserts]
jsonpath "$.failures" count == 2
jsonpath "$.failures[*].code" includes "title_required"
jsonpath "$.failures[*].code" includes "author_required"


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
