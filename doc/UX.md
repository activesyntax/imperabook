# UX Notes

This document records UX patterns and the reasoning behind them — the companion to
`DECISIONS.md` (architecture) and `COMMANDS.md` (command reference). The same rule applies: where a
pattern has a soft spot, it is named rather than hidden.

The thesis the patterns serve: **less to hold in your head.** A form asks you to find the field; a
classic CLI asks you to remember the flag. ImperaBook asks you to say what you want in a short English
sentence, and tells you — at every keystroke — what can come next, whether what you typed will run,
and what `Enter` is about to do. It is not artificial intelligence. It is software that is
*intelligent enough*: a closed grammar, your own catalog, and a few honest rules.

---

## 1. Anticipatory draft preview for create commands — *not built*

> **Status.** Designed, not implemented. The ghost text and status bar (sections 4 and 5) took over
> most of what this was meant to do — naming the next value and confirming the shape of the command
> — at a fraction of the cost. Kept as the design for when `update book` arrives, where a live view
> of the record being edited earns more than it does for a blank one.

**Concept.** The moment `add book` is recognized in the bar, the workspace renders a draft book: a
soft placeholder cover and the fields as muted prompts (*e.g. The Hobbit*). As each line of the
command is filled, the draft fills in with it — the sentence and the book it describes, side by side.

**Why.** It collapses the gap between typing and result, and teaches the data model without a
tutorial: the shape on screen *is* the shape a book has.

**Boundaries.** A frontend-only view state until commit, driven by the same parse tree the
suggestions use (DECISIONS 33): nothing persisted, validation unchanged, focus never leaves the bar.
Rendered with the real book detail template in a draft variant, so the preview is honest. Empty
optional fields collapse to absent (DECISIONS 11).

---

## 2. The command bar composes a whole sentence, one detail per line

**Concept.** A command is one visible English sentence that stays visible until it runs. The
first value sits on the command's own line; each further detail takes a line of its own, indented
automatically:

```
add book Dune
    by author Frank Herbert
    published in 1965
```

No quotes, no flags, no field order to remember. A value runs to the end of its line, and the words
that open a line say which field it is. The full mechanics are in `COMMANDS.md`; what follows is why.

**Why lines, not quotes.** The earlier syntax put every value in double quotes on one long line
(`add book with title "Dune" by author "Frank Herbert"`). It was unambiguous and it was a chore:
two characters per value that carry no meaning to a person, a mode (inside / outside a quote) that
had to be tracked by eye, and a title containing a quote mark that could not be typed at all. A line
break is a delimiter people already use without thinking — it is how a postal address, a shopping
list or a recipe is written — and it is one keystroke the user was going to press anyway
(DECISIONS 34).

**The guidance of a form, without the form.** The suggestion row tells you what comes next, the way
a form's labels do, but it is advice beside text you own rather than a field you are put in. Every
earlier line stays on screen and editable; a mistake three lines up is a caret move, not a "back"
button.

**What being text buys.** A visible command is a value. It can be edited and re-run with one line
changed — which is what cataloguing five books by the same author is. It can be copied out of `help`
or into a bug report. And a user who has seen the sentence a few times types it from memory, faster
than any menu, which is the whole promise of a keyboard-first tool.

**The bar's height is a state readout.** One line: a short command, and `Home` / `End` scroll the
workspace. Several lines: a sentence under composition, and those keys move within the line. The
mode is legible at a glance rather than remembered.

**Where it is weakest.** *A long free-text value fights the line.* A multi-paragraph summary is
genuinely worse here than in a text area. Unresolved; see `COMMANDS.md`, *Open questions*.

---

## 3. The signed-out shell is a different view, not a disabled one

**Concept.** Without a session there is **no command bar**. The side nav offers the three things
that work — `login`, `about`, `help` — and `login` puts dedicated username and password fields where
the bar would be. Signing in lands on the dashboard, and the bar, the pinned commands and the user's
badge arrive together.

**Why not the normal shell in a disabled state.** A disabled control invites a press that goes
nowhere. Signed out, almost every command would be in that state: a bar whose suggestions the
server will refuse. The honest rendering shows what is actually available. A password is never
typed into the command bar (DECISIONS 25), so a bar would have nothing to do here at all.

**What arrives with the session.** The chrome reads one public endpoint, `/api/auth/session`, and
re-reads it after `login` and `logout` and on any 401. Everything signed-in — bar, badge, pinned
commands — keys off that one answer.

**Failure is a view, not a banner.** A rejected sign-in returns the login screen with the reason on
it, composed by the same producer that builds the clean one (DECISIONS 26).

---

## 4. Suggestions teach the grammar

**Concept.** The suggestion row always shows what may come next *at the caret*, computed from the
grammar itself (antlr4-c3 over the ANTLR grammar, DECISIONS 33/35). Nothing is hard-coded per
command, so a command added to the grammar is suggested without a line of UI code.

**What it offers, and when.**

- **Words** of the command and its details, as chips. `Tab` accepts; `Ctrl + `` ` `` / `Ctrl + ~`
  move the highlight. A chip ends in a space, so a following `Space` just confirms it.
- **Ghost text** where a value goes: `book title`, `author name`, `year`, `page count`. Muted, never
  inserted — it says *what kind of thing* to type without leaving anything to delete.
- **Your own catalog** where it knows the answer: authors after `by author` and `written by`,
  languages your books are in after `whose language is`. Matching is accent-insensitive, as the
  server's is. `add author` suggests nothing, on purpose — it is about someone *not* yet in the
  catalog, and offering existing names invites a duplicate.
- **Next-line chips.** After a value, the row offers the details that can open the next line, and
  accepting one starts that line, indented.

**What it leaves out.** A detail already given is not offered again; mutually exclusive ones
(`died` / `living`) drop out together. Long phrase families arrive in two steps — `whose`, then
`page count is` / `language is`; `published`, then `in` / `before` / `after` / `between` — so the row
never holds more than a handful of chips. On an empty bar, commands that already sit in the side nav
are left out: the row would only repeat what is on screen.

**Why it matters.** Optional details are *discovered*, not memorised — the row is how a user finds
out that `add book` takes an ISBN, or that a list can be filtered by language. And because the row
follows the real grammar, it never suggests something the bar will then refuse.

---

## 5. The status bar says what will happen before it happens

**Concept.** A thin line under the bar answers three questions continuously:

1. **Will this run?** A dot — green when the text is a complete command, neutral otherwise. The label
   and the message carry the same fact for screen readers.
2. **What is it?** Once the command is recognized, a one-line description (*Remove the selected
   author; their books stay*). While it is still incomplete: *Entering command…*.
3. **What does `Enter` do now?** Run, or start a new line — with `Ctrl+Enter` run shown whenever
   `Enter` would add a line.

**Why.** The Enter rule (`COMMANDS.md`, *The Enter rule*) is a heuristic: run a command that cannot
take more, add a line to one that can, run on a blank line. A heuristic is only acceptable when it
announces itself. The status bar is that announcement, so the user never presses `Enter` to find out
what it does.

**It is also where questions are asked.** A refusal to run invalid text appears here, with the text
kept. The removal confirmation (*Remove "Dune"?*) appears here, with `yes` / `no` as chips: a
destructive act gets a question in the place the eyes already are, not a modal.

---

## 6. CLI and GUI in harmony

**Concept.** The command bar and the graphical surface are two ways to do the same things, and each
teaches the other.

- **Every clickable thing is a command.** The side nav's entries are command names; clicking one
  runs exactly what typing it would. A dashboard finding (*12 books have no ISBN*) shows the command
  that lists them, and clicking it runs that command — so reading the dashboard is learning the
  grammar.
- **Every list is navigable without the mouse.** Results render as a grid of cards with covers and
  portraits. `Alt` + arrows move the selection geometrically through it, `Enter` opens, `Esc` comes
  back with the selection and scroll position restored. A click does the same as the keys.
- **Results speak the same language.** A filtered list says its filters back as a heading — *Books
  written by herbert published before 1970* — in the words the command used, and shows the numbers
  the filter was about (pages, years) on the cards.
- **Errors carry a view.** An ambiguous author on `add book` answers with the candidates as a list,
  and the bar keeps the text so narrowing the name is one edit.

**Why.** A pure CLI is fast for the expert and opaque to everyone else; a pure GUI is discoverable and
slow. Putting every GUI affordance on top of a real command means the mouse path is the training path
for the keyboard path, and nobody has to choose.

---

## 7. Movement is split by modifier, not by letter

The bar always holds focus, so plain letters are typing, never shortcuts. The three movements a result
view supports are told apart by the modifier instead:

| Movement | Keys |
| --- | --- |
| Scroll the view | `Page Up` / `Page Down`, `Home` / `End` (one-line bar) |
| Move the selection | `Alt` + arrows |
| Open / back | `Enter` / `Esc` on an empty bar |

Bare `↑` `↓` never scroll — they belong to the multi-line bar. `Page Up` / `Page Down` move a modest
step rather than a screen, because a whole screen per press jumped past too much to follow. A new
result scrolls to the top; returning to an earlier one does not.

**Where it is weakest.** `Esc` does two things — clear the text, or go back when there is none. It
is consistent ("undo the most recent thing"), but a user who presses it twice to clear a long command
goes back a view as well.
