/* ========= EDIT ME ========= */
// Your real email. Split so basic spam bots don't scrape it.
const EMAIL = ["olkpolishchuk", "gmail.com"].join("@");
/* =========================== */

const root = document.documentElement;
const store = {
  get: k => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} }
};

/* ---------- French translations (English lives in the HTML) ---------- */
const FR = {
  "nav.articles": "Articles",
  "nav.projects": "Projets",
  "nav.work": "Parcours",
  "nav.contact": "Contact",
  "hero.lede": "Je travaille à la croisée du métier et de l’IT&nbsp;: nettoyer les données, documenter le fonctionnement réel des processus, tester les outils avant leur mise en service et garder les projets sur les rails.",
  "hero.status": "Disponible pour un poste à temps plein à Luxembourg ou Paris dès janvier 2027",
  "btn.copy": "Copier mon e‑mail",
  "btn.call": "Prendre rendez‑vous",
  "btn.mail": "Ouvrir dans ma messagerie",
  "btn.cv": "Télécharger mon CV",
  "about.h": "Ce que je fais",
  "about.p1": "Ces dernières années, j’ai fait plusieurs stages au Luxembourg dans la finance, l’assurance et la legal tech. Mon travail se situait surtout au cœur, peu glamour, des projets&nbsp;: préparer des données pour des migrations, comparer des produits, documenter des processus et tester des systèmes.",
  "about.p2": "Je cherche maintenant un poste junior pour faire ce travail pleinement et continuer à apprendre vite.",
  "role.ba": "Analyse métier",
  "role.it": "Support de projets IT",
  "role.dt": "Transformation digitale",
  "role.dq": "Qualité des données",
  "role.fund": "Opérations de fonds",
  "path.h": "Mon parcours",
  "path.intro": "Du plus récent au plus ancien.",
  "path.kyiv": "Ville natale. Licence en relations internationales.",
  "path.poznan": "Semestre Erasmus+ à l’université Adam Mickiewicz.",
  "path.metz": "Arrivée en France. Licence à l’IAE Metz. Toujours ma base.",
  "path.strasbourg": "Master en management de projets internationaux.",
  "path.lux": "Swiss Life, Foyer, Arendt. Là où je travaille.",
  "path.yrs.lux": "Aujourd’hui",
  "orgs.label": "J’ai travaillé et étudié chez",
  "path.yrs.metz": "depuis 2022",
  "articles.h": "Articles",
  "articles.intro": "Ce que j’apprends, écrit simplement.",
  "articles.all": "Tous les articles",
  "projects.h": "Projets",
  "projects.intro": "Ce que je construis pour apprendre et montrer ma façon de réfléchir.",
  "projects.fundreg": "Un guide visuel de la réglementation européenne des fonds&nbsp;: les différences entre OPCVM et FIA, et quelles structures luxembourgeoises conviennent à quel cas.",
  "work.h": "Expérience et formation",
  "work.more": "Tous les détails sur LinkedIn",
  "cv.work": "Expérience",
  "job.ads.t": "Chef de projet IT (stage)",
  "job.ads.d": "Support de projets IT&nbsp;: expression des besoins, tests et suivi. Évolution vers la gestion de capacité.",
  "job.fgh2.t": "Business Analyst Produit (stage)",
  "job.fgh2.d": "Nettoyage et préparation des données pour la migration CRM de plus de 600 contrats, matrices de comparaison produits, migration de la cartographie des risques et mise à jour des données bancaires.",
  "job.fgh1.t": "Analyste Produit et Marché (stage)",
  "job.fgh1.d": "Benchmarks concurrentiels, études de marché, présentations d’analyse produit et revue documentaire assistée par l’IA.",
  "job.niss.t": "Stagiaire de recherche",
  "job.niss.o": "Institut national d’études stratégiques",
  "job.sl.t": "Stagiaire Opérations financières",
  "job.sl.d": "Traitement des paiements, écritures SAP, rapprochements bancaires, suivi de la liquidité et tests logiciels.",
  "edu.h": "Formation",
  "edu.ma": "Master, Management de projets internationaux",
  "edu.ma.o": "Université de Strasbourg",
  "edu.ba1": "Licence, Commerce international et management",
  "edu.ba1.o": "IAE Metz, Université de Lorraine",
  "edu.er": "Échange Erasmus+",
  "edu.er.o": "Université Adam Mickiewicz",
  "edu.ba2": "Licence, Relations internationales, avec Erasmus+ à Poznań",
  "edu.ba2.o": "Université métropolitaine Borys Grinchenko de Kyiv",
  "edu.d2e": "Programme entrepreneuriat (DU D2E)",
  "lang.h": "Langues",
  "lang.uk": "Ukrainien", "lang.ru": "Russe", "lang.en": "Anglais", "lang.fr": "Français", "lang.pl": "Polonais", "lang.es": "Espagnol",
  "lvl.native": "Langue maternelle", "lvl.c1c2": "C1 à C2", "lvl.basic": "Notions",
  "contact.h": "Contact",
  "contact.big": "Un poste ou une question&nbsp;? Le plus rapide, c’est par e‑mail.",
  "post.back": "Tous les articles",
  "post.share": "Partager cet article",
  "post.about": "Analyste",
  "post.visit": "Voir mon site",
  "list.all": "Tous",
  "post.more": "À lire aussi",
  "list.h": "Articles",
  "list.intro": "Notes courtes sur ce que j’apprends&nbsp;: fonds, données, projets.",
  "list.empty": "Le premier article arrive bientôt."
};

const T = {
  en: { copied: "Email copied", linkCopied: "Link copied", clock: t => `My local time: ${t} (Paris)`, min: n => `${n} min read`, langTag: "FR" },
  fr: { copied: "E‑mail copié", linkCopied: "Lien copié", clock: t => `Mon heure locale : ${t} (Paris)`, min: n => `${n} min de lecture`, langTag: "FR" }
};

let lang = "en";
const i18nEls = document.querySelectorAll("[data-i18n]");
i18nEls.forEach(el => el.dataset.en = el.innerHTML);

function setLang(l) {
  lang = l;
  root.lang = l;
  i18nEls.forEach(el => {
    const fr = FR[el.dataset.i18n];
    el.innerHTML = l === "fr" && fr ? fr : el.dataset.en;
  });
  const btn = document.getElementById("lang");
  if (btn) { btn.textContent = l === "fr" ? "EN" : "FR"; btn.setAttribute("aria-label", l === "fr" ? "Switch to English" : "Passer en français"); }
  document.querySelectorAll("[data-date]").forEach(el => {
    el.textContent = new Intl.DateTimeFormat(l === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(el.dataset.date));
  });
  document.querySelectorAll("[data-min]").forEach(el => el.textContent = T[l].min(el.dataset.min));
  tick();
  store.set("lang", l);
}

/* ---------- theme ---------- */
const savedTheme = store.get("theme");
if (savedTheme) root.dataset.theme = savedTheme;
else if (matchMedia("(prefers-color-scheme: dark)").matches) root.dataset.theme = "dark";
document.getElementById("theme")?.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  store.set("theme", root.dataset.theme);
});

/* ---------- toast ---------- */
const toast = document.getElementById("toast");
function say(msg) {
  if (!toast) return;
  toast.textContent = msg; toast.classList.add("show");
  clearTimeout(say.t); say.t = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------- email ---------- */
document.querySelectorAll("[data-mailto]").forEach(a => a.href = "mailto:" + EMAIL);
document.querySelectorAll("[data-copy]").forEach(b => b.addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(EMAIL); say(T[lang].copied); } catch { say(EMAIL); }
}));

/* ---------- clock ---------- */
function tick() {
  const el = document.getElementById("clock");
  if (!el) return;
  const t = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" }).format(new Date());
  el.textContent = T[lang].clock(t);
}
setInterval(tick, 30000);

/* ---------- path animation (plays once when visible) ---------- */
const path = document.querySelector(".path");
if (path) new IntersectionObserver((e, o) => {
  if (e[0].isIntersecting) { path.classList.add("go"); o.disconnect(); }
}, { threshold: .35 }).observe(path);

/* ---------- latest articles on the home page ---------- */
const latest = document.getElementById("latest");
if (latest) {
  fetch(latest.dataset.feed).then(r => r.json()).then(posts => {
    if (!posts.length) return;
    latest.innerHTML = posts.map(p => `
      <a class="card" href="${p.url}">
        <div>
          <p class="meta"><span data-date="${p.date}"></span>${p.lang === "fr" ? '<span class="tag">FR</span>' : ""}</p>
          <h3>${p.title}</h3>
          ${p.excerpt ? `<p>${p.excerpt}</p>` : ""}
        </div>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
      </a>`).join("");
    setLang(lang);
  }).catch(() => {});
}

/* ---------- article page: progress bar + sharing ---------- */
const bar = document.querySelector(".progress");
const article = document.querySelector(".prose");
if (bar && article) {
  const upd = () => {
    const r = article.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
    bar.style.transform = `scaleX(${isFinite(p) ? p : 0})`;
  };
  addEventListener("scroll", upd, { passive: true }); upd();
}
if (document.querySelector("[data-net]")) {
  const url = encodeURIComponent(location.href.split("#")[0].split("?")[0]);
  const title = encodeURIComponent(document.title);
  const links = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    x: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    telegram: `https://t.me/share/url?url=${url}&text=${title}`,
    whatsapp: `https://wa.me/?text=${title}%20${url}`
  };
  document.querySelectorAll("[data-net]").forEach(a => a.href = links[a.dataset.net]);
  document.querySelectorAll("[data-copylink]").forEach(b => b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(decodeURIComponent(url)); say(T[lang].linkCopied); } catch {}
  }));
  if (navigator.share) document.querySelectorAll(".native").forEach(n => {
    n.style.display = "grid";
    n.addEventListener("click", () => navigator.share({ title: document.title, url: decodeURIComponent(url) }).catch(() => {}));
  });
}

/* ---------- tag filter on the articles page ---------- */
const filter = document.querySelector(".tag-filter");
if (filter) {
  const apply = () => {
    const tag = new URLSearchParams(location.search).get("tag") || "";
    filter.querySelectorAll("a").forEach(a => a.classList.toggle("on", a.dataset.filter === tag));
    document.querySelectorAll("#list .card").forEach(c => {
      c.hidden = tag && !c.dataset.tags.split(" ").includes(tag);
    });
  };
  filter.addEventListener("click", e => {
    const a = e.target.closest("a"); if (!a) return;
    e.preventDefault();
    history.pushState(null, "", a.dataset.filter ? "?tag=" + a.dataset.filter : location.pathname);
    apply();
  });
  addEventListener("popstate", apply);
  apply();
}

/* ---------- language ---------- */
document.getElementById("lang")?.addEventListener("click", () => setLang(lang === "fr" ? "en" : "fr"));
setLang(store.get("lang") || ((navigator.language || "").toLowerCase().startsWith("fr") ? "fr" : "en"));
