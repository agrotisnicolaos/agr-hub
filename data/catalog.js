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
  // `url` deep-links to the skill's own SKILL.md so a click lands on that exact skill.
  skills: [
    { name: "grill-me", marker: "Workflow", description: "Interviews you relentlessly about a plan or design until every decision is resolved.", home: "agr-launchpad", url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/grill-me/SKILL.md" },
    { name: "coding-standards", marker: "Foundation", description: "Baseline conventions for clean, readable, consistent code.", home: "agr-launchpad", url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/coding-standards/SKILL.md" },
    { name: "error-handling", marker: "Foundation", description: "Patterns for handling failures properly instead of hiding them.", home: "agr-launchpad", url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/error-handling/SKILL.md" },
    { name: "html", marker: "Craft", description: "Produces polished, single-file HTML pages with real design.", home: "agr-launchpad", url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/html/SKILL.md" },
    { name: "dashboard-builder", marker: "Craft", description: "Spins up quick, local dashboards from your data.", home: "agr-launchpad", url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/dashboard-builder/SKILL.md" },
    { name: "code-tour", marker: "Foundation", description: "Walks you through an unfamiliar codebase, section by section.", home: "agr-launchpad", url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/code-tour/SKILL.md" },
    { name: "skill-stocktake", marker: "Meta", description: "Audits your installed skills and flags gaps or drift.", home: "agr-launchpad", url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/skill-stocktake/SKILL.md" },
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
  // an easy clone/download. (Future: upvotes, comments.)
  // Card shape (image, highlights, links are optional):
  //   {
  //     name: "my-project",
  //     marker: "Web app",
  //     description: "What it does, in one or two sentences.",
  //     visibility: "public",
  //     image: "assets/projects/my-project.png",   // snapshot of the output
  //     highlights: ["one-liner", "one-liner"],
  //     links: [{ label: "Setup guide", url: "https://..." }],
  //     repoUrl: "https://github.com/agrotisnicolaos/my-project",
  //     zipUrl: "https://github.com/agrotisnicolaos/my-project/archive/refs/heads/main.zip"
  //   }
  projects: [
    {
      name: "agr-informed",
      marker: "AI automation",
      description:
        "Let AI keep up with AI — or any field. An automated intelligence briefing that reads your chosen YouTube channels every morning and delivers a 3-minute magazine-style report: stories clustered across sources, badged by what's novel and contrarian, filtered for what matters to you. A second-brain wiki compounds the findings across runs. Runs entirely on a paid Claude account — no API keys, no servers.",
      visibility: "public",
      image: "assets/projects/agr-informed.png",
      imageAlt: "A daily agr-informed briefing: TL;DR panels and story-cluster tiles",
      highlights: [
        "Hours of video → a 3-minute morning brief",
        "Cross-source clustering with timestamp deep-links",
        "Personal relevance filter from a 5-question profile",
        "Second-brain wiki that compounds across runs",
        "Topic-agnostic: AI, science, finance — your channels decide",
        "Beginner-proof: ZIP download + step-by-step guide",
      ],
      links: [
        { label: "See an example briefing", url: "https://htmlpreview.github.io/?https://github.com/agrotisnicolaos/agr-informed/blob/main/examples/example-briefing.html" },
        { label: "Complete setup guide", url: "https://github.com/agrotisnicolaos/agr-informed/blob/main/docs/GUIDE.md" },
      ],
      repoUrl: "https://github.com/agrotisnicolaos/agr-informed",
      zipUrl: "https://github.com/agrotisnicolaos/agr-informed/archive/refs/heads/main.zip",
    },
  ],
};
