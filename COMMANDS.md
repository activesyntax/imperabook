# ImperaBook — Command Reference (MVP1)

## Input model

ImperaBook is driven by plain-text commands typed into a single command bar.

- Commands are **bare verbs** — you type the command, and the interactive shell then prompts for each parameter in turn. There are no flags or special characters in MVP1.
- Required fields are marked `*`. Optional fields can be skipped at the prompt.
- Any input that does **not** match a known command is handled as a full-text search (the same as the explicit `search` command).
- `cancel` aborts the current prompt sequence at any point.

Inline parameters for power users (e.g. `add book "The Hobbit" --author "Tolkien"`) are deferred to MVP2.

---

## Books

| Command | Description | Prompts for |
| --- | --- | --- |
| `add book` | Catalog a new book | Title*, Subtitle, Author*, Language, Publication year, ISBN, Summary, Tags |
| `update book` | Edit an existing book | Book to edit (select/search), then any of the fields above |
| `remove book` | Delete a book | Book to remove (select/search), confirmation |
| `show book` | Show full detail for one book | Book to view (select/search) |
| `list books` | List all books in the active library | — |

## Libraries

| Command | Description | Prompts for |
| --- | --- | --- |
| `add library` | Create a new library | Name* |
| `update library` | Rename a library | Library to edit, new Name |
| `remove library` | Delete a library | Library to remove, confirmation |
| `list libraries` | List all your libraries | — |

## Authors

| Command | Description | Prompts for |
| --- | --- | --- |
| `add author` | Create an author record | Name* |
| `update author` | Rename an author | Author to edit, new Name |
| `remove author` | Delete an author | Author to remove, confirmation |
| `list authors` | List all authors | — |

## Tags

| Command | Description | Prompts for |
| --- | --- | --- |
| `add tag` | Create a tag | Name* |
| `remove tag` | Delete a tag | Tag to remove, confirmation |
| `list tags` | List all tags | — |
| `tag book` | Attach tag(s) to a book | Book (select), Tag(s) to attach |
| `untag book` | Remove tag(s) from a book | Book (select), Tag(s) to remove |

## Query

| Command | Description | Prompts for |
| --- | --- | --- |
| `search` | Multi-token full-text search | Search term(s) |
| `filter` | Structured filtering by metadata | Filter dimensions, built interactively: language, publication year, tag |

> Typing any unrecognized text runs `search` implicitly, so the explicit `search` command is mainly a discoverability affordance.

## Dashboard

| Command | Description | Prompts for |
| --- | --- | --- |
| `dashboard` | Render analytical widgets | — (shows category distribution, language breakdown, total collection metrics) |

## Shell

| Command | Description | Prompts for |
| --- | --- | --- |
| `help` | Show available commands | Optional command name for detail |
| `clear` | Clear the screen | — |
| `cancel` | Abort the current prompt sequence | — |
| `quit` / `exit` | Exit ImperaBook | — |

---

## Out of scope for MVP1

Deferred to MVP2 or later: inline parameters/flags, lending (`lend` / `return`), reading status, per-command library switching, batch edit, ISBN scan, AI cover/page inference, and export utilities.

## Open questions

These affect the parser and prompt flow, so worth settling before wiring the commands:

1. **Library context.** With no `switch library` command, MVP1 assumes a single active library and book operations target it implicitly. Confirm this is the intent — if MVP1 must address a non-default library, you need either a per-command "which library?" prompt or to reinstate switching.
2. **Category vs. tag.** The dashboard reports "category distribution" while filtering uses "tags." The commands above model tags as a many-to-many relationship. Decide whether "category" is a derived/primary tag or a distinct single-valued field.
3. **Author find-or-create.** Does `add book` auto-create an unknown author from the name entered at its prompt, or must the author already exist (via `add author`)? The Author FK / `AddAuthor` path is still pending, so pick one before implementing the author prompt in `add book`.
