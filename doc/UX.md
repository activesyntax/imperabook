# UX Notes

This document records UX patterns and the reasoning behind them — the companion to
`DECISIONS.md` (architecture) and `COMMANDS.md` (command reference). The same rule applies: where a
pattern has a soft spot, it is named rather than hidden.

---

## 1. Anticipatory draft preview for create commands

**Concept.** The moment `add book` becomes the top-ranked suggestion in the command bar — *before*
Enter — the workspace renders a draft book: a soft placeholder cover and the fields shown as gentle,
muted prompts (a ghosted *e.g. The Hobbit* where the title will go, *e.g. Ursula K. Le Guin* for the
author). As each quoted value in the composed command is filled, the draft fills in with it. The
command bar and the workspace become two views of the same in-progress entity — the sentence and the
book it describes, side by side.

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
- **Composing:** the draft is driven by the *parsed state of the buffer*, not by a sequence of
  answers — the same token list the bar already produces for its own suggestions (DECISIONS 28). A
  segment whose value is complete lights up its field; deleting the segment puts the placeholder
  back. Because parameter order is free, fields fill in whatever order the sentence is written, which
  is one more reason the draft renders the whole book rather than the current step.
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
wording appears in the connective that fills it, so the command bar and the draft speak with one
voice. When a
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
(DECISIONS 12); the preview is a convenience, never a substitute for it. Reading the buffer to fill
the draft is lexical, not semantic: the frontend recognizes that a value belongs to the `with title`
segment, and knows nothing about what `add book` does. Focus stays in the command bar throughout;
the draft is a passenger, it never steals input.

**Generalizes to.** Any mutating command that targets a single entity. `update book` is the same idea
with a non-empty starting state — show the selected book, edit it live. `show book`'s detail and the
add/update drafts are then one surface in three states (read, creating, editing). Scoped to
`add book` for MVP1; the rest follow once it proves out.

---

## 2. The command bar composes a whole sentence

**Concept.** A command is written as one visible sentence and stays visible until it runs.
Completion walks it one segment at a time — accepting `add book` types the verb, the suggestion row
then offers `with title`, accepting it appends `with title ""` with the caret between the quotes —
and as segments accumulate the bar breaks them onto separate lines and grows to fit. `Enter` commits,
`Esc` clears. The full mechanics are in `COMMANDS.md`; what follows is why.

**The guidance of a prompt, without being inside one.** The suggestion row does what a prompt
sequence did — it tells you what comes next — and that is deliberate: the step-by-step help was the
prompt model's one real virtue, and it is kept. What is dropped is the enclosure. The row is advice
sitting *beside* a buffer you own, not a question you are obliged to answer; every previous segment
stays on screen, editable, and you can ignore the suggestion and type the next connective yourself.
The difference between guidance and a state machine is exactly this: whether the previous answers are
still in front of you.

**Why not a prompt sequence.** Prompting one field at a time is the easier thing to build and the
worse thing to use, for one reason: it hides the thing being built. Only the current step is on
screen, so the surrounding context — what has already been given — has to be held in the head, which
is the exact cost this product exists to remove. Correction is worse still. A typo three fields back
needs a way back, and in a step machine that way back has to be invented: a keybinding that means
nothing anywhere else, doing what `←` already does in every text field on the machine. The composed
sentence needs no such invention, because it never left the text field.

**What being text buys.** A visible command is a value, and values can be handled. It can be
recalled and re-run with one quoted segment changed — which is what cataloguing several books by the
same author actually is. It can be copied into a bug report, or out of `help` and pasted. And a user
who has seen the sentence can eventually type it from scratch, faster than any menu, which is the
whole promise of a keyboard-first tool. A prompt sequence has none of these properties in principle,
not merely in this implementation.

**The bar's height is a state readout.** One line means nothing is under composition — and that is
also when bare `↑` `↓` scroll the workspace. A grown bar means a command is being written, and the
arrows edit it. The mode is real, but it is legible at a glance rather than remembered, which is the
condition under which a mode is acceptable here.

**Where it is weakest.** Two places, both named rather than smoothed over.

*The first command a new user meets teaches nothing about this.* `login` collects its credentials in
dedicated fields, off the buffer, because a password must never be visible, editable, or re-runnable
(DECISIONS 24/25/27). So the composition syntax is first met at `add book`, which is seven fields
deep and writing real data. The mitigation is that the suggestion row names each field as it becomes
relevant and supplies the quotes on acceptance, and that the draft preview above shows the whole
shape of a book while the sentence is still being written. Whether that is enough is the first-use
question in `TESZTELES-1.md` most worth watching.

*A long free-text value fights the form.* A multi-paragraph summary inside a quoted segment is
genuinely worse here than in a form with a text area, and autoformat does not fix it. Unresolved;
see `COMMANDS.md`, *Open questions*.
