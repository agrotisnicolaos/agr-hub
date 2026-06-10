/*
 * agr-hub catalog — the single source of truth for the website.
 *
 * Every asset (skill / pack / project) is one object. The pages render from
 * these arrays; the pop-out detail tile renders the what/why/worksWith/example
 * fields. No build step: edit, commit, push — GitHub Pages updates the site.
 *
 * Shared asset fields:
 *   name         unique id, also used in deep links (#asset=<name>)
 *   marker       small category label on the card
 *   surfaces     where it appears: ["chat"], ["code"], or ["chat","code"]
 *   author       { name, url?, self: true|false }  -> "by Nicolas" tag vs third-party tag
 *   origin       { label, url }  -> credit to the repo/person it was first conceived in
 *   description  one-liner on the card
 *   what / why   plain-language sections in the pop-out tile
 *   worksWith    [{ name, note }] -> other assets on this site it pairs well with
 *   example      a concrete "try saying…" example, written for beginners
 *   exampleCode  optional extra example for the Code audience
 *   zipUrl       direct download (per-skill ZIPs are hosted on this site, see
 *                downloads/skills/ — built with `make skill-zips`)
 *   url          deep link to the source (SKILL.md or repo)
 *
 * Skills with surfaces ["chat","code"] appear on both pages.
 * visibility: "private" shows an "in development" badge with no actions.
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

  skills: [
    {
      name: "how-to-use-skills",
      type: "guide",
      marker: "Start here",
      surfaces: ["chat"],
      author: { name: "Nicolas Agrotis", self: true },
      description:
        "New to skills? A step-by-step guide: install a ready-made skill, remove one, create your own, or change one — no experience needed.",
      what:
        "Skills are small instruction files that teach Claude how to do a specific job well — and how YOU like it done. This guide walks you through everything you can do with them on claude.ai, one numbered step at a time.",
      why:
        "Five minutes here unlocks every other card on this page. Once you know how to install a skill, you can give Claude new abilities whenever you need them — no coding, no setup, just a file upload.",
      worksWith: [
        { name: "every skill on this page", note: "Download any skill here, then follow the install steps below." },
      ],
      guideSections: [
        {
          title: "Install a ready-made skill",
          steps: [
            "Pick a skill on this page and press “Download ZIP”. You get a small .zip file — don't unzip it.",
            "Go to claude.ai and sign in (skills need a paid plan: Pro, Max, Team, or Enterprise).",
            "Click your initials in the bottom-left corner, then open Settings → Capabilities.",
            "Find the Skills section and click “Upload skill”.",
            "Choose the .zip file you downloaded and confirm.",
            "Done. In any new chat, just describe your task — Claude uses the skill when it fits. You can also ask directly: “Use the grill-me skill on my plan.”",
          ],
        },
        {
          title: "Remove a skill",
          steps: [
            "Open Settings → Capabilities → Skills on claude.ai.",
            "Click the skill you no longer want.",
            "Choose Remove — or just toggle it off if you might want it back later.",
          ],
        },
        {
          title: "Create your own skill",
          steps: [
            "Anthropic made a skill that builds skills: skill-creator. Enable it from the skills list on claude.ai (or get it from their repo, linked below).",
            "Tell Claude about a task you repeat often. For example: “Create a skill that turns my rough notes into a weekly status email, in my writing style.”",
            "Answer its questions — it interviews you, then builds the skill and gives you a .zip.",
            "Upload that .zip using the install steps above. From now on, Claude does that task your way, every time.",
            "Good first skills: a meeting-notes formatter, a recipe scaler, a cover-letter writer in your voice.",
          ],
        },
        {
          title: "Change an existing skill",
          steps: [
            "You don't need to edit any files — just ask Claude itself.",
            "Start a new chat and attach the skill's .zip (or describe which installed skill you mean).",
            "Say what you want different. For example: “Modify this skill so every report starts with a three-bullet summary.”",
            "Claude rewrites the skill and gives you an updated .zip.",
            "Remove the old version, upload the new one — that's it.",
          ],
        },
      ],
      origin: { label: "anthropics/skills (skill-creator)", url: "https://github.com/anthropics/skills" },
      url: "https://github.com/anthropics/skills",
    },
    {
      name: "grill-me",
      marker: "Workflow",
      surfaces: ["chat", "code"],
      author: { name: "Nicolas Agrotis", self: true },
      description: "Interviews you relentlessly about a plan or design until every decision is resolved.",
      what:
        "A skill that turns Claude into a thorough interviewer. Before you start a piece of work, it asks you question after question about your plan — one at a time, each with a recommended answer — until every fuzzy part is pinned down.",
      why:
        "Most plans fail because of the questions nobody asked. grill-me surfaces the gaps, contradictions, and “I hadn't thought of that” moments before you invest time and money — not after.",
      worksWith: [
        { name: "html", note: "Grill your idea first, then have the html skill build the page." },
        { name: "dashboard-builder", note: "Agree on what questions a dashboard must answer before building it." },
      ],
      example:
        "Try saying: “Grill me about my plan to launch a small online bakery.” Claude will interview you about pricing, suppliers, delivery, your busiest hours… until the plan holds water.",
      exampleCode:
        "In Claude Code, run /grill-me before a big refactor or feature — it resolves the design tree decision by decision.",
      home: "agr-launchpad",
      url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/grill-me/SKILL.md",
      zipUrl: "downloads/skills/grill-me.zip",
    },
    {
      name: "coding-standards",
      marker: "Foundation",
      surfaces: ["chat", "code"],
      author: { name: "Nicolas Agrotis", self: true },
      description: "Baseline conventions for clean, readable, consistent code.",
      what:
        "A rulebook of good coding habits that Claude reads before writing any code — how to name things, structure files, and keep code readable.",
      why:
        "Without it, every script Claude writes looks a little different. With it, everything comes back clean and consistent — as if one careful engineer wrote it all.",
      worksWith: [
        { name: "error-handling", note: "The natural pair: one keeps code tidy, the other keeps it robust." },
        { name: "code-tour", note: "Consistent code makes guided walkthroughs much easier to follow." },
      ],
      example:
        "Try saying: “Write a Python script that renames my photo files by the date they were taken.” The code that comes back follows the standards automatically — you don't have to ask.",
      home: "agr-launchpad",
      url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/coding-standards/SKILL.md",
      zipUrl: "downloads/skills/coding-standards.zip",
    },
    {
      name: "error-handling",
      marker: "Foundation",
      surfaces: ["chat", "code"],
      author: { name: "Nicolas Agrotis", self: true },
      description: "Patterns for handling failures properly instead of hiding them.",
      what:
        "Teaches Claude how to write code that deals with things going wrong — a missing file, a broken link, a server that doesn't answer — instead of crashing or pretending nothing happened.",
      why:
        "The difference between a script that works on your machine once and a tool you can rely on is what happens when something fails. This skill builds that in from the start.",
      worksWith: [
        { name: "coding-standards", note: "Clean AND robust — use them together for anything you'll reuse." },
      ],
      example:
        "Try saying: “Write a script that downloads the files from this list of links.” With this skill, a dead link gets logged and skipped — the other downloads still finish.",
      home: "agr-launchpad",
      url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/error-handling/SKILL.md",
      zipUrl: "downloads/skills/error-handling.zip",
    },
    {
      name: "html",
      marker: "Craft",
      surfaces: ["chat", "code"],
      author: { name: "Nicolas Agrotis", self: true },
      description: "Produces polished, single-file HTML pages with real design.",
      what:
        "Makes Claude produce complete, polished web pages as a single file — reports, invitations, dashboards, mini-sites — that open with a double-click. No tools to install, nothing to set up.",
      why:
        "Anything Claude writes for you becomes instantly shareable: send the file to anyone and it just opens in their browser, looking designed rather than generated.",
      worksWith: [
        { name: "grill-me", note: "Pin down what the page must say before it gets built." },
        { name: "dashboard-builder", note: "When the page is mostly charts and numbers, reach for this one." },
      ],
      example:
        "Try saying: “Make me a one-page website for my dog-walking service, with prices and a contact section.” You get one file you can open, share, or host anywhere.",
      home: "agr-launchpad",
      url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/html/SKILL.md",
      zipUrl: "downloads/skills/html.zip",
    },
    {
      name: "dashboard-builder",
      marker: "Craft",
      surfaces: ["chat", "code"],
      author: { name: "Nicolas Agrotis", self: true },
      description: "Spins up quick, local dashboards from your data.",
      what:
        "Turns your data — a spreadsheet, an export, a list of numbers — into an interactive dashboard page you can open in your browser and explore.",
      why:
        "It's built around a simple idea: a good dashboard answers real questions (“are sales up?”, “where do we lose customers?”), not just decorates numbers with charts.",
      worksWith: [
        { name: "html", note: "Same single-file output — use html for pages, this for data views." },
        { name: "grill-me", note: "Let it grill you about which questions the dashboard must answer." },
      ],
      example:
        "Try saying: “Here's my sales spreadsheet — build a dashboard showing revenue by month and my top five products.” You get an interactive page, not a wall of numbers.",
      home: "agr-launchpad",
      url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/dashboard-builder/SKILL.md",
      zipUrl: "downloads/skills/dashboard-builder.zip",
    },
    {
      name: "code-tour",
      marker: "Foundation",
      surfaces: ["chat", "code"],
      author: { name: "Nicolas Agrotis", self: true },
      description: "Walks you through an unfamiliar codebase, section by section.",
      what:
        "Creates guided, step-by-step walkthroughs of a codebase — like a museum audio guide, but for code. Each stop explains one part, in order, pitched at whoever the tour is for.",
      why:
        "Joining a project — or returning to your own after six months — usually means hours of confused reading. A tour turns that into a sequence of short, explained stops.",
      worksWith: [
        { name: "coding-standards", note: "Consistent code is far easier to tour." },
      ],
      example:
        "Try saying: “Create a tour of this project for someone who has never seen it before.” Then follow the stops one by one.",
      exampleCode:
        "In Claude Code: /code-tour produces .tour files that VS Code's CodeTour extension plays back inside the editor.",
      home: "agr-launchpad",
      url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/code-tour/SKILL.md",
      zipUrl: "downloads/skills/code-tour.zip",
    },
    {
      name: "skill-stocktake",
      marker: "Meta",
      surfaces: ["chat", "code"],
      author: { name: "Nicolas Agrotis", self: true },
      description: "Audits your installed skills and flags gaps or drift.",
      what:
        "A skill that reviews your other skills. It checks each one for quality — is it clear, is it current, does it overlap with another? — and reports what to fix, merge, or retire.",
      why:
        "Skills pile up. After a while some go stale, some contradict each other, and some were never quite right. A stocktake keeps your collection sharp instead of cluttered.",
      worksWith: [
        { name: "how-to-use-skills", note: "After a stocktake, use the guide to remove or update what it flagged." },
      ],
      example:
        "Try saying: “Run a stocktake of my skills.” You get a quality report per skill, with concrete suggestions.",
      home: "agr-launchpad",
      url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/skill-stocktake/SKILL.md",
      zipUrl: "downloads/skills/skill-stocktake.zip",
    },
  ],

  // Project-specific packs (skills/agents/tools) installed via /plugin.
  // Same asset fields as skills, plus: visibility, install, repoUrl.
  packs: [],

  // Standalone projects — GitHub repos with their own purpose.
  projects: [
    {
      name: "agr-informed",
      marker: "AI automation",
      surfaces: ["code"],
      author: { name: "Nicolas Agrotis", self: true },
      description:
        "Let AI keep up with AI — or any field. An automated intelligence briefing that reads your chosen YouTube channels every morning and delivers a 3-minute magazine-style report: stories clustered across sources, badged by what's novel and contrarian, filtered for what matters to you. A second-brain wiki compounds the findings across runs. Runs entirely on a paid Claude account — no API keys, no servers.",
      what:
        "An automated morning briefing. It watches the YouTube channels you choose overnight and writes you a 3-minute, magazine-style report: stories clustered across sources, badged by what's new or contrarian, filtered for what matters to you.",
      why:
        "Keeping up with a fast field means hours of videos a week. agr-informed compresses that into one short read — and its second-brain wiki remembers everything, so the findings compound run after run.",
      worksWith: [
        { name: "agr-launchpad", note: "Drop it onto the launchpad base and it inherits all the tooling." },
      ],
      example:
        "Subscribe it to five AI YouTube channels, let it run overnight, and read a 3-minute brief with your morning coffee — with deep links to the exact video timestamps behind each story.",
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
