/* agr·hub — site behavior: scroll-aware nav, catalog rendering, pop-out asset
   tiles, quick index, copy-to-clipboard. All content comes from data/catalog.js. */
(function () {
  "use strict";
  var C = window.AGR_CATALOG || { launchpad: {}, skills: [], plugins: [], agents: [], projects: [] };

  /* ---------- year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  /* ---------- scroll-aware nav ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 60) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- helpers ---------- */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function copyBtn(node, text) {
    node.addEventListener("click", function (e) {
      e.stopPropagation();
      var done = function () {
        node.classList.add("copied");
        setTimeout(function () { node.classList.remove("copied"); }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        var t = document.createElement("textarea");
        t.value = text; document.body.appendChild(t); t.select();
        try { document.execCommand("copy"); } catch (err) {}
        document.body.removeChild(t); done();
      }
    });
  }

  /* ---------- asset index (every asset by name) ---------- */
  var assetIndex = {};
  (C.skills || []).forEach(function (s) { assetIndex[s.name] = { item: s, type: "skill" }; });
  (C.plugins || []).forEach(function (p) { assetIndex[p.name] = { item: p, type: "plugin" }; });
  (C.agents || []).forEach(function (a) { assetIndex[a.name] = { item: a, type: "agent" }; });
  (C.projects || []).forEach(function (p) { assetIndex[p.name] = { item: p, type: "project" }; });

  function authorBadge(a) {
    var au = a.author || {};
    var self = au.self === true;
    return el("span", "badge " + (self ? "badge--self" : "badge--by"),
      "by " + esc(self ? "Nicolas Agrotis" : (au.name || "community")));
  }

  function surfacesLabel(a) {
    var s = a.surfaces || [];
    var parts = [];
    if (s.indexOf("chat") !== -1) parts.push("Claude chat");
    if (s.indexOf("code") !== -1) parts.push("Claude Code");
    return parts.join(" · ");
  }

  function displayName(a, type) {
    if (a.title) return a.title;
    if (a.type === "guide" || type === "project" || type === "plugin" || type === "agent") return a.name;
    return "/" + a.name;
  }

  /* ---------- pop-out tile (modal) ---------- */
  var modalRoot = null;

  function closeModal() {
    if (!modalRoot) return;
    modalRoot.remove();
    modalRoot = null;
    document.body.style.overflow = "";
    if (/^#asset=/.test(location.hash)) {
      history.replaceState(null, "", location.pathname + location.search);
    }
  }

  function modalSection(title, bodyNode) {
    var s = el("div", "tile__section");
    s.appendChild(el("h3", "tile__h", esc(title)));
    s.appendChild(bodyNode);
    return s;
  }

  function openModal(name) {
    var entry = assetIndex[name];
    if (!entry) return;
    var a = entry.item, type = entry.type;
    closeModal();

    var backdrop = el("div", "tile-backdrop");
    var tile = el("div", "tile");
    tile.setAttribute("role", "dialog");
    tile.setAttribute("aria-modal", "true");
    tile.setAttribute("aria-label", a.name);

    var close = el("button", "tile__close", "✕");
    close.type = "button";
    close.setAttribute("aria-label", "Close");
    close.addEventListener("click", closeModal);
    tile.appendChild(close);

    /* head */
    var top = el("div", "tile__top");
    top.appendChild(el("span", "card__marker", esc(a.marker || type)));
    top.appendChild(authorBadge(a));
    var surf = surfacesLabel(a);
    if (surf) top.appendChild(el("span", "tile__surfaces", "Works in: " + esc(surf)));
    tile.appendChild(top);
    tile.appendChild(el("h2", "tile__name", esc(displayName(a, type))));

    /* credit line */
    if (a.origin && a.origin.url) {
      tile.appendChild(el("p", "tile__credit",
        "Credit: first conceived in <a href=\"" + esc(a.origin.url) + "\" target=\"_blank\" rel=\"noopener\">" +
        esc(a.origin.label || a.origin.url) + " ↗</a>"));
    }

    /* actions */
    var actions = el("div", "tile__actions");
    if (a.zipUrl) {
      var z = el("a", "btn btn--primary btn--sm", "⬇ Download ZIP");
      z.href = a.zipUrl;
      if (!/^https?:/.test(a.zipUrl)) z.setAttribute("download", "");
      actions.appendChild(z);
    }
    var srcUrl = a.url || a.repoUrl;
    if (srcUrl) {
      var v = el("a", "btn btn--line btn--sm",
        /github\.com/.test(srcUrl) ? "View source on GitHub ↗" : "View the source ↗");
      v.href = srcUrl; v.target = "_blank"; v.rel = "noopener";
      actions.appendChild(v);
    }
    if (actions.childNodes.length) tile.appendChild(actions);
    if (type === "plugin" && a.installSteps && a.installSteps.length) {
      var inst = el("div", "tile__install");
      a.installSteps.forEach(function (cmd) {
        var clone = el("button", "clone");
        clone.type = "button";
        clone.appendChild(el("code", null, esc(cmd)));
        clone.appendChild(el("span", "clone__hint", "click to copy"));
        copyBtn(clone, cmd);
        inst.appendChild(clone);
      });
      tile.appendChild(modalSection(
        a.installSteps.length > 1 ? "How to install (run in order)" : "How to install", inst));
    }

    /* the four sections */
    if (a.what) tile.appendChild(modalSection("What is it?", el("p", "tile__p", esc(a.what))));
    if (a.why) tile.appendChild(modalSection("Why is it useful?", el("p", "tile__p", esc(a.why))));

    if (a.worksWith && a.worksWith.length) {
      var ul = el("ul", "tile__with");
      a.worksWith.forEach(function (w) {
        var li = el("li", null);
        if (assetIndex[w.name]) {
          var b = el("button", "tile__chip", esc(w.name));
          b.type = "button";
          b.addEventListener("click", function () { openModal(w.name); });
          li.appendChild(b);
        } else {
          li.appendChild(el("strong", "tile__chip tile__chip--plain", esc(w.name)));
        }
        if (w.note) li.appendChild(el("span", "tile__withnote", " — " + esc(w.note)));
        ul.appendChild(li);
      });
      tile.appendChild(modalSection("What it works well with", ul));
    }

    if (a.guideSections && a.guideSections.length) {
      a.guideSections.forEach(function (g) {
        var ol = el("ol", "tile__steps");
        (g.steps || []).forEach(function (st) { ol.appendChild(el("li", null, esc(st))); });
        tile.appendChild(modalSection(g.title, ol));
      });
    }

    if (a.example) {
      var ex = el("div", null);
      ex.appendChild(el("p", "tile__p tile__example", esc(a.example)));
      if (a.exampleCode) ex.appendChild(el("p", "tile__p tile__examplecode", esc(a.exampleCode)));
      tile.appendChild(modalSection("Example", ex));
    }

    backdrop.appendChild(tile);
    backdrop.addEventListener("click", function (e) { if (e.target === backdrop) closeModal(); });
    document.body.appendChild(backdrop);
    document.body.style.overflow = "hidden";
    modalRoot = backdrop;
    close.focus();
    history.replaceState(null, "", "#asset=" + encodeURIComponent(name));
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  /* ---------- launchpad panel (code page) ---------- */
  var lp = C.launchpad || {};
  var hl = document.getElementById("lp-highlights");
  if (hl && lp.highlights) {
    lp.highlights.forEach(function (h) { hl.appendChild(el("li", null, esc(h))); });
  }
  var zip = document.getElementById("lp-zip");
  if (zip && lp.zipUrl) zip.setAttribute("href", lp.zipUrl);
  var repo = document.getElementById("lp-repo");
  if (repo && lp.repoUrl) repo.setAttribute("href", lp.repoUrl);
  var cloneBtn = document.getElementById("lp-clone");
  var cloneCmd = document.getElementById("lp-clone-cmd");
  if (cloneBtn && cloneCmd && lp.repoUrl) {
    var gitCmd = "git clone " + lp.repoUrl + ".git";
    cloneCmd.textContent = gitCmd;
    copyBtn(cloneBtn, gitCmd);
  }

  /* ---------- card builders ---------- */
  function clickableCard(card, name) {
    card.classList.add("card--asset");
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.addEventListener("click", function () { openModal(name); });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(name); }
    });
  }

  function skillCard(s) {
    var card = el("article", "card" + (s.type === "guide" ? " card--guide" : ""));
    var top = el("div", "card__top");
    top.appendChild(el("span", "card__marker", esc(s.marker || "Skill")));
    top.appendChild(authorBadge(s));
    card.appendChild(top);
    card.appendChild(el("h3", "card__name", esc(displayName(s, "skill"))));
    card.appendChild(el("p", "card__desc", esc(s.description)));
    card.appendChild(el("span", "card__link",
      s.type === "guide" ? "Open the guide →" : "What is it? Why useful? →"));
    clickableCard(card, s.name);
    return card;
  }

  function agentCard(a) {
    if (a.type === "guide") return skillCard(a);
    var card = el("article", "card");
    var top = el("div", "card__top");
    top.appendChild(el("span", "card__marker", esc(a.marker || "Agent")));
    top.appendChild(authorBadge(a));
    card.appendChild(top);
    card.appendChild(el("h3", "card__name", esc(a.name)));
    card.appendChild(el("p", "card__desc", esc(a.description)));
    card.appendChild(el("span", "card__link", "What is it? Why useful? →"));
    clickableCard(card, a.name);
    return card;
  }

  function pluginCard(p) {
    if (p.type === "guide") return skillCard(p);
    var card = el("article", "card");
    var top = el("div", "card__top");
    top.appendChild(el("span", "card__marker", esc(p.marker || "Plugin")));
    top.appendChild(authorBadge(p));
    card.appendChild(top);
    card.appendChild(el("h3", "card__name", esc(p.name)));
    card.appendChild(el("p", "card__desc", esc(p.description)));

    if (p.visibility === "public") {
      card.appendChild(el("span", "card__link", "What is it? Why useful? →"));
      (p.installSteps || []).forEach(function (cmd) {
        var clone = el("button", "clone card__install");
        clone.type = "button";
        clone.appendChild(el("code", null, esc(cmd)));
        clone.appendChild(el("span", "clone__hint", "click to copy"));
        copyBtn(clone, cmd);
        card.appendChild(clone);
      });
      clickableCard(card, p.name);
    }
    return card;
  }

  function projectCard(p) {
    var card = el("article", "card card--project");
    if (p.image) {
      var shot = el("a", "card__shot");
      var img = document.createElement("img");
      img.src = p.image;
      img.alt = p.imageAlt || (p.name + " — example output");
      img.loading = "lazy";
      shot.appendChild(img);
      var primary = (p.links && p.links[0] && p.links[0].url) || p.repoUrl;
      if (primary) { shot.href = primary; shot.target = "_blank"; shot.rel = "noopener"; }
      card.appendChild(shot);
    }
    var top = el("div", "card__top");
    top.appendChild(el("span", "card__marker", esc(p.marker || "Project")));
    var meta = el("span", "card__badges");
    meta.appendChild(authorBadge(p));
    meta.appendChild(el("span", "badge badge--" + (p.visibility === "public" ? "public" : "private"),
      p.visibility === "public" ? "public" : "in dev"));
    top.appendChild(meta);
    card.appendChild(top);
    card.appendChild(el("h3", "card__name", esc(p.name)));
    card.appendChild(el("p", "card__desc", esc(p.description)));
    if (p.highlights && p.highlights.length) {
      var ul = el("ul", "card__points");
      p.highlights.forEach(function (h) { ul.appendChild(el("li", null, esc(h))); });
      card.appendChild(ul);
    }
    if (p.links && p.links.length) {
      var lks = el("div", "card__doclinks");
      p.links.forEach(function (l) {
        var a = el("a", "card__doclink", esc(l.label) + " ↗");
        a.href = l.url; a.target = "_blank"; a.rel = "noopener";
        lks.appendChild(a);
      });
      card.appendChild(lks);
    }

    if (p.visibility === "public") {
      var actions = el("div", "card__actions");
      if (p.what || p.why) {
        var d = el("button", "btn btn--line btn--sm", "What is it? →");
        d.type = "button";
        d.addEventListener("click", function () { openModal(p.name); });
        actions.appendChild(d);
      }
      if (p.zipUrl) {
        var z = el("a", "btn btn--primary btn--sm", "Download ZIP");
        z.href = p.zipUrl; actions.appendChild(z);
      }
      if (p.repoUrl) {
        var v = el("a", "btn btn--line btn--sm", "View ↗");
        v.href = p.repoUrl; v.target = "_blank"; v.rel = "noopener";
        actions.appendChild(v);
      }
      card.appendChild(actions);
      if (p.repoUrl) {
        var gitCmd2 = "git clone " + p.repoUrl + ".git";
        var clone = el("button", "clone card__install");
        clone.type = "button";
        clone.appendChild(el("code", null, esc(gitCmd2)));
        clone.appendChild(el("span", "clone__hint", "click to copy"));
        copyBtn(clone, gitCmd2);
        card.appendChild(clone);
      }
    }
    return card;
  }

  /* renders items grouped under their `theme` headings */
  function renderGroups(id, items, builder, empty) {
    var root = document.getElementById(id);
    if (!root) return;
    if (!items || !items.length) {
      var grid0 = el("div", "grid");
      var e = el("div", "empty");
      e.appendChild(el("div", "empty__mark", empty.mark));
      e.appendChild(el("h3", null, empty.title));
      e.appendChild(el("p", null, empty.body));
      grid0.appendChild(e);
      root.appendChild(grid0);
      return;
    }
    var order = [], groups = {};
    items.forEach(function (it) {
      var t = it.theme || "";
      if (!groups[t]) { groups[t] = []; order.push(t); }
      groups[t].push(it);
    });
    order.forEach(function (t) {
      if (t) root.appendChild(el("p", "lp-group-label", esc(t)));
      var grid = el("div", "grid groups__grid");
      groups[t].forEach(function (it) { grid.appendChild(builder(it)); });
      root.appendChild(grid);
    });
  }

  function bySurface(surface) {
    return (C.skills || []).filter(function (s) {
      return (s.surfaces || []).indexOf(surface) !== -1;
    });
  }

  renderGroups("chat-skills-grid", bySurface("chat"), skillCard, {
    mark: "/",
    title: "Skills, coming soon",
    body: "Skills for Claude chat will be listed here as they're built and shared."
  });

  renderGroups("code-skills-grid", bySurface("code"), skillCard, {
    mark: "/",
    title: "Skills, coming soon",
    body: "Individual skills will be listed here as they're built and shared."
  });

  renderGroups("agents-grid", C.agents, agentCard, {
    mark: "◈",
    title: "Agents, coming soon",
    body: "Specialist subagents will be listed here as they're built and shared."
  });

  renderGroups("plugins-grid", C.plugins, pluginCard, {
    mark: "⌁",
    title: "Plugins, coming soon",
    body: "Recommended plugins will appear here — each installable with a couple of " +
          "<code>/plugin</code> commands."
  });

  renderGroups("projects-grid", C.projects, projectCard, {
    mark: "✦",
    title: "Projects, coming soon",
    body: "Things I'm building will be showcased here — each easy to explore, clone, or download."
  });

  /* ---------- quick index (landing page) ---------- */
  var qi = document.getElementById("qi-root");
  if (qi) {
    function qiCol(title, page, items, soonText) {
      var col = el("div", "qi__col");
      col.appendChild(el("h3", "qi__h", esc(title) + " <span class=\"qi__count\">" + items.length + "</span>"));
      if (!items.length) {
        col.appendChild(el("p", "qi__soon", esc(soonText)));
        return col;
      }
      var list = el("div", "qi__chips");
      items.forEach(function (it) {
        var a = el("a", "qi__chip" + (it.type === "guide" ? " qi__chip--guide" : ""),
          esc(it.type === "guide" ? "📖 " + displayName(it, "skill") : it.name));
        a.href = page + "#asset=" + encodeURIComponent(it.name);
        list.appendChild(a);
      });
      col.appendChild(list);
      return col;
    }
    qi.appendChild(qiCol("Chat skills", "chat.html", bySurface("chat"), "Coming soon."));
    qi.appendChild(qiCol("Code skills", "code.html", bySurface("code"), "Coming soon."));
    qi.appendChild(qiCol("Agents", "code.html", C.agents || [], "Coming soon."));
    qi.appendChild(qiCol("Plugins", "code.html", C.plugins || [], "Coming soon."));
    qi.appendChild(qiCol("Projects", "code.html", C.projects || [], "Coming soon."));
  }

  /* ---------- deep links: #asset=<name> opens the pop-out tile ---------- */
  function openFromHash() {
    var m = location.hash.match(/^#asset=(.+)$/);
    if (m) {
      var name = decodeURIComponent(m[1]);
      if (assetIndex[name]) openModal(name);
    }
  }
  window.addEventListener("hashchange", openFromHash);
  openFromHash();
})();
