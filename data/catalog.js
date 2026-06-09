/*
 * agr-hub catalog — the single source of truth for the website.
 *
 * To add a PACK or PROJECT: copy a card object into the matching array below.
 *   visibility: "public"  -> card shows actions (install / clone / download / view)
 *   visibility: "private" -> card shows an "In development" badge, no actions
 *
 * When you make a private repo public:
 *   1. flip visibility to "public" and fill in repo / repoUrl (+ zipUrl for projects)
 *   2. for a PACK, also add it to .claude-plugin/marketplace.json so /plugin can install it
 *
 * No build step. Edit this file, commit, push — GitHub Pages updates the live site.
 */
window.AGR_CATALOG = {
  marketplace: "agr-hub",
  marketplaceRepo: "agrotisnicolaos/agr-hub",

  launchpad: {
    name: "agr-launchpad",
    tagline: "The base. Clone it once, build anything.",
    description:
      "A batteries-included Claude Code starter kit: a lean universal core of the best general-purpose plugins, MCP servers, skills, and agents — plus a packs system for layering on project-specific power.",
    repoUrl: "https://github.com/agrotisnicolaos/agr-launchpad",
    zipUrl: "https://github.com/agrotisnicolaos/agr-launchpad/archive/refs/heads/main.zip",
    highlights: [
      "superpowers · skill-creator · frontend-design",
      "code-review with ultra cloud review",
      "context-mode · claude-mem memory",
      "context7 · GitHub · live Jupyter MCP",
      "Universal skills & agents, zero-install",
      "A packs system to grow into any project",
    ],
  },

  // Individual skills. Seeded with the universal skills that ship in agr-launchpad;
  // add your own as you build & share them.
  skills: [
    { name: "grill-me", marker: "Workflow", description: "Interviews you relentlessly about a plan or design until every decision is resolved.", home: "agr-launchpad", repoUrl: "https://github.com/agrotisnicolaos/agr-launchpad" },
    { name: "coding-standards", marker: "Foundation", description: "Baseline conventions for clean, readable, consistent code.", home: "agr-launchpad", repoUrl: "https://github.com/agrotisnicolaos/agr-launchpad" },
    { name: "error-handling", marker: "Foundation", description: "Patterns for handling failures properly instead of hiding them.", home: "agr-launchpad", repoUrl: "https://github.com/agrotisnicolaos/agr-launchpad" },
    { name: "html", marker: "Craft", description: "Produces polished, single-file HTML pages with real design.", home: "agr-launchpad", repoUrl: "https://github.com/agrotisnicolaos/agr-launchpad" },
    { name: "dashboard-builder", marker: "Craft", description: "Spins up quick, local dashboards from your data.", home: "agr-launchpad", repoUrl: "https://github.com/agrotisnicolaos/agr-launchpad" },
    { name: "code-tour", marker: "Foundation", description: "Walks you through an unfamiliar codebase, section by section.", home: "agr-launchpad", repoUrl: "https://github.com/agrotisnicolaos/agr-launchpad" },
    { name: "skill-stocktake", marker: "Meta", description: "Audits your installed skills and flags gaps or drift.", home: "agr-launchpad", repoUrl: "https://github.com/agrotisnicolaos/agr-launchpad" },
  ],

  // Project-specific packs (skills/agents/tools) installed via /plugin.
  // Example card shape (delete the comment, keep real entries):
  //   {
  //     name: "ml",
  //     marker: "Data & ML",
  //     description: "Notebook conventions, eval & regression-testing skills, ML-review agents.",
  //     visibility: "public",
  //     repoUrl: "https://github.com/agrotisnicolaos/agr-pack-ml",
  //     install: "/plugin install ml@agr-hub"
  //   }
  packs: [],

  // Other projects — GitHub repos with their own purpose. Showcased here with
  // an easy clone/download. (Future: media, upvotes, comments.)
  // Example card shape:
  //   {
  //     name: "my-project",
  //     marker: "Web app",
  //     description: "What it does, in one or two sentences.",
  //     visibility: "public",
  //     repoUrl: "https://github.com/agrotisnicolaos/my-project",
  //     zipUrl: "https://github.com/agrotisnicolaos/my-project/archive/refs/heads/main.zip"
  //   }
  projects: [],
};
