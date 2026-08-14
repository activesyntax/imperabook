# Architecture Decisions

This document records the load-bearing decisions behind ImperaBook, and — more
importantly — *why* each one was made and what it trades off. It is not a list of patterns
used; it is a record of where the boundaries were drawn deliberately.

Where a decision has a known weakness, that weakness is stated rather than hidden. The limit
of a technique is part of understanding it, and a decision log that only lists wins is a
brochure, not a record.

Format is lightweight ADR: each entry gives the context, the decision, and the trade-off accepted.
Entries are grouped by area — foundational, backend, and user interface — with a trailing section on
known limitations. The numbering is global and stable, so the cross-references between entries hold
regardless of which section an entry sits in.

---

# Foundational & cross-cutting

## 1. Single-language C# backend

**Context.** An earlier iteration split the backend across two languages — one for the Domain and
Application layers, C# for Infrastructure. A polyglot boundary inside a single deployable adds real
friction: a second toolchain and build target, cross-language interop at the layer seam, and value
types that have to round-trip cleanly across that seam.

**Decision.** One language across all layers: C#. The type-driven domain modeling the project is
built on is expressed in C# directly (see 2), so nothing in the design depends on a second language
being present.

**Trade-off.** Give up the native sum types and total-by-default ergonomics the other language
offered; gain a single toolchain, no interop seam, and a uniform codebase. The modeling techniques
that motivated the split are reproduced in C# at the cost of more ceremony — which is exactly the
trade Decision 2 takes on deliberately.

---

# Backend

## 2. Illegal states unrepresentable, through the type system

**Context.** Most line-of-business bugs are valid-looking objects in invalid states: an empty
title, zero authors, a book "in" a library that does not exist.

**Decision.** Constrained values are `record struct` value objects with private constructors and
smart constructors returning `Result<T, CatalogValidationError>` (e.g. `Title.Create`). Identities
are phantom-typed (`Id<TEntity>`), so `Id<Book>` and `Id<Author>` cannot be confused at compile
time. Sum types (`Attribution`, `Location`) are closed sealed-record hierarchies. "At least one
author" is encoded structurally in `Authors` — a non-optional primary plus the rest — so zero
authors cannot be constructed.

**Trade-off.** More types and more ceremony at construction time, in exchange for a domain where
the invalid case usually does not compile. Accepted deliberately; this is the project's core thesis.

---

## 3. Validation lives in the domain, not in a validation library

**Context.** The mainstream choice is FluentValidation with a validation pipeline. FluentValidation
is permissively licensed (Apache 2.0), so this was a design decision, not a licensing one.

**Decision.** Validation rules live with the type they constrain. `Title.Create` enforces
required + max length; `Title.MaxLength` is the single source of truth, reused directly in the
EF Core configuration (`HasMaxLength(Title.MaxLength)`). No FluentValidation.

**Trade-off.** Give up a widely-used, conventional validation layer. Gain a single source of truth —
no rule duplicated between a validator and a value object: there is exactly one place a title can be
wrong, and it is the title type. A parallel FluentValidation layer would duplicate the max-length
rule and split the definition of validity across two locations. FluentValidation is reserved for
cross-field request shape if the API layer ever needs it.

---

## 4. No MediatR

**Context.** MediatR is the canonical dispatch + pipeline-behavior library for this style. As of
July 2025 it moved to a dual license (RPL-1.5 reciprocal + commercial); the free tier covers
companies under $5M revenue but is reciprocal, which sits awkwardly against this project's
open-core / commercial-license framing.

**Decision.** Handlers are plain classes, injected directly and called from the composition root.
No mediator.

**Trade-off.** Lose decoupled dispatch and a ready place to hang cross-cutting behaviors. For a
single-process app with a handful of handlers, direct injection is clean, debuggable, and
dependency-free; MediatR's real payoff — pipeline behaviors — does not pay for itself yet, and the
license question removes the last reason to adopt it now. Revisitable if cross-cutting concerns
multiply.

---

## 5. CQRS naming and structure, distinctive domain kept

**Context.** The conventional Clean Architecture vocabulary (`...Command`, `...Query`,
vertical-slice folders) makes the codebase's structure predictable and navigable. The risk is
that adopting the layout also pulls in the libraries the template usually ships with by default.

**Decision.** Adopt the vocabulary and folders (`Books/Commands`, `Books/Queries`,
`...Command` / `...Query` types, `...CommandHandler` / `...QueryHandler` handlers) while keeping
the type-driven domain underneath. Parameterless or single-primitive queries do not get an empty
request record — with no mediator, boxing nothing into a request object is pure ceremony, and the
handler suffix carries the convention.

**Trade-off.** The structure itself is low-cost and conventional. The judgment is in *not* also
importing the heavyweight libraries the template usually ships with (see 3 and 4) — the layout is
adopted, the frameworks are not. The one dependency deliberately taken on, CSharpFunctionalExtensions,
is a small Result/Maybe library rather than a framework (see 6).

---

## 6. Result and Maybe come from CSharpFunctionalExtensions (after a hand-rolled detour)

**Context.** An earlier iteration hand-rolled `Result<T>` and removed its raw `.Value` / `.Error`
getters outright. The operating principle was blunt — whatever is not enforced eventually gets
forgotten, and a result whose value can be read without checking `IsOk` is exactly the check
someone skips. That bespoke type did its job, but it was a non-standard type every reader had to
learn, and a hand-maintained result/option algebra is ongoing surface to test and carry for no
behavioural gain over an established implementation.

**Decision.** Adopt CSharpFunctionalExtensions (Khorikov) for `Result<T, E>` and `Maybe<T>` across
the Domain and Application layers. It is small, permissively licensed, and scoped to exactly
Result/Maybe rather than a whole FP runtime. (LanguageExt was rejected on that basis: a much larger
surface area and major-version churn, for capabilities this project does not use.) The two-tier
error model rides on top: `Result<T, CatalogValidationError>` in the domain,
`Result<T, ApplicationError>` in the application layer.

**Trade-off — stated plainly because it reverses the prior stance.** CFE's `Result<T, E>` exposes
`.Value` and `.Error`, so the "raw getter removed" compile-time guarantee is gone. What replaces it
is weaker but honest: `.Value` *throws* `ResultFailureException` on a failed result rather than
returning garbage — runtime-loud instead of compile-time-prevented. The gated surface the
hand-rolled type enforced is still available and still preferred — `Match`, `Map`, `Bind`,
`TryGetValue` / `TryGetError` — and the convention is to use those for control flow and treat
`.Value` as the loud, deliberate escape hatch (the role `Expect("validated above")` played before),
used only where success is already established, e.g. in tests after an explicit failure assertion.
The net: a compile-time guarantee is traded for a maintained, conventional library and the removal
of a hand-rolled type from the codebase. The cost is named, not hidden — see *Known limitations*.

---

## 7. Total `Match` only where the other branch is reachable

**Context.** Forcing a branch is safer only when the branch has a meaningful handler. Forcing a
branch on an unreachable "this is a bug" case makes things worse: someone fills the bug-branch with
`() => ""` and a silent failure ships.

**Decision.** Total `Match` is the enforced read on cases where both branches are real: `Result<T, E>`
(Ok / Error), `Maybe<T>` (Some / None) for genuinely optional values, `Attribution` (Unknown /
ByAuthors), `Location` (Library / Unknown). The "never-constructed" state of a value object is not a
domain case — it is a CLR artifact meaning "bug here" — so it fails loud automatically rather than
through a forced branch.

**Trade-off.** Slight inconsistency (some reads are `Match`, some are fail-loud guards) in exchange
for not manufacturing a branch whose only correct body is `throw`. The rule: enforce a branch for
reachable cases; fail loud automatically for cases that should not exist.

---

## 8. Read models are not domain types

**Context.** Query paths that hydrate full aggregates only to flatten them for display pay for
invariants they never use.

**Decision.** `BookListItem` is a flat projection queried straight from the store, carrying
primitives (a `string` title, raw `Guid`s). It is a CQRS read model — not a boundary adapter, not a
domain type. Read handlers return arrays of these projections directly; they do not return `Result`
(see 12 for what this means for read-side error handling).

**Trade-off.** The read path carries the title as a raw string and never constructs a `Title`, so it
trusts the database rather than re-validating. For a display projection this is correct and fast; the
price is that the read side's correctness depends on the write side having validated on the way in.
Stated explicitly because it looks like an oversight if it is not named.

---

## 9. Aggregate boundaries by reference, not embedding

**Decision.** Entities within an aggregate are embedded; cross-aggregate references use `Id<TEntity>`
rather than the entity. `Book` holds `Id<Author>` and (via `Location`) `Id<Library>`, never an
`Author` or `Library` object.

**Trade-off.** Reads that need author or library *names* must project/join (handled on the read side,
see 8) rather than walking an object graph. Accepted: it keeps aggregates small and their boundaries
honest.

---

## 10. Persistence shape is Infrastructure's problem

**Decision.** The write repository takes a domain `Book`; flattening it to the mutable `BookEntity`
POCO and back is entirely an Infrastructure concern. EF Core's mutable, change-tracking model never
touches the domain.

**Forward-looking note.** When a repository rehydrates `BookEntity.Title` into a domain `Title`, it
must go through `Title.Create`. A failure there is not user input — it is data corruption or a bug —
so the correct response is to throw, not to surface a `Result` upward. (Not yet implemented; recorded
so the decision is made before the code is.)

---

## 11. Optional values are `Maybe<T>`, not nullable and not a bespoke "empty" case

**Context.** A book's subtitle and summary are optional. Three representations were on the table:
a nullable field (`Subtitle?`), a `Maybe<Subtitle>`, or a closed DU with an explicit empty case
(`Empty | Present(value)`), by analogy to how `Location` models its alternatives.

**Decision.** Optional fields are `Maybe<T>`. A blank optional input is a successful *absence*, not
an error: the smart constructor returns `Ok(None)` for blank, `Ok(Some(value))` for valid, and
`Error` only for present-but-invalid (e.g. over max length). The DU option was rejected because a
two-case `Empty | Present(value)` DU is structurally isomorphic to `Maybe<T>` — hand-rolling it per
type re-implements exactly what `Maybe` exists to provide, and forfeits `Map`, `Bind`, `Match`,
value equality, and the implicit `T → Maybe<T>` conversion in the process. The "be consistent with
`Location`" argument is a false friend: `Location.Unknown` is a *positive domain statement* whose
case set will plausibly grow (`OnLoan`, `Lost`, `InTransit`), which is what earns it a DU; an absent
subtitle is pure presence/absence and binary forever.

The governing rule: **a DU when the alternative case carries domain meaning or the case set will
grow; `Maybe` when it is pure presence/absence.** `Location` passes; `Subtitle` / `Summary` do not.

**Trade-off.** At the presentation layer, `None` renders as "absent" — empty is treated as
non-existence, via `subtitle.Match(render, () => nothing)`. The known limit: `Maybe` cannot
distinguish two *kinds* of nothing — a subtitle deliberately cleared versus one never supplied. If
that distinction ever becomes a real requirement, this is the decision to revisit with a DU; until
then, introducing it would be YAGNI. A second, smaller cost: validation that produces an optional
value returns `Result<Maybe<T>, E>`, a double wrapper that is slightly noisier to thread and unwrap
than a single `Result<T, E>` — accepted as the price of keeping absence and invalidity as distinct,
honest states.

---

## 12. One error shape at the boundary: RFC 9457 ProblemDetails

**Context.** Domain validation errors are a rich closed DU (`CatalogValidationError`:
`TitleRequired`, `TitleTooLong(max)`, …). Serialized raw to the wire, that richness is *lost* — the
default serializer writes against the declared type with no discriminator, so distinct cases collapse
to indistinguishable `{}` objects and the client cannot tell what failed. Separately, three different
failure shapes were emerging across the API (a raw validation DU, a raw not-found DU, an ad-hoc
problem), forcing the client to handle three formats.

**Decision.** Every error leaves the boundary as RFC 9457 `ProblemDetails`. Domain DUs are mapped to
a stable wire contract (`{ code, message }`) at the API layer, so the domain DU stays internal and the
external shape does not couple to the domain's internal form. The write path returns
`Result<T, ApplicationError>` and is dispatched with `Match` — success to `201 Created`, failure
through a single `ToProblem()` mapping. Unexpected failures (a downed database, an unanticipated
throw) are unified onto the same shape by `AddProblemDetails()` + `UseExceptionHandler()`, so the
hand-mapped path and the framework path produce one format.

Two deliberate sharp edges:

- **Unmapped cases throw, they do not default-swallow.** C# switch expressions do not check
  exhaustiveness over a closed DU, so a `_` arm is mandatory — but it is `throw`, not a quiet
  `Results.Problem("unhandled")`. A newly added error case that someone forgets to map then fails
  *loud* (logged, surfaced as a clean 500 via the global handler) rather than shipping as a silent,
  misleading response. Better to fail loud than to mislead the client.
- **A missing referenced resource is `422`, not `404`.** `LibraryNotFound` on `POST /books` means the
  library referenced *in the request body* does not exist — not that the addressed endpoint is
  missing. `422 Unprocessable Entity` says that precisely; `404` would invite the client to
  misread it as "no such route."

**Read-side asymmetry, stated because it looks like a gap otherwise.** Read handlers return flat lists
(see 8) and do not return `Result`; they have no *expected* domain error. A query that matches nothing
— including a non-existent `libraryId` — returns an empty collection, not an error. This is a
deliberate REST reading: a collection endpoint returns an empty collection when nothing matches and is
not responsible for asserting existence. Its known weakness: the client cannot distinguish "library
exists but is empty" from "no such library." Accepted at this stage; if that distinction comes to
matter, the affected read becomes a `404`-capable `Result` path. The firm line is that "empty list"
must always mean "no matching rows" and *never* a swallowed exception — read repositories do not
`catch` and return `[]`; unexpected failures propagate to the global handler.

**Trade-off.** A hand-written DU→wire mapper is one more thing to maintain, and it must be kept in step
with the `CatalogValidationError` cases (the loud `_ => throw` arm is what flags drift). In exchange,
the client sees exactly one error format everywhere, the domain DU's full information survives the
boundary as a stable `code`, and the domain never leaks its internal shape onto the wire. (CFE's
companion `CSharpFunctionalExtensions.HttpResults` would generate much of this `Result → ProblemDetails`
mapping; the hand-written mapper is its explicit equivalent and the swap is available if the surface
grows.)

---

# User interface

## 13. Command input: autocomplete over a closed grammar, not a lenient reverse-parser

**Context.** MVP1 is driven by a single command bar over a closed, bare-verb grammar
(`add book`, `list books`, `search`, …). Partial or mis-ordered input has to resolve to
*something*, and two strategies were on the table for *where* that resolution happens. The first:
the frontend offers autocomplete over the known command set as the user types, steering toward a
canonical verb before submission. The second: the backend accepts arbitrary token order and
reverse-parses it — `book add` reinterpreted as `add book` — tolerating whatever was typed. These
are not alternatives at the same layer. Autocomplete is a frontend affordance; reverse-parsing is a
backend parser responsibility; the load-bearing question was whether to build the second at all.

**Decision.** Autocomplete on the frontend, strict exact-match on the backend, and no reverse-parser
between them. The frontend matches typed tokens against a command registry and ranks the hits —
typing `book` surfaces `add book` / `list books` / `show book` / `remove book`, typing `add`
surfaces every `add` command (token-match, deliberately not strict prefix, so a mid-name token still
hits). The backend tokenizes, exact-matches the leading verb against the known set, and dispatches;
anything that does not match a verb falls through to full-text search — the behaviour the `search`
command already defines, with the explicit `search` verb kept only as a discoverability affordance.
No fuzzy word-order reinterpretation layer is inserted between exact-match and search.

**Trade-off — stated because "be lenient with the user" reads as the kinder default.** The
reverse-parser is rejected on three counts. It is *redundant*: the search fall-through already
absorbs every input that is not a recognized command, so a word-order interpreter would be a third
interpretation layer wedged between exact-match and search, earning its keep only on the narrow band
of inputs that are real commands typed in the wrong order. It *teaches nothing*: autocomplete moves
the user toward the canonical form so they get faster over repetition — the whole point of a
keyboard-driven tool — whereas a reverse-parser silently accepts the wrong form forever and the user
never learns the real one. And it *does not survive MVP2*: once inline parameters arrive
(`add book "The Hobbit" --author "Tolkien"`), quoted strings and flags make arbitrary token order
genuinely ambiguous, so a lenient parser that guessed word order in MVP1 becomes a liability that has
to be torn out. The cost of *not* building it is borne by autocomplete quality — a client with no
completion (a raw HTTP call, a future minimal shell) gets exact-match-or-search and no help
reordering. Accepted: the canonical grammar is small and the search fall-through is a reasonable
floor. The bare-verb ambiguity (`book` alone maps to four verbs) is resolved by the completion menu
offering all four rather than by the parser guessing one — a menu is a better answer to ambiguity
than a guess. Single-token typo tolerance (`add bok` → `add book`, a Levenshtein-of-one match, *not*
word-order tolerance) is deferred to MVP2 and largely pre-empted by autocomplete; word-order
tolerance is rejected outright rather than deferred, because it is precisely the thing that breaks
under inline parameters. One consequence to name: the command registry is the source of truth for
verbs, duplicated client-side in MVP1 for a zero round-trip on every keystroke; a `/commands`
endpoint to serve it from one place is a reversible move available if that duplication ever costs
more than it saves.

---

## 16. Backend-served command registry with a per-command execution recipe; per-resource endpoints kept

> **Superseded by ADR 18.** Once the backend owns full command interpretation (ADR 17's connective
> parsing), per-resource HTTP dispatch stops carrying meaning the backend doesn't already have from
> the `command` field itself — see ADR 18. Kept here, unedited, as the record of why per-resource
> endpoints looked right at the time and what changed.

**Context.** Two questions were open together, and answering them separately produced contradictory
designs. First: should command dispatch collapse onto a single generic endpoint (`POST
/api/commands`), or should the per-resource REST endpoints already in place (`CatalogEndpoints`,
`DashboardEndpoints`) be kept? Second: whatever the endpoint shape, how does the frontend know *which*
endpoint a command maps to and how to place each prompted field on the request — without the frontend
making any judgment call of its own? A single endpoint trivially satisfies "frontend decides nothing,"
but gives up the separately-scalable, separately-cacheable per-resource endpoints already built. A
naive `command → url` mapping keeps the endpoints but silently reintroduces frontend judgment: given
only a URL, the `CommandRunner` still has to *infer* HTTP method and where each field goes (route,
query, body) — exactly the kind of implicit interpretation the project has been trying to keep off
the frontend.

**Decision.** Keep the per-resource REST endpoints (`CatalogEndpoints`, `DashboardEndpoints`, …) as
they scale independently and follow normal ASP.NET Core routing and binding conventions (see the
binding-resolution order discussed alongside this decision — DI service, route token, query string,
or body, by parameter type and name). Retire the static `/assets/commands.json` frontend asset;
the registry is now served by the backend at `GET /api/commands`, generated from a small, hand-written
`CommandCatalog` in the API layer — not reflected from endpoint metadata, to avoid a code-generation
step for MVP1's small, slow-changing grammar.

Each entry is an exhaustive **execution recipe**, not a bare pointer:

```json
{
  "command": "add book",
  "description": "Catalog a new book",
  "method": "POST",
  "url": "/api/books",
  "parameters": [
    { "name": "title", "in": "body", "prompt": "Title", "required": true },
    { "name": "subtitle", "in": "body", "prompt": "Subtitle", "required": false },
    { "name": "authorId", "in": "body", "prompt": "Author", "required": true }
  ]
}
```

`method`, `url`, and every parameter's `in` (`route` | `query` | `body`) are explicit. The
`CommandRunner` becomes a pure template executor: look up the command, prompt for each listed
field in order, place each answer per its `in` value, send. It performs zero inference — no
"GET implies query," no "this looks like an id so it's a route token." Every placement decision was
made once, by the backend, at catalog-authoring time.

**Trade-off.** The recipe is authoritative but now a second description of each endpoint's shape,
kept in sync by hand against the actual Minimal API signature — `parameters[].name` must match the
lambda parameter name exactly (route token or query key) or binding silently fails at the C# layer
with no compile-time link between the two. This is a real, named coupling cost, accepted for MVP1's
small command set; a later reflection-based generator (deriving the catalog from `.WithName()` plus
parameter metadata) is a reversible move if the hand-maintained version drifts. Serving the registry
over the network rather than a bundled static asset also trades away aggressive browser caching for a
runtime dependency on the backend at every session start — acceptable given the dev-convenience script
already starts the full stack together, and revisitable with standard HTTP caching headers
(`Cache-Control`, `ETag`) if load ever warrants it. Two scope notes fall out of this decision rather
than being separate: the `search` command's recipe must be checked against what `SearchBooks`
(`titleContains`) actually does, since "multi-token full-text search" and a substring `Contains`
filter are not obviously the same operation; and `ListLibraryBooks`
(`/api/libraries/{libraryId:guid}/books`) has no corresponding MVP1 command — per COMMANDS.md, MVP1 is
one-library-per-user with library switching explicitly out of scope — so this endpoint should either
be dropped for now or explicitly labeled MVP2, rather than left as a route with nothing in the catalog
pointing to it.

---

## 17. Multi-field mutating commands compose one canonical, connective-tagged string; parsed once, on the backend

> **Amended by ADR 18.** The connective/order/quoting reasoning below stands unchanged. What no
> longer applies is the `route | query | body | text` location split — ADR 18 collapses everything
> to a single endpoint, so every parameter is now composed the same way and `CommandParameter.in`
> is removed rather than extended. Read "the `'text'` location" below as simply "how every parameter
> is now placed."

**Context.** ADR 16's execution recipe (`in: route | query | body`) places a single already-known
value at a single location — it has no answer for a command like `add book`, where interactive
prompting collects several fields (Title, Subtitle, Author, …) that together form one write. Two
placements were on the table: send the collected fields as a structured JSON object (`{ title,
subtitle, authorId }`, one key per field), or compose them into a single natural-language-flavoured
string (`with title "1984" by author "Jókai Mór"`) and let the backend parse it. The second option
looked, at first pass, like it reopened ADR 13 — which explicitly rejected word-order reinterpretation
outright rather than deferring it. It does not, and the distinction is the crux of this decision: ADR
13's rejected case was reordering the **verb phrase itself** (`book add` vs `add book`), which is
ambiguous because nothing marks where one token's meaning ends and the next begins. A composed
parameter string is different — each value is preceded by a **connective**, a reserved phrase
(`with title`, `by author`) declared per-parameter in the command's catalog entry, that names which
field follows. This is structurally identical to keyword/named arguments in any CLI (`--author X
--date Y`), which are conventionally order-independent precisely because the flag names the value.

**Decision.** For commands whose parameters are collected via interactive prompting, `CommandRunner`
composes the answers into a single canonical string — each answer's connective followed by its value,
always double-quoted (`with title "1984"`), regardless of whether the value actually needs quoting.
Quoting is unconditional so the frontend never makes a content-dependent judgment call about whether
*this particular* value needs escaping — that would be interpretation. The composed string is sent as
one `text` field in the request body, alongside the recipe's other placements, if any.

**MVP1 scope: fixed order, backend parses positionally.** Interactive prompting always asks in the
order declared in the command's catalog entry, so the composed string is always in that same order.
The backend parser for MVP1 matches connectives against that declared order — a `required` connective
missing, an out-of-order connective, or trailing text matching no known connective all fail loud as a
structured parse error through the existing ProblemDetails path (ADR 12), not a silent best-effort
guess. This is deliberately less general than the parser needs to be: a connective-scanning parser
(find each known connective wherever it occurs, rather than expect it at a fixed position) is not
meaningfully more code, and was considered for MVP1. It is deferred to MVP2 anyway, on schedule
grounds — MVP1 has exactly one composed-string command in scope (`add book`, per UX.md's draft-preview
section), so building generality with a single caller to validate it against is premature; the
positional parser is the smaller, sufficient thing today, with the token-scan version a known,
low-cost upgrade path once a second caller and the direct-typing power-user feature (noted in
COMMANDS.md as deferred) make the generality worth its keep.

**Model change.** `CommandParameter.in` gains a fourth location, `'text'`, alongside `route | query |
body`; a `'text'` parameter additionally carries `connective: string`. This keeps one parameter type
and one array shape for both mechanisms rather than introducing a second `CommandParameter` shape —
`search`'s single free-text query param keeps using `in: 'query'` unchanged (it has no connective; the
entire typed remainder *is* the value, which is what `search` has always meant), while multi-field
mutations use `in: 'text'` parameters. `CommandRunner` remains a mechanical executor either way: for
`route | query | body` it places a value; for `text` it appends `connective + quoted value` to the
composed string before sending. No parameter-specific branching enters `CommandRunner` beyond that.

**Trade-off.** MVP1's "no special characters" posture (COMMANDS.md) is narrowed: every prompted answer
is now wrapped in literal quote characters on the wire, even though the interactive flow never exposes
that syntax to the user directly — it only becomes visible once direct typing (power-user shortcut) is
built, at which point the same quoting rule becomes a user-facing syntax requirement, not just a wire
format. Stated because it is easy to forget the quoting exists at all while only the prompted path is
built. The other named cost: the positional MVP1 parser is throwaway work in the sense that MVP2's
token-scan parser supersedes it rather than extends it — accepted because the throwaway part is small
(a fixed-order match loop) and the single MVP1 caller doesn't justify building the general form first.

---

## 18. Single `POST /api/command` endpoint; ADR 16's per-resource dispatch superseded

> **Amended by ADR 19.** The dispatch reasoning below stands unchanged. What is restated is the
> *status* of "one endpoint": ADR 19 shows it is a consequence of uniform command dispatch, not an
> invariant in its own right, and that the claim as titled here never covered the non-command routes
> that already existed. Read "one endpoint" below as "one endpoint **for commands**."

> **Amended by ADR 24**, in two places. The request shape below describes the *commit* exchange of a
> parameterised command — those are now an open/commit pair distinguished by a `stage` field, while a
> command with no parameters remains the single exchange described here. And a command whose payload
> cannot cross the composed-text parser carries an `Endpoint` on its descriptor and posts elsewhere;
> `login` is the only MVP1 case, and the admission rule is in ADR 24.

**Context.** ADR 16 kept `CatalogEndpoints` / `DashboardEndpoints` as separate HTTP routes because,
at the time, the frontend placed each answer itself — route token, query key, or body field — so the
URL was load-bearing: it was part of how a value found its way to the right place. ADR 17 changed
what the frontend sends: every prompted answer now becomes one connective-tagged, quoted segment of a
single composed string, and the backend parses that string to recover the fields. Once the backend
already has to know, from `text` alone, which command's grammar to parse against, the URL a request
arrived on adds nothing the `command` field doesn't already say. Keeping per-resource routes at that
point is two ways of saying "this is an `add book`" — the route and the field — with no benefit from
the redundancy.

**Decision.** One endpoint, `POST /api/command`, handles every command. Request shape:

```json
{ "command": "add book", "text": "with title \"1984\" by author \"Jókai Mór\"" }
```

`text` is omitted (or empty) for zero-parameter commands (`list books`, `dashboard`). For a command
with exactly one parameter and no connective — `search` is the only MVP1 case — `text` is the raw
value as typed, unprefixed; the absence of a connective is itself the signal that the whole string is
the value, not a field within a larger composed one. The response is always a `CommandResult`, on the
same 200-or-ProblemDetails shape as every other endpoint (ADR 12) — success and failure look the same
regardless of which command ran, which was already true of `ViewNode` (ADR 8/15) and is now true of
the transport as well.

Internally, the single endpoint dispatches to per-command handlers exactly as before — `AddBookCommand`
→ its handler, `IBookQueries.List` for `list books`, and so on. What collapses is the *HTTP* surface,
not the Application-layer separation; `CatalogEndpoints.cs` and `DashboardEndpoints.cs` stop being
route registrations and become, at most, organizational groupings of handler registrations behind the
one route. The scalability ADR 16 was protecting is preserved at the service-composition layer, just
no longer expressed as distinct URLs.

**Model change.** `CommandSpec` drops `method` and `url` — there is nothing per-command left to know
at that granularity. `CommandParameter` drops `in`; every parameter is now placed the same way (ADR
17's composition), so the field that used to select a placement strategy no longer has more than one
value to select between. The "fictive endpoint, 404 flows through the existing error path" trick from
the interim (`commands.json` had `/api/todo/{command}` placeholders) is retired along with it: a
not-yet-implemented command is now a **backend-internal** condition — the single endpoint recognizes
the `command` name (it's in the catalog) but has no handler wired to it. That must fail loud with its
own explicit case, the same way ADR 12 already treats an unmapped `CatalogValidationError` case: a
named `_ => throw` arm, not a route that happens not to exist. This is a small new obligation on the
dispatcher, not a gap — worth flagging so "not implemented yet" doesn't silently regress to a generic
500 with no indication of which command was meant.

**Trade-off.** A single route means `GET`-vs-`POST` HTTP semantics (caching, idempotency, browser
back-button behaviour) no longer distinguish reads from writes at the transport level — everything is
a `POST`. For a command-bar-driven app with no browser navigation and no HTTP caching layer in front
of it, this costs little; it would matter more if ImperaBook ever grew a conventional REST surface
alongside the command endpoint, which is not currently planned. The other cost is the one already
named at ADR 16's introduction and not resolved by reverting to it now: `search`'s recipe still needs
checking against what "multi-token full-text search" is meant to do, and `ListLibraryBooks` still has
no MVP1 command — both scope notes carry forward unchanged, just detached from the endpoint file they
were originally raised against.

---

## 19. Two channels: a control channel for commands, a content channel for bytes

**Context.** ADR 18 is titled as a count — *one* endpoint — and a count is a claim about HTTP surface
area rather than about anything the design actually depends on. Book cover images forced the question:
a cover is bytes, not a command, and serving it needs a route the command endpoint cannot provide.
Under the count framing that route reads as a violation to be defended, which is the wrong shape of
argument, because the count was never what earned ADR 18. What earned it is that **the command grammar
is closed and dispatch over it is uniform** — one place where a command name resolves to a handler, one
response contract, one error shape. One endpoint is what falls out of that for commands. It is a
consequence, not a rule.

The count framing was also already inaccurate. `GET /api/commands` (ADR 16) and the static asset routes
have coexisted with the command endpoint since before ADR 18 was written; the title simply did not
account for them. A decision log that overstates its own scope forces later entries to argue for
exceptions that were never exceptions.

**Decision.** Name the two channels explicitly and let them separate.

- **Control channel** — `POST /api/command`. The closed grammar, uniform dispatch, `CommandResult`
  on success and ProblemDetails on failure (ADR 12/18). Every mutation and every view-producing read
  goes through it. Unchanged from ADR 18.
- **Content channel** — routes that move bytes: cover images now; MVP2's export utilities, bulk
  import, and the already-existing command registry and static assets alongside them. Not commands,
  not in the `CommandCatalog`, never returning a `ViewNode`.

The line between them is one test: **does the request name a command from the closed grammar?** If so,
control channel. If it moves opaque bytes whose identity a command response already established,
content channel. The binding constraint is that a content route **never introduces meaning** — it tells
the client nothing a `CommandResult` did not already say; it delivers bytes for a reference the client
was already given. That is what stops the content channel from quietly regrowing into the REST surface
ADR 18 collapsed. A content route that starts answering questions ("which books have covers?") has
crossed back into the control channel and belongs in the command grammar.

**Shape for MVP1: concrete per-type routes, not a generic blob endpoint.** A generic
`/api/content/{kind}/{ref}` was considered and rejected for now. Cache and auth semantics differ
genuinely per content type — a content-addressed cover is immutable and cacheable for a year, a
generated export is single-use and short-lived — so a generic pipeline would branch on `kind`
internally and the uniformity would be nominal. With exactly one content type in MVP1 there is nothing
to generalize *from*. The trigger to revisit is a third content type, not a second.

The same reasoning governs the addressing type, with a *different* trigger. `ContentHash` (Domain) is
a plain content address, not a phantom-typed `ContentHash<T>`, because with one content type there is
nothing to confuse it with. The moment a second arrives, an export hash and a cover hash become
mutually assignable — precisely the confusion `Id<TEntity>` exists to prevent (ADR 2) — so
phantom-typing lands on the *second* content type while the generic route waits for the third. Naming
the two triggers separately, rather than treating "more content types" as one event, keeps the cheap
change from being held hostage by the expensive one.

Covers concretely: `GET /api/covers/{hash}`, where the hash is over the bytes themselves.
Content-addressing buys `Cache-Control: immutable` with a long max-age and no invalidation problem —
different bytes are a different URL, so a replaced cover cannot be served stale. Upload is a multipart
`POST /api/covers` returning the hash; the subsequent `add book` / `update book` command carries only
that reference in its composed string (ADR 17). This is the one point where the client touches the
backend outside the command channel *before* a command runs, and it is deliberate: a JSON command body
cannot carry a file, and inlining one would put megabytes through the `text` parser (see 20).

**Trade-off.** Four costs, named.

*ADR 18's headline gets weaker.* "One endpoint" is a sharper thing to say than "one endpoint for
commands, plus a content channel." It was also overclaimed, and accuracy is the document's job — the
architectural property being protected is uniform dispatch, and that property is fully intact.

*Auth is enforced in two places.* With cookie-based sessions this is nearly free. With bearer tokens it
is not: the content channel is precisely what an `<img src>` will hit, and an image tag carries no
`Authorization` header. The realistic failure is covers returning 401 in production while every command
works — named because it is invisible in dev and obvious only in the wrong environment. Signed
short-lived URLs or a cookie fallback are the answers; the choice is deferred until an auth scheme is
actually picked. *(Picked in ADR 24: cookie sessions, which removes this failure rather than
mitigating it — a browser attaches the cookie to an `<img src>` unprompted.)*

*Orphan rows.* Upload-then-command means a cover can be uploaded and the command then cancelled or
rejected. Content-addressing makes this cheap to tolerate — a re-upload of the same file deduplicates to
the same hash — but nothing in MVP1 reclaims unreferenced covers. Accepted; a sweep job is the MVP2
answer, and the table form makes it a one-line anti-join across every referencing column rather than a
directory walk cross-referenced against the database. Recorded because "nothing ever deletes these" is otherwise invisible until a dump
gets slow.

*Storage is the database, not the filesystem.* Bytes live in a `covers` table keyed by the content
hash, alongside the BlurHash and media type, with `storage external` set on the `bytes` column because
image formats are already compressed and TOAST compression would only burn CPU on them.

```sql
create table images (
    hash       char(64)    primary key,
    bytes      bytea       not null,
    media_type text        not null,
    byte_size  int         not null,
    created_at timestamptz not null default now()
);
```

The table is `images`, not `covers`, and that is not cosmetic. Content-addressed storage is
type-agnostic — a hash identifies bytes, not a role — so author portraits and condition photos in MVP2
share this table unchanged, and an identical file referenced from two places is one row. Meaning lives on
the referencing side: `books.cover_hash` today, `authors.portrait_hash` later.

A mounted volume under a hash-fanned path was the first choice here, on the usual reasoning: `bytea`
routes large values through TOAST, inflates every dump, and streams awkwardly. That reasoning is
technically correct and was weighted wrong. It assumed a scale this application does not have — a
5,000-book library at typical cover sizes is on the order of a gigabyte, which is not where TOAST or
`sendfile` decide anything — and it ignored that a metadata table was required regardless, since
`IImageStore` must resolve a hash that *no book references yet*, which is precisely the `add book` case.
Once that table exists, the `bytes` column is nearly free: one table rather than a table *and* a volume
*and* a separate backup procedure.

The deciding argument is the shape of the failure, not the performance. With split storage the
characteristic self-hosting accident is a `pg_dump` taken without the volume, restored: the application
starts, the catalog lists, every cover is broken, and the bytes are gone. It is silent, and the design
invites it by making one of the two artifacts more obvious than the other. With `bytea` the
characteristic problem is a dump roughly twice the size and higher memory use — degradation rather than
loss, visible early, fixable later. Between a design whose failure mode is quiet data loss and one whose
failure mode is a large file, the large file wins.

*Exit condition, so this does not calcify.* Move to filesystem or object storage when dumps become
unwieldy — on the order of several gigabytes — or when MVP2's export utilities need real streaming.
`IImageStore` exists for exactly this: the swap is an Infrastructure implementation plus a background job
to move the bytes. The client holds a reference, never a storage location, so the wire contract, the
domain, and the Application layer are untouched by the change.

---

## 20. Images travel as URLs the backend serves; a book holds a content address, not bytes

**Context.** The `ViewNode` image node carries its source as a bare `src` string, which was flagged as a
soft spot: a path travelling on a contract whose premise is that the backend declares what a node **is**
and the frontend decides how it looks (ADR 15). Covers made the question urgent, since they would put a
second meaning into the same field.

The first answer drafted here was a closed `ImageSource` union — `AssetImage(Name)` for images shipped
with the frontend, `CoverImage(Hash, Blurhash)` for stored ones — with the frontend resolving each case
to a URL. **That answer was withdrawn, and the reason is worth more than the entry it replaced.** The
diagnosis was wrong. The problem was never that *a path* crossed the wire; it was that a **frontend**
path did — the backend was describing the directory layout of someone else's build artifact. The union
did not remove that dependency, it relocated it into a name-to-path lookup table maintained on the
client, which is the same coupling with an extra indirection and a second place to drift. It also broke
the thinner rule the whole system rests on: the client renders what it is told and knows nothing. A
client holding a private registry of asset names knows something.

**Decision.** One mechanism, no cases. The backend serves the bytes for every image it references, so
every image is a URL and the client does not need to know what kind of image it is holding.

```csharp
public sealed record ImageView(string Src, string Alt, string? Caption, string? Variant) : ViewNode;

public sealed record ItemView(
    string Ref,
    IReadOnlyList<ItemProperty> Properties,
    string? ImageSrc = null
);
```

A cover is `/api/images/{hash}`; the logo is `/static/imperabook-logo-dark.svg`. The client cannot tell
them apart and has no reason to. `Src` stays a string and stops being a soft spot in the same move,
because the path is now the backend's own fact about its own routes rather than a claim about the
frontend's filesystem.

**Frontend assets are served by the backend** from `wwwroot`, mapped to the `/static` prefix rather than
`/assets`, because the Angular dev server owns `/assets` for its own bundle and a shared prefix would
force the proxy to choose between them. They are *not* rows in the image table. The temptation to unify
is real — one store, one route, one mechanism — and it is a trap: the sweep job that reclaims
unreferenced images (ADR 19) would delete the logo, because no book references it. That is not
hypothetical, it is a specific silent bug scheduled for the day the sweep gets written. Different
lifetimes deserve different homes.

**The store is type-agnostic; meaning lives on the referencing row.** `IImageStore` is addressed by
content hash and knows nothing about covers. Author portraits and condition photos land in MVP2 and will
share it unchanged — a hash identifies bytes, not a role, so `books.cover_hash` and a future
`authors.portrait_hash` are two references into one store rather than two stores. Identical bytes
uploaded twice deduplicate to one row by definition. The port is three methods, and the split is
deliberate: `Exists` for write commands that must not accept an unresolvable reference, `OpenRead` for
the content-channel endpoint that needs the bytes, `Store` for uploads. Collapsing the first two would
make every reference check drag a multi-megabyte `byte[]` through TOAST to answer a yes/no question.

**A book holds `Maybe<ContentHash>`, and nothing more.** The domain's entire statement is *whether this
book has cover artwork and at what address*. There is no `Cover` or `ImageRef` wrapper: a one-field
record over an already-validated value object adds a name and no guarantee, which is the same ceremony
the `Result`-that-cannot-fail argument rejects elsewhere. `ContentHash` carries the format — 64
lowercase hex characters, case canonicalized on the way in because the canonical form *is* the cache key
in the URL — and the **field name** carries the meaning: `Book.Cover`, later `Author.Portrait`. The type
does not claim knowledge it cannot check. Phantom-typing (`ContentHash<Image>` in the style of
`Id<TEntity>`) is the honest way to make the type itself discriminate, and ADR 19 already fixes when that
becomes worth it: the second content type, not before.

The optionality follows ADR 11's rule — a cover is pure presence/absence, the case set is binary and
will stay binary, so `Maybe<ContentHash>` rather than a DU with an explicit `NoCover` case. The read
path does not construct value objects at all: `BookQueries` projects the stored string straight into
`BookListItem`, and `BookViews` builds the URL from it (ADR 8/15). Rehydrating a value object per row
only to decompose it one layer up would be pure loss — the address is a write-side invariant, and reads
sit on rows that already satisfied it.

**BlurHash was designed in and then removed, before it shipped.** The plan was to carry a
~30-character BlurHash beside every cover so the client could paint a blurred placeholder during load,
delivering UX.md's "soft, skeletal cover frame" for free. It was built — a value object with structural
validation, a `Cover` composite pairing it with the hash, a check constraint keeping the pair complete,
an encoder port, a SkiaSharp implementation of the DCT. Then the value was weighed against the cost and
it lost.

The value is real only when the image arrives *slowly*: mobile networks, distant CDNs, large photographs.
A cover here is a few dozen kilobytes from the same machine, served `immutable`, which makes the gap the
BlurHash fills approximately nonexistent. And the placeholder UX.md actually describes belongs to the
draft preview, where there is no image yet — a CSS treatment, not a decoded bitmap. Against that: an
imaging dependency whose licence had to be audited against the project's own dual-licensing promise, a
hand-written DCT, a second column on two tables, a check constraint existing solely to keep a pair
together, and an `Undecodable` failure mode capable of closing the whole upload path.

Removing it collapsed more than it removed. The pair became a single value, so the check constraint
became meaningless; `Cover` became a one-field wrapper, so it disappeared into `ContentHash`; the
store's `Find` — justified by "existence and BlurHash are one question" — became `Exists`, which is the
shape `ILibraryRepository` already used. Four simplifications from one deletion is the signal that the
feature was carrying the complexity, not the domain.

*The door stays open.* If MVP2's condition photos — genuinely large, genuinely slow — want progressive
placeholders, a BlurHash returns as one nullable column on the image table plus a backfill job. The
`books` table is not touched, because a book only ever knew the address.

**Base64 in the `ViewNode`, rejected.** Its advantages are real and worth stating: one round trip, no
second loading phase, no flash of empty covers, auth solved by the command channel's own auth, and an
export that is genuinely self-contained — one JSON file *is* the whole catalog. It nonetheless fails on
the primary surface. Base64 inflates by roughly a third, but the decisive costs are that it defeats HTTP
caching entirely (the same cover re-transmits on every `list books`) and admits no lazy loading (the
whole payload parses synchronously before anything renders). A fifty-row `list books` at typical cover
sizes is a 3.5–10 MB response parsed in one blocking step, of which perhaps eight rows are on screen. It
also forecloses `srcset` and format negotiation. A technique that is worst exactly where the application
is used most is not a trade-off, it is a defect.

**Trade-off.** *A load failure is outside ADR 12's unified error shape.* A broken image is an `onerror`
event, not a ProblemDetails — the one client-visible failure mode that does not arrive through the
single error channel. The frontend needs an explicit fallback render for it, and without a BlurHash that
fallback is a CSS treatment rather than a preview of the actual image.

*An item without artwork sends no image, not a placeholder one.* An earlier sketch had `BookViews` map an
absent cover to a placeholder asset. That is backwards: a book with no cover is not a book whose cover is
a placeholder graphic, and what an empty slot should look like is exactly the class of question ADR 15
assigns to the frontend. `ImageSrc` is `null` for the absent case; the frontend decides whether that
reads as a skeletal frame, a typographic fallback, or nothing, and can change that decision without a
wire change.

*Serving SVG as bytes costs stylability.* The logo previously shipped in the frontend bundle, where CSS
could reach into it — `currentColor`, theme-driven fills. Served from `/static` it is an opaque image,
and the `-dark` in its name makes theme selection a backend decision, which is the wrong side of the
line. It does not hurt today because no light theme exists, and pre-solving an absent requirement is its
own mistake. But this is the real price of the thin-client rule at this point, and it is paid, not
avoided. Recorded under *Known limitations*.

*Export self-containment is genuinely harder.* This is the strongest thing base64 had, and giving it up
has a cost that lands in MVP2: exporting a catalog means bundling blobs alongside the JSON rather than
shipping one file. Named rather than waved off — the export utilities in the README will have to solve
it, and the answer is an archive, not a document.

*The domain trusts a reference it cannot verify; the Application layer verifies it instead.* A
`ContentHash` validates the *shape* of an address, never the existence of what it addresses, and it
should not — cross-checking storage from the pure core would put I/O in the domain. The check belongs one
layer out, and that is where it lives: `AddBookCommandHandler` splits cover handling in two, with
`ParseCoverHash` accumulating a malformed address alongside a bad title, and `ResolveCover` calling
`IImageStore.Exists` to turn an unknown address into `ApplicationError.ImageNotFound` — the same
distinction `ResolveLocation` draws between a malformed and an unknown library id. Two consequences stay
open. Resolution proves the row existed *at write time*; nothing prevents later loss, so a stale
reference still surfaces as a broken image. And the write path short-circuits on the first lookup failure
rather than accumulating, so a bad library id masks a bad cover hash — inconsistent with field
validation, accepted because lookups are sequential I/O and the accumulating alternative costs a round
trip to report a second error the caller will hit anyway.

*Uploads are buffered in memory, twice over.* `Store` copies the upload into a `byte[]` to hash it, and
`OpenRead` materializes the whole image to serve it. Both are bounded by the configured `MaxBytes`, so
this is a known ceiling rather than an open one, and the limit is enforced against bytes actually read
rather than a `Content-Length` the client controls. True streaming needs `NpgsqlDataReader.GetStream` and
raw ADO on the read side; deferred until it measurably matters. The concurrent-upload race — two callers
storing identical bytes, one losing on the primary key — is caught and swallowed only when the address
turns out to exist, and the failed entry is detached, because a scoped `DbContext` would otherwise retry
the same doomed insert in whatever code ran next.

---

## 21. A collection view describes itself: title, emptiness, and extent are backend facts

**Context.** `ItemCollectionView` carried a list of items and nothing else. That was enough while the
only producer was `list books`, and it stopped being enough the moment a second one existed: a search
result and a full listing arrive at the frontend as the same node, and the component rendering them has
no way to tell which is which. It cannot label the view, it cannot say anything useful when the list is
empty, and it cannot indicate that more results exist beyond the ones it holds.

Every workaround for that pushes knowledge into the client that the client does not have. Hardcoding
"All books" in the component is wrong for a search. Inferring "no matches" from an empty array is wrong
for an untouched library. Guessing at more-results-exist from a full page is a heuristic that breaks on
a set of exactly thirty. In each case the frontend would be reconstructing the question from the answer
— and the question is precisely what the backend already knows and the frontend never sees.

**Decision.** The node states three things about itself, alongside its items.

```csharp
public sealed record PageInfo(int From, int To, int Total);

public sealed record ItemCollectionView(
    string Title,
    string EmptyMessage,
    IReadOnlyList<ItemView> Items,
    PageInfo? Page = null
) : ViewNode;
```

*What this set is.* `Title` — "All books", "Results for \"orwell\"", "Books by George Orwell". Required.

*What it means that it is empty.* `EmptyMessage` — "No books yet. Add one to start your library." for an
unfilled catalog, "No books match that search." for a query that found nothing. Required, and distinct
from `Title` because emptiness is not the absence of a fact but a fact of its own: the two situations
above are unrelated, and a component holding one generic string can only ever report one of them
correctly.

*How much of the result set is on screen.* `Page` — `1–30 of 248`, 1-based and inclusive because that is
how a person reads a range, with the arithmetic done server-side so every client shows the same numbers.
Optional, and this is the one place optionality carries meaning rather than convenience: **absent means
the entire result set is already visible.** The frontend hides the range and the paging affordance
outright rather than rendering a disabled control that invites a press going nowhere.

`Title` and `EmptyMessage` are non-optional deliberately. A new dispatch branch cannot compile without
saying what it shows and what its emptiness means, which is the same enforcement argument that removed
the raw `.Value` getters from `Result` (ADR 6): an untitled view or a stray "No items" is exactly the
kind of defect that ships because nobody notices it is missing.

**This is copy, not markup, and the boundary is narrow.** ADR 15 gives the backend the logical shape and
the frontend the rendering, and these fields sit close to that line. They stay on the right side of it
because each states a *fact about the result set* — what it is, why it is empty, how much of it there is
— and none states how to present that fact. The frontend still decides that an empty view is centred and
muted, that the range is set in tabular figures beside the heading, that a title is an `h2`. The line
would be crossed by an `EmptyMessage` reading "Type `add book` to get started" with keyboard markup in
it, or by a `Title` carrying a colour or an icon name. Plain sentences describing the situation are
fine; instructions about the interface are not.

**Trade-off.** *Copy now lives in the API layer.* Localisation, when it comes, has to reach the
dispatcher rather than a frontend string table — and the dispatcher is C#, where the i18n story is worse
than Angular's. The alternative was a message *code* the frontend resolves, which keeps copy client-side
at the cost of a shared enum that both ends must agree on, drifting silently when one side adds a case.
Plain strings are the right trade while the product ships in one language; the moment a second is
required, this entry is where to start, and the answer is likely codes plus a frontend catalogue.

*A generic component now depends on its producers being disciplined.* `ItemCollectionView` renders
whatever title it is handed, so a careless dispatch branch can label a search "All books" and nothing
catches it. Requiring the field prevents omission, not error. The check is review and the endpoint
tests, not the type system — and pretending otherwise would mean modelling titles as a closed set, which
buys nothing against the one search title that is inherently open.

*Three cross-cutting changes to the union landed together.* `ImageSrc` (ADR 20), the title and empty
message, and `PageInfo` are one wire break rather than three. `PageInfo` in particular is contract
without implementation: nothing sends a non-null value yet, because paging itself is not built
(`COMMANDS.md`, *Three kinds of movement*). Shipping the shape ahead of the behaviour is normally the
mistake this document argues against — the justification here is narrow and worth stating plainly: the
paging *model* is already decided and written down, the frontend break is already being paid for, and a
second break to add three integers would cost more than carrying a nullable field that renders nothing.
If paging is still unimplemented several milestones from now, that is the signal this was speculation
after all.

---

## 22. Pinned commands: one visual language for everything runnable

**Context.** The shell had grown chrome around the command bar — a settings button, a help
button, a user avatar block — each a control that looked like an ordinary web application
affordance. That is a second interaction language sitting next to the first, and it contradicts
the premise the whole product rests on: *everything is a command*. A user who learns the command
bar still has to learn, separately, that the gear icon is a button and does something the grammar
cannot express. Two languages is one more than the thesis allows.

**Decision.** Anything runnable renders in one form, and that form means "this is a command."

Two placements, differing only in lifetime:

- **Suggestion row**, above the command bar — the ranked output of ADR 13's matcher. Transient:
  it changes on every keystroke.
- **Pinned rail**, right-hand column — the same form, persistent. Always available regardless of
  what is typed or on screen.

The form is a pill carrying the command name in mono. Pinned entries additionally carry an icon;
that is the only visual difference, and it encodes *permanence*, not a different kind of thing.
The name is always present, in both places, because the name is what the user has to learn — an
icon-only rail is a row of mute buttons that teaches nothing, which is the same objection ADR 13
raises against the reverse-parser.

*Admission rule for the rail.* A command is pinnable when it is **in the closed grammar, takes no
parameters, and is not context-gated.** That admits `dashboard`, `help`, `settings`, `clear`. It
excludes `add book` (a prompt sequence — it belongs in the suggestion row), the navigation
commands (gated on an active view, per COMMANDS.md), and `search` (parameterised). The rule is
written down because an underfilled rail is exactly the thing that quietly becomes a junk drawer.

*Activation types, it does not execute silently.* Selecting a pinned command writes it into the
command bar and runs it from there; focus returns to the bar immediately. A silent click would
accept forever that the user never learns the command's name, which is ADR 13's teaching argument
applied to a different surface.

*The avatar is not a pinned command.* It is state, not a verb — in MVP1 it renders a name and a
constant "Personal Library" string, and it does nothing. It sits below a divider, without the pill
form, as a gate; the popover it opens holds `account` and `logout` as real pills. The distinction
is load-bearing: pill means runnable, and an element that is merely true must not wear it.

*Logged out is a different view, not a variant.* Without a session most of the rail is meaningless.
The pinned set collapses and the avatar slot becomes `login` / `register`. Recorded so it is not
discovered as a styling problem later.

*Icon and pin membership are frontend facts.* The rail holds command *names* and resolves each
label from the registry (ADR 16); a name that fails to resolve drops out of the rail rather than
rendering. The `CommandCatalog` stays free of presentation.

**Forward note — the suggestion row is backend-driven and contextual.** The row is not only a
prefix matcher over what is typed. After a command runs, the backend knows the context the user
has landed in and returns the commands that make sense next, carried on the `CommandResult`. That
changes the suggestion row from a frontend ranking of a static registry into backend-supplied
output, and it has consequences for the wire contract, for ADR 13's client-side registry
duplication, and for what the row shows on an empty input at session start. Not designed here;
recorded so the rail decision is not read as implying a purely local suggestion model.

**Trade-off.** *A permanent column costs the workspace roughly 160px.* The carousel (UX.md) gives
it up for the whole session, in exchange for command affordances that never move. Reclaimable by
collapsing the rail to icons on narrow viewports — at the cost, on those viewports only, of the
naming argument above.

*The first-use observation in `TESZTELES-1.md` is spent.* "Does a new user discover `help` on their
own?" cannot be asked of an interface that displays `help` permanently. The replacement question is
better but different: after several minutes, does the user reach for the rail or type the command?
Sustained rail use is the signal that the teaching is failing.

*The client holds a small piece of knowledge.* Which commands are pinned, and which icon each
carries, live in the frontend — a client that "knows something", which ADR 20 withdrew an entire
design for. The boundary held here is that this knowledge is about the client's own chrome, not
about backend facts, which is the frontend half of ADR 15. It is a near-miss rather than a clean
case, and stated as one.

*The "pinned" label promises configurability that does not exist.* MVP1's set is fixed. The word is
kept because user-pinnable commands are the obvious extension and the label costs nothing to honour
later; if that never ships, the label is a small lie and should be dropped rather than explained.

---

## 23. The dashboard names what is missing; the field is part of the command name

**Context.** The dashboard opened on three counts — books, authors, languages — and nothing else.
A count is a scoreboard: it is read once, it produces no next step, and the panel below it stayed
empty because there was nothing else the view knew how to say. The question was not what would fill
the space but what a cataloguing tool actually knows that its user wants. The answer is the
inverse of the counts: not what the library holds, but which records are unfinished. That is a
to-do list derived entirely from columns that already exist, and every line of it is a reason to
run a command.

Three things had to be decided together, because each one constrains the next: what the panel says,
how a stated fact becomes a runnable command, and how the command expresses *which* gap it lists.

**Decision.** A `Needs attention` panel, rendered as a `TextView`, whose rows are a new block type,
and whose commands carry the field in the command *name* rather than as a parameter.

*Findings are a block, not a paragraph followed by a command.* The first attempt paired a
`Paragraph` with a sibling `CommandBlock` and relied on array order to associate them. It rendered
as two stacked full-width elements with no visible relationship, and — the deeper problem — the
association existed only as an ordering convention the type system did not carry. `Finding` makes
the unit a single node:

```csharp
public sealed record Finding(string Value, string Text, string Command) : TextBlock;
public sealed record CommandBlock(string Command) : TextBlock;
```

`Value` is separate from `Text` rather than embedded in it as a `Strong` run, because a column of
right-aligned numbers is only possible if the number is its own fact. That is the whole reason the
row form beat a card grid: four findings compared vertically are scannable, four cards are a second
grid competing with the metric cards above.

*The field belongs in the command name.* `list incomplete books having no isbn` — not
`list incomplete books` with a `field` parameter. The variants share a prefix, so ADR 13's
token-match groups rather than scatters them: `incomplete` surfaces all five, `isbn` surfaces
exactly one, and typing the bare command puts it first with the narrowings beneath it. That is the
completion menu ADR 13 prescribes in place of a guess.

What this removes is larger than it looks. The command takes no parameter, so it has no connective,
no quoted value, no positional parse — **ADR 17 does not reach it at all.** `Finding` and
`CommandBlock` therefore carry a command name and nothing else; the pre-composed `text` field both
were first drafted with had no MVP1 caller and was deleted rather than kept for symmetry. Four
things collapsing out of one choice is the same signal ADR 20 read when BlurHash was removed.

*`CommandBlock` is a one-field record and stays one.* Elsewhere this document rejects single-field
wrappers as a name without a guarantee. The exception holds because the field is not what the type
is for: the discriminator *is* the content — this string is runnable — and that is a fact no bare
string carries.

*The whole row is the button.* One focusable element per finding rather than three, and a target
large enough to hit. The command name renders in mono at the end of the row and is the row's only
label; an added "Show these" caption was drafted and cut as pure repetition. Displaying the name is
not a concession — it is ADR 13's teaching argument, and it is the *only* teaching available here,
because the button cannot be reached by keyboard at all: `Tab` in the command bar accepts the
highlighted suggestion (COMMANDS.md), so tab order never leaves the bar. The mouse runs it; the
keyboard user reads it and types it, with autocomplete closing the distance. The limitation and the
pedagogy coincide.

**Trade-off.** *The list can never reach zero, and that is a design fault with a partial fix.* A
book printed in 1932 has no ISBN — the field is not missing, it does not exist. Under the naive
query those books sit in the list permanently, and a to-do list that cannot be emptied stops being
read within weeks, taking the working signals down with it. MVP1's mitigation is one clause: the
ISBN finding excludes publication years before 1970. The real answer is a per-book, per-field
dismissal (`mark as done` or similar), which is a genuine domain addition — deferred, and named
here so the mitigation is not mistaken for the solution. This is also the first place ADR 11's
stated limit bites in practice: `Maybe` cannot distinguish a field deliberately left empty from one
never supplied, and that distinction is exactly what a dismissal needs.

*The name-as-field form does not generalise, in two directions.* It cannot express conjunction —
"no ISBN **and** no cover" — and never will, because the combinations multiply while command names
do not. And it only works over a **closed** set: `isbn`, `cover`, `year` are fixed by the schema,
whereas `language hungarian` is an open value and must stay a parameter. Both limits are structural
rather than scale-related, so the trigger to revisit is a requirement for combination, not a
growing field count. If the field list passes roughly six, the menu becomes the problem instead.

*A longer command name is not a lenient parser.* `having no` is a function word in a grammar that
was otherwise verb-plus-noun. The backend still exact-matches a closed set and analyses nothing —
ADR 13 rejected reinterpretation, not multi-word names. Stated because a later reader will
otherwise see a contradiction.

*Copy continues to accumulate in the API layer.* Every finding's sentence is a backend string, on
the trajectory ADR 21 already flagged for localisation. This entry roughly doubles the amount of
prose living in C#.

*`Finding.Value` is a string.* Formatting — thousands separators, eventual localisation — stays
server-side, consistent with ADR 21 computing `PageInfo` there. The cost is that nothing prevents a
sentence being put in a field meant for a number.

*A finding does not know it is in a list.* Group boundaries are inferred by CSS adjacency, which is
the same ordering-convention weakness `Finding` was introduced to fix, displaced one level up. It
does not matter at four rows. If the panel grows subheadings, a block carrying an array of findings
is the fix.

---

## 24. Cookie sessions over ASP.NET Core Identity; `login` is in the grammar but off the control channel

> **Extended by ADR 26.** Everything below stands. What it left unsaid is what an `Endpoint` route
> *returns* — this entry settles the transport and treats the response as unremarkable, and ADR 26
> shows it is not: a private route owes the control channel's response contract, and the `Endpoint`
> field's semantics are only complete with the two read together.

**Context.** ADR 19 named this and deferred it. Splitting the HTTP surface into a control channel and
a content channel means auth is enforced in two places, and the content channel is precisely what an
`<img src>` hits — a tag that carries no `Authorization` header. The entry recorded the realistic
failure (covers returning 401 in production while every command works), listed signed URLs or a
cookie fallback as the answers, and left the scheme unpicked. Covers now exist, so the deferral is
due.

A second question arrived with it, and the two only resolve together. `login` is a verb the user
types before anything else works. If it is not a command, then the first thing a new user meets in a
product whose thesis is *everything is a command* is not one — the same objection ADR 22 raises
against a gear icon, at the front door rather than in the chrome. But it cannot be an ordinary
command either: a password would have to travel as a connective-tagged segment of the composed
`text` string (ADR 17), which is logged, unmasked, and parsed by a grammar with no escape rules.

**Decision.** Cookie authentication over ASP.NET Core Identity, and `login` stays in the grammar
while leaving the control channel.

*The scheme.* ASP.NET Core Identity on EF Core with `IdentityUser<Guid>` — `Guid` because every
other identity in the system is one (ADR 2), and an Identity default of `string` keys would be the
only place a user id did not look like an id. Sessions are cookies encrypted by Data Protection,
`HttpOnly` and `SameSite`. `POST /api/command` is default-deny.

The content channel then needs no separate mechanism at all: the browser attaches the cookie to an
`<img src>` exactly as it does to a `fetch`, so `GET /api/images/{hash}` is authenticated by the
same act that authenticated the command that produced its URL. The failure ADR 19 predicted is not
mitigated, it is structurally absent.

*JWT was evaluated and rejected*, on the same two facts. A bearer token cannot ride an image
request, so a token scheme needs signed short-lived URLs or a cookie fallback for the content
channel — which means adopting a cookie anyway, plus a second mechanism beside it. And `logout`
under a bearer token is fictional: the token stays valid until it expires unless a server-side
blacklist exists, and a blacklist is a session store, which is what a cookie already has. A scheme
whose selling point is statelessness stops being stateless the moment logout has to mean something.

*`login` is in the `CommandCatalog`; `CommandDescriptor` gains an optional `Endpoint`.* Present
means this command's transport is its own route; absent means the control channel. That field is the
**only** branching point. Catalog membership, ranking (ADR 13), the prompting mechanism, `help`, and
the pinned rail (ADR 22) are all unchanged and unaware — `login` autocompletes, is described, and is
prompted for exactly like `add book`. What differs is the URL its answers are posted to, and nothing
else.

This is the transport-layer form of the same sentence the shell obeys internally: **a command never
carries a secret.** The grammar is closed and `login` is in it; the composed-text channel is
unsuitable for one field of one command, so that command posts elsewhere.

*Prompting is unified by an open/commit round trip.* A command that takes parameters is two
exchanges rather than one: `stage: "open"` returns the prompt plan the shell walks, `stage: "commit"`
sends the collected answers. A command with no parameters (`list books`, `dashboard`) has nothing to
prompt for and stays a single exchange. Uniformity is the point within the parameterised set — the
shell has one prompting flow, and `login` is not a special case within it. This amends ADR 18's
single-shot `{ command, text }` request shape, which described the commit exchange only.

*`logout` and `whoami` are ordinary commands* on the control channel, because neither carries a
secret. `login` is the only MVP1 command with an `Endpoint`.

**Trade-off.** *Cookies reintroduce CSRF, which a bearer token would not have.* A cookie is attached
by the browser whether or not the application asked, so `POST /api/command` — one endpoint that
performs every mutation in the system — is a cross-site forgery target by construction. `SameSite`
plus antiforgery tokens is the answer and it is real work that the rejected alternative did not
need. Named because "cookies are simpler" is only true up to this line.

*The session is bound to a browser.* The README's MVP2 mobile companion is a separate client that
will not share a cookie jar with the desktop app, so a token path is coming whether or not it is
designed now. The honest statement is that this decision picks the scheme for the web client and
defers the second client's, rather than picking one scheme for the product.

*`Endpoint` is an escape hatch, and escape hatches accumulate.* Nothing in the type prevents a
second, third, fourth command from taking a private route for a reason that seemed good at the time,
and at that point the control channel is a convention rather than an architecture. The admission
rule is narrow and written down for the same reason ADR 22 writes down the rail's: **`Endpoint` is
admissible only when the payload cannot cross the composed-text parser.** Today that means secrets
and nothing else. A third distinct reason appearing is not a reason to widen the rule — it is the
signal that the control channel is under-specified and ADR 18 needs revisiting.

*Logout is honest but revocation is not.* Clearing the cookie genuinely ends the session for the
client that ran the command, which is more than a bearer token offers. A cookie already stolen stays
valid until it expires; MVP1 has no server-side revocation list. Sliding expiry shortens the window
and does not close it. Recorded because the JWT critique above cuts partly the same way, and
pretending otherwise would be scoring a point rather than making a decision.

*Identity brings a schema much larger than the product uses.* Roles, claims, external logins,
two-factor and lockout tables ship for an application whose MVP1 has one library per user and no
roles. Accepted: it is mainstream, audited, and correct on the parts that matter — password hashing
and the token lifecycle are exactly the things not to hand-roll. The cost is a dump full of empty
tables and a reader who has to be told they are unused.

---

## 25. Credential steps swap the input element; the command bar is never a credential field

**Context.** The login flow (ADR 24) prompts like any other command, which means it reuses the
shell's single stable input — one element serving command entry and parameter prompting, with no
child component per mode. The password step switched that element's `type` to `password`.

The symptom arrived later and looked unrelated. Pressing `↑` / `↓` in the command bar — plain
scrolling, no login in sight — opened Chrome's *Manage Passwords* dropdown over the workspace.

The diagnosis matters more than the fix, because the obvious reading is wrong. The problem is not
that the credential and the command *share* an element. It is that the element **was once
`type="password"`**. Chrome's password manager keys on a field signature — name, id, type, and the
field's neighbours in the parsed document — and the presence of a password input is what registers
that signature against the origin. Once registered, the same element is a credential field in every
subsequent mode, and `↓` on a credential field is the native gesture that opens the saved-entry
list. Nothing in the shell's own state machine is involved; the shell is in command mode and the
browser is not.

**Decision.** The command bar input is never a credential field, of any kind. Credential steps
render **a different element**, mounted for the step and unmounted on exit.

- The command bar input carries `name="ib-command"`, is always `type="text"`, and is never
  `type="password"` and never a username field.
- `login`'s username and password steps each render a dedicated input, in the same position, with
  the same styling and the same keydown binding into `shell-keymap`. The user sees the command bar;
  the browser sees a different element.
- The two are **never co-resident in the DOM.** Structural `@if`, not `hidden`, not
  `display: none`, not `visibility: hidden` — Chrome parses hidden fields and pairs them, so a
  command input left mounted beside a password input is exactly the username/password pair this
  entry exists to prevent. For the same reason the command input has no leave animation: its
  removal from the tree must be immediate, and there is nothing to animate anyway, since the
  replacement draws in the same place.

*The username step is included deliberately.* Chrome's multi-step sign-in heuristic can associate a
text field in one step with a password field in the next, which would mark the command bar as a
username field even if it never held the password. The rule is therefore stated over credentials
rather than over secrets: **no credential of any kind is entered into the command bar element.**

*This extends ADR 24's principle rather than qualifying it.* "A command never carries a secret" is a
statement about transport — the composed-text channel is logged and unmasked, so `login` posts to
its own endpoint. The same sentence now holds one layer lower: the command bar element never *holds*
a secret either. Transport and DOM are the two places a credential could leak into the command
surface, and the boundary is drawn identically in both.

*The focus invariant moves from the element to the shell.* Every surface in the app preserves
command-bar focus (the pinned rail does it with `mousedown` + `preventDefault`, ADR 22). That
invariant was implicitly held by the input never unmounting. It is now held explicitly: on each
credential step the newly mounted input takes focus in the same change-detection pass that mounts
it.

**Rejected alternatives.**

*Suppress the arrow key. Already in place, and observably insufficient.* This is the first thing
anyone proposes, and the codebase had done it before the bug was noticed: the workspace's global
keydown listener maps `↑` / `↓` to viewport scrolling (COMMANDS.md, *Three kinds of movement*) and
cancels the event. The dropdown opened anyway. Chrome's autofill surface is not driven by the DOM
event a page can cancel — on a field it considers a credential field it opens on focus and on click
as well as on the arrow key, so cancelling the keystroke removes one trigger out of several.
Recorded because it is the obvious move, it was already made, and the symptom survived it. The
field's credential status is the only lever; the element swap is not one mitigation among several
but the whole fix.

*Mask in userland: keep one element, intercept `beforeinput`, hold the real value in a signal and
render `•` characters.* This was the first answer drafted here and it is the wrong trade. It solves
a DOM-level problem by giving up native text editing — no caret positioning inside the buffer, no
selection, no mid-string insertion — and it takes the IME and soft-keyboard paths off the supported
route for a field where a typo is invisible. It also removes password-manager support outright,
since there is no password field for a manager to fill. Paying in editing behaviour for something an
element swap solves for free is backwards.

*`-webkit-text-security: disc` on a text input.* Cheaper, and native editing survives — but the real
password sits in the DOM `value` of a field the browser does not know is sensitive, reachable by any
extension and eligible for form history. Weaker guarantee, same user-facing result, and the field
signature still has something to catch on. Kept only as a fallback if the element swap turns out to
be unworkable somewhere.

*A hidden, off-screen `type="password"` mirror, so password managers still work.* This reintroduces
precisely the trigger. Chrome does not require the field to be visible to register it.

**Trade-off.** *The single stable input is no longer literally single.* Its accurate form is: one
stable input for command and parameter modes, dedicated elements for credential steps. The boundary
that was previously drawn on input *shape* — a child component returns when a step needs something
other than single-line text — now has a second, unrelated clause on *browser trust*. Two rules
governing one decision is worse than one, and it is stated rather than smoothed over: the second
clause exists because a browser heuristic we do not control reads the DOM, and no amount of internal
consistency removes it.

*A one-frame focus gap.* Between unmount and mount the active element is `<body>`, and a keystroke
landing in that frame is lost. Narrow, but real, and it did not exist while the element was
permanent.

*Multi-step credential saving is not deterministic.* Because the username and password fields are
never in the DOM together, Chrome's save prompt will sometimes capture the password without the
username. Chrome supports multi-step sign-in flows, but by heuristic. This is the item worth
watching in testing — not the absence of the dropdown, which is easy to verify, but whether a
manager can still save and refill a login.

*Verified against one browser.* The behaviour described is Chrome's. Firefox and Safari use
different heuristics and are untested here. The decision is defensible against all three in
principle — none of them can register a field that never had the type — but only one was observed.

*Existing profiles keep the association.* The saved entry persists after the fix; clearing it is a
manual step in the browser, not something the application can do. Recorded because the first attempt
to verify the fix will otherwise appear to fail.

---

## 26. A command's response is the next view; the error shape carries one too

**Context.** ADR 24 put `login` in the grammar and gave it a private route. What it did not say is
what the response *contains*. The first implementation answered a successful sign-in with a single
`MessageView` — "Signed in as john." — and stopped there. That is a confirmation with no
destination: the workspace still showed the login screen, now with a green line under it, and the
user was signed in to nothing.

Every way of fixing that from the client side is worse than it looks. The shell could run
`dashboard` itself on a 200 from `/api/auth/login`, which hardcodes a product decision — *where
sign-in lands* — into the frontend. Or the response could carry a `redirect: "dashboard"` field the
shell resolves against the catalog, which is the same decision moved onto the wire and dressed as
data: the client would hold a name-to-command map and an instruction to execute one, which is
exactly the interpretation ADR 13 and ADR 16 spent two entries keeping off the frontend.

The failure side had the mirror problem. A rejected sign-in returns 401, and a 401 that carries only
a title and a detail string tells the shell that something failed but not what to draw.

**Decision.** A command's response *is* the view that follows it. Not a confirmation, not an
instruction to navigate — the rendered state the user should now be looking at.

*Success.* `POST /api/auth/login` returns the dashboard's `CommandResult`, with the success
`MessageView` prepended to its nodes. The shell renders what it is given, as it does for every other
command, and nothing in it knows that sign-in has a landing place.

*Failure.* The 401 `ProblemDetails` carries the login screen in its `views` extension, plus an error
`MessageView`. The rule generalizes: **any ProblemDetails may carry `views`, and when it does, that
array is the view the client renders** — the error is not an annotation on the previous screen, it
is a screen. This is the shape ADR 12 already established for errors, now stated as carrying a
payload rather than only a `code` and a message.

*One producer per view.* The dashboard is built by `CommandHandler.Dashboard` and called from two
places: the `dashboard` dispatch branch and the sign-in path. The login screen is built by
`CommandHandler.LoginScreen`, whose only parameter is an optional error string, and is called from
the `login` dispatch branch and from the rejection path. Two call sites composing the same view
independently is the drift this collapses — and the reason the rejection response is *the login
screen plus a message* rather than a message alone is that the same function produces both.

**The response contract, not the route, is what makes something a control-channel exchange.** ADR 19
drew the channel line at the request: *does this name a command from the closed grammar?* ADR 24
then gave one such command a private route, which leaves the line intact but no longer coincident
with the URL. This entry states the consequence: an `Endpoint` route is not a third channel, so it
owes the control channel's response contract — `CommandResult` on 200, ProblemDetails on failure,
`ViewNode` throughout. `/api/auth/login` differs from `POST /api/command` in transport only, which
is precisely what ADR 24 claimed and what this makes true of the response as well as the request.

*The rejection message names neither field.* "Username or password is incorrect." rather than
"no such user" — a message that distinguishes the two turns the login form into an account
enumeration oracle. Costs a small amount of helpfulness on a genuine typo, which is the standard
trade and taken without argument.

**Trade-off.** *The auth endpoint now depends on the read side.* `/api/auth/login` takes
`IDashboardQueries` — an endpoint whose job is authentication reaching into queries it has no
business knowing about. The alternative is two round trips, and the second one is the client
deciding where to go, which is the thing being avoided. Accepted, and the shape of the future cost
is worth naming: if the landing view grows richer, the auth endpoint's dependency list grows with
it, and at some point the honest move is a `LandingView` composer the endpoint calls instead of a
query it injects.

*The landing destination is now a method call, and nothing marks it as a product decision.* "Sign-in
lands on the dashboard" is expressed as one line in `AuthEndpoints`. If it ever becomes per-user —
last view, a configurable home — that is a change here, and there is no type or field that says so.
The previous design at least had the virtue of being obviously incomplete.

*The extension bag erases the declared type, and serialization depends on it.* `views` is placed
into a `Dictionary<string, object?>`, so what the serializer writes is determined by the runtime
element type at the call site. `IReadOnlyList<ViewNode>` writes the `type` discriminator; a
`MessageView[]` passed directly writes the properties without it, and the frontend's closed-union
parser fails on a payload the backend considers fine. This is the same class of hole as the
`[JsonDerivedType]` mismatch under *Known limitations*: the union is closed to the compiler and open
to the serializer. The guard is an endpoint test asserting that every element of a 401 body's
`views` has a `type`, not the type system.

*The shell renders from two shapes.* A view can now arrive on a 200 body or inside a problem's
extensions, and a client that unwraps only the first silently drops every error view — which
presents as a failed login that does nothing at all. The mitigation is placement, not discipline:
`CommandRunner` normalizes both into one `ViewNode[]` before anything downstream sees a response, so
there is exactly one place that knows there were ever two shapes.

---

# Known limitations

**`record struct` zero-value.** A `readonly record struct` always permits `default(T)`, which runs no
constructor and therefore skips the smart constructor. The private constructor closes the
*parameterized* path, not the `default` one — so `default(Title)` is a `Title` with a null `Value`
that never passed `Create`. This is the asterisk on "illegal states unrepresentable" for every
value-type value object.

The realistic exposure is small: no one writes `default(Title)` by accident, `with { Title = ... }`
is blocked by get-only members, and the compiler steers all normal construction through `Create`.
The options considered were: accept it pragmatically; switch value objects to reference types so
`default` becomes `null` and fails loud on first use (at the cost of struct allocation); or guard the
`Value` read. The honest framing for any reviewer is that the technique has a known edge, and knowing
where it ends is part of using it.

**CFE `.Value` is a runtime guard, not a removed getter.** Adopting CSharpFunctionalExtensions (see 6)
reintroduced the throwing `.Value` / `.Error` accessors that the hand-rolled result type had removed.
The foot-gun the original design closed at compile time is now closed only at runtime: reading
`.Value` on a failed `Result` throws rather than failing to compile. The convention — prefer
`Match` / `Map` / `Bind` / `TryGetValue`, use `.Value` only as a loud, deliberate escape hatch where
success is already established — is enforced by code review and habit, not by the type system. This is
the accepted cost of trading a bespoke guarantee for a mainstream library.

**`ImageView.Variant` is a rendering hint on a semantic contract.** `Variant` carries a fact `Src` does
not — place this as a logo rather than as cover artwork — which is why it survived the rework in 20. It is
nonetheless an open-set string the frontend interprets: a node telling the client *how to present*, on a
contract whose premise is that nodes declare *what they are*. An enum would close the set without fixing
the semantics; a dedicated node kind (`BrandingView`) would fix the semantics by admitting that a logo is
not a general image. Neither earns its keep at one call site, so the honest statement is that this is the
last frontend fact still travelling on the view contract, and it is known rather than overlooked.

**Asset URLs encode a theme.** `/static/imperabook-logo-dark.svg` has the backend choosing the dark
variant, and theme selection is a frontend concern — the cost of serving assets as opaque bytes rather
than as bundled SVG that CSS could reach into (see 20). Harmless while no light theme exists, and
pre-solving an absent requirement is its own mistake. When a theme switch lands, the fix is either a
theme-neutral asset or a backend that knows which theme is active; the latter puts presentation state on
the server, so the former is the direction to try first.

**Static asset URLs carry a file extension.** `/static/imperabook-logo-dark.svg` is served by
`UseStaticFiles`, which brings content type, `ETag`, range requests and compression for free — at the
price of putting the format in the contract. Switching that asset to WebP or AVIF means editing the call
site, not just replacing the file. An extensionless route with a startup-built index would survive a
format change, and costs roughly forty lines plus hand-written caching headers; at two assets the trade
favours the extension. Note also that assets cannot use `Cache-Control: immutable` the way images can:
an image's URL is its content, so it can never go stale, while an asset keeps its name across deploys and
must revalidate.

**Polymorphic union membership is not compile-checked.** `[JsonDerivedType(typeof(X), "x")]` takes a
`Type` argument, and the compiler does not verify that `X` actually derives from the base the
attribute sits on. A node can therefore be declared in one union and registered in another, and
nothing fails until the first serialization of a view that contains it — which is a runtime 500,
not a build error. This happened once, with `CommandBlock` (23) registered on `Inline` while
deriving from `TextBlock`. Co-locating the registration with the derived type rather than listing
every case above the base makes the mismatch visible at the declaration, but the guarantee is a
convention either way: the closed unions are closed to the compiler and open to the serializer.
