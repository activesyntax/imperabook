# UX Notes

This document records UX patterns and the reasoning behind them — the companion to
`DECISIONS.md` (architecture) and `COMMANDS.md` (command reference). The same rule applies: where a
pattern has a soft spot, it is named rather than hidden.

---

## 1. Anticipatory draft preview for create commands

**Concept.** The moment `add book` becomes the top-ranked suggestion in the command bar — *before*
Enter — the workspace renders a draft book: a soft placeholder cover and the fields shown as gentle,
muted prompts (a ghosted *e.g. The Hobbit* where the title will go, *e.g. Ursula K. Le Guin* for the
author). As the interactive prompts collect Title, Author, and the rest, the draft fills in live. The
command bar and the workspace become two views of the same in-progress entity: you answer the prompt,
you watch the book take shape beside it.

**Why.** A bare command line makes you type into the void and trust that the right thing happened
after Enter. The draft collapses that gap — the result is visible while you build it, not after.
It also teaches the data model without a tutorial: the shape on screen *is* the shape a book has, so
a first-time user learns what a book is made of by filling one in. And it suits the typography-driven,
view-based aesthetic — the create flow is a view that resolves, not a modal form bolted onto a
terminal.

**Trigger and lifecycle.**

- **Top suggestion (pre-Enter):** as soon as `add book` is the *top-ranked* suggestion, the draft
  appears with its placeholders — so the workspace responds *during* selection, not only after the
  command is accepted. This is the deliberate trade for responsive feedback: if the top suggestion
  shifts to a non-create command, the draft simply slides back out (see *Workspace*), so the
  occasional transient draft is cheap rather than jarring.
- **Prompting:** each answered field updates the draft immediately; the placeholders stay until their
  fields are filled.
- **Commit:** on the final step the draft is sent to the backend; success resolves the draft card
  into the confirmed detail, and the saved book joins the list view.
- **Cancel / `Esc`:** the draft slides out and nothing was ever persisted.

**What it renders.** The draft is the existing `DetailView` (from the `CommandView` contract) in a
draft variant — the *same surface* the book will have once saved, not a bespoke form. That keeps the
preview honest: you are looking at the real result template, partially filled. Empty optional fields
render as absent, consistent with how `Maybe<T>` optionals are shown elsewhere (DECISIONS 11);
required-but-unfilled fields show the muted example placeholders described under *Placeholder
treatment*.

**Placeholder treatment.** Empty fields use the conventional input-placeholder convention rather than
value-like defaults: muted, lower-contrast ghost text phrased as a gentle example — *e.g. The Hobbit*
for the title, *e.g. Ursula K. Le Guin* for the author — and a soft, skeletal cover frame rather than
a mock cover. The point is that an empty slot should read as *type here*, not as a saved book that
happens to be blank — which is the risk a solid "Untitled" / "Unknown author" carries. The same
wording appears in the matching prompt, so the prompt and the draft speak with one voice. When a
field is answered, its text snaps from the muted placeholder to the full-contrast committed value,
and that contrast shift is itself the feedback that the field went from empty to set. Optional fields
left blank do not linger as ghosts; they collapse to absent (DECISIONS 11).

**Workspace (carousel).** The workspace is a horizontally paginated carousel of cards. The draft does
not *replace* what is on screen — it slides in as a new card and pushes the existing content aside.
That makes cancel free: the original content was never destroyed, so when the draft slides out it
simply returns to position. Because the draft is one card among others, the responsive
top-suggestion trigger stays cheap — a card sliding in and out is a light gesture, not a full screen
swap — which is exactly what makes triggering on the top suggestion (rather than on acceptance)
affordable.

**Boundaries.** The draft is a **frontend-only view state until commit** — no backend round-trip, no
orphan row, nothing persisted until the required fields are satisfied and the user commits. This sits
cleanly inside the existing split: the frontend owns rendering, so a draft is just local view state.
Validation is unchanged — it runs on commit through the `Result` / ProblemDetails channel
(DECISIONS 12); the preview is a convenience, never a substitute for it. Focus stays in the command
bar throughout; the draft is a passenger, it never steals input.

**Generalizes to.** Any mutating command that targets a single entity. `update book` is the same idea
with a non-empty starting state — show the selected book, edit it live. `show book`'s detail and the
add/update drafts are then one surface in three states (read, creating, editing). Scoped to
`add book` for MVP1; the rest follow once it proves out.
