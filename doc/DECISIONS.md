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
