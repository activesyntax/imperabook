# POST /api/books — error paths. ApplicationError cases map to:
#   Validation     -> 400 (validation problem, codes under "failures")
#   NoLibrary      -> 409 (not reachable with the dev seed: john owns a library)
#   ImageNotFound  -> 422
#   AmbiguousAuthor -> 409 (covered in add-book.hurl, where the matching authors are set up)

POST {{host}}/api/auth/login
{ "username": "john", "password": "{{password}}" }
HTTP 200

# --- Blank title, bad pages: every failure is reported at once ----------------
POST {{host}}/api/books
Content-Type: application/json
{
  "title": "",
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
  "coverHash": "0000000000000000000000000000000000000000000000000000000000000000"
}
HTTP 422
[Asserts]
jsonpath "$.code" == "image_not_found"


# --- A rejected book does not leave its new author behind ---------------------
POST {{host}}/api/books
Content-Type: application/json
{
  "title": "",
  "author": "Never Created"
}
HTTP 400

GET {{host}}/api/authors
HTTP 200
[Asserts]
jsonpath "$.views[1].items[*].properties[0].value" not includes "Never Created"


# --- Missing required member ('title') ----------------------------------------
# A required init member absent from the JSON fails binding => 400.
POST {{host}}/api/books
Content-Type: application/json
{
  "author": "someone"
}
HTTP 400


# --- Malformed JSON -----------------------------------------------------------
POST {{host}}/api/books
Content-Type: application/json
```
{ "title": "broken",, }
```
HTTP 400
