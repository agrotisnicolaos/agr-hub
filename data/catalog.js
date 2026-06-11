/*
 * agr-hub catalog — the single source of truth for the website.
 *
 * Every asset (skill / plugin / project) is one object. The pages render from
 * these arrays; the pop-out detail tile renders the what/why/worksWith/example
 * fields. No build step: edit, commit, push — GitHub Pages updates the site.
 *
 * Shared asset fields:
 *   name         unique id, also used in deep links (#asset=<name>)
 *   marker       small category label on the card
 *   theme        thematic group — cards render grouped under these headings
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
 *   installSteps (plugins) terminal/Claude-Code commands, run in order
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
      title: "How to use skills",
      type: "guide",
      marker: "Start here",
      theme: "Getting started",
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
      name: "how-to-install-plugins",
      title: "How to install plugins",
      type: "guide",
      marker: "Start here",
      theme: "Getting started",
      surfaces: ["code"],
      author: { name: "Nicolas Agrotis", self: true },
      description:
        "Install any plugin from your terminal in under a minute — official marketplace, community marketplaces, and npm tools, step by step.",
      what:
        "Plugins extend Claude Code with skills, agents, and tools. This guide shows the three ways they install — all from your terminal — and how to remove them again.",
      why:
        "Every plugin tile on this page shows its install commands. Read this once and those commands will make sense forever — or skip it all by starting from the launchpad, which ships with the whole set pre-wired.",
      worksWith: [
        { name: "agr-launchpad", note: "The shortcut: clone it and every plugin below is already configured." },
      ],
      guideSections: [
        {
          title: "Before you start",
          steps: [
            "Install Claude Code if you haven't: npm install -g @anthropic-ai/claude-code",
            "Open a terminal in your project folder and run: claude",
            "Everything below is typed inside Claude Code at the prompt.",
          ],
        },
        {
          title: "Install from the official marketplace",
          steps: [
            "Anthropic's marketplace is built in — one command installs a plugin:",
            "/plugin install superpowers@claude-plugins-official",
            "Same pattern for the rest: /plugin install skill-creator@claude-plugins-official, /plugin install frontend-design@claude-plugins-official",
            "Restart Claude Code when prompted; the plugin's commands and skills are now available.",
          ],
        },
        {
          title: "Install from a community marketplace",
          steps: [
            "Some plugins live in their author's own marketplace. Add the marketplace first:",
            "/plugin marketplace add mksglu/context-mode",
            "Then install from it: /plugin install context-mode@context-mode",
            "Same two-step pattern for claude-mem: /plugin marketplace add thedotmack/claude-mem, then /plugin install claude-mem",
          ],
        },
        {
          title: "Install npm-based tools",
          steps: [
            "A few tools install with npx instead of /plugin — get-shit-done is one:",
            "npx get-shit-done-cc --claude --global   (run this in your terminal, not inside Claude Code)",
            "Its /gsd-* commands appear in Claude Code right away.",
          ],
        },
        {
          title: "Remove a plugin",
          steps: [
            "/plugin uninstall <name> removes a plugin.",
            "/plugin marketplace remove <name> removes a marketplace you no longer use.",
          ],
        },
      ],
      origin: { label: "anthropics/claude-plugins-official", url: "https://github.com/anthropics/claude-plugins-official" },
      url: "https://github.com/anthropics/claude-plugins-official",
    },
    {
      name: "grill-me",
      marker: "Workflow",
      theme: "Think & plan",
      surfaces: ["chat", "code"],
      author: { name: "Nicolas Agrotis", self: true },
      description: "Interviews you relentlessly about a plan or design until every decision is resolved.",
      what:
        "A skill that turns Claude into a thorough interviewer. Before you start a piece of work, it asks you question after question about your plan — one at a time, each with a recommended answer — until every fuzzy part is pinned down.",
      why:
        "Most plans fail because of the questions nobody asked. grill-me surfaces the gaps, contradictions, and “I hadn't thought of that” moments before you invest time and money — not after.",
      worksWith: [
        { name: "caveman", note: "Get grilled in caveman mode — fast questions, faster answers." },
        { name: "superpowers", note: "Grill the plan, then let superpowers discipline the build." },
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
      name: "caveman",
      marker: "Style",
      theme: "Style & voice",
      surfaces: ["chat", "code"],
      author: { name: "Julius Brussee", url: "https://github.com/JuliusBrussee", self: false },
      origin: { label: "JuliusBrussee/caveman", url: "https://github.com/JuliusBrussee/caveman" },
      description: "Makes Claude answer terse, like a smart caveman — same substance, ~75% fewer words.",
      what:
        "A style skill that switches Claude into ultra-compressed “caveman speak”: no filler, no pleasantries, fragments welcome. The technical substance — code, names, errors — stays exact. Only the fluff dies.",
      why:
        "Long answers cost reading time (and, in Claude Code, tokens). caveman keeps everything that matters and cuts the rest — with intensity levels from “lite” to “ultra” depending on how terse you want it.",
      worksWith: [
        { name: "grill-me", note: "An interview in caveman mode is remarkably efficient." },
      ],
      example:
        "Try saying: “caveman mode”, then ask anything. Instead of three polite paragraphs you get: “Bug line 12. Variable null. Fix: check before use.” Say “normal mode” to switch back.",
      exampleCode:
        "In Claude Code: /caveman lite|full|ultra sets the intensity.",
      url: "https://github.com/JuliusBrussee/caveman/blob/main/skills/caveman/SKILL.md",
      zipUrl: "downloads/skills/caveman.zip",
    },
  ],

  // Plugins for Claude Code — installed from a marketplace or npm.
  // installSteps run in order; multi-step installs add a marketplace first.
  plugins: [
    {
      name: "superpowers",
      marker: "Workflow engine",
      theme: "Workflow & discipline",
      surfaces: ["code"],
      author: { name: "Jesse Vincent", url: "https://github.com/obra", self: false },
      origin: { label: "obra/superpowers", url: "https://github.com/obra/superpowers" },
      description: "Disciplined engineering workflows — brainstorm, plan, test first, debug methodically, verify before “done.”",
      what:
        "A plugin that gives Claude Code a senior engineer's discipline: it brainstorms before building, writes a plan, tests first, debugs scientifically, and verifies before claiming anything works.",
      why:
        "The difference between “code that ran once” and engineering. Claude stops cutting corners — every feature goes through the same rigorous arc, automatically.",
      worksWith: [
        { name: "get-shit-done", note: "GSD structures the project; superpowers disciplines each build step." },
        { name: "grill-me", note: "Grill the idea first, then hand it to a disciplined builder." },
      ],
      example:
        "Say “build me a habit tracker” and instead of dumping code, it opens with questions about what you actually need — then plans, tests, and builds.",
      visibility: "public",
      installSteps: ["/plugin install superpowers@claude-plugins-official"],
      repoUrl: "https://github.com/obra/superpowers",
    },
    {
      name: "get-shit-done",
      marker: "Project system",
      theme: "Workflow & discipline",
      surfaces: ["code"],
      author: { name: "TÂCHES", url: "https://github.com/gsd-build", self: false },
      origin: { label: "gsd-build/get-shit-done", url: "https://github.com/gsd-build/get-shit-done" },
      description: "A meta-prompting, spec-driven development system that fights context rot on long projects.",
      what:
        "A project operating system for Claude Code: roadmap → phases → plans → execution, with atomic commits and verification at every step. Built to keep quality high as projects grow beyond a single session.",
      why:
        "Long projects degrade as the AI's context fills up. GSD breaks work into small, planned, verifiable phases — so the hundredth task gets executed as carefully as the first.",
      worksWith: [
        { name: "superpowers", note: "The two complement each other: GSD plans the war, superpowers fights each battle." },
      ],
      example:
        "Run /gsd-new-project and answer its questions — you get a roadmap. /gsd-plan-phase and /gsd-execute-phase then carry each phase from plan to verified, committed code.",
      visibility: "public",
      installSteps: ["npx get-shit-done-cc --claude --global"],
      repoUrl: "https://github.com/gsd-build/get-shit-done",
    },
    {
      name: "skill-creator",
      marker: "Authoring",
      theme: "Authoring & skills",
      surfaces: ["code"],
      author: { name: "Anthropic", url: "https://github.com/anthropics", self: false },
      origin: { label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
      description: "Mint your own skills — it scaffolds, writes, and tests a reusable skill from any task you repeat.",
      what:
        "Anthropic's official skill for making skills. Describe a task you do repeatedly; it interviews you, then scaffolds and tests a skill so Claude does that task your way, every time.",
      why:
        "Skills are how you teach Claude permanently. This turns creating them into a conversation instead of a documentation exercise.",
      worksWith: [
        { name: "how-to-use-skills", note: "The Chat guide shows how to upload what you create to claude.ai." },
        { name: "superpowers", note: "Its workflows call your minted skills at the right moments." },
      ],
      example:
        "Say “help me create a skill that formats my meeting notes the way I like” — answer its questions, get a ready-to-use skill.",
      visibility: "public",
      installSteps: ["/plugin install skill-creator@claude-plugins-official"],
      repoUrl: "https://github.com/anthropics/skills",
    },
    {
      name: "frontend-design",
      marker: "Interface",
      theme: "Design & interface",
      surfaces: ["code"],
      author: { name: "Anthropic", url: "https://github.com/anthropics", self: false },
      origin: { label: "anthropics/claude-plugins-official", url: "https://github.com/anthropics/claude-plugins-official" },
      description: "Distinctive, production-grade UI that escapes the generic “AI look.”",
      what:
        "A design-focused plugin that pushes Claude beyond default-looking interfaces: real typography, deliberate color, distinctive layouts — so what you ship actually looks designed.",
      why:
        "AI-generated frontends tend to look the same. This one breaks the mold — the difference between “generated” and “designed” is immediately visible.",
      worksWith: [
        { name: "superpowers", note: "Disciplined process + designed output." },
      ],
      example:
        "Ask for “a landing page for my coffee subscription” with and without it — you'll see the difference in the first second.",
      visibility: "public",
      installSteps: ["/plugin install frontend-design@claude-plugins-official"],
      repoUrl: "https://github.com/anthropics/claude-plugins-official",
    },
    {
      name: "context-mode",
      marker: "Focus",
      theme: "Memory & focus",
      surfaces: ["code"],
      author: { name: "Mert Köseoğlu", url: "https://github.com/mksglu", self: false },
      origin: { label: "mksglu/context-mode", url: "https://github.com/mksglu/context-mode" },
      description: "Keeps large tool output out of the conversation, so Claude stays fast and sharp through long sessions.",
      what:
        "A focus plugin: big command outputs, logs, and pages get processed in a sandbox, and only the distilled answer enters the conversation. Claude's working memory stays clean.",
      why:
        "Claude's context window is its attention span. Protecting it means longer sessions, lower cost, and noticeably sharper answers late into the day.",
      worksWith: [
        { name: "claude-mem", note: "One protects the present session; the other preserves the past ones." },
      ],
      example:
        "Ask Claude to analyze a huge log file — instead of pulling thousands of lines into its memory, it comes back with just the errors that matter.",
      visibility: "public",
      installSteps: [
        "/plugin marketplace add mksglu/context-mode",
        "/plugin install context-mode@context-mode",
      ],
      repoUrl: "https://github.com/mksglu/context-mode",
    },
    {
      name: "claude-mem",
      marker: "Memory",
      theme: "Memory & focus",
      surfaces: ["code"],
      author: { name: "Alex Newman", url: "https://github.com/thedotmack", self: false },
      origin: { label: "thedotmack/claude-mem", url: "https://github.com/thedotmack/claude-mem" },
      description: "Persistent memory across sessions — Claude remembers your project, so you never re-explain it.",
      what:
        "A memory plugin that captures what happened in every session — decisions, fixes, discoveries — and brings the relevant parts back the next time you open the project.",
      why:
        "Without memory, every session starts from zero. With it, Claude picks up where you left off — “did we already solve this?” finally has an answer.",
      worksWith: [
        { name: "context-mode", note: "Memory for the long term, focus for the session — they pair naturally." },
      ],
      example:
        "Close your laptop mid-feature. Tomorrow, ask “where were we?” — and get a real answer, including the decisions you made and why.",
      visibility: "public",
      installSteps: [
        "/plugin marketplace add thedotmack/claude-mem",
        "/plugin install claude-mem",
      ],
      repoUrl: "https://github.com/thedotmack/claude-mem",
    },
  ],

  // Standalone projects — GitHub repos with their own purpose.
  projects: [
    {
      name: "agr-informed",
      marker: "AI automation",
      theme: "Automations",
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
