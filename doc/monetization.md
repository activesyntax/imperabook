# ImperaBook — Monetization Strategy

This document records how ImperaBook intends to fund itself, and — in the same spirit as
`DECISIONS.md` — *why* each choice is made and what it trades off. Where a model has a known
weakness, that weakness is stated rather than hidden. A monetization plan that only lists upside is
a pitch deck, not a strategy.

**Precondition, stated up front.** Everything below presupposes one thing that is not yet known:
that enough of the right people actually want this. The real first step is to ship the free core,
put it in front of the self-hosted / keyboard-first / privacy-conscious communities, and find out
whether the interaction model reduces real friction for people who are not the author. Until that
signal exists, this is a plan, not a forecast. The numbers here "come into effect" only if
validation shows a large enough aligned audience; this document is what to do *if* that turns out to
be true, not an argument that it will.

---

## 1. Positioning

The home-library category is dominated by free incumbents (Goodreads, LibraryThing, Libib, The
StoryGraph) that give away large feature sets and fund themselves through advertising, profiling, or
data resale. ImperaBook cannot win — and should not try to win — on feature volume or on price.
Cataloging, reading status, filtering, and stats are all commoditized and free elsewhere; a paywall
on any of them is simply a reason to leave for an incumbent.

The differentiator is the **interaction model**, not the catalog. The target is the narrow slice
that actively *wants* a keyboard-first, command-driven, distraction-free, privacy-respecting tool —
power users, collectors, researchers, and the self-hosting community — and would never be served by
Goodreads because Goodreads is structurally incapable of being this. That conviction is the moat:
not the code (which is now cheap to reproduce) and not the features (which are free elsewhere), but
the philosophy and the judgment behind it.

The honest framing of intent: the driver is the thesis that this way of working is genuinely better
*in some cases* — for some tasks and some people, and worse for others. Revenue is structured so
that funding the project never requires degrading it. A model where revenue degrades the product is
structurally worse than no revenue at all.

---

## 2. Governing principle — sell convenience and infrastructure, never gated features

The single rule everything else follows from: **the free core is the whole product, not a crippled
demo, and money comes from managed infrastructure that carries real marginal cost — not from locking
functionality away.**

This rules out three tempting moves explicitly:

- **No artificial isolation.** A self-hosted instance is not deliberately prevented from doing
  anything it is technically capable of. Crippling self-host to force a cloud upgrade is a dark
  pattern, and this specific audience has a fine-tuned radar for exactly that — they leave other
  products *because* of it. The community we depend on for zero-cost distribution (§3.1) is the same
  one that would publicly flag a crippled self-host on the very forums the model relies on. The gate
  would fight the distribution engine.
- **No lock-in as a strategy.** Stickiness must come from the product being good, not from the cost
  of leaving. Open formats and full export are guaranteed; you can walk away with your data at any
  time. "We make switching painful" is the wrong promise for this audience and the wrong thing to be
  proud of.
- **No feature-gating the core.** Functional capability lives in the free core. The paid line is
  drawn at *infrastructure and convenience*, never at *features*.

What is left to sell is real and honest: the operational burden of running internet-reachable,
encrypted, backed-up, multi-device sync — which most people, including many technically capable
people, would simply rather not carry.

---

## 3. Tiers

### 3.1. Core — free, self-hosted or local

The complete application, free for local or self-hosted use.

- **Scope.** Full command-driven interface, unlimited books, advanced filtering, local storage, a
  local API, mobile-companion connectivity *through that API* (see §4), print/PDF export, and ISBN
  lookup against free metadata sources (OpenLibrary).
- **Strategic role.** This tier is the distribution engine. These users generate no direct revenue,
  and that is fine — they are the channel: the people who post on Reddit, Hacker News, and
  self-hosted forums, and who make the project visible to the audience the paid tier converts from.
  Treating them as evangelists rather than as un-monetized leads is the point.
- **Trade-off, stated plainly.** The users most aligned with the project — the hardcore self-hosters
  — are precisely the ones who pay nothing, by design. The paying pool is therefore *not* the most
  enthusiastic users; it is the convenience-seekers (§3.2). The model's entire revenue rests on the
  managed convenience being worth paying for to someone who could, in principle, self-host for free.
  That is the central bet, and it is named here rather than buried.

### 3.2. Cloud — paid subscription

For people who want it to just work without running a server.

- **Indicative pricing.** ~$3.99 / month or ~$39.99 / year. Treat these as placeholders to be pinned
  to actual cost-plus-thin-margin after validation. Bias toward the annual price: a single payment
  per year avoids losing a large fraction of a low monthly charge to per-transaction processing fees.
- **Scope.** Managed, zero-knowledge (E2E-encrypted) synchronization; zero-setup multi-device use;
  remote and web access; automatic backups — all without the user standing up TLS, auth, dynamic
  DNS, or a maintained server of their own.
- **What is actually being sold.** Not a feature. The operational work the user is *not* doing. The
  honest pitch is "you don't want to run an internet-exposed sync server with backups and key
  management — so we run it, encrypted so we can't read it." Conversion happens because most people
  don't want that chore, not because self-host was crippled to force them.

### 3.3. AI / metadata enrichment — metered at cost, or bring-your-own-key

The one capability with genuine per-user marginal cost (cover/page inference via an external model
API) is handled so it never becomes a profit center or a gate:

- **Bring-your-own-key.** The user supplies their own provider key; ImperaBook adds zero marginal
  cost and gates nothing. This is the default for the self-hosted core, and the power-user audience
  is entirely comfortable with it.
- **Metered passthrough.** For the managed tier, AI calls are billed at cost plus a thin margin —
  paying for the compute consumed, not paywalling the feature. This is the literal expression of
  "charge for infrastructure, not features."

---

## 4. The mobile companion — the real conversion driver, honestly

In physical-book cataloging the phone is not a second screen, it is the best data-entry tool: you
stand at the shelf and scan. This is the strongest reason someone with a large physical collection
reaches for more than the desktop app.

**Companion, not port.** A keyboard-first command interface does not survive a soft keyboard —
typing command syntax on a touchscreen is a poor experience. "Keyboard-first" is a *desktop*
statement. So the mobile app is a deliberately different, touch-first surface scoped to two
on-the-go jobs: **barcode/ISBN scanning** for fast ingestion, and **quick lookups** (am I already
holding a copy of this, while standing in a bookshop).

**The correction that keeps the model honest.** The mobile app connects to *either* a managed Cloud
account (§3.2) *or* a self-hosted instance via its local API (§3.1). It is not a cloud-only gate.
The self-hoster who is willing to expose and secure their own instance gets the mobile companion for
free; the much larger group who would rather not do that pays for managed sync. Conversion is driven
by the real friction of self-hosting a reachable server — not by artificially severing self-host
from mobile. This costs us the forced conversion of a few technically capable holdouts who would
never have paid anyway, and buys us the goodwill of the audience the whole model runs on. That is a
good trade.

---

## 5. What we deliberately do *not* do

- **No crippled self-host.** Anything the self-hosted instance can technically do, it is allowed to
  do — including talking to the mobile app (§4).
- **No lock-in.** Open formats, complete export, leave anytime. Retention is earned by quality, not
  by exit cost.
- **No gated core features.** The print/typeset PDF export and the scanner stay in the free core;
  they are features, and features are not where the paid line is drawn.
- **No selling user data.** The privacy posture (zero-knowledge sync; keys never leave the device)
  is the product's character, not an upsell. We sell infrastructure and privacy; we never sell the
  user.

---

## 6. Strategic benefits (and their limits)

1. **Low infrastructure overhead.** Free users host their own data and cost ~$0 in server spend;
   paid users fund precisely the cloud infrastructure they consume. The model is close to
   self-funding by construction.
2. **Retention through fit, not friction.** A collector who syncs a large library across devices
   through a genuinely good pipeline stays because leaving means losing that convenience — *not*
   because we hold their data hostage. The distinction matters to this audience and is the difference
   between a moat and a grievance.
3. **No bloatware pressure.** The line is clean: a fast, distraction-free, local database is free;
   managed mobility and ingestion convenience is paid. Neither side pushes the core toward feature
   bloat.

---

## 7. Honest assessment of the ceiling

This model is coherent and can generate real revenue, but its scale should not be overstated. For a
home-library tool, even executed well, this is **cost-recovery-plus to lifestyle scale** — it can
pay for its own infrastructure and then some, and at the optimistic end fund a solo maintainer's
side income. It is not, on any realistic reading, a high-growth business, and framing it as one
would be the same brochure-voice mistake this rewrite exists to remove.

The dominant risk is the one in §3.1: the most aligned users convert at the low end by design, so
revenue depends entirely on the Cloud convenience and the mobile companion being good enough that
people who *could* self-host choose to pay anyway. If the mobile app and sync are merely adequate,
the paying pool collapses. The whole model lives or dies on that convenience layer being excellent —
which is the right thing to bet the business on, because it is the same standard the product holds
itself to everywhere else.

And the precondition bears repeating: none of this is worth pricing until shipping has shown the
audience exists. The correct order is build → put it in front of real people → learn whether it
reduces their friction → and only then turn this plan on.
