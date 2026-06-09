# Publishing guide (for the owner)

How agr-hub works and how you add things to it. This is **your** workflow doc — friends/family never
read this.

## The model

- **agr-hub** (this repo) is **public**. It is two things at once:
  1. a **website** (GitHub Pages, served from `index.html`) — the human-facing hub, and
  2. a **Claude Code marketplace** (`.claude-plugin/marketplace.json`) — the machine-readable catalog
     that `/plugin install …@agr-hub` reads.
- **agr-launchpad** is the public base everyone clones.
- **Each pack and each project lives in its OWN repo**, private by default. The hub only *references*
  them. They become installable/clonable when you flip them public.

Why separate repos? agr-hub is public — anything inside it is public. Keeping packs/projects in their
own repos lets them stay private until you're ready, then go public with one switch.

## The website is data-driven

The site renders from [`data/catalog.js`](data/catalog.js). To change what appears, edit that file,
commit, and push — GitHub Pages redeploys automatically. No build step.

Each entry has a `visibility`:
- `"public"` → the card shows actions (install / view / download / clone).
- `"private"` → the card shows an **"in dev"** badge and no actions (a roadmap teaser; safe to omit
  entirely if you don't want to hint at it).

## Add a PACK (a project-specific bundle of skills/agents/tools)

A pack is a normal Claude Code **plugin**. Recommended repo name: `agr-pack-<name>`.

1. **Create the pack repo (private):**
   ```
   agr-pack-ml/
     .claude-plugin/plugin.json     # name, version, description
     skills/<skill>/SKILL.md
     agents/<agent>.md
     .mcp.json                      # optional: MCP servers the pack needs
     commands/                      # optional: slash commands
     README.md
   ```
   (The launchpad's `packs/_template` is a good starting shape; a plugin just needs
   `.claude-plugin/plugin.json` at its root.)

2. **Test it locally before anyone sees it:**
   ```
   /plugin marketplace add /absolute/path/to/agr-pack-ml   # directory source
   /plugin install ml@<local-marketplace>
   ```
   Or point a scratch marketplace at the folder. Iterate until it's good.

3. **Show it as "in dev" (optional):** add a card to the `packs` array in `data/catalog.js` with
   `visibility: "private"`. Push. It appears on the site with an "in dev" badge, no actions.

4. **Publish when ready:**
   - Make the `agr-pack-ml` repo **public**.
   - Add it to [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json):
     ```json
     {
       "name": "ml",
       "source": { "source": "github", "repo": "agrotisnicolaos/agr-pack-ml" },
       "description": "Data & ML pack: notebooks, evals, ML-review agents."
     }
     ```
   - Flip the catalog card to `visibility: "public"` and set its `repoUrl` (+ optional `install`).
   - Commit + push agr-hub.

5. **Tell your friends.** They run:
   ```
   /plugin marketplace add agrotisnicolaos/agr-hub   # one time
   /plugin install ml@agr-hub
   ```
   Updates later: `/plugin update ml@agr-hub`.

## Add a PROJECT (any other repo you want to showcase)

1. Create or pick the project repo (private or public).
2. Add a card to the `projects` array in `data/catalog.js`:
   ```js
   {
     name: "my-project",
     marker: "Web app",
     description: "What it does, in a sentence or two.",
     visibility: "public",
     repoUrl: "https://github.com/agrotisnicolaos/my-project",
     zipUrl: "https://github.com/agrotisnicolaos/my-project/archive/refs/heads/main.zip"
   }
   ```
3. Push. The card appears with Download ZIP / View / clone actions (public) or an "in dev" badge
   (private).

> Tip: the `zipUrl` branch is `main` for most repos but `master` for agr-launchpad — match whatever
> the repo's default branch is.

## Future (not built yet)

The footer hints at what's coming: an about/vision section, per-project write-ups, media, and a way
to react/discuss. Those are deliberately out of scope for now — the catalog + cards are the
foundation they'll hang off.
