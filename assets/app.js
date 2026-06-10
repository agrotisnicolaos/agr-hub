/* agr·hub — site behavior: scroll-aware nav, catalog rendering, copy-to-clipboard. */
(function () {
  "use strict";
  var C = window.AGR_CATALOG || { launchpad: {}, packs: [], projects: [] };

  /* ---------- year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  /* ---------- scroll-aware nav ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
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
    node.addEventListener("click", function () {
      var done = function () {
        node.classList.add("copied");
        setTimeout(function () { node.classList.remove("copied"); }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        var t = document.createElement("textarea");
        t.value = text; document.body.appendChild(t); t.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(t); done();
      }
    });
  }

  /* ---------- launchpad panel ---------- */
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
  function packCard(p) {
    var card = el("article", "card");
    var top = el("div", "card__top");
    top.appendChild(el("span", "card__marker", esc(p.marker || "Pack")));
    top.appendChild(el("span", "badge badge--" + (p.visibility === "public" ? "public" : "private"),
      p.visibility === "public" ? "public" : "in dev"));
    card.appendChild(top);
    card.appendChild(el("h3", "card__name", esc(p.name)));
    card.appendChild(el("p", "card__desc", esc(p.description)));

    if (p.visibility === "public") {
      var actions = el("div", "card__actions");
      if (p.repoUrl) {
        var v = el("a", "btn btn--line btn--sm", "View ↗");
        v.href = p.repoUrl; v.target = "_blank"; v.rel = "noopener";
        actions.appendChild(v);
      }
      card.appendChild(actions);
      var cmd = p.install || ("/plugin install " + p.name + "@" + (C.marketplace || "agr-hub"));
      var clone = el("button", "clone card__install");
      clone.type = "button";
      clone.appendChild(el("code", null, esc(cmd)));
      clone.appendChild(el("span", "clone__hint", "click to copy"));
      copyBtn(clone, cmd);
      card.appendChild(clone);
    }
    return card;
  }

  function skillCard(s) {
    var href = s.url || s.repoUrl;
    // the whole card is a link straight to this skill's SKILL.md
    var card = el(href ? "a" : "article", "card" + (href ? " card--link" : ""));
    if (href) { card.href = href; card.target = "_blank"; card.rel = "noopener"; }
    var top = el("div", "card__top");
    top.appendChild(el("span", "card__marker", esc(s.marker || "Skill")));
    if (s.home) top.appendChild(el("span", "badge badge--ships", "in " + esc(s.home)));
    card.appendChild(top);
    card.appendChild(el("h3", "card__name", "/" + esc(s.name)));
    card.appendChild(el("p", "card__desc", esc(s.description)));
    if (href) card.appendChild(el("span", "card__link", "View skill ↗"));
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
    top.appendChild(el("span", "badge badge--" + (p.visibility === "public" ? "public" : "private"),
      p.visibility === "public" ? "public" : "in dev"));
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
        var gitCmd = "git clone " + p.repoUrl + ".git";
        var clone = el("button", "clone card__install");
        clone.type = "button";
        clone.appendChild(el("code", null, esc(gitCmd)));
        clone.appendChild(el("span", "clone__hint", "click to copy"));
        copyBtn(clone, gitCmd);
        card.appendChild(clone);
      }
    }
    return card;
  }

  function renderGrid(id, items, builder, empty) {
    var grid = document.getElementById(id);
    if (!grid) return;
    if (!items || !items.length) {
      var e = el("div", "empty");
      e.appendChild(el("div", "empty__mark", empty.mark));
      e.appendChild(el("h3", null, empty.title));
      e.appendChild(el("p", null, empty.body));
      grid.appendChild(e);
      return;
    }
    items.forEach(function (it) { grid.appendChild(builder(it)); });
  }

  renderGrid("skills-grid", C.skills, skillCard, {
    mark: "/",
    title: "Skills, coming soon",
    body: "Individual skills will be listed here as they're built and shared."
  });

  renderGrid("packs-grid", C.packs, packCard, {
    mark: "⌁",
    title: "The first packs are taking shape",
    body: "Project packs will appear here as they're built and released. Each will install with one " +
          "<code>/plugin</code> command."
  });

  renderGrid("projects-grid", C.projects, projectCard, {
    mark: "✦",
    title: "Projects, coming soon",
    body: "Things I'm building will be showcased here — each easy to explore, clone, or download."
  });
})();
