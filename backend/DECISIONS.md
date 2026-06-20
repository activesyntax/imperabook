# Architecture Decisions

This document records the load-bearing decisions behind ImperaBook's backend, and — more
importantly — *why* each one was made and what it trades off. It is not a list of patterns
used; it is a record of where the boundaries were drawn deliberately.

Where a decision has a known weakness, that weakness is stated rather than hidden. The limit
of a technique is part of understanding it, and a decision log that only lists wins is a
brochure, not a record.

Format is lightweight ADR: each entry gives the context, the decision, and the trade-off accepted.

---

## 1. Pure C# backend (migrated from a polyglot F#/C# stack)

**Context.** The project began with F# for the Domain and Application layers and C# for
Infrastructure. The original goal — showcasing functional domain modeling — was genuine, but
it worked against the primary goal of being hireable as a mainstream .NET developer.

**Decision.** Migrate to a pure C# backend. Functional domain modeling is showcased separately
in a dedicated F# project, so the technique is demonstrated without making the flagship project
read as niche.

**Trade-off.** Lose F#'s native sum types and total-by-default ergonomics; gain a codebase any
.NET team can read and hire against. The differentiator is reframed as *type-driven domain
modeling in mainstream C#* — harder to do well, and more relevant to the market.

---

## 2. Illegal states unrepresentable, through the type system

**Context.** Most line-of-business bugs are valid-looking objects in invalid states: an empty
title, zero authors, a book "in" a library that does not exist.

**Decision.** Constrained values are `record struct` value objects with private constructors and
smart constructors returning `Result<T>` (e.g. `Title.Create`). Identities are phantom-typed
(`Id<TEntity>`), so `Id<Book>` and `Id<Author>` cannot be confused at compile time. Sum types
(`Attribution`, `Location`) are closed sealed-record hierarchies. "At least one author" is
encoded structurally in `Authors` — a non-optional primary plus the rest — so zero authors
cannot be constructed.

**Trade-off.** More types and more ceremony at construction time, in exchange for a domain where
the invalid case usually does not compile. Accepted deliberately; this is the project's core thesis.

---

## 3. Validation lives in the domain, not in a validation library

**Context.** The mainstream choice is FluentValidation with a validation pipeline. FluentValidation
is permissively licensed (Apache 2.0), so this was a design decision, not a licensing one.

**Decision.** Validation rules live with the type they constrain. `Title.Create` enforces
required + max length; `Title.MaxLength` is the single source of truth, reused directly in the
EF Core configuration (`HasMaxLength(Title.MaxLength)`). No FluentValidation.

**Trade-off.** Lose a library interviewers recognize on sight. Gain a single source of truth — no
rule duplicated between a validator and a value object — and a coherent story: there is exactly
one place a title can be wrong, and it is the title type. A parallel FluentValidation layer would
duplicate the max-length rule and invite the question "why validate twice?". FluentValidation is
reserved for cross-field request shape if the API layer ever needs it.

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

**Context.** The recognizable Clean Architecture vocabulary (`...Command`, `...Query`,
vertical-slice folders) makes a codebase legible to any .NET reviewer. The risk is looking like a
generic template clone.

**Decision.** Adopt the vocabulary and folders (`Books/Commands`, `Books/Queries`,
`...Command` / `...Query` types, `...CommandHandler` / `...QueryHandler` handlers) while keeping
the type-driven domain and hand-rolled result types underneath. Parameterless or single-primitive
queries do not get an empty request record — with no mediator, boxing nothing into a request object
is pure ceremony, and the handler suffix carries the convention.

**Trade-off.** The structure itself is free legibility. The judgment is in *not* also importing the
libraries the template usually ships with (see 3 and 4) — the layout is borrowed, the dependencies
are not.

---

## 6. `Result<T>` carries validation, and its reads are gated

**Context.** A result type whose `.Value` can be read without checking `IsOk` is a foot-gun: the
check is exactly the thing someone forgets. The operating principle is blunt — whatever is not
enforced, someone eventually forgets.

**Decision.** Remove the raw `.Value` / `.Error` getters entirely — not made `internal`, because
`internal` plus `InternalsVisibleTo` would reopen the bypass for the whole consuming assembly. The
public surface is total: `Match(onOk, onError)` and `Switch` for side effects; `TryGetValue` /
`TryGetError` (`[MaybeNullWhen]`-annotated) for gated imperative use; `Map` / `Bind` to transform
without unwrapping. One deliberate escape hatch remains: `Expect(reason)`, which throws with the
caller's stated justification. (The result types are hand-rolled rather than taken from LanguageExt,
whose v5 churn and heavier surface conflict with the mainstream-C# positioning.)

**Trade-off.** The happy path costs one more keystroke at every read. The goal was never *zero*
bypass — the "validate all, then extract all" accumulation shape inherently needs a "checked above"
read. The goal is zero *silent* bypass: `Expect("validated above")` is loud and greppable; the old
`.Value` was neither.

---

## 7. Total `Match` only where the other branch is reachable

**Context.** Forcing a branch is safer only when the branch has a meaningful handler. Forcing a
branch on an unreachable "this is a bug" case makes things worse: someone fills the bug-branch with
`() => ""` and a silent failure ships.

**Decision.** Total `Match` is the enforced read on cases where both branches are real: `Result<T>`
(Ok / Error), `Attribution` (Unknown / ByAuthors), `Location` (Library / Unknown). The
"never-constructed" state of a value object is not a domain case — it is a CLR artifact meaning
"bug here" — so it fails loud automatically rather than through a forced branch.

**Trade-off.** Slight inconsistency (some reads are `Match`, some are fail-loud guards) in exchange
for not manufacturing a branch whose only correct body is `throw`. The rule: enforce a branch for
reachable cases; fail loud automatically for cases that should not exist.

---

## 8. Read models are not domain types

**Context.** Query paths that hydrate full aggregates only to flatten them for display pay for
invariants they never use.

**Decision.** `BookListItem` is a flat projection queried straight from the store, carrying
primitives (a `string` title, raw `Guid`s). It is a CQRS read model — not a boundary adapter, not a
domain type.

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

## Known limitations

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
