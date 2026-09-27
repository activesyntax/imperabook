# GET /api/dashboard — a CommandResult: an ordered list of semantic view nodes, not a book
# collection. Card *values* are seed-dependent, so this file asserts the node SHAPE and the
# static chrome, and only checks that counts are well-formed rather than pinning totals.
# The anonymous answer is asserted in public/dashboard-public.hurl.

POST {{host}}/api/auth/login
{ "username": "john", "password": "{{password}}" }
HTTP 200


GET {{host}}/api/dashboard
HTTP 200
[Asserts]
header "Content-Type" contains "application/json"

# Top-level contract: branding, the metric cards, and the "needs attention" text.
jsonpath "$.views" isCollection
jsonpath "$.views" count == 3
jsonpath "$.views[0].type" == "image"
jsonpath "$.views[1].type" == "cardCollection"
jsonpath "$.views[2].type" == "textView"

# Static chrome is deterministic, so exact-match is safe here.
jsonpath "$.views[0].alt" == "ImperaBook"
jsonpath "$.views[0].role" == "branding"
jsonpath "$.views[0].src" == "/static/imperabook-logo-dark.svg"

# The three metric cards, identified by heading (order-free).
jsonpath "$.views[1].items" count == 3
jsonpath "$.views[1].items[*].heading" contains "All Books"
jsonpath "$.views[1].items[*].heading" contains "Pages"
jsonpath "$.views[1].items[*].heading" contains "Authors"

# A card's value is a formatted count ("1,234" with the server's group separator), so assert
# it starts with a digit and holds no letters rather than pinning a seed-dependent total.
jsonpath "$.views[1].items[?(@.heading=='All Books')].value" matches /^[0-9][^A-Za-z]*$/
jsonpath "$.views[1].items[?(@.heading=='Authors')].value" matches /^[0-9][^A-Za-z]*$/

# "Needs attention" opens with its heading and lists findings that each carry a command.
jsonpath "$.views[2].blocks[0].type" == "heading"
jsonpath "$.views[2].blocks[?(@.type=='finding')]" count > 0
jsonpath "$.views[2].blocks[?(@.type=='finding')].command" isCollection
