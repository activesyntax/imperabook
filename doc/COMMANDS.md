# ImperaBook — Command Reference (MVP1)

## Input model

ImperaBook is driven by plain-text commands typed into a single command bar.

- Commands are **bare verbs** — you type the command, and the interactive shell then prompts for each parameter in turn. There are no flags or special characters in MVP1.
- A few commands carry a fixed qualifier in the name itself (`list incomplete books having no isbn`). These are whole entries in the registry, not a verb plus an argument: the qualifier is drawn from a closed, schema-fixed set, so it can be completed rather than typed. Open values (a language, a year) stay parameters.
- Required fields are marked `*`. Optional fields can be skipped at the prompt.
- As you type, the command bar **autocompletes** from a closed command registry using **token-match**: typing `book` surfaces every book command (`add book`, `show book`, `list books`, …), typing `add` surfaces every `add` command. `Tab` / `Enter` accepts the highlighted suggestion. Suggestions are ranked — see *Command suggestion model* below.
- Any input that does **not** match a known command is handled as a full-text search (the same as the explicit `search` command).
- Moving through results and drilling into an item are **navigation commands** with keybinding fast-paths (see *Navigation*); they read views, they do not mutate data.
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
| `list incomplete books` | List books with any missing field | — |
| `list incomplete books having no isbn` | Narrow to books with no ISBN | — |
| `list incomplete books having no cover` | Narrow to books with no cover | — |
| `list incomplete books having no year` | Narrow to books with no publication year | — |
| `list incomplete books having no language` | Narrow to books with no language set | — |

## Authors

| Command | Description | Prompts for |
| --- | --- | --- |
| `add author` | Create an author record | Name* |
| `update author` | Rename an author | Author to edit, new Name |
| `remove author` | Delete an author | Author to remove, confirmation |
| `list authors` | List all authors | — |
| `list unattributed authors` | List authors with no books attributed to them | — |

## Query

| Command | Description | Prompts for |
| --- | --- | --- |
| `search` | Multi-token full-text search | Search term(s) |
| `filter` | Structured filtering by metadata | Filter dimensions, built interactively: language, publication year |

> Typing any unrecognized text runs `search` implicitly, so the explicit `search` command is mainly a discoverability affordance.

## Dashboard

| Command | Description | Prompts for |
| --- | --- | --- |
| `dashboard` | Render analytical widgets | — (shows collection metrics and the *Needs attention* panel) |

The **Needs attention** panel lists, one row per gap, how many records are missing a given field,
with the command that lists them. Every row is runnable, and the command name is shown rather than
a generic label — reading it is how the command is learned, since the row is reachable by pointer
only (the command bar holds `Tab`, so tab order never reaches the workspace).

One caveat, deliberately visible: a pre-ISBN book has no ISBN to be missing. The ISBN row excludes
publication years before 1970 so the list is not permanently non-empty, but the general answer —
marking a field as intentionally absent for one book — is out of scope for MVP1 (see DECISIONS 23).

## Navigation

Navigation commands move you between and within views (the item grid, detail, and dashboard
screens that other commands produce). They never mutate data. Each has a keybinding fast-path
in parentheses; the typed command exists for discoverability and `help`.

| Command | Description | Prompts for |
| --- | --- | --- |
| `back` | Return to the previous view (`Esc`) | — |
| `open` | Open the selected item in detail view (`Enter`) | — |
| `next page` | Load the next page of results (`Ctrl + →`) | — |
| `prev page` | Load the previous page of results (`Ctrl + ←`) | — |
| `top` | Jump to the first item on the page (`Home`) | — |
| `bottom` | Jump to the last item on the page (`End`) | — |

> Navigation commands are **context-sensitive**: they are only active (and only suggested) while
> a result view or detail view is on screen. Item selection relies on each item's `Ref`.
> `dashboard` (above) is also a navigation action — it jumps to the dashboard view from anywhere.

`top` and `bottom` duplicate `Home` and `End` exactly, and they are kept on purpose. The keys are
the faster path for anyone who reaches for them, but they sit off the home row, and this interface
is built for people whose hands stay on it. Typing `top` never leaves the command bar. The
duplication costs two entries in the registry and buys a choice for two different typing habits.

### Three kinds of movement

The command bar always holds focus, so bare letters are typing, not shortcuts — there are no
vim-style `hjkl` bindings and there never will be. That constraint forces the three movements a
result view supports to be separated by modifier rather than by letter:

| Movement | Keys | What moves |
| --- | --- | --- |
| **Scroll** | `↑` `↓`, `Page Up` / `Page Down` | The viewport. Nothing is selected, nothing is fetched. |
| **Select** | `Alt` + `↑` `↓` `←` `→` | The selection, one item at a time, in two dimensions across the grid. Brings the selected item into view if it is off screen. |
| **Page** | `Ctrl + →` / `Ctrl + ←` (`next page` / `prev page`) | The result set. Fetches the adjacent batch from the server. |

Results are paged: a view holds a fixed batch (30 items) that you scroll and select within, and
`next page` / `prev page` fetch the batch before or after it. Scrolling past the end of a page does
**not** auto-load the next one. Paging stays an explicit act so the position you scrolled to holds
still, and so the operation keeps a name that `help` can list.

The commands are named `next page` and `prev page`, not `next` and `prev`. A bare `next` reads as
"the next thing" and would be applied by a reader to whichever movement they had in mind — exactly
the ambiguity the three-level model can least afford. The noun also gives the suggestion model a
second entry point: typing `page` surfaces both paging commands, the same way `book` surfaces every
book command.

**Why `Alt` and not `Ctrl` for selection.** `Ctrl + ←/→` is word-wise cursor movement in a text
field on Windows and Linux, and the command bar is a text field that always has focus. Taking it
for selection would cost editing inside longer commands. `Alt` + arrows carries no text-editing
meaning on those platforms, sits adjacent to the arrows it modifies, and works in all four
directions — which the grid needs and a single-column list did not.

**Why three levels rather than two.** Folding scroll into selection was considered and rejected.
If moving the selection also moves the viewport, the grid sits still for several presses and then
jumps a row — motion that is unpredictable in a way continuous scrolling is not. Bare arrows
currently give the same feel as a mouse wheel, and that is worth keeping: the viewport moving under
a stationary cursor and the cursor moving inside a stationary viewport are genuinely different
acts, and collapsing them trades a good experience for a tidier table.

**Known rough edge.** Three levels is still a lot for an interface whose thesis is reduced
cognitive load, and the boundary between `Page Down` (move within the loaded batch) and `next page`
(fetch another batch) is not self-evident from the keys alone. The answer is interactive guidance
rather than documentation: the view states what is available *now* — how much of the result set is
on screen, and which keys act on it — so the model does not have to be held in the head. Until that
lands, this is the first-use observation in `TESZTELES-1.md` most worth watching.

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
| `list` | list books, list incomplete books, list authors, list unattributed authors |
| `incomplete` | list incomplete books and all four of its narrowings |
| `isbn` / `cover` / `year` / `language` | the matching `list incomplete books having no …` |
| `unattributed` | list unattributed authors |
| `book` / `books` | add book, update book, remove book, show book, list books, list incomplete books (+ narrowings) |
| `author` / `authors` | add author, update author, remove author, list authors |
| `search` | search |
| `filter` | filter |
| `dashboard` | dashboard |
| `page` | next page, prev page |
| `back` `open` `top` `bottom` | the navigation command itself (only when a view is active) |
| `help` `clear` `cancel` `quit` / `exit` | the shell command itself |

**Ranking.** When several commands match, they are ordered by:

1. **Exact full-command match first** — typing `search` puts `search` at the top, ahead of anything that merely contains the token.
2. **Leading-verb match outranks contained-token match** — a token matched as the first word ranks above the same token appearing later in a command name.
3. **Deterministic tiebreak** — ties resolve in a stable order (alphabetical within a group) so suggestions never reorder under the cursor.
4. **Context gates navigation** — navigation commands are suggested only while their view is on screen; otherwise they are hidden, not just deprioritized.
5. **No match falls through** — if nothing matches a known command, no suggestion is selected; on submit the raw input runs as `search`.

---

## Out of scope for MVP1

Deferred to MVP2 or later: **library creation and management** (one library per user in MVP1), **tags and categories** (including tag-based filtering and category distribution on the dashboard), inline parameters/flags, lending (`lend` / `return`), reading status, per-command library switching, batch edit, **marking a field as intentionally absent** for a single book (which is what would let the *Needs attention* list reach zero), ISBN scan, AI cover/page inference, and export utilities. Single-token typo tolerance in suggestions (e.g. `add bok` → `add book`) is also MVP2; word-order reinterpretation (e.g. `book add` → `add book`) is rejected outright, not deferred (see ADR 13).

## Open questions

1. **Author find-or-create.** Does `add book` auto-create an unknown author from the name entered at its prompt, or must the author already exist (via `add author`)? The Author FK / `AddAuthor` path is still pending, so pick one before implementing the author prompt in `add book`.

2. **Does `filter` absorb the incomplete listings?** `filter` builds structured filtering
   interactively, and "has no ISBN" is a filter dimension. They are kept separate because the
   named commands are completable and reachable from a dashboard row, while `filter` covers open
   values and combinations — but if `filter` ever gains presence/absence dimensions, the overlap
   is worth resolving rather than carrying twice.
