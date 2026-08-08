# ImperaBook

## Command-Based Home Library Management System

ImperaBook is a minimalist home library catalog built around a single idea: that managing a
collection should feel like operating a command center, not clicking through menus. It pairs a
keyboard-driven, command-based control surface with a dark, typography-driven interface — designed
for power users, researchers, and collectors who would rather type than hunt for buttons.

<img src="./ux/imperabook-dashboard.png" alt="ImperaBook UI Concept" width="100%">

The product is fully multimodal — mouse and touch work everywhere — but it is *keyboard-first* on the
desktop, where the fastest path from intent to result is a typed command rather than a pointer
journey across the screen.

---

## What Makes ImperaBook Different?

- **Command-driven control.** A single command bar drives the whole app. As you type, it
  autocompletes from a closed command grammar using token-match: typing `book` surfaces every book
  command (`add book`, `list books`, `show book`, …), typing `add` surfaces every `add` command.
  Anything that isn't a recognized command falls through to full-text search — there is no mode to
  toggle. Inspired by modern terminal tools like Vim and Helix.
- **Typography-driven aesthetic.** A dark, minimalist interface built to maximize legibility,
  screen real estate, and scannability — the text *is* the interface.
- **Type-driven domain modeling.** A pure, immutable C# core using closed sealed-record hierarchies,
  smart-constructor value objects, and phantom-typed identifiers (`Id<TEntity>`) to make invalid
  library states literally unrepresentable. (The reasoning behind these choices, including their
  trade-offs and limits, lives in `DECISIONS.md`.)

<img src="./ux/imperabook-all-books.png" alt="ImperaBook UI Concept" width="100%">
---

## How It Works — Commands in Practice

In MVP1 commands are **bare verbs** with interactive prompting: you type the verb, and the shell
prompts for each field in turn. There are no flags or syntax to memorize, and your hands never leave
the keyboard.

**Add a book.** Type `add b` — autocomplete offers `add book`; press `Tab` or `Enter` to accept it.
The workspace immediately renders a *draft* of the book, and it fills in live as you answer each
prompt: Title, Author, then the optional Subtitle, Language, Year, ISBN, and Summary. Press `Enter`
on the last step to save; `cancel` or `Esc` discards the draft and nothing is ever persisted. You
watch the book take shape beside the prompt instead of typing into the void.

**Browse and read.** `list books` renders the collection. Because the command bar always holds
focus, bare letters are typing rather than shortcuts — so movement is separated by modifier instead:
plain `↑` `↓` scroll the viewport, `Alt` + arrows move the selection across the grid, and
`Ctrl + →` / `Ctrl + ←` (`next page` / `prev page`) fetch the adjacent batch of results. `Enter`
opens the selected row into detail, `Esc` steps back, `Home` / `End` (`top` / `bottom`) jump to the
first or last item on the page. These are navigation affordances — they read views, they never
mutate data.

**Search.** Just start typing words that aren't a command — `tolkien hobbit` — and the input falls
through to multi-token full-text search. No button, no separate search box.

**Filter, inspect, summarize.** `filter` walks you through structured filtering (language,
publication year). `show book` opens one book's full detail. `dashboard` renders the collection's
language breakdown and totals. `help` lists everything; `help add book` explains one command.

**Where this is going (MVP2).** Inline parameters arrive for power users —
`add book "The Hobbit" --author "Tolkien"` — collapsing the prompt sequence into a single line. The
larger payoff is *composition*: chained and bulk operations (e.g. filtering and acting on a whole
set at once) where the efficiency gain stops being a percentage and becomes an order of magnitude.

<img src="./ux/imperabook-command-line.png" alt="ImperaBook UI Concept" width="100%">
---

## Why Keyboard-First — Efficiency and Focus

The keyboard-first model is a deliberate efficiency bet, not just an aesthetic one. A
Keystroke-Level Model (KLM) analysis of common operations — using the standard, empirically derived
operator times from HCI — estimates roughly **50–65% less time** on everyday CRUD and filtering
tasks versus a typical mouse-driven library GUI, for an experienced user. The full breakdown is in
`efficiency-analysis.md`.

An honest note on those numbers: they are **model-derived estimates, not yet measured results**. The
KLM gives a principled order-of-magnitude projection, and the intent is to back it with real usage
data over time. Treat the percentages as "this is a large, structural gain" rather than as proven
benchmarks — and as a claim that holds *in some cases* (the experienced user, repeated cataloging
sessions), not a universal one. There is a learning curve, and on a phone the calculus inverts (see
*Mobile Companion*).

The part that matters more than the seconds is **cognitive**, and it is the harder thing for a GUI
to match:

- **No hand-switching.** The constant commute between mouse and keyboard — the costliest small motion
  in a typical interface — disappears. Hands stay home, which is less fatiguing across a long
  cataloging session and keeps you in flow.
- **Lower mental load.** A graphical UI asks the brain to visually re-scan the screen at every step:
  locate the button, absorb layout shifts, dismiss the modal. A command the user already knows runs
  on muscle memory, so the explicit "where do I click next" preparation largely vanishes.
- **Composition.** "Remove all English books published before 2010" is dozens of clicks in a GUI and
  a single expressed operation here. This is the order-of-magnitude lever, and it scales with the
  size of the collection.

The throughline is the project's actual goal: reduce the friction between what you want to do and
getting it done. Less pointer-hunting and less visual re-scanning means more attention left for the
work itself — a calmer, more focused way of interacting with software, not merely a faster one.

---

## Mobile Companion

The desktop app is the home for deep work — cataloging, querying, batch editing. But a phone is the
best tool for one specific job: standing in front of a physical shelf and entering books by scanning
them. ImperaBook's mobile app is therefore a **companion, not a port**.

A keyboard-first command line does not survive a soft keyboard — typing command syntax on a
touchscreen is a poor experience — so "keyboard-first" is a *desktop* statement, and the mobile
surface is touch-first by design. It is scoped to the two things a phone does best on the go:
**barcode / ISBN scanning** for fast ingestion, and **quick lookups** (checking whether you already
own a book while standing in a bookshop). The companion connects to your own instance or to an
optional managed cloud — it extends the desktop experience rather than replacing it.

---

## Tech Stack & Architecture

ImperaBook is a monorepo demonstrating modern **Clean Architecture**, **CQRS**, and **type-driven
domain modeling** in C#.

### Frontend

- **Angular** with reactive **Signals** for fine-grained state management and fast rendering; a
  recursive view layer driven by a closed `ViewNode` discriminated union, where the backend declares
  logical shape and the frontend owns all rendering.

### Backend (.NET 10, C#)

- **ImperaBook.Domain** — Pure, immutable domain core. Algebraic data types as closed sealed-record
  hierarchies, constrained values as smart-constructor value objects returning explicit `Result`
  types, phantom-typed identities — invalid states unrepresentable, the core free of side effects.
- **ImperaBook.Application** — Use-case orchestration, with write operations (**Commands**) cleanly
  separated from read operations (**Queries**) and flat read models projected for the query side.
- **ImperaBook.Contracts** — The closed `ViewNode` / `CommandResult` wire-contract types shared
  between Application and API: a fixed semantic union the backend composes and the frontend renders,
  declaring *what* a view is, never *how* it looks — not a Server-Driven UI layer.
- **ImperaBook.Infrastructure.Data** — Persistence behind repository interfaces via **EF Core**,
  keeping its mutable, change-tracking model out of the domain.
- **ImperaBook.Api** — ASP.NET Core **Minimal APIs**, with all errors mapped to a single RFC 9457
  ProblemDetails shape at the boundary.

### Two channels, not a REST surface

The HTTP surface is split by purpose rather than by resource. A **control channel** —
`POST /api/command` — handles every command in the closed grammar: one request shape, one dispatch
path, one response contract. A **content channel** moves opaque bytes (cover images today, exports
and bulk import later) and never introduces meaning the command response didn't already state. The
command registry itself is served by the backend at `GET /api/commands`, so the frontend executes a
recipe rather than inferring one.

### Database

- **PostgreSQL** — relational integrity and full-text search, with content-addressed image bytes
  stored in-database (`bytea`, `storage external`) so a single `pg_dump` is a complete backup.

---

## MVP Plan

### MVP1 — Keyboard-Driven Core Management & Dashboard

- **Command execution.** Core CRUD via bare-verb commands with interactive prompting and an
  anticipatory draft preview; autocomplete guides you to the canonical command as you type.
- **Dashboard.** Analytical widgets: language breakdown and total collection metrics.
- **Query engine.** Multi-token full-text search plus structured filtering (language, publication
  year).

### MVP2 — Inline Power Commands, Automation & Enrichment

- **Inline parameters.** `add book "The Hobbit" --author "Tolkien"` and chained/bulk operations.
- **ISBN smart scan.** Camera barcode scanning on mobile with metadata population from external
  sources (Open Library, Google Books).
- **AI cover/page inference.** Extract cataloging data from a photo of a cover (bring-your-own-key or
  metered at cost — enrichment is never a gated feature).
- **Lending.** `lend` / `return`, so the shelf knows which books are with friends.
- **Export.** Print-ready PDF and e-book layout output.

---

## Editions

| | **Self-Hosted** | **Cloud** |
| --- | --- | --- |
| Price | Free for personal use | Subscription |
| Commercial use | Paid licence required | Included in subscription |
| Distribution | Docker Compose | Managed, nothing to install |
| Runs on | Your machine, your database | Hosted instance |
| Data | Entirely yours | Automatic backups, cross-device sync |
| Updates | You pull a new image | Continuous |

The self-hosted edition is the full application, not a crippled demo: the same commands, the same
catalog, the same interface. What the subscription buys is operations — hosting, backups, sync, and
the metered AI enrichment allowance — not features held back behind a paywall. What the licence
governs is *who* may use it, not *what* it does.

### Running it yourself

```
docker compose up -d
```

The stack is the application container plus PostgreSQL. Everything lives in a Postgres volume,
including cover images, so a database dump is a complete backup with nothing else to remember.

---

## Documentation

- `DECISIONS.md` — architecture decisions, with trade-offs and known limitations stated plainly.
- `COMMANDS.md` — the full command reference and suggestion model.
- `UX.md` — UX patterns and their rationale.
- `efficiency-analysis.md` — the keystroke-level efficiency analysis (estimates pending real data).

---

## License

**ImperaBook is proprietary, closed-source software.** The source code is not published; the
application is distributed as a container image.

- **Personal use is free.** You may run the self-hosted edition at no cost for your own private,
  non-commercial use — your household's own library, your own collection.
- **Any other use requires a licence.** Use by or on behalf of a company, institution, or other
  organisation — including purely internal use, and including non-profits — is commercial use and
  needs a paid licence, whether self-hosted or cloud.
- **Cloud use** is governed by the subscription Terms of Service.
- Redistribution, resale, white-labeling, and hosting the software as a service for third parties
  require a separate commercial agreement.

Full terms are in the ImperaBook End User License Agreement (`EULA.md`).

Third-party open source components bundled in the distributed image are listed with their licenses
in `NOTICE.md`.

---

**ImperaBook** — Your library, at your fingertips.
