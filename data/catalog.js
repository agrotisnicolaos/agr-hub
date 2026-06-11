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
      "A batteries-included Claude Code starter kit: a lean universal core of the best general-purpose plugins, MCP servers, skills, and agents — wired so the assets communicate with each other when they need to, nothing falls through the cracks, and the gap between ideation and robust project building closes. A packs system layers on project-specific power.",
    repoUrl: "https://github.com/agrotisnicolaos/agr-launchpad",
    zipUrl: "https://github.com/agrotisnicolaos/agr-launchpad/archive/refs/heads/main.zip",
    highlights: [
      "superpowers · skill-creator · frontend-design",
      "code-review with ultra cloud review",
      "context-mode · claude-mem memory",
      "context7 · GitHub · Jupyter · Chrome DevTools MCP",
      "11 universal skills + 3 agents, zero-install",
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
      name: "how-to-install-skills",
      title: "How to install skills",
      type: "guide",
      marker: "Start here",
      theme: "Getting started",
      surfaces: ["code"],
      author: { name: "Nicolas Agrotis", self: true },
      description:
        "Add any skill on this page to Claude Code in under a minute — per project or machine-wide — following Anthropic's skill layout.",
      what:
        "A skill is a folder with a SKILL.md file that teaches Claude Code how to do a specific job well. Anthropic's convention: project skills live in .claude/skills/ inside your repo, personal skills in ~/.claude/skills/. This guide covers installing, using, and removing them.",
      why:
        "Every skill card on this page comes with a one-click ZIP. Once you know where the folder goes, installing any of them takes thirty seconds — and the launchpad skips even that, shipping with all eleven pre-installed.",
      worksWith: [
        { name: "agr-launchpad", note: "The shortcut: clone it and every launchpad skill below is already in place." },
        { name: "skill-stocktake", note: "Audits your collection once the skills start piling up." },
      ],
      guideSections: [
        {
          title: "Where skills live (Anthropic's layout)",
          steps: [
            "A skill is a folder containing a SKILL.md file — the folder name is the skill's name.",
            "Project skills go in .claude/skills/<name>/ inside your repo: available whenever Claude Code runs there, and shared with teammates through git.",
            "Personal skills go in ~/.claude/skills/<name>/: available in every project on your machine.",
          ],
        },
        {
          title: "Install a skill from this hub",
          steps: [
            "Press “Download ZIP” on any skill card — the zip contains the skill folder, ready to drop in.",
            "Unzip it into your project's skills folder: unzip grill-me.zip -d .claude/skills/",
            "Want it everywhere instead? Unzip into ~/.claude/skills/",
            "Start a new Claude Code session in the project — skills are discovered automatically.",
            "Then just describe your task; Claude reaches for the skill when it fits. You can also invoke one directly: “use the grill-me skill on this plan.”",
          ],
        },
        {
          title: "Remove a skill",
          steps: [
            "Delete the skill's folder from .claude/skills/ (or ~/.claude/skills/). Next session, it's gone.",
          ],
        },
      ],
      origin: { label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
      url: "https://github.com/anthropics/skills",
    },
    {
      name: "grill-me",
      marker: "Workflow",
      theme: "Think & plan",
      surfaces: ["chat", "code"],
      author: { name: "Nicolas Agrotis", self: true },
      origin: { label: "mattpocock/skills", url: "https://github.com/mattpocock/skills" },
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
      name: "coding-standards",
      marker: "Foundation",
      theme: "Engineering foundations",
      surfaces: ["code"],
      author: { name: "ECC community", url: "https://github.com/affaan-m/ECC", self: false },
      origin: { label: "affaan-m/ECC", url: "https://github.com/affaan-m/ECC" },
      description: "Baseline cross-project conventions — naming, readability, immutability, and code-quality review.",
      what:
        "A foundational skill that holds Claude to a consistent code-quality bar in any language: clear naming, early returns, immutability by default, no dead code. It's the rulebook the other engineering skills build on.",
      why:
        "Without a shared standard, every session reinvents style. This keeps code readable and reviews consistent — whoever (or whatever) wrote the last file.",
      worksWith: [
        { name: "error-handling", note: "Standards for the happy path, patterns for the unhappy one." },
        { name: "secure-coding", note: "Clean code first, then safe code." },
      ],
      example:
        "It kicks in automatically while Claude writes or reviews code — or ask directly: “review this file against our coding standards.”",
      home: "agr-launchpad",
      url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/coding-standards/SKILL.md",
      zipUrl: "downloads/skills/coding-standards.zip",
    },
    {
      name: "error-handling",
      marker: "Foundation",
      theme: "Engineering foundations",
      surfaces: ["code"],
      author: { name: "ECC community", url: "https://github.com/affaan-m/ECC", self: false },
      origin: { label: "affaan-m/ECC", url: "https://github.com/affaan-m/ECC" },
      description: "Robust error handling across TypeScript, Python, and Go — typed errors, retries, circuit breakers, humane messages.",
      what:
        "Patterns for the unhappy path: typed errors, error boundaries, retry and circuit-breaker strategies, and user-facing messages that actually help instead of leaking stack traces.",
      why:
        "Most code looks fine until something fails. This skill makes Claude design for failure up front — the difference between an app that crashes and one that degrades gracefully.",
      worksWith: [
        { name: "coding-standards", note: "The foundation pair: clean code plus resilient code." },
        { name: "backend-patterns", note: "Server-side code is where failure handling earns its keep." },
      ],
      example:
        "Say “add error handling to this API client” and you get typed errors with retries and backoff — not a bare try/catch.",
      home: "agr-launchpad",
      url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/error-handling/SKILL.md",
      zipUrl: "downloads/skills/error-handling.zip",
    },
    {
      name: "code-tour",
      marker: "Onboarding",
      theme: "Engineering foundations",
      surfaces: ["code"],
      author: { name: "ECC community", url: "https://github.com/affaan-m/ECC", self: false },
      origin: { label: "affaan-m/ECC", url: "https://github.com/affaan-m/ECC" },
      description: "Turns “explain how this works” into a playable, step-by-step walkthrough of your real code.",
      what:
        "A skill that writes CodeTour files — guided walkthroughs anchored to real files and lines, played inside VS Code. Onboarding tours, architecture tours, PR tours, post-mortem tours.",
      why:
        "Documentation drifts; tours point at the actual code. New teammates (including future you) walk through the system step by step instead of spelunking.",
      worksWith: [
        { name: "CodeTour (VS Code extension)", note: "Plays the .tour files this skill produces." },
      ],
      example:
        "Ask “create an onboarding tour of the payment flow” and you get a guided, clickable walkthrough through the exact files involved.",
      home: "agr-launchpad",
      url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/code-tour/SKILL.md",
      zipUrl: "downloads/skills/code-tour.zip",
    },
    {
      name: "api-design",
      marker: "Backend",
      theme: "Backend & APIs",
      surfaces: ["code"],
      author: { name: "ECC community", url: "https://github.com/affaan-m/ECC", self: false },
      origin: { label: "affaan-m/ECC", url: "https://github.com/affaan-m/ECC" },
      description: "Production-grade REST API design — resource naming, status codes, pagination, versioning, rate limiting.",
      what:
        "The contract side of backend work: how endpoints are named, which status codes mean what, how pagination, filtering, errors, and versioning should behave — before any code is written.",
      why:
        "APIs are forever; a sloppy contract haunts every client that ever integrates. This bakes the conventions in from the first endpoint.",
      worksWith: [
        { name: "backend-patterns", note: "api-design shapes the contract; backend-patterns builds what's behind it." },
        { name: "error-handling", note: "Error responses are part of the contract too." },
      ],
      example:
        "Say “design the API for a bookings service” and you get consistent resources, correct status codes, and a pagination story — not ad-hoc routes.",
      home: "agr-launchpad",
      url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/api-design/SKILL.md",
      zipUrl: "downloads/skills/api-design.zip",
    },
    {
      name: "backend-patterns",
      marker: "Backend",
      theme: "Backend & APIs",
      surfaces: ["code"],
      author: { name: "ECC community", url: "https://github.com/affaan-m/ECC", self: false },
      origin: { label: "affaan-m/ECC", url: "https://github.com/affaan-m/ECC" },
      description: "Server-side architecture done right — service layering, data access, caching, queues, database optimization.",
      what:
        "The structural patterns behind solid backends: service layers, repositories, caching strategy, background queues, and query optimization. Examples use Node.js, but the patterns are general.",
      why:
        "Backends rot fastest when structure is improvised. These patterns keep business logic, data access, and infrastructure cleanly separated as the codebase grows.",
      worksWith: [
        { name: "api-design", note: "Contract on the outside, patterns on the inside." },
        { name: "secure-coding", note: "Server-side code handles the data worth protecting." },
      ],
      example:
        "Say “add a caching layer for these product queries” and you get a deliberate strategy — what to cache, for how long, and how it invalidates.",
      home: "agr-launchpad",
      url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/backend-patterns/SKILL.md",
      zipUrl: "downloads/skills/backend-patterns.zip",
    },
    {
      name: "frontend-patterns",
      marker: "Frontend",
      theme: "Frontend & verification",
      surfaces: ["code"],
      author: { name: "ECC community", url: "https://github.com/affaan-m/ECC", self: false },
      origin: { label: "affaan-m/ECC", url: "https://github.com/affaan-m/ECC" },
      description: "Frontend engineering structure — components, state management, data fetching, rendering performance.",
      what:
        "The engineering half of frontend work: how components are structured, where state lives, how data is fetched and cached, and what keeps rendering fast. Examples use React; the ideas travel.",
      why:
        "Pretty interfaces with messy internals collapse on the second feature. This keeps the logic layer as deliberate as the visual one.",
      worksWith: [
        { name: "frontend-design", note: "frontend-design owns how it looks; frontend-patterns owns how it's built." },
        { name: "webapp-testing", note: "Build it well, then watch it actually run." },
      ],
      example:
        "Say “this page re-renders constantly, fix it” and you get a real diagnosis — state placement, memoization, fetch strategy — not a random tweak.",
      home: "agr-launchpad",
      url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/frontend-patterns/SKILL.md",
      zipUrl: "downloads/skills/frontend-patterns.zip",
    },
    {
      name: "html",
      marker: "Artifacts",
      theme: "Frontend & verification",
      surfaces: ["code"],
      author: { name: "Nicolas Agrotis", self: true },
      description: "One-file, no-build HTML artifacts — dashboards, charts, and reports that open with a double-click.",
      what:
        "A skill for producing standalone single-file HTML: dashboards, data visualizations, printable reports. Everything inlined — no build step, no server, no dependencies to install.",
      why:
        "Sometimes the right deliverable is a file you can email to anyone and they just open it. This makes those artifacts polished instead of improvised.",
      worksWith: [
        { name: "frontend-design", note: "Brings the design taste; html brings the packaging." },
        { name: "webapp-testing", note: "Renders the artifact and checks it actually looks right." },
      ],
      example:
        "Say “turn this CSV into a one-file dashboard I can send to my team” — you get a polished HTML file that works offline, on anyone's machine.",
      home: "agr-launchpad",
      url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/html/SKILL.md",
      zipUrl: "downloads/skills/html.zip",
    },
    {
      name: "webapp-testing",
      marker: "Verification",
      theme: "Frontend & verification",
      surfaces: ["code"],
      author: { name: "Anthropic", url: "https://github.com/anthropics", self: false },
      origin: { label: "anthropics/skills", url: "https://github.com/anthropics/skills" },
      description: "Claude drives a real browser with Playwright — screenshots, console logs, clicks — and verifies UI before claiming “done.”",
      what:
        "A toolkit that lets Claude open your local web app in a real browser: take screenshots, read console errors, click through flows. UI work gets verified by looking, not by assuming.",
      why:
        "“It should work now” is the most expensive sentence in frontend development. This replaces it with evidence — Claude sees the rendered page before reporting back.",
      worksWith: [
        { name: "frontend-patterns", note: "Build the UI, then prove it renders and behaves." },
        { name: "frontend-design", note: "Design intent, visually confirmed." },
      ],
      example:
        "Say “check that the signup form works” and Claude launches the page, fills the form, screenshots the result, and reports what it saw.",
      home: "agr-launchpad",
      url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/webapp-testing/SKILL.md",
      zipUrl: "downloads/skills/webapp-testing.zip",
    },
    {
      name: "secure-coding",
      marker: "Security",
      theme: "Security",
      surfaces: ["code"],
      author: { name: "ECC community", url: "https://github.com/affaan-m/ECC", self: false },
      origin: { label: "affaan-m/ECC", url: "https://github.com/affaan-m/ECC" },
      description: "Security guidance applied while code is written — auth, user input, secrets, payments — not after.",
      what:
        "Proactive secure-coding patterns Claude applies during the work: handling user input, authentication flows, secrets management, sensitive endpoints. Complements (not replaces) a retrospective audit.",
      why:
        "Security bolted on at the end is security full of gaps. Catching an injection risk while the line is being written costs seconds; catching it in production costs much more.",
      worksWith: [
        { name: "backend-patterns", note: "The server side is where the sensitive surface lives." },
        { name: "code-review", note: "Write safely, then audit the diff before merging." },
      ],
      example:
        "Add a login endpoint and the skill quietly enforces the boring-but-vital parts: hashing, rate limits, safe error messages, no secrets in logs.",
      home: "agr-launchpad",
      url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/secure-coding/SKILL.md",
      zipUrl: "downloads/skills/secure-coding.zip",
    },
    {
      name: "skill-stocktake",
      marker: "Meta",
      theme: "Skill housekeeping",
      surfaces: ["code"],
      author: { name: "ECC community", url: "https://github.com/affaan-m/ECC", self: false },
      origin: { label: "affaan-m/ECC", url: "https://github.com/affaan-m/ECC" },
      description: "Audits your installed skills for quality and overlap — the skill that keeps the other skills honest.",
      what:
        "An inventory-and-audit skill: it scans the skills you've accumulated, scores their quality, and flags overlap, staleness, and broken references. Quick Scan for recent changes, Full Stocktake for everything.",
      why:
        "Skill collections grow messy quietly — duplicates, contradictions, dead links. A periodic stocktake keeps your toolkit sharp instead of sprawling.",
      worksWith: [
        { name: "skill-creator", note: "One mints new skills; the other audits the collection." },
      ],
      example:
        "Run a stocktake after a month of collecting skills — you'll learn which ones overlap, which are stale, and which quietly broke.",
      home: "agr-launchpad",
      url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/skills/skill-stocktake/SKILL.md",
      zipUrl: "downloads/skills/skill-stocktake.zip",
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
      name: "code-review",
      marker: "Quality",
      theme: "Quality & review",
      surfaces: ["code"],
      author: { name: "Anthropic", url: "https://github.com/anthropics", self: false },
      origin: { label: "anthropics/claude-plugins-official", url: "https://github.com/anthropics/claude-plugins-official" },
      description: "Reviews your changes for bugs and cleanups before you merge — with an ultra mode that runs a deep multi-agent pass in the cloud.",
      what:
        "A review plugin for Claude Code: /code-review inspects your current diff for correctness bugs and simplification opportunities, at the effort level you choose. /code-review ultra escalates to a multi-agent cloud review of the whole branch.",
      why:
        "A second pair of eyes on every diff, on demand. The cheap pass catches the obvious; the ultra pass catches what individual reviews miss — before it reaches your teammates or production.",
      worksWith: [
        { name: "secure-coding", note: "Write safely while building, audit the diff before merging." },
        { name: "superpowers", note: "Disciplined building plus a final quality gate." },
      ],
      example:
        "Finish a feature and run /code-review — you get severity-ranked findings on your branch. Add “ultra” when the change is big enough to deserve a deep pass.",
      visibility: "public",
      installSteps: ["/plugin install code-review@claude-plugins-official"],
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

  // Agents — focused subagents Claude Code dispatches for a job. All three
  // ship inside agr-launchpad (.claude/agents/), so cloning the launchpad
  // installs them; no separate download needed.
  agents: [
    {
      name: "how-to-install-agents",
      title: "How to install agents",
      type: "guide",
      marker: "Start here",
      theme: "Getting started",
      surfaces: ["code"],
      author: { name: "Nicolas Agrotis", self: true },
      description:
        "Add a subagent to Claude Code — one Markdown file in the right folder, or the built-in /agents command — following Anthropic's subagent conventions.",
      what:
        "Agents (Anthropic calls them subagents) are single Markdown files with a small frontmatter header — name, description, allowed tools — followed by the agent's instructions. Anthropic's convention: project agents live in .claude/agents/, personal agents in ~/.claude/agents/.",
      why:
        "The three agents below ship inside the launchpad, so cloning it installs them. But knowing the convention means you can install an agent from anywhere — or write your own in minutes with /agents.",
      worksWith: [
        { name: "agr-launchpad", note: "Clone it and architect, code-architect, and code-explorer arrive pre-installed." },
        { name: "how-to-install-plugins", note: "Plugins are the other way agents arrive — many bundle their own." },
      ],
      guideSections: [
        {
          title: "Where agents live (Anthropic's layout)",
          steps: [
            "An agent is a single .md file: YAML frontmatter (name, description, optional tools and model) followed by its system prompt.",
            "Project agents go in .claude/agents/<name>.md — available in that repo, shared with teammates through git.",
            "Personal agents go in ~/.claude/agents/<name>.md — available in every project. When names clash, the project version wins.",
          ],
        },
        {
          title: "Install an agent from this hub",
          steps: [
            "Easiest: clone the launchpad — all three agents below are already in its .claude/agents/ folder.",
            "Manual: open an agent card below, click “View source”, and save the .md file into your project's .claude/agents/ folder.",
            "Start a new Claude Code session — agents are discovered automatically.",
          ],
        },
        {
          title: "Manage them with /agents",
          steps: [
            "Inside Claude Code, run /agents — Anthropic's built-in interface for viewing, creating, and editing subagents.",
            "It walks you through writing new ones too: describe the job, pick the tools it may use, done.",
          ],
        },
        {
          title: "Use (or remove) an agent",
          steps: [
            "Claude dispatches an agent automatically when a task matches its description.",
            "Or ask explicitly: “Use the code-explorer agent to map how authentication works.”",
            "To remove one, delete its .md file — or do it from /agents.",
          ],
        },
      ],
      origin: { label: "Claude Code subagents (Anthropic docs)", url: "https://docs.claude.com/en/docs/claude-code/sub-agents" },
      url: "https://docs.claude.com/en/docs/claude-code/sub-agents",
    },
    {
      name: "architect",
      marker: "System design",
      theme: "Design & exploration",
      surfaces: ["code"],
      author: { name: "ECC community", url: "https://github.com/affaan-m/ECC", self: false },
      origin: { label: "affaan-m/ECC", url: "https://github.com/affaan-m/ECC" },
      description: "System-level architecture specialist — greenfield design, stack selection, scalability reviews, decisions recorded as ADRs.",
      what:
        "A subagent for SYSTEM questions: which stack, how services fit together, will this scale, which database. It weighs trade-offs and records the decision as an architecture decision record (ADR), so the “why” survives.",
      why:
        "Architecture mistakes are the expensive kind — they surface months later. A dedicated specialist that thinks only about the system level catches them while they're still cheap.",
      worksWith: [
        { name: "code-architect", note: "architect decides the system; code-architect blueprints each feature inside it." },
        { name: "grill-me", note: "Get grilled on the plan, then let the architect formalize it." },
      ],
      example:
        "Ask “should this be one service or three, and which database fits?” — the architect weighs the trade-offs and writes the decision down as an ADR.",
      home: "agr-launchpad",
      url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/agents/architect.md",
    },
    {
      name: "code-architect",
      marker: "Feature blueprints",
      theme: "Design & exploration",
      surfaces: ["code"],
      author: { name: "ECC community", url: "https://github.com/affaan-m/ECC", self: false },
      origin: { label: "affaan-m/ECC", url: "https://github.com/affaan-m/ECC" },
      description: "Designs one feature inside an existing codebase — concrete files, interfaces, data flow, and build order.",
      what:
        "A subagent that studies your codebase's existing patterns and conventions, then hands back an implementation blueprint for a single feature: which files, which interfaces, what data flow, in what order to build.",
      why:
        "Features built without a blueprint fight the codebase instead of fitting it. This one reads how your project already works and designs the feature to belong.",
      worksWith: [
        { name: "code-explorer", note: "Explore what exists first; blueprint what's next second." },
        { name: "architect", note: "The system-level counterpart, for decisions bigger than one feature." },
      ],
      example:
        "Say “plan how to add CSV export to the reports page” — you get a concrete blueprint matched to your codebase's conventions, ready to execute.",
      home: "agr-launchpad",
      url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/agents/code-architect.md",
    },
    {
      name: "code-explorer",
      marker: "Code tracing",
      theme: "Design & exploration",
      surfaces: ["code"],
      author: { name: "ECC community", url: "https://github.com/affaan-m/ECC", self: false },
      origin: { label: "affaan-m/ECC", url: "https://github.com/affaan-m/ECC" },
      description: "Traces how an existing feature actually works — execution paths, architecture layers, dependencies.",
      what:
        "A read-only subagent that deep-dives an existing feature: follows the execution path end to end, maps the layers it crosses, and documents the dependencies — so new work starts from understanding, not guessing.",
      why:
        "Most bugs in changes to old code come from not knowing what the old code really does. An explorer that traces first makes every change after it safer.",
      worksWith: [
        { name: "code-architect", note: "The natural pipeline: explore the existing, then blueprint the new." },
        { name: "code-tour", note: "Turn what the explorer found into a playable walkthrough." },
      ],
      example:
        "Ask “how does authentication actually flow through this app?” — you get the traced path, layer by layer, with the files involved.",
      home: "agr-launchpad",
      url: "https://github.com/agrotisnicolaos/agr-launchpad/blob/main/.claude/agents/code-explorer.md",
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
