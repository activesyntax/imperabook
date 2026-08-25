# ImperaBook — Command Reference (MVP1)

## Input model

ImperaBook is driven by plain-text commands typed into a single command bar.

- A command is **one sentence, typed in one place**: a verb phrase followed by any number of parameter segments, each a **connective** naming the field and a **quoted value** — `add book by author "George Orwell" with title "1984" published in "1949"`.
- Parameters are **order-free**. The connective names the value, so the segments can be given in whatever order the sentence comes out in.
- A few commands carry a fixed qualifier in the name itself (`list incomplete books having no isbn`). These are whole entries in the registry, not a verb plus an argument: the qualifier is drawn from a closed, schema-fixed set, so it can be completed rather than typed. Open values (a language, a year) stay parameters.
- Required parameters are marked `*`. Optional ones are simply left out of the sentence.
- As you type, the command bar **autocompletes** from a closed command registry using **token-match**: typing `book` surfaces every book command (`add book`, `list books`, `update book`, …), typing `add` surfaces every `add` command. **`Tab` selects, `Enter` confirms** — see *The two keys* below. Completion does not stop at the verb: once the command is in the bar, the same row offers its **next parameter**, one at a time — see *Composing a command*. Suggestions are ranked — see *Command suggestion model* below.
- Any input that does **not** match a known command is handled as a full-text search (the same as the explicit `search` command).
- Moving through results and drilling into an item are **navigation commands** with keybinding fast-paths (see *Navigation*); they read views, they do not mutate data.
- `cancel` (`Esc`) clears the buffer; nothing composed is ever persisted until `Enter`.
- **Passwords are never typed into the command bar.** `login` is in the grammar like any other command, but its credential steps replace the bar with dedicated fields (DECISIONS 25/27). Nothing secret enters the composed sentence.
- **With no session, `login` starts itself.** It is the only runnable command at that point, so there is nothing to choose between and an empty bar would be a guessing game. The name still appears in the bar before the credential fields take over (DECISIONS 30). `Esc` cancels it, which — since there is still nothing else to run — starts it again with the fields cleared.

MVP1 has **one library per user**; book operations target it implicitly.

---

---

## Composing a command

**One step at a time.** Completion does not stop at the verb. Accepting `add book` types the verb;
the suggestion row then offers the command's parameters, and accepting one appends its connective
with an empty quoted value, caret inside:

```
add book                      → row offers: with title, by author, subtitled, in language, …
                                (required first)
add book with title "▮"       → type the value
add book with title "1984"    → row offers the remaining parameters
```

Both quote characters come with the accepted parameter, so the common path never types one, and
nothing is ever pre-placed in the buffer that you then have to delete: a parameter you do not want
is one you simply never accept.

**The two keys.** `Tab` and `Enter` do different jobs, and neither changes meaning with the size of
the suggestion row.

| Key | What it does |
| --- | --- |
| `Tab` / `Shift + Tab` | Moves the highlight down / up the suggestion row, cycling. **Never writes to the buffer.** |
| `Enter` | Writes the highlighted suggestion into the buffer. If it is already there, runs the command. |

So `add b` → `Tab` to land on `add book` → `Enter` puts `add book` in the bar → `Enter` runs it.
With one match the first `Tab` is unnecessary; with several it is how you pick. Typing the whole
name yourself skips straight to the second `Enter`, since the buffer already holds it.

The separation is deliberate. An earlier version had `Tab` complete the buffer when exactly one
suggestion matched and merely move the highlight otherwise — so the same key wrote text or did not,
depending on how many results the query happened to return. One key selects, one key confirms, and
what each does is knowable without counting the row (DECISIONS 27).

**There is no "back one parameter" key.** `Backspace` deletes a character and nothing else; on an
empty field it does nothing, as it does in every text field. A dedicated step-back gesture was
built and removed — it is exactly the invented keybinding DECISIONS 27 rejects prompt sequences
for needing, and on a masked credential field it was invisible: eight dots deleted, a ninth press,
and you were somewhere else with nothing on screen having said so. `Esc` cancels the whole command
and is the only way out of a step.

**Autoformat.** As segments accumulate, the bar lays them out one per line and grows to fit:

```
add book
  with title "Nineteen Eighty-Four"
  by author "George Orwell"
  published in "1949"
```

The line breaks are **display only** — the buffer holds one line, `Enter` always commits, and what
travels is a single normalized string. The bar's height is therefore a readout of how much command is
currently under composition.

**Editing and re-running.** The command is ordinary text in an ordinary text field: the arrow keys,
`Home` / `End`, word-wise `Ctrl + ←/→` and selection all behave the way they do everywhere else. A
mistake three fields back is a cursor move, not a special "go back" gesture. A previous command can be
recalled, one quoted value changed, and run again — which is what cataloguing five books by the same
author actually looks like. It is also copyable: the examples in `help` can be pasted, and a bug report
can carry the exact input.

**Quoting.** Every value is quoted, always, whether or not it contains a space. One rule, no
judgment call about which values need it. MVP1 has **no escape convention**, so a value containing a
double quote is not yet expressible (DECISIONS, *Known limitations*).

---

## Books

| Command | Description | Parameters |
| --- | --- | --- |
| `add book` | Catalog a new book | `with title`*, `by author`*, `subtitled`, `in language`, `published in`, `with isbn`, `with summary` |
| `update book` | Edit an existing book | acts on the selected row; then any parameter of `add book` |
| `remove book` | Delete a book | acts on the selected row; then a confirmation naming the book |
| `list books` | List all books | — |
| `list incomplete books` | List books with any missing field | — |
| `list incomplete books having no isbn` | Narrow to books with no ISBN | — |
| `list incomplete books having no cover` | Narrow to books with no cover | — |
| `list incomplete books having no year` | Narrow to books with no publication year | — |
| `list incomplete books having no language` | Narrow to books with no language set | — |

> **There is no `show book`.** Detail is reached by opening a row, not by naming one: any result
> view arrives with its first item already selected, so `orwell` then `Enter` is the whole gesture,
> and `Alt` + arrows pick a different row first. A verb that finds one book by name would be a
> third route to a screen `search` and `open` already reach — the redundancy ADR 13 rejects the
> reverse-parser for. What it costs is named under *Selection is the target*.

## Authors

| Command | Description | Parameters |
| --- | --- | --- |
| `add author` | Create an author record | `named`* |
| `update author` | Rename an author | `named`*(target), `renamed to`* |
| `remove author` | Delete an author | `named`* (target), then a confirmation |
| `list authors` | List all authors | — |
| `list unattributed authors` | List authors with no books attributed to them | — |

> An author belongs to a user directly (`authors.owner_id`), not to a library and not to the books
> that credit them — which is what makes this command expressible at all. Scoping authors through
> their books, as an earlier schema did, put an unattributed author outside every user's catalog:
> exactly the record this command exists to find (DECISIONS 31).

## Query

| Command | Description | Parameters |
| --- | --- | --- |
| `search` | Multi-token full-text search across the catalog | the rest of the line, unquoted and without a connective — the whole remainder *is* the term |
| `filter` | Structured filtering by metadata | `in language`, `published in` |

> Typing any unrecognized text runs `search` implicitly, so the explicit `search` command is mainly a discoverability affordance.

**What is searched.** Everything in the catalog that is prose: titles, subtitles, author names,
publishers, summaries. Ranked, not flat — a match in a title outranks one in a summary, or a long
summary would bury the field people are actually looking for.

Three kinds of field stay out, each for its own reason. **ISBNs are not words**: the canonical
13-digit form is one token and the hyphenated form is several, neither of which a word index handles
usefully, so an ISBN is matched exactly against the stored canonical form and joined into the same
result set. **Codes and numbers are filter dimensions, not terms** — typing `en` does not mean "show
me English books", and `1949` is a year to a person and a token to an index; `filter` is where these
belong. **The cover has nothing to match.**

**A result set may be mixed.** An author who matches appears as an author row beside the book rows,
and opening it lists that author's books. In practice most author matches surface as books already,
since the author's name is a searchable field *of the book* — the standalone author row is what is
left when someone has no books credited to them, which is precisely the record `list unattributed
authors` exists to find. The view contract carries the difference (DECISIONS 32); nothing about the
list, the paging or the selection changes.

Search results behave like any other result view, including when there is exactly one of them: the
row is selected, not opened. A single hit that opened itself would make `Enter` mean two different
things depending on a count the user cannot predict while typing — the same defect that separated
`Tab` from `Enter` (DECISIONS 27) — and it would hide the fact that the search matched only once,
which is itself worth seeing.

## Dashboard

| Command | Description | Parameters |
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

| Command | Description | Parameters |
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

### Selection is the target

**A result view always has a selection, from the moment it renders.** The first item on the page is
selected before the user touches anything, so `Enter` opens it and `Alt` + arrows pick a different
one first. Nothing has to be aimed before it can be acted on, which is what lets `search` + `open`
stand in for a `show book` that no longer exists.

This settles how a command names the record it acts on: **the target is view state, not a parameter
in the sentence.** `update book` and `remove book` act on the selected row. The alternative,
`named "…"`, was ambiguous the moment two books share a title, and would have made every targeted
command carry a second lookup that can fail in its own way.

**The cost, stated where it lands.** A targeted command is no longer a complete value. `remove book`
does not say *which* book in its own text, so it cannot be recalled and re-run with one value
changed the way `add book` can (DECISIONS 27), and a command carried into a bug report no longer
carries what it acted on. That is tolerable for a read — opening the wrong row costs a keystroke —
and it is the reason `remove book` keeps its confirmation step: for a destructive command the target
has to be restated *somewhere*, and if it is not in the sentence it must be on screen before the
act. The confirmation therefore names the book, rather than asking a generic "are you sure".

### Three kinds of movement

The command bar always holds focus, so bare letters are typing, not shortcuts — there are no
vim-style `hjkl` bindings and there never will be. That constraint forces the three movements a
result view supports to be separated by modifier rather than by letter:

| Movement | Keys | What moves |
| --- | --- | --- |
| **Scroll** | `↑` `↓`, `Page Up` / `Page Down` — *while the command bar is empty* | The viewport only. The selection stays where it is, nothing is fetched. |
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

**Arrows while composing.** A command under composition is multi-line text, and the arrow keys have
to move the caret through it — so bare `↑` `↓` scroll the viewport only while the bar is **empty**,
and move the caret once anything is typed. This is a mode, and it is accepted only because the mode is
visible without being told: an empty one-line bar scrolls, a bar with a command in it edits. `Alt` +
arrows (select) and `Ctrl` + arrows (page) are unaffected and work in both states, which keeps the two
movements that touch the result set reachable without clearing what you were typing.

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
cognitive load — four, counting the empty-bar condition above — and the boundary between `Page Down`
(move within the loaded batch) and `next page` (fetch another batch) is not self-evident from the keys
alone. The answer is interactive guidance
rather than documentation: the view states what is available *now* — how much of the result set is
on screen, and which keys act on it — so the model does not have to be held in the head. Until that
lands, this is the first-use observation in `TESZTELES-1.md` most worth watching.

## Shell

| Command | Description | Parameters |
| --- | --- | --- |
| `help` | Show available commands | Optional command name for detail |
| `clear` | Clear the screen | — |
| `cancel` | Clear the command bar (`Esc`) | — |
| `quit` / `exit` | Exit ImperaBook | — |

## Account

| Command | Description | Parameters |
| --- | --- | --- |
| `login` | Start a session | `username`*, `password`* — collected off-buffer, in dedicated fields |
| `logout` | End the session | — |
| `account` | Account settings | — (not implemented in MVP1) |

`login` is the only command an unauthenticated client may run, and the only one whose answers do
not travel through the command channel: it posts to its own endpoint, because the composed text is
logged, visible and parsed by a grammar with no escape rules (DECISIONS 24/25). `logout` carries no
secret and is an ordinary command on the control channel.

Both change what is runnable, so the command registry is reloaded after either one. Signed out,
the registry holds `login` and nothing else — which is why it starts itself (see *Input model*).

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
| `list` | list books, list incomplete books, list authors, list unattributed authors |
| `incomplete` | list incomplete books and all four of its narrowings |
| `isbn` / `cover` / `year` / `language` | the matching `list incomplete books having no …` |
| `unattributed` | list unattributed authors |
| `book` / `books` | add book, update book, remove book, list books, list incomplete books (+ narrowings) |
| `author` / `authors` | add author, update author, remove author, list authors |
| `search` | search |
| `filter` | filter |
| `dashboard` | dashboard |
| `page` | next page, prev page |
| `back` `open` `top` `bottom` | the navigation command itself (only when a view is active) |
| `help` `clear` `cancel` `quit` / `exit` | the shell command itself |
| `login` `logout` `account` | the account command itself (`login` only while signed out, the other two only while signed in) |

**Ranking.** When several commands match, they are ordered by:

1. **Exact full-command match first** — typing `search` puts `search` at the top, ahead of anything that merely contains the token.
2. **Leading-verb match outranks contained-token match** — a token matched as the first word ranks above the same token appearing later in a command name.
3. **Deterministic tiebreak** — ties resolve in a stable order (alphabetical within a group) so suggestions never reorder under the cursor.
4. **Context gates navigation** — navigation commands are suggested only while their view is on screen; otherwise they are hidden, not just deprioritized.
5. **No match falls through** — if nothing matches a known command, no suggestion is selected; on submit the raw input runs as `search`.

### Suggestion inside a command

Once a command name is in the bar, the matcher keeps running on what follows it — and what it reads
is a flat list of tokens, each with its position (see DECISIONS 28).

- **The remaining parameters are offered.** With the caret outside a quoted value, the suggestions
  are the command's declared connectives minus the ones already present. Accepting one appends
  `connective ""` and puts the caret inside.
- **Required first.** Required parameters are ranked above optional ones and marked, so the ordering
  of the row is itself the statement of what the command still needs.
- **Optional parameters are discovered here, not memorised.** Nothing is pre-placed; everything the
  command accepts appears in this row as it becomes available, which is how a user finds out that
  `add book` takes an ISBN.
- **Lexical problems are shown as they happen.** An unclosed quote, or a word outside a value that
  matches no known connective, is visible in the bar before `Enter`. This is scanning, not
  interpretation — the bar knows that a token is not a connective, and nothing about what the command
  will do.
- **Nothing is corrected automatically.** As with the verb (ADR 13), an ambiguous or unrecognized
  segment produces a menu, never a guess, and a command that cannot be validated fails loud on submit
  with the offending offset (DECISIONS 12/28).

---

## Out of scope for MVP1

Deferred to MVP2 or later: **library creation and management** (one library per user in MVP1), **tags and categories** (including tag-based filtering and category distribution on the dashboard), **command composition** (grouping, boolean conditions, and chaining one command's result into another — the point at which the flat grammar needs a real parser, DECISIONS 28), **an escape convention for quotes inside a value**, lending (`lend` / `return`, which is also where
*where a copy physically is* becomes a question the model answers — MVP1 only records that a book
belongs to a library, DECISIONS 11), reading status, per-command library switching, batch edit, **marking a field as intentionally absent** for a single book (which is what would let the *Needs attention* list reach zero), ISBN scan, AI cover/page inference, and export utilities. Single-token typo tolerance in suggestions (e.g. `add bok` → `add book`) is also MVP2; word-order reinterpretation of the **verb phrase** (e.g. `book add` → `add book`) is rejected outright, not deferred (see ADR 13). Free ordering of *parameter* segments is not that, and is in MVP1 (see ADR 27).

Note that **inline parameters are no longer a deferred power-user feature** — they are the only input model (ADR 27). What MVP2 adds on top is composition, not syntax.

## Open questions

1. **Author find-or-create.** Does `add book` auto-create an unknown author from the name given in `by author "…"`, or must the author already exist (via `add author`)? One half of this is now settled: whichever way it goes, the *lookup* is scoped to the signed-in user, since an author belongs to a person rather than to a library or to the books that credit them (DECISIONS 31). What is still open is whether a miss creates a row or fails, and — if it creates — what stops two spellings of one person becoming two authors. The `AddAuthor` write path is pending either way, so pick before implementing the author segment of `add book`.

2. **~~How does a command name its target?~~ Settled: the selection.** `update book` and
   `remove book` act on the selected row, not on a `named "…"` parameter — see *Selection is the
   target*. What is still open is the narrower question that answer creates: **what a targeted
   command does with no selection.** Refusing is honest and stops the flow; falling back to the
   first row is a guess about intent, which is what ADR 13 rejects everywhere else. Refusal is the
   likelier answer, and the wording of that refusal is the part that decides whether it reads as
   guidance or as a wall.

3. **The summary field.** A multi-paragraph summary inside a quoted segment is the one place the
   composed sentence is worse than a form. Either summaries stay short in MVP1, or `add book` grows an
   off-buffer step for this field the way `login` has one for credentials (DECISIONS 27).

4. **Does `filter` absorb the incomplete listings?** `filter` builds structured filtering
   interactively, and "has no ISBN" is a filter dimension. They are kept separate because the
   named commands are completable and reachable from a dashboard row, while `filter` covers open
   values and combinations — but if `filter` ever gains presence/absence dimensions, the overlap
   is worth resolving rather than carrying twice.
