# GET /dashboard — returns a CommandResult: an ordered list of semantic view
# nodes (DECISIONS 15), not a book collection. The backend composes the union
# from read-side counts; the card *values* are seed-dependent, so this file
# asserts the node SHAPE and the static chrome, and only checks that counts are
# well-formed (stringified integers) rather than pinning brittle exact totals.
GET {{host}}/dashboard
HTTP 200
[Asserts]
header "Content-Type" contains "application/json"

# Top-level contract: a `views` array with at least the three composed nodes.
jsonpath "$.views" isCollection
jsonpath "$.views" count >= 3

# The closed vocabulary is present. Project all discriminators into a nodeset
# and assert membership — order-independent, so recomposition can't break it.
jsonpath "$.views[*].type" contains "image"
jsonpath "$.views[*].type" contains "cardCollection"
jsonpath "$.views[*].type" contains "guidance"

# Static chrome is deterministic, so exact-match is safe here. A single-match
# filter collapses to the bare scalar in Hurl, so compare directly (no count/nth).
jsonpath "$.views[?(@.type=='image')].alt" == "ImperaBook"
jsonpath "$.views[?(@.type=='image')].variant" == "logo"
jsonpath "$.views[?(@.type=='guidance')].title" == "Getting started"

# Card collection: the three metric cards, identified by heading (order-free).
jsonpath "$.views[?(@.type=='cardCollection')].items" count == 3
jsonpath "$.views[?(@.type=='cardCollection')].items[*].heading" contains "All Books"
jsonpath "$.views[?(@.type=='cardCollection')].items[*].heading" contains "Authors"
jsonpath "$.views[?(@.type=='cardCollection')].items[*].heading" contains "Languages"

# Read-model shape, not value: a card's `value` is a stringified count
# (DashboardSummary ints rendered via ToString), so assert it parses as digits
# rather than pinning a seed-dependent total.
jsonpath "$.views[?(@.type=='cardCollection')].items[?(@.heading=='All Books')].value" matches /^[0-9]+$/

# Guidance shape: hints is always an array, and each hint's `keys` is an array.
jsonpath "$.views[?(@.type=='guidance')].hints" isCollection
jsonpath "$.views[?(@.type=='guidance')].hints[0].keys" isCollection
