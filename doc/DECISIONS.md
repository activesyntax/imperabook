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

## 14. The shell talks to services, not the parent — the view-model stays in the component

**Context.** The command shell had accreted three responsibilities that are not a component's:
fetching the command registry over HTTP, deciding *what executing a command does*, and reaching
the workspace to show a result. Because the shell and the workspace are siblings under
`main-layout`, that last one ran shell → `@Output` → `main-layout` → `@Input` → workspace —
mediation that only thickens as the flow grows (navigation acting on the active view, errors,
later drafts and prompting). The tempting framing was "extract a command service and make the
component dumb glue."

**Decision.** Three services, each owning something the component should not:

- **`CommandRegistry`** — data access. Loads the list once, exposes it as a signal, nothing more.
  It is shared (the shell ranks against it; a future `help` view renders it) and HTTP is not a
  component's job.
- **`WorkspaceStore`** — the shared signal state both siblings read: the rendered view, the
  selectable row refs, the current selection, a `pending` flag, and a `back` history. `viewActive`
  is a `computed` here, so the shell reads it rather than receiving it.
- **`CommandRunner`** — application logic. A `ShellSubmit` becomes either a store mutation
  (`back` / `next` / `prev` / `top` / `bottom` act with no network) or a backend round-trip that
  owns the pending/error lifecycle and writes the result into the store. This is where the
  execution logic that was a `main-layout` TODO now lives.

The shell injects all three and calls `runner.run` directly, dropping its `@Output` and its
`viewActive` `@Input`. `main-layout` collapses to `<app-workspace/>` + `<app-command-shell/>` with
no bindings.

The load-bearing rule, stated because it is the actual judgment: **a component is legitimately
thin glue only when the thing it glues to is a real model.** Extracting the shell's own view-state
into a service to shrink the component file would produce both an anemic component *and* a service
with no reason to exist — two files where one was coherent. So the test for each extraction was:
does this have a reason to exist besides making the component shorter? Registry (shared
data-access), store (deletes the sibling relay), and runner (the execution logic) each pass.

**What deliberately did not move.** The shell's input state, suggestion derivation, and keyboard
handling stayed in the component — that *is* the view-model, and a component-with-signals is
exactly the place for it; relocating it would be the anemic-component trap the rule warns against.
The ranking (`rank` / `score` / `pickFeatured`) stayed pure module functions: already the most
testable form there is, and wrapping them in an injectable would add indirection for zero
capability. They become a service only when they first need an injected dependency, which is a
known point — the MVP2 per-user suggestion weighting blends the static graph with a transition
model that has to be sourced from somewhere. Until then, pure functions.

**Trade-off — direct injection over a retained `@Output` (the reversible call).** Chosen: the shell
calls the runner. The cost is that the shell now depends on `CommandRunner` and `WorkspaceStore`
rather than being an island that emits a value, so its unit tests stub those two — assert `run` was
called with the right `ShellSubmit`, flip `viewActive` to test nav gating — instead of asserting an
emission. Gained: no `main-layout` wiring, and the sibling-communication relay is gone. The
`@Output` form was the alternative — trivially isolable in a test — but it pushes the mediation back
into the layout, which is precisely the weight this change removes.

**Trade-off — the costs, named.** `WorkspaceStore` is app-global singleton state
(`providedIn: 'root'`), so its lifetime is the app's, not a route's — fine for a single-workspace
MVP1, to revisit if independent workspaces ever coexist. And the runner touches the `ViewNode`
union in a couple of places (the error-view shape; the store's `viewActive` kind check), so a
change to the union's kind strings ripples to those spots. Accepted as the price of the runner
owning the response → view mapping — which is a frontend rendering decision by design: the backend
returns logical shape, the frontend decides how it renders (see 15).

---

## 15. The wire contract is a closed semantic view union, not server-driven UI

**Context.** A command's result has to cross the boundary as JSON and then become something on
screen. Two shapes for that payload were on the table, and they look similar enough to be confused —
the distinction is the whole decision. The first is server-driven UI (SDUI): the server sends
*presentation primitives* — rows, columns, spacing, a generic component with style props — drawn
from an open, extensible vocabulary, and the frontend is a dumb layout engine that paints whatever
it is handed. The second is a *closed semantic union*: the server sends *meaning* drawn from a fixed
set the frontend owns — `card`, `cardCollection`, `message`, `guidance`, `image` — and the frontend
holds one renderer per case and styles it. SDUI was rejected earlier (and 14 already leans on that
rejection); this entry records the positive shape that replaced it, because "we don't do SDUI" is
only half a decision until the alternative is written down.

**Decision.** The wire contract *is* the `CommandResult` / `ViewNode` closed semantic union. The
backend composes the union — which nodes, in what order, carrying what content — and emits it as
JSON via System.Text.Json polymorphism (a `type` discriminator per case). The frontend owns one
renderer per node type and 100% of the styling; the recursive `View` maps `node.type` to its
renderer and nothing on the wire touches how a node looks. Every command therefore flows through one
pipe: `CommandRunner` dispatches, receives a `CommandResult`, sets the workspace signal — there is
no per-command view-assembly code on the frontend. Adding a command's *output* is a backend change;
the frontend grows code only when a genuinely new *node type* enters the vocabulary, which is rare
and deliberate.

This layers cleanly onto the existing read decisions rather than competing with them. The Application
layer still returns flat data (8) — the dashboard read is three counts, not views. Composing those
counts into a `ViewNode` union is an **API-layer** concern, the same layer and the same seam that maps
domain DUs to the ProblemDetails wire shape (12). Data in from Application, semantic views out to the
client; the view vocabulary never leaks inward past the API.

**The line that separates this from SDUI, stated because the two are a step apart.** The vocabulary
is *closed* and *semantic*. A node declares **what it is** (`card`, `guidance`), never **how it
looks** — no pixels, no colors, no flex, no layout props. The moment a node carries a styling
attribute, it has stopped being a semantic union and become the SDUI that was rejected. That is the
single test applied to every future node: does this field say *what*, or *how*? If *how*, it does
not belong on the wire.

**Trade-off — content and composition move server-side, and two fields currently fail the test.**
The cost accepted on purpose: the tagline, the guidance copy, and the card captions now live in the
API, not the frontend — the server owns *what is shown*, the client owns *how it is shown*, and that
split puts presentation-adjacent text on the backend. The cost *not* yet paid down: two fields on the
current contract leak a frontend fact onto the wire and are exactly where the boundary decays toward
SDUI —

- **`image.src`** is an asset path, which is a frontend fact (the server should not know the asset
  folder layout). The semantic form is already present beside it as `variant` (`logo`); `src` should
  resolve from `variant` on the frontend.
- **`guidance.keys`** is a literal keybinding (`Ctrl + K`), also a frontend fact — rebind on the
  client and the server's copy goes stale silently. The semantic form references an *action*
  (`focusCommandBar`) and lets the frontend map action → current binding.

Both are named, not hidden, and both are deferred: the contract works today with the literal forms,
and resolving them is a frontend-only change that does not move the boundary. Until then they are the
known soft spots of this decision — the precise places "semantic union" is one careless field away
from the SDUI it claims not to be.

---

## 16. Backend-served command registry with a per-command execution recipe; per-resource endpoints kept

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

​```json
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
​```

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
