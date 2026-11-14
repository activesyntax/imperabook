# API tests (Hurl)

Black-box HTTP checks against a running `ImperaBook.API`. These are end-to-end
tests against the live host — not part of the build — which is why they live
beside `src/` rather than inside the API project.

## Prerequisites

- The API running locally with the development seed applied. `DevelopmentDataSeeder`
  creates two users, `bill` and `mary`, each with a library, books and authors. The
  tests sign in as `bill` and use `mary`'s data to check that each user sees only their own
  catalog.
- [Hurl](https://hurl.dev) installed: `pacman -S hurl` on Arch, or see the docs.

## Configure

Edit `host` in `vars.env` to match your Kestrel dev port (check
`launchSettings.json`).

The seeded users' password is `Seed:Password` from the API's configuration
(`appsettings.Development.json`, user secrets, or the `Seed__Password` environment
variable). It is not kept in `vars.env`; pass it with `--variable password=…`. The
examples below read it from `appsettings.Development.json`.

## Run

Whole suite:

```sh
pw=$(jq -r .Seed.Password ../src/ImperaBook.Api/appsettings.Development.json)
hurl --variables-file vars.env --variable password="$pw" --test --jobs 1 *.hurl public/*.hurl
```

`--jobs 1` is required. Hurl runs files in parallel by default, and several files add
books and authors. `dashboard.hurl` compares the dashboard's counts with the lists' counts,
so a file adding a book between those two requests makes it fail.

A single file, with full request/response output:

```sh
hurl --variables-file vars.env --variable password="$pw" --verbose auth.hurl
```

Override the host without editing the file (e.g. a deployed environment):

```sh
hurl --variables-file vars.env --variable password="$pw" --variable host=https://api.example.com --test --jobs 1 *.hurl public/*.hurl
```

## Files

| File                        | Use case                                      |
|-----------------------------|-----------------------------------------------|
| `public/dashboard-public.hurl` | anonymous `GET /api/dashboard` → 401 with the login screen |
| `public/get-all-books-public.hurl` | anonymous book/author endpoints → 401 |
| `dashboard.hurl`            | signed-in dashboard shape; each finding's count matches the list its command shows |
| `list-books.hurl`           | `GET /api/books` unfiltered: "All books", only the signed-in user's |
| `list-authors.hurl`         | `GET /api/authors` unfiltered: "All authors", only the signed-in user's |
| `search-authors.hurl`       | `GET /api/authors/search?q=` author suggestions for the command bar |
| `add-author-errors.hurl`    | `POST /api/authors` same full name twice → 409 with the existing author |
| `get-author.hurl`           | `GET /api/authors/{id}` detail with the author's books; list items link via `open` |
| `list-books-pages.hurl`      | `GET /api/books` page filter ("whose page count is …"): more/less than, is, at least/most, not, between; bad filter → 400 |
| `list-books-written-by.hurl` | `GET /api/books?author=` ("written by"): part of a name, any case, no accents; with the page filter |
| `list-books-published.hurl`  | `GET /api/books` year filter ("published …"): in, before, after, between; bad filter → 400 |
| `list-books-language.hurl`   | `GET /api/books` language filter ("whose language is [not] …"): by name, native name or code; `/api/books/languages` |
| `list-books-having-no.hurl`  | `GET /api/books?missing=` ("having no …"): each property, several together, with other filters; bad name → 400 |
| `list-authors-having-no.hurl` | `GET /api/authors?missing=books`: authors no book credits; matches the dashboard finding |
| `list-authors-filters.hurl`  | `GET /api/authors` born and died (in/before/after/between, BC) and living filters, together; bad filter → 400 |
| `search.hurl`                | `GET /api/search?q=` (find): title, part of a word, stemming, author name, all keywords |
| `get-book.hurl`             | `GET /api/books/{id}` detail, list items link to it via `open` |
| `public/about-help-public.hurl` | `GET /api/about`, `/api/help` without a session → 200 |
| `public/routing-public.hurl` | unknown `/api` paths → JSON 404, not the SPA |
| `remove-book.hurl`          | `DELETE /api/books/{id}`: removed, then 404; its author stays |
| `remove-author.hurl`        | `DELETE /api/authors/{id}`: their books stay, with no author; then 404 |
| `add-book.hurl`             | `POST /api/books` author search: unknown / new / existing / ambiguous |
| `add-book-errors.hurl`      | `POST /api/books` validation / 422 / 400s, no stray author |

## Notes

- `add-book.hurl` mutates state. Re-running accumulates "Clean Architecture"
  and "Refactoring" rows; assertions use the captured returned id, so they stay correct, but a
  clean run starts from a fresh DB (drop the Docker volume to reset).
- Files that add records give them a `{{newUuid}}` suffix, so they don't clash across
  re-runs. Name casing capitalizes the letter after a hyphen (as in *Smith-Jones*), so a
  captured name's suffix is matched with `[0-9a-fA-F-]`, not `[0-9a-f-]`.
- An author's detail has a life-range text view only when there is a life range to show, so
  the author's books are selected by type (`$.views[?(@.type=='itemCollection')]`), not by
  index.
- Hurl 8 evaluates JSONPath per RFC 9535. A filter query with exactly one match returns
  the value itself, not a list, and one with no match is "missing", so assert absence with
  `not exists` rather than `count == 0`.
