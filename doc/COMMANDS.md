# ImperaBook — Command Reference (MVP1)

## Input model

ImperaBook is driven by plain-text commands typed into a single command bar.

- A command is **a short English sentence**: a verb phrase, then what it needs. The first value
  shares the command's line, and every further detail gets **a line of its own**:

  ```
  add book Dune
      by author Frank Herbert
      published in 1965
      in language english
  ```

- **There are no quotes and no flags.** A value runs to the end of its line, so a title with
  quote marks, commas or colons in it is just typed (DECISIONS 34).
- **Details are order-free and given once.** The leading words of a line name the field, so the
  lines can come in whatever order the sentence comes out in. A repeated detail is ignored after
  its first appearance.
- Required values are marked `*`. Optional ones are simply left out.
- The grammar is **closed**: an ANTLR grammar in the frontend (`frontend/src/dsl`) defines every
  command, and nothing outside it runs (DECISIONS 33). To search, say so with `find`.
- **Indenting is automatic.** Every line after the first gets a 4-space indent when you start it with
  `Enter` or paste it in. The indent is only for display, and the grammar ignores it.
- **Passwords are never typed into the command bar.** Signed out, there is no command bar: the side
  nav offers `login`, `about` and `help`, and `login` swaps in dedicated credential fields
  (DECISIONS 25).

MVP1 has **one library per user**; book operations target it implicitly.

---

## Composing a command

**Suggestions follow the sentence.** The row above the bar always offers what can come next at the
caret. At first that is a command, then the next word of the command, then a detail line, then the
words of that detail:

```
ad                      → add book, add author
add book ▮              → (ghost text: book title)
add book Dune           → Enter starts a new line
add book Dune
    ▮                   → by author, subtitled, in language, published in, with isbn, with summary
    by author her▮      → Frank Herbert (from your catalog)
```

- **Values are shown as ghost text.** Where a value goes, such as a title, a year or a page count,
  the bar shows a muted placeholder that names it (`book title`, `year`, `page count`). Ghost text
  is a hint and is never inserted.
- **Catalog values are suggested.** After `by author` or `written by`, the row offers matching
  authors from your catalog. After `whose language is`, it offers the languages your books are in.
  `add author` deliberately suggests nothing: it creates a new author, not one you already have.
- **Used details drop out.** A detail already given is not offered again. Details that exclude each
  other (`died` and `living`) drop out together.
- **Long phrases arrive in two steps.** `whose` is offered beside the other filters, and `page count
  is` / `language is` only after it is chosen. Likewise `published` comes first, and `in` / `before`
  / `after` / `between` follow. This keeps the row short.
- **On an empty bar**, commands that already sit in the side nav (`dashboard`, `library`, `settings`,
  `about`, `help`, `account`, `login`, `logout`) are left out of the row. Once you type anything,
  they are suggested like the rest.

**Keys.**

| Key | What it does |
| --- | --- |
| `Tab` | Accepts the highlighted suggestion. With nothing to accept, it moves focus as usual, so the bar is no keyboard trap. |
| `Ctrl + `` ` `` / `Ctrl + ~` | Moves the highlight to the next / previous suggestion. |
| `Enter` | **Runs** the command, or **starts a new line** when another detail can follow (see below). On an empty bar, it opens the selected item. |
| `Ctrl + Enter` | Runs now, whatever is typed. |
| `Shift + Enter` | Always starts a new line. |
| `Esc` | Clears the bar. On an empty bar, goes back to the previous view. |
| `Ctrl + K` | Focuses the command bar. |

**The Enter rule.** A bare `Enter` does the likely thing, and the status bar says beforehand which
one it will do:

- On a command that can take no more, it **runs**: `dashboard`, `find orwell`, a bare `list books`.
- On a command that can take another detail, it **starts a new line**: `add book Dune`, `list books
  written by herbert`.
- On a **blank line** it runs, so the second `Enter` after the last detail is the run key.

So a one-line command runs on `Enter`, and a sentence with details is finished by pressing `Enter`
twice. `Ctrl + Enter` is shown in the status bar whenever `Enter` would add a line.

**The status bar** sits under the bar and reads the text as you type:

- a **validity dot** turns green once the text is a command that can run;
- a **description** of the command appears once it is recognized (*Add a book to your library*), or
  *Entering command…* while it is still incomplete;
- **key hints** say what `Enter` will do now;
- a refusal appears here too. If you try to run invalid text, the bar keeps it and the status bar
  says why nothing ran.

**Editing and re-running.** The command is ordinary text in an ordinary text area. Arrows, `Home` /
`End` within a line, word-wise `Ctrl + ←/→` and selection all behave as they do anywhere else. A
mistake three lines up is a caret move. When a command fails, for example because an author name is
ambiguous, the server can ask the bar to **keep the text**, so fixing it is one edit and not a retype.

---

## Books

| Command | Description | Details |
| --- | --- | --- |
| `add book <title>`* | Catalog a new book | `by author <name>`, `subtitled <text>`, `in language <name or code>`, `published in <year>`, `with isbn <text>`, `with summary <text>` |
| `remove book` | Remove the selected book | acts on the selection; then a yes/no confirmation in the status bar |
| `update book` | Edit a book | in the grammar, not implemented yet |
| `list books` | List books, optionally filtered | see *Book filters* |

**The author of a new book.** `by author` is **search text**, not an exact name. The server resolves
it against your catalog, ignoring case and accents:

| The search finds | Result |
| --- | --- |
| no `by author` line | the book is added with an unknown author |
| nobody | a new author is created from the name (capitalized, see *Names*) |
| exactly one author, or one exact name match among several | the book is credited to them |
| several authors | nothing is added. The answer lists the candidates, and the bar keeps your text so you can narrow the name. |

A book with no cover gets **generated artwork**, and an author with no portrait gets one too.

### Book filters

Each filter is a phrase. The first may share the command's line, and each further one takes a line
of its own. All of them must hold.

```
list books whose page count is at least 300
    written by herbert
    published before 1970
    whose language is not english
    having no isbn
```

| Filter | Forms |
| --- | --- |
| `whose page count is …` | `more than N` (or `greater than`), `less than N` (or `fewer than`), `at least N`, `at most N`, `between N and M` (both ends included), `not N`, `N` |
| `whose language is [not] …` | an English name (`hungarian`), a native name (`magyar`) or a code (`hu`) |
| `written by …` | any part of an author's name |
| `published …` | `in Y`, `before Y`, `after Y`, `between Y and Z` |
| `having no …` | `author`, `page count`, `publication year`, `language`, `isbn`, `cover`; several lines all apply |

The result says the filters back in its heading (*Books written by herbert published before 1970*).
When the filter is about pages or years, those numbers appear on the cards. A book whose page count or
year is unknown drops out of any comparison against it.

## Authors

| Command | Description | Details |
| --- | --- | --- |
| `add author <name>`* | Create an author | `born in <year>`, `died` or `died in <year>`, `living` |
| `remove author` | Remove the selected author | acts on the selection; then a yes/no confirmation. Their books stay, with an unknown author. |
| `update author` | Rename an author | in the grammar, not implemented yet |
| `list authors` | List authors, optionally filtered | see *Author filters* |

```
add author Plato
    born in 428 BC
    died in 348 BC
```

**Names.** The last word is the last name, and everything before it is the first name. Names are
capitalized on the way in (`ursula k. le guin` → *Ursula K. Le Guin*), and the particles `van`,
`der`, `de` and `von` stay lowercase unless they come first. A second author with the same name is
refused, ignoring case, accents and spacing (`Bárány` = `barany`).

**Life range.** `died` alone means dead, with the year unknown. `living` means alive, and it excludes
a death year. **Years may end in `BC`**: they are stored as negative numbers and shown as *428 BC*.

**Removing an author** unlinks their books in the same transaction. The confirmation reply says how
many books were left without an author, and `list books having no author` lists them.

### Author filters

| Filter | Forms |
| --- | --- |
| `born …` | `in Y`, `before Y`, `after Y`, `between Y and Z` |
| `died …` | the same four |
| `living` | authors marked alive |
| `having no books` | authors no book is credited to |

Unknown birth or death years drop out of a comparison, as with books.

## Find

| Command | Description | Details |
| --- | --- | --- |
| `find <keywords>`* | Search books and authors | the rest of the line |

Every keyword must match (AND). A keyword matches a **substring** of a title, subtitle, summary or
author name, **ignoring accents** (`jokai` finds *Jókai*). In titles, subtitles and summaries it
also matches by **English stem** (`flies` finds *flying*). Substrings find part of a word (`dun` →
*Dune*), and stemming finds another form of it. Results come in two sections, **Books** and **Authors**. Like every result view, one
hit is selected, not opened.

Codes and numbers are not search terms. A language or a year is a filter, so it belongs to
`list books`.

## Dashboard and the side nav

| Command | Description |
| --- | --- |
| `dashboard` | Collection metrics and the *Needs attention* findings |
| `library` | Library statistics |
| `settings` | User settings |
| `about` | About ImperaBook (works signed out) |
| `help` | Commands, keys and examples (works signed out) |
| `account` | Account settings (not implemented in MVP1) |
| `login` / `logout` | Start / end the session |

**Needs attention** shows real counts: books with no author, page count, publication year,
language, ISBN or cover, and authors with no books. Each finding shows the command that lists those
records (`list books having no isbn`). Clicking a finding runs that command, so reading the
dashboard teaches the command.

The **side nav** shows the signed-in user and their library, then the pinned commands (`dashboard`,
`library`), the application commands and the account commands. Every entry is a real command:
clicking it runs exactly what typing it would. Signed out, the nav offers only `login`, `about` and
`help`.

## Navigation

Navigation has no typed commands. It uses keys, because the bar always holds focus and plain letters
are always typing.

| Movement | Keys | What moves |
| --- | --- | --- |
| **Scroll** | `Page Up` / `Page Down` (a modest step); `Home` / `End` while the bar is one line | The viewport only |
| **Select** | `Alt` + `↑` `↓` `←` `→` | The selection, geometrically through the grid; scrolls it into view |
| **Open** | `Enter` on an empty bar, or a click | The selected item's detail |
| **Back** | `Esc` on an empty bar | The previous view, with the selection and scroll position restored |

Bare `↑` `↓` never scroll the page. They belong to the bar, which is multi-line.

**A result view always has a selection.** The first item is selected as soon as the view renders,
so `find dune`, then `Enter`, then `Enter` opens the first hit. On a book's detail, the author's name
links to the author, and an author's detail lists their books.

**The selection is the target.** `remove book` and `remove author` act on the selected item rather
than on a name in the sentence. A name is ambiguous the moment two books share a title. The cost is
that the sentence no longer says *which* record it acts on. So the confirmation names it (*Remove
"Dune"? yes / no*) and offers `yes` / `no` as chips. `Enter` answers, and `Esc` cancels.

---

## Out of scope for MVP1

The following are deferred to MVP2 or later:

- `update book` / `update author`: in the grammar, not implemented;
- paging through large result sets;
- library creation and management, since MVP1 has one library per user;
- tags and categories;
- **command composition**: grouping, `or` conditions and chaining one result into another;
- lending;
- reading status;
- batch edit;
- **marking a field as intentionally absent** (a pre-ISBN book will always be "missing" an ISBN);
- ISBN scan;
- export;
- stemming in languages other than English;
- typo tolerance in commands.

Word-order reinterpretation of the verb phrase (`book add`) is rejected rather than deferred
(DECISIONS 13).

## Open questions

1. **Long summaries.** `with summary` takes one line. A multi-paragraph summary is the one place where
   a sentence is worse than a form with a text area.
2. **Compound last names.** "The last word is the last name" splits *Ursula K. Le Guin* as *Ursula K.
   Le* + *Guin*. Correct sorting needs either an explicit separator or a particle-aware split.
3. **Non-English stemming.** `find` stems in English only. Choosing a stemmer per book by its
   language is possible in Postgres, but an index can't follow the row's language without one index
   per language.
