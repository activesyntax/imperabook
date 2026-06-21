# ImperaBook — Command Reference (MVP1)

## Input model

ImperaBook is driven by plain-text commands typed into a single command bar.

- Commands are **bare verbs** — you type the command, and the interactive shell then prompts for each parameter in turn. There are no flags or special characters in MVP1.
- Required fields are marked `*`. Optional fields can be skipped at the prompt.
- Each user has exactly one library, so book operations target it implicitly — there is no library selection step.
- Any input that does **not** match a known command is handled as a full-text search (the same as the explicit `search` command).
- `cancel` aborts the current prompt sequence at any point.

Inline parameters for power users (e.g. `add book "The Hobbit" --author "Tolkien"`) are deferred to MVP2.

---

## Books

| Command | Description | Prompts for |
| --- | --- | --- |
| `add book` | Catalog a new book | Title*, Subtitle, Author*, Language, Publication year, ISBN, Summary |
| `update book` | Edit an existing book | Book to edit (select/search), then any of the fields above |
| `remove book` | Delete a book | Book to remove (select/search), confirmation |
| `show book` | Show full detail for one book | Book to view (select/search) |
| `list books` | List every book in your library | — |

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
| `dashboard` | Render analytical widgets | — (shows language breakdown, publication-year distribution, total collection metrics) |

## Shell

| Command | Description | Prompts for |
| --- | --- | --- |
| `help` | Show available commands | Optional command name for detail |
| `clear` | Clear the screen | — |
| `cancel` | Abort the current prompt sequence | — |
| `quit` / `exit` | Exit ImperaBook | — |

---

## Out of scope for MVP1

Deferred to MVP2 or later: inline parameters/flags, lending (`lend` / `return`), reading status, multiple libraries per user, tags/categories, batch edit, ISBN scan, AI cover/page inference, and export utilities.

## Open questions

One decision still affects the parser and prompt flow:

1. **Author find-or-create.** Does `add book` auto-create an unknown author from the name entered at its prompt, or must the author already exist (via `add author`)? The Author FK / `AddAuthor` path is still pending, so pick one before implementing the author prompt in `add book`.
