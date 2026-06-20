# POST /books — error paths. These map ApplicationError cases to HTTP status:
#   ApplicationError.Validation     -> 400
#   ApplicationError.LibraryNotFound -> 404

# --- Empty title fails domain validation --------------------------------------
POST {{host}}/books
Content-Type: application/json
{
  "title": "",
  "authorIds": []
}

HTTP 400


# --- Library that doesn't exist -----------------------------------------------
# Title is valid, but ResolveLocation can't find the library => LibraryNotFound.
POST {{host}}/books
Content-Type: application/json
{
  "title": "Points At Nothing",
  "authorIds": [],
  "libraryId": "99999999-9999-9999-9999-999999999999"
}

HTTP 404


# --- Missing required member ('title') ----------------------------------------
# A required init member absent from the JSON fails STJ binding => 400.
POST {{host}}/books
Content-Type: application/json
{
  "authorIds": []
}

HTTP 400


# --- Malformed JSON -----------------------------------------------------------
POST {{host}}/books
Content-Type: application/json
{ "title": "broken",, }

HTTP 400
