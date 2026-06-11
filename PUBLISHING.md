# Publishing guide (for the owner)

How agr-hub works and how you add things to it. This is **your** workflow doc — friends/family never
read this.

## The model

- **agr-hub** (this repo) is **public**. It is two things at once:
  1. a **website** (GitHub Pages) — the human-facing hub, split into a landing page
     (`index.html`), a no-code page (`chat.html`), a builders page (`code.html`), and docs
     (`docs.html`), and
  2. a **Claude Code marketplace** (`.claude-plugin/marketplace.json`) — the machine-readable catalog
     that `/plugin install …@agr-hub` reads (for your own future packs/plugins).
- **agr-launchpad** is the public base everyone clones.
- Projects live in their **own repos**, private by default. The hub only *references* them.

## The website is data-driven

The site renders from [`data/catalog.js`](data/catalog.js): `skills`, `agents`, `plugins`, and
`projects` arrays. Edit, commit, push — GitHub Pages redeploys. No build step.

Key fields per asset (see the comment block at the top of catalog.js for the full list):

- `surfaces: ["chat","code"]` — which page(s) the card appears on. Skills that work in claude.ai
  AND Claude Code carry both.
- `theme` — the thematic group heading the card renders under ("Getting started", "Think & plan",
  "Workflow & discipline", …). New themes appear automatically, in catalog order.
- `author { name, self }` — `self: true` renders a "by Nicolas Agrotis" tag; otherwise the maker's name.
- `origin { label, url }` — credit line in the pop-out tile: "first conceived in <repo>".
- `what / why / worksWith / example` — the four plain-language sections of the pop-out tile.
- `zipUrl` — the Download button. For skills this points at `downloads/skills/<name>.zip`.
- `installSteps` (plugins) — terminal commands shown on the card and in the tile, in order.
- `visibility: "private"` → "in dev" badge, no actions.

## Add a SKILL

1. Put the skill folder (with `SKILL.md`) in `agr-launchpad/.claude/skills/` — or anywhere local.
2. Rebuild the download ZIPs: `make skill-zips` (reads `../agr-launchpad` by default; pass another
   dir as the first arg to `scripts/build-skill-zips.sh`). Third-party skills from other repos:
   clone them and zip the skill folder into `downloads/skills/<name>.zip` the same way.
3. Add a card to the `skills` array with `surfaces`, `theme`, the four tile sections, `zipUrl`,
   and — if it came from someone else — `author` + `origin` credit.
4. Commit the catalog change AND the new zip. Push.

## Add an AGENT

Agents are subagent definitions (`.claude/agents/<name>.md`) that ship inside agr-launchpad —
no separate download. Add a card to the `agents` array with `theme`, the four tile sections,
`author`/`origin` credit, and a `url` pointing at the agent's `.md` in the launchpad repo.

## Add a PLUGIN (recommendation card for a Claude Code plugin)

Plugins are *recommendations with install commands* — the code lives in the maker's repo.

1. Add a card to the `plugins` array: `installSteps` (one or more commands, run in order),
   `repoUrl`, `author`/`origin` credit, theme, and the four tile sections.
2. Push. The card shows each command as a click-to-copy row.

## Add a PROJECT (any repo you want to showcase)

1. Create or pick the project repo (private or public).
2. Add a card to the `projects` array with `repoUrl`, `zipUrl`
   (`https://github.com/<you>/<repo>/archive/refs/heads/main.zip`), `theme`, highlights, links,
   and the four tile sections.
3. Push. Public cards get Download ZIP / View / clone actions; private ones get an "in dev" badge.

> Tip: the `zipUrl` branch is usually `main` — match the repo's default branch.

## Future (not built yet)

Per-project write-ups, media, and a way to react/discuss. The catalog + tiles are the foundation
they'll hang off.
