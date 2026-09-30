# API tests (Hurl)

Black-box HTTP checks against a running `ImperaBook.API`. These are end-to-end
tests against the live host — not part of the build — which is why they live
beside `src/` rather than inside the API project.

## Prerequisites

- The API running locally with the development seed applied
  (`DevelopmentDataSeeder` inserts the user, library, and three books these
  assertions expect).
- [Hurl](https://hurl.dev) installed: `pacman -S hurl` on Arch, or see the docs.

## Configure

Edit `host` in `vars.env` to match your Kestrel dev port (check
`launchSettings.json`). The seeded `libraryId` / `ownerId` are also there and
must stay in sync with `DevelopmentDataSeeder`.

## Run

Whole suite:

```sh
hurl --variables-file vars.env --test *.hurl
```

A single file, with full request/response output:

```sh
hurl --variables-file vars.env --verbose auth.hurl
```

Override the host without editing the file (e.g. a deployed environment):

```sh
hurl --variables-file vars.env --variable host=https://api.example.com --test *.hurl
```

## Files

| File                        | Use case                                      |
|-----------------------------|-----------------------------------------------|
| `public/dashboard-public.hurl` | anonymous `GET /api/dashboard` → 401 with the login screen |
| `public/get-all-books-public.hurl` | anonymous book/author endpoints → 401 |
| `dashboard.hurl`            | signed-in dashboard shape                      |
| `search-books.hurl`         | `GET /books/search` (library and/or title)    |
| `get-library-books.hurl`    | `GET /libraries/{id}/books`                    |
| `search-authors.hurl`       | `GET /api/authors/search?q=` author suggestions for the command bar |
| `add-author-errors.hurl`    | `POST /api/authors` same full name twice → 409 with the existing author |
| `get-author.hurl`           | `GET /api/authors/{id}` detail with the author's books; list items link via `open` |
| `get-book.hurl`             | `GET /api/books/{id}` detail, list items link to it via `open` |
| `public/routing-public.hurl` | unknown `/api` paths → JSON 404, not the SPA |
| `remove-book.hurl`          | `DELETE /api/books/{id}`: removed, then 404; its author stays |
| `add-book.hurl`             | `POST /api/books` author search: unknown / new / existing / ambiguous |
| `add-book-errors.hurl`      | `POST /api/books` validation / 422 / 400s, no stray author |

## Notes

- `add-book.hurl` mutates state. Re-running accumulates "Clean Architecture"
  and "Refactoring" rows; assertions use the captured returned id, so they stay correct, but a
  clean run starts from a fresh DB (drop the Docker volume to reset).
- Title filtering is case-sensitive (Postgres `LIKE`); the substrings here match
  the seeded casing.
