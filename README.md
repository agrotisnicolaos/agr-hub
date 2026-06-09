# agr·hub

**A launchpad for building with Claude Code.** This repo is two things at once:

- a **website** (GitHub Pages) — the human-facing hub for the launchpad, packs, and projects, and
- a **Claude Code marketplace** — the catalog `/plugin install …@agr-hub` reads.

🔗 **Live site:** https://agrotisnicolaos.github.io/agr-hub/ &nbsp;·&nbsp; **The base:** [agr-launchpad](https://github.com/agrotisnicolaos/agr-launchpad)

## What's here

| Path | Purpose |
| --- | --- |
| `index.html`, `assets/` | the website (Aegean theme, no build step) |
| `data/catalog.js` | **the data that drives the site** — add packs/projects here |
| `.claude-plugin/marketplace.json` | the machine-readable marketplace of installable packs |
| `PUBLISHING.md` | owner's guide: how to add & publish a pack or project |

## Install a pack (for users)

```
/plugin marketplace add agrotisnicolaos/agr-hub   # one time
/plugin install <pack>@agr-hub
```

## Add to the hub (for the owner)

Edit [`data/catalog.js`](data/catalog.js), commit, push — the site redeploys. Full workflow,
including how packs/projects stay private until you publish them, is in
[`PUBLISHING.md`](PUBLISHING.md).

## Local preview

Open `index.html` directly in a browser, or serve the folder:

```
python3 -m http.server   # then visit http://localhost:8000
```

The site reads `data/catalog.js` as a plain script (no fetch), so it renders identically from a
`file://` open and from GitHub Pages.
