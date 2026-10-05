# ImperaBook — Demo Video Script (~4 minutes)

Narration is plain text; *on-screen actions are in italics*. About 530 spoken words: roughly 3½
minutes at a relaxed ~150 words a minute, plus pauses while the actions play out on screen.

---

### 0:00 — Hook

*The empty ImperaBook dashboard. The cursor blinks in the command bar.*

Most software asks you for data the same way: a form. Find the field, click it, type, find the next
one, hope you didn't miss a required one. Or the opposite: a command line, fast, but you have to
remember every flag.

ImperaBook does neither. You just say what you want.

### 0:20 — One sentence, one line per detail

*Type `add book Dune`. Press Enter — a new indented line appears.*

This is how you add a book. The title goes right after the command. Enter starts a new line,
and each detail gets a line of its own.

*Type `by author frank herbert`, Enter, `published in 1965`, Enter, `in language english`, Enter
twice. The book appears with generated cover art.*

No quotes, no flags, no fields to hunt for, no order to remember. Write it the way you'd write it on
a sticky note. Notice I typed "frank herbert" in lowercase: the name was capitalized for me, and since
he wasn't in my library yet, he was added as an author. There's no cover image yet, so ImperaBook
generated one.

### 0:55 — Suggestions that know what comes next

*Clear the bar. Type `ad` — chips: add book, add author. Accept with Tab. Ghost text: "author name".*

You never have to memorize any of this. The row above the bar always shows what can come next. When
a value goes here, the faint ghost text tells you what kind: an author name, a year, a page count.

*Start a new book, type `by author her` — the chip "Frank Herbert" appears.*

Where the answer is already in your own library, it suggests that too: your authors, the languages
your books are in. And once you've used a detail, it's gone from the list. The suggestions only ever
offer things that will actually work.

### 1:30 — The status bar: no surprises

*Point at the dot turning green, the description, and the "Ctrl+Enter run" hint.*

Under the bar, a small dot turns green when what you typed is a complete command. Next to it is a
one-line description of what that command does, and what Enter is about to do: run it, or start a
new line. You never press a key just to find out what it does.

### 1:50 — Asking questions in plain English

*Type the filter, one line at a time.*

```
list books whose page count is more than 300
    written by herbert
    published before 1970
```

Searching works the same way. Each filter is a phrase you could say out loud, and the results say
your question back to you as their title. Find also forgives: `find jokai` finds Jókai, accents or
not, and `flies` finds "flying".

### 2:20 — The dashboard is a teacher

*Run `dashboard`. Point at "Needs attention: 7 books have no ISBN — list books having no isbn".*

The dashboard shows what your library is missing: books without a page count, authors with no books.
Every finding shows the command that lists those records, and clicking it runs that command. Use
the mouse today, and tomorrow you'll just type it.

### 2:45 — CLI and GUI, in harmony

*Click "help" in the side nav. Then use Alt+arrows across the result grid, Enter to open, Esc to go back.*

That's the idea behind the whole interface. Everything in the side nav is a real command, and
clicking runs exactly what typing would. The results are a visual grid of covers and portraits that
you can click or walk with Alt and the arrow keys. Enter opens an item, and Escape takes you back to
exactly where you were.

*Select a book, type `remove book`. The status bar asks: Remove "Dune"? yes / no.*

Even deleting stays in the flow: no pop-up, just a clear question in the place you're already
looking.

### 3:15 — Not AI. IE.

*Slow pan across the command bar and grid.*

There's no AI here. Nothing guesses, nothing is sent to a model, nothing will confidently do the
wrong thing. ImperaBook is IE: *intelligent enough*. It has a small, exact grammar, your own catalog,
and a few honest rules. That turns out to be enough to know what you mean, suggest what comes next,
and stay out of your way.

### 3:40 — Close

*Back to the empty bar.*

Fewer clicks. Less to remember. No forms, no flags, no surprises. Just say what you want, and get
back to your books.

ImperaBook.

*Logo.*
