# ImperaBook — Command Reference (MVP1)

## Input model

ImperaBook is driven by plain-text commands typed into a single command bar.

- Commands are **bare verbs** — you type the command, and the interactive shell then prompts for each parameter in turn. There are no flags or special characters in MVP1.
- Required fields are marked `*`. Optional fields can be skipped at the prompt.
- As you type, the command bar **autocompletes** from a closed command registry using **token-match**: typing `book` surfaces every book command (`add book`, `show book`, `list books`, …), typing `add` surfaces every `add` command. `Tab` / `Enter` accepts the highlighted suggestion. Suggestions are ranked — see *Command suggestion model* below.
- Any input that does **not** match a known command is handled as a full-text search (the same as the explicit `search` command).
- Moving through results and drilling into a row are **navigation commands** with keybinding fast-paths (see *Navigation*); they read views, they do not mutate data.
- `cancel` aborts the current prompt sequence at any point.

MVP1 has **one library per user**; book operations target it implicitly. Inline parameters for power users (e.g. `add book "The Hobbit" --author "Tolkien"`) are deferred to MVP2.

---

## Books

| Command | Description | Prompts for |
| --- | --- | --- |
| `add book` | Catalog a new book | Title*, Subtitle, Author*, Language, Publication year, ISBN, Summary |
| `update book` | Edit an existing book | Book to edit (select/search), then any of the fields above |
| `remove book` | Delete a book | Book to remove (select/search), confirmation |
| `show book` | Show full detail for one book | Book to view (select/search) |
| `list books` | List all books | — |

## Authors

| Command | Description | Prompts for |
| --- | --- | --- |
| `add author` | Create an author record | Name* |
| `update author` | Rename an author | Author to edit, new Name |
| `remove author` | Delete an author | Author to remove, confirmation |
| `list authors` | List all authors | — |

## Query

| Command | Description | Prompts for |
| --- | --- | --- |
| `search` | Multi-token full-text search | Search term(s) |
| `filter` | Structured filtering by metadata | Filter dimensions, built interactively: language, publication year |

> Typing any unrecognized text runs `search` implicitly, so the explicit `search` command is mainly a discoverability affordance.

## Dashboard

| Command | Description | Prompts for |
| --- | --- | --- |
| `dashboard` | Render analytical widgets | — (shows language breakdown and total collection metrics) |

## Navigation

Navigation commands move you between and within views (the table, detail, and dashboard
screens that other commands produce). They never mutate data. Each has a keybinding fast-path
in parentheses; the typed command exists for discoverability and `help`.

| Command | Description | Prompts for |
| --- | --- | --- |
| `back` | Return to the previous view (`Esc`) | — |
| `open` | Open the selected row in detail view (`Enter`) | — |
| `next` | Move the selection to the next row (`j` / `↓`) | — |
| `prev` | Move the selection to the previous row (`k` / `↑`) | — |
| `top` | Jump to the first row (`gg`) | — |
| `bottom` | Jump to the last row (`G`) | — |

> Navigation commands are **context-sensitive**: they are only active (and only suggested) while
> a table or detail view is on screen. Row selection relies on each table row's `Ref`. `dashboard`
> (above) is also a navigation action — it jumps to the dashboard view from anywhere.

## Shell

| Command | Description | Prompts for |
| --- | --- | --- |
| `help` | Show available commands | Optional command name for detail |
| `clear` | Clear the screen | — |
| `cancel` | Abort the current prompt sequence | — |
| `quit` / `exit` | Exit ImperaBook | — |

---

## Command suggestion model

How the command bar turns partial input into ranked suggestions (see `DECISIONS.md` ADR 13 for
the rationale, and `command-suggestion-graph.mermaid` for the visual form).

**Token-match.** A command is matched by any whole token in its name, not by strict prefix. So the
leading verb narrows the set (`add` → all `add` commands) and the object noun cross-cuts it
(`book` → every book command, across verbs). The verb-first tree is the primary path; the table
below is the full index.

| You type | Suggested commands |
| --- | --- |
| `add` | add book, add author |
| `update` | update book, update author |
| `remove` | remove book, remove author |
| `show` | show book |
| `list` | list books, list authors |
| `book` | add book, update book, remove book, show book, list books |
| `author` / `authors` | add author, update author, remove author, list authors |
| `search` | search |
| `filter` | filter |
| `dashboard` | dashboard |
| `back` `open` `next` `prev` `top` `bottom` | the navigation command itself (only when a view is active) |
| `help` `clear` `cancel` `quit` / `exit` | the shell command itself |

**Ranking.** When several commands match, they are ordered by:

1. **Exact full-command match first** — typing `search` puts `search` at the top, ahead of anything that merely contains the token.
2. **Leading-verb match outranks contained-token match** — a token matched as the first word ranks above the same token appearing later in a command name.
3. **Deterministic tiebreak** — ties resolve in a stable order (alphabetical within a group) so suggestions never reorder under the cursor.
4. **Context gates navigation** — navigation commands are suggested only while their view is on screen; otherwise they are hidden, not just deprioritized.
5. **No match falls through** — if nothing matches a known command, no suggestion is selected; on submit the raw input runs as `search`.

---

## Out of scope for MVP1

Deferred to MVP2 or later: **library creation and management** (one library per user in MVP1), **tags and categories** (including tag-based filtering and category distribution on the dashboard), inline parameters/flags, lending (`lend` / `return`), reading status, per-command library switching, batch edit, ISBN scan, AI cover/page inference, and export utilities. Single-token typo tolerance in suggestions (e.g. `add bok` → `add book`) is also MVP2; word-order reinterpretation (e.g. `book add` → `add book`) is rejected outright, not deferred (see ADR 13).

## Open questions

1. **Author find-or-create.** Does `add book` auto-create an unknown author from the name entered at its prompt, or must the author already exist (via `add author`)? The Author FK / `AddAuthor` path is still pending, so pick one before implementing the author prompt in `add book`.
