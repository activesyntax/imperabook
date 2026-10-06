# ImperaBook — Demo Video Script (~4 minutes)

Audience: hiring managers and technical leads. Goal: show original ideas and deliberate decision
making in as little of their time as possible. The demo goes from one-word commands to full
sentences: navigation first, then `add book`, `find` and `list books`. Each feature shows one or two
decisions and names the trade-off. Narration is plain text; *on-screen actions are in italics*.
About 510 spoken words: roughly 3½ minutes, plus pauses while the actions play out, about 4 minutes
in all.

---

### 0:00 — What this is

*The ImperaBook dashboard, command bar at the bottom.*

ImperaBook is a home library catalog with one unusual idea. Instead of forms, you type short English
sentences, and the interface guides every keystroke. I'll go from the simplest commands to full
sentences, and show the decisions behind each step, including what they cost.

### 0:15 — One word: `library`, `dashboard`, `help`

*Type `library`, Enter. Type `dashboard`, Enter. Click `help` in the side nav.*

The simplest commands are a single word. `library` shows statistics, `dashboard` shows what needs
attention, and `help` lists everything. The same commands sit in the side nav, and clicking one runs
exactly what typing it would.

**Decision: the GUI teaches the CLI.** Every clickable element is a real command and shows its name.
Each dashboard finding, like *books having no ISBN*, displays the command behind it and runs it on
click. Clicking today teaches typing tomorrow.

### 0:50 — `add book`: the newline is the separator

*Type `ad`: chips for add book and add author. Tab. Ghost text "book title". Type the rest, Enter
between lines; `by author her` offers "Frank Herbert". Enter twice; the book appears.*

```
add book Dune
    by author frank herbert
    published in 1965
```

**Decision: suggestions come from the grammar itself.** The grammar is ANTLR, written once and
compiled into the frontend. The parser decides validity, and antlr4-c3 computes what can come next
at the caret, so suggestions can't drift from what the system accepts. Ghost text names each value,
and the user's own catalog fills in authors. Recognition over recall: nobody memorizes syntax.

**Decision: no quotes.** The first version quoted every value, like a classic command line. It was
slow to type, and a title containing a quote couldn't be entered at all. Now the first words of a
line name the field, and the value runs to the end of the line.

**The cost:** Enter now has two meanings, run or new line. That's a mode, and modes cause errors, so
the status bar always says in advance what Enter will do, and a dot turns green when the command is
valid. A heuristic is acceptable only if it announces itself.

### 2:05 — `find`: search is a command, not a fallback

*Type `find jokai`. Results show "Jókai Mór" under Authors and his books under Books.*

`find` matches any part of a title, summary or name, ignores accents, and understands English word
forms. Originally, any unrecognized text ran as a search. I removed that: a typo silently becoming a
search hides the mistake. Now invalid text doesn't run, and the status bar explains why.

**The cost:** five more characters to type.

### 2:30 — `list books`: words, not symbols

*Type the filter; then Alt+arrows across the result grid, Enter to open a book, Esc to go back.*

```
list books whose page count is at least 300
    published before 1970
    having no isbn
```

`At least` is longer than `>=`, but symbols interrupt typing and have to be learned. The filters read
as English, use the dashboard's own phrases, and the result is titled with the same words. The grid
is fully keyboard-navigable.

**The cost:** English only, and no `or`, both deliberately left for a later, composable grammar.

### 3:00 — No AI, deliberately

There's no language model here. A closed grammar, the user's own data and explicit rules are
deterministic, instant, testable and never confidently wrong: intelligent enough, and no more.

### 3:15 — How it's built

*Scroll quickly through `doc/DECISIONS.md`, then the test runs.*

It's built with Angular signals, ASP.NET Core minimal APIs, EF Core and PostgreSQL, using type-driven
domain modeling, and covered by frontend, domain and HTTP-level API tests. Every significant choice
is recorded as an architecture decision with its context, alternatives and trade-off, including the
ones I later reversed, like moving parsing from the server to the client.

### 3:40 — Close

*Back to the command bar.*

The point isn't a book catalog. It's that a friendly interface and a fast one don't have to be
different products, and that getting there is a series of decisions you can explain. That's how I
like to work.

*Name, contact, repository link.*
