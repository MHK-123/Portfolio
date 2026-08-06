/* =========================================================
   Mohammed Hussain — Portfolio · vanilla JS
   ========================================================= */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- 1. Design system switcher ---------------- */
  var THEMES = [
    { id: "minimalism", name: "Minimalism", dot: "#14140f" },
    { id: "maximalism", name: "Maximalism", dot: "#ff2e88" },
    { id: "cyberpunk", name: "Cyberpunk", dot: "#00fff0" },
    { id: "glassmorphism", name: "Glassmorphism", dot: "#7cc8ff" },
    { id: "neumorphism", name: "Neumorphism", dot: "#5b73ff" },
    { id: "skeuomorphism", name: "Skeuomorphism", dot: "#a8541c" },
    { id: "neo-brutalism", name: "Neo Brutalism", dot: "#0026ff" },
    { id: "enterprise", name: "Enterprise", dot: "#0b5fff" },
    { id: "apple", name: "Apple", dot: "#0071e3" },
    { id: "claude", name: "Claude", dot: "#d97757" },
    { id: "github-dark", name: "GitHub Dark", dot: "#2f81f7" },
    { id: "vscode", name: "VS Code", dot: "#007acc" },
    { id: "material3", name: "Material Design 3", dot: "#6750a4" },
    { id: "retro-crt", name: "Retro CRT", dot: "#00ff66" }
  ];

  var themeBtn = document.getElementById("themeBtn");
  var themeMenu = document.getElementById("themeMenu");
  var themeLabel = document.getElementById("themeLabel");
  var STORE_KEY = "mh-theme";

  THEMES.forEach(function (t) {
    var li = document.createElement("li");
    li.setAttribute("role", "option");
    li.dataset.theme = t.id;
    li.innerHTML = '<span class="swatch" style="background:' + t.dot + '"></span>' + t.name;
    li.addEventListener("click", function () {
      applyTheme(t.id);
      closeThemeMenu();
      themeBtn.focus();
    });
    themeMenu.appendChild(li);
  });

  function applyTheme(id) {
    var t = THEMES.filter(function (x) { return x.id === id; })[0] || THEMES[0];
    document.documentElement.setAttribute("data-theme", t.id);
    themeLabel.textContent = t.name;
    Array.prototype.forEach.call(themeMenu.children, function (li) {
      li.setAttribute("aria-selected", li.dataset.theme === t.id ? "true" : "false");
    });
    try { localStorage.setItem(STORE_KEY, t.id); } catch (e) {}
    if (mesh) mesh.retheme();
  }

  function closeThemeMenu() {
    themeMenu.classList.remove("open");
    themeBtn.setAttribute("aria-expanded", "false");
  }
  themeBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    var open = themeMenu.classList.toggle("open");
    themeBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.addEventListener("click", function (e) {
    if (!themeMenu.contains(e.target) && e.target !== themeBtn) closeThemeMenu();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeThemeMenu(); });

  var stored = null;
  try { stored = localStorage.getItem(STORE_KEY); } catch (e) {}
  applyTheme(stored || "minimalism");

  /* ---------------- 2. Icons ---------------- */
  function icon(path, extra) {
    return '<svg viewBox="0 0 24 24" class="ico ' + (extra || "") + '" aria-hidden="true">' + path + "</svg>";
  }
  var I = {
    trophy: icon('<path d="M8 4h8v5a4 4 0 0 1-8 0V4Zm8 1h3v2a3 3 0 0 1-3 3M8 5H5v2a3 3 0 0 0 3 3m4 5v4m-3 1h6"/>', "ico-lg"),
    shield: icon('<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3Zm-2 9 1.6 1.6L15 10"/>', "ico-lg"),
    code: icon('<path d="m8 8-4 4 4 4m8-8 4 4-4 4m-2-11-4 14"/>', "ico-lg"),
    box: icon('<path d="M12 3 3 7.5v9L12 21l9-4.5v-9L12 3Zm0 0v18M3 7.5 12 12l9-4.5"/>', "ico-lg"),
    monitor: icon('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8m-4-4v4"/>', "ico-lg"),
    wrench: icon('<path d="M14 7a4 4 0 1 0 4 4l3 3-3 3-3-3a4 4 0 0 1-4-4L4 6l2-2 8 3Z"/>', "ico-lg"),
    git: icon('<circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="12" r="2.5"/><path d="M6 8.5v7m2.5-3.5H15"/>', "ico-lg"),
    users: icon('<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 5.5a3 3 0 0 1 0 6m1 8.5a5.5 5.5 0 0 0-2-4.3"/>', "ico-lg"),
    book: icon('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5Zm0 0V20"/>', "ico-lg"),
    globe: icon('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>', "ico-lg"),
    dumbbell: icon('<path d="M4 9v6m3-8v10m10-10v10m3-8v6M7 12h10"/>', "ico-lg"),
    wave: icon('<path d="M3 8c2-1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0M3 14c2-1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0"/>', "ico-lg"),
    horse: icon('<path d="M4 20c0-5 3-9 8-9l3-3-1-3 4 2 2 3-3 2c1 3 0 6-2 8"/>', "ico-lg"),
    fist: icon('<path d="M6 11V8a2 2 0 1 1 4 0m0 0V7a2 2 0 1 1 4 0v1a2 2 0 1 1 4 0v5a6 6 0 0 1-12 0v-2H6Z"/>', "ico-lg"),
    scroll: icon('<path d="M6 4h10a2 2 0 0 1 2 2v12a2 2 0 0 0 2 2H8a2 2 0 0 1-2-2V4Zm3 5h6M9 13h6"/>', "ico-lg"),
    pen: icon('<path d="M4 20l4-1 11-11-3-3L5 16l-1 4Z"/>', "ico-lg"),
    link: icon('<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1m-1 8a5 5 0 0 1-7 0 5 5 0 0 1 0-7l1-1"/>', "ico-lg"),
    mail: icon('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>', "ico-lg"),
    chat: icon('<path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5A8 8 0 1 1 21 12Z"/>', "ico-lg"),
    x: icon('<path d="m5 5 14 14M19 5 5 19"/>', "ico-lg"),
    camera: icon('<rect x="3" y="5" width="18" height="15" rx="4"/><circle cx="12" cy="12.5" r="3.5"/><path d="M17 8.5h.01"/>', "ico-lg"),
    reddit: icon('<circle cx="12" cy="13" r="7"/><path d="M9.5 12.5h.01M14.5 12.5h.01M9.5 16c1.6 1 3.4 1 5 0M15 5l1.5 3.5"/>', "ico-lg"),
    briefcase: icon('<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>', "ico-lg"),
    brain: icon('<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8V16a3 3 0 0 0 4 3m3-15a3 3 0 0 1 3 3 3 3 0 0 1 1 5.8V16a3 3 0 0 1-4 3m0-15v15"/>', "ico-lg"),
    database: icon('<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>', "ico-lg"),
    layers: icon('<path d="m12 3 9 5-9 5-9-5 9-5Zm9 9-9 5-9-5m18 4-9 5-9-5"/>', "ico-lg"),
    server: icon('<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>', "ico-lg")
  };
  var dot = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="6"/></svg>';

  /* ---------------- 3. Data ---------------- */
  var achievements = [
    { i: I.briefcase, t: "Data Science & Analytics Intern", s: "ZIDIO — AI/ML initiatives and business-facing data analysis." },
    { i: I.users, t: "Administrator at MUSA", s: "Community operations, member support and event execution." },
    { i: I.git, t: "MUSA Hackathon", s: "Web & Technical Management Team for the hackathon." },
    { i: I.box, t: "Multiple SaaS products", s: "Shipped end-to-end products with auth, billing and dashboards." },
    { i: I.monitor, t: "Desktop applications", s: "Built native-feeling desktop tools for real workflows." },
    { i: I.wrench, t: "Developer tools", s: "Automation, bots and utilities that speed up engineering work." },
    { i: I.code, t: "Open Source Contributor", s: "Contributing fixes and features to public repositories." }
  ];

var skills = [
  {
    i: I.code,
    t: "Programming Languages",
    items: [
      { name: "Python", icon: "assets/icons/python.png" },
      { name: "JavaScript", icon: "assets/icons/js.png" },
      { name: "TypeScript", icon: "assets/icons/ts.png" },
      { name: "HTML", icon: "assets/icons/html.png" },
      { name: "CSS", icon: "assets/icons/css.png" }
    ]
  },

  {
    i: I.layers,
    t: "Frameworks & Libraries",
    items: [
      { name: "React", icon: "assets/icons/react.png" },
      { name: "Next.js", icon: "assets/icons/next.png" },
      { name: "Node.js", icon: "assets/icons/node.png" },
      { name: "Express.js", icon: "assets/icons/express.png" },
      { name: "NumPy", icon: "assets/icons/numpy.png" },
      { name: "Pandas", icon: "assets/icons/pandas.png" },
      { name: "Matplotlib", icon: "assets/icons/matplot.png" }
    ]
  },

  {
    i: I.database,
    t: "Databases",
    items: [
      { name: "PostgreSQL", icon: "assets/icons/postgre.png" },
      { name: "MySQL", icon: "assets/icons/mysql.png" }
    ]
  },

  {
    i: I.wrench,
    t: "Tools",
    items: [
      { name: "Git", icon: "assets/icons/git.png" },
      { name: "GitHub", icon: "assets/icons/github.png" },
      { name: "Docker", icon: "assets/icons/docker.png" },
      { name: "Linux", icon: "assets/icons/linux.png" }
    ]
  },

  {
    i: I.brain,
    t: "Artificial Intelligence",
    items: [
      { name: "Machine Learning", icon: "assets/icons/python.png" },
      { name: "Data Science", icon: "assets/icons/pandas.png" },
      { name: "Prompt Engineering", icon: "assets/icons/python.png" }
    ]
  }
];

  var hobbies = [
    { i: I.code, t: "Coding" }, { i: I.book, t: "Reading & Writing" },
    { i: I.globe, t: "Learning Languages" }, { i: I.scroll, t: "History" },
    { i: I.dumbbell, t: "Calisthenics" }, { i: I.wave, t: "Swimming" },
    { i: I.horse, t: "Horse Riding" }, { i: I.fist, t: "Mixed Martial Arts (UFC)" }
  ];

 var projects = [
  {
    name: "Blueprint Generator",
    image: "assets/blueprint.jpg",
    status: "Live",
    url: "https://blueprintgenerator.insforge.site/login",
    desc: "AI-powered platform for planning software projects and generating structured documentation.",
    features: [
      "AI-powered project planning",
      "Documentation generation",
      "Developer resource hub",
      "Project collaboration",
      "Modern dashboard",
      "Export support"
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AI APIs"]
  },
  {
    name: "Finvora ERP",
    image: "assets/finvora.png",
    status: "In Development",
    desc: "Modern ERP platform for accounting, inventory, business management, and analytics.",
    features: [
      "Accounting",
      "Inventory",
      "GST",
      "Analytics",
      "Authentication",
      "AI-powered workflows"
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker"]
  },
  {
    name: "Fluxa Media Suite",
    image: "assets/fluxa.png",
    status: "Live",
    url: "https://contra.com/products/6oM1SNAD-fluxa",
    desc: "Desktop media downloader supporting multiple platforms with a modern interface.",
    features: [
      "Media downloading",
      "Batch downloads",
      "Audio & video support",
      "Desktop application",
      "Fast processing",
      "Clean interface"
    ],
    tech: ["Python", "FFmpeg", "Tkinter", "yt-dlp"]
  },
  {
    name: "Scribe",
    image: "assets/scribe.png",
    status: "Live",
    url: "https://www.scribebot.dev",
    desc: "Discord voice and community management bot with automation features.",
    features: [
      "Voice management",
      "Community tools",
      "Moderation",
      "Logging",
      "Automation",
      "Server utilities"
    ],
    tech: ["Node.js", "TypeScript", "Discord.js", "PostgreSQL"]
  },
  {
    name: "Discord Subscription Manager",
    image: "assets/subscription.png",
    status: "Live",
    url: "https://subscription-ttob.onrender.com/",
    desc: "Subscription management platform with automated premium role handling.",
    features: [
      "Premium subscriptions",
      "Role assignment",
      "Payment integration",
      "Renewal tracking",
      "Webhook automation",
      "Admin dashboard"
    ],
    tech: ["Node.js", "Express.js", "Discord API", "SQLite"]
  },
  {
    name: "DungeonKeeper",
    image: "assets/modmail.png",
    status: "Live",
    url: "https://discord.com/invite/6XHQ4FpCuw",
    desc: "Discord ModMail and moderation bot for community management.",
    features: [
      "ModMail",
      "Moderation",
      "Audit logs",
      "Ticket system",
      "Permissions",
      "Community utilities"
    ],
    tech: ["Python", "Discord.py", "SQLite"]
  }
];

var socials = [
  {
    icon: "assets/icons/github.png",
    t: "GitHub",
    s: "MHK-123",
    url: "https://github.com/MHK-123"
  },
  {
    icon: "assets/linkedin.png",
    t: "LinkedIn",
    s: "mohammed-hussain",
    url: "https://www.linkedin.com/in/mohammed-hussain-6306a1334/"
  },
  {
    icon: "assets/contra.png",
    t: "Contra",
    s: "mohammed_hussain",
    url: "https://contra.com/mohammed_hussain_2rqiwses/work?r=mohammed_hussain_2rqiwses"
  },
  {
    icon: "assets/gmail.png",
    t: "Email",
    s: "mithanihussain.123@gmail.com",
    url: "mailto:mithanihussain.123@gmail.com"
  },
  {
    icon: "assets/discord.png",
    t: "Discord",
    s: "hussain.mhk",
    copy: "hussain.mhk"
  },
  {
    icon: "assets/x.png",
    t: "X",
    s: "@Its_MH123",
    url: "https://x.com/Its_MH123"
  },
  {
    icon: "assets/insta.png",
    t: "Instagram",
    s: "insane_mh123",
    url: "https://www.instagram.com/insane_mh123/"
  },
  {
    icon: "assets/reddit.png",
    t: "Reddit",
    s: "u/mhk-123",
    url: "https://www.reddit.com/user/mhk-123/"
  }
];
  /* ---------------- 4. Render ---------------- */
  function el(html) {
    var d = document.createElement("div");
    d.innerHTML = html.trim();
    return d.firstElementChild;
  }
  function mount(id, nodes) {
    var host = document.getElementById(id);
    nodes.forEach(function (n) { host.appendChild(n); });
  }

  mount("achievementsGrid", achievements.map(function (a) {
    return el('<article class="card tile reveal"><span class="tile-ico">' + a.i +
      '</span><div><h3>' + a.t + "</h3><p>" + a.s + "</p></div></article>");
  }));


  mount("socialsGrid", socials.map(function (s) {
  var isMail = s.url && s.url.indexOf("mailto:") === 0;
  var isCopy = !!s.copy;

  return el(
    '<a class="card social reveal" href="' + (isCopy ? "#" : s.url) + '"' +
      (isCopy ? ' data-copy="' + s.copy + '"' : '') +
      (isMail || isCopy ? "" : ' target="_blank" rel="noopener noreferrer"') +
    '>' +
      '<span class="tile-ico">' +
        '<img src="' + s.icon + '" alt="' + s.t + '" class="social-icon">' +
      '</span>' +
      '<span>' +
        '<strong>' + s.t + '</strong>' +
        '<small>' + s.s + '</small>' +
      '</span>' +
    '</a>'
  );
}));

document.querySelectorAll("[data-copy]").forEach(function (card) {
  card.addEventListener("click", function (e) {
    e.preventDefault();

    navigator.clipboard.writeText(card.dataset.copy);

    var small = card.querySelector("small");
    var old = small.textContent;

    small.textContent = "Copied!";
    setTimeout(function () {
      small.textContent = old;
    }, 1500);
  });
});

  mount("hobbiesGrid", hobbies.map(function (h) {
    return el('<article class="card hobby reveal"><span class="tile-ico">' + h.i +
      "</span><h3>" + h.t + "</h3></article>");
  }));

  mount("projectsGrid", projects.map(function (p) {
    var cta = p.url
      ? '<a class="btn btn-primary" href="' + p.url + '" target="_blank" rel="noopener noreferrer">Live Demo</a>'
      : '<span class="btn btn-outline" aria-disabled="true">Coming soon</span>';
    return el('<article class="card project reveal">' +
      '<div class="thumb"><img src="' + p.image + '" alt="' + p.name + '" loading="lazy"></div>' +
      '<div class="project-head"><h3 class="h3">' + p.name + '</h3><span class="badge ' +
      (p.status === "Live" ? "badge-live" : "") + '">' + p.status + "</span></div>" +
      '<p class="muted">' + p.desc + "</p>" +
      '<ul class="feature-list">' + p.features.map(function (f) { return "<li>" + f + "</li>"; }).join("") + "</ul>" +
      '<div class="tech">' + p.tech.map(function (t) { return "<span>" + t + "</span>"; }).join("") + "</div>" +
      cta + "</article>");
  }));


  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------- 5. Nav ---------------- */
  var nav = document.getElementById("nav");
  var burger = document.getElementById("burger");
  var navLinks = document.getElementById("navLinks");

  burger.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }
  });
  window.addEventListener("scroll", function () {
    nav.classList.toggle("scrolled", window.scrollY > 8);
  }, { passive: true });

  var sections = ["about", "experience", "skills", "projects", "contact"];
  var linkFor = {};
  Array.prototype.forEach.call(navLinks.querySelectorAll("a"), function (a) {
    linkFor[a.getAttribute("href").slice(1)] = a;
  });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting && linkFor[en.target.id]) {
        Object.keys(linkFor).forEach(function (k) { linkFor[k].classList.remove("active"); });
        linkFor[en.target.id].classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(function (id) {
    var s = document.getElementById(id);
    if (s) spy.observe(s);
  });

  /* ---------------- 6. Reveal on scroll ---------------- */
  var revealObs = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (en, idx) {
      if (en.isIntersecting) {
        en.target.style.transitionDelay = Math.min(idx * 60, 240) + "ms";
        en.target.classList.add("in");
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  Array.prototype.forEach.call(document.querySelectorAll(".reveal"), function (n) { revealObs.observe(n); });

  /* ---------------- 7. Rotating titles ---------------- */
  var titles = ["Software Developer", "AI/ML Undergraduate", "SaaS Builder", "Full-Stack Developer",
    "Backend Engineer", "Open Source Contributor", "AI Enthusiast"];
  var rot = document.getElementById("rotator");
  var ri = 0;
  if (!reduce) {
    setInterval(function () {
      ri = (ri + 1) % titles.length;
      rot.textContent = titles[ri];
      rot.style.animation = "none";
      void rot.offsetWidth;
      rot.style.animation = "";
    }, 2200);
  }

  /* ---------------- 8. Resume ----------------
     The Download Resume button links directly to the hosted PDF in index.html. */


  /* ---------------- 9. Contact form ---------------- */
  var form = document.getElementById("contactForm");
  var okMsg = document.getElementById("formSuccess");
  var rules = {
    name: function (v) { return v.length >= 2 ? "" : "Please enter your name."; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v) ? "" : "Enter a valid email address."; },
    subject: function (v) { return v.length >= 3 ? "" : "Add a short subject."; },
    message: function (v) { return v.length >= 12 ? "" : "Tell me a bit more (12+ characters)."; }
  };
  function validate(field) {
    var msg = rules[field.name](field.value.trim());
    document.getElementById("err-" + field.name).textContent = msg;
    field.setAttribute("aria-invalid", msg ? "true" : "false");
    return !msg;
  }
  Object.keys(rules).forEach(function (k) {
    var f = form.elements[k];
    f.addEventListener("blur", function () { validate(f); });
    f.addEventListener("input", function () {
      if (f.getAttribute("aria-invalid") === "true") validate(f);
    });
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var valid = Object.keys(rules).every(function (k) { return validate(form.elements[k]); });
    if (!valid) {
      var bad = form.querySelector('[aria-invalid="true"]');
      if (bad) bad.focus();
      return;
    }
    var btn = form.querySelector('button[type="submit"]');
    var label = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Sending…";
    fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form)
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        okMsg.hidden = false;
        form.reset();
        Object.keys(rules).forEach(function (k) {
          form.elements[k].setAttribute("aria-invalid", "false");
        });
        setTimeout(function () { okMsg.hidden = true; }, 8000);
      })
      .catch(function () {
        document.getElementById("err-message").textContent =
          "Couldn't send right now — please email mithanihussain.123@gmail.com.";
      })
      .then(function () {
        btn.disabled = false;
        btn.textContent = label;
      });
  });


  /* ---------------- 10. Polygon mesh background ---------------- */
  var mesh = (function () {
    var canvas = document.getElementById("mesh");
    if (!canvas) return null;
    var ctx = canvas.getContext("2d");
    var w = 0, h = 0, dpr = 1, nodes = [], raf = null;
    var style = { node: "#000", line: "#000", tri: "#000", alpha: 0.1 };
    var pointer = { x: -9999, y: -9999 };
    var theme = "minimalism";

    function readStyle() {
      var cs = getComputedStyle(document.documentElement);
      style.node = cs.getPropertyValue("--mesh-node").trim() || "#000";
      style.line = cs.getPropertyValue("--mesh-line").trim() || "#000";
      style.tri = cs.getPropertyValue("--mesh-tri").trim() || "#000";
      style.alpha = parseFloat(cs.getPropertyValue("--mesh-alpha")) || 0.1;
      theme = document.documentElement.getAttribute("data-theme");
    }

    function config() {
      var dense = { maximalism: 1.5, cyberpunk: 1.3, "retro-crt": 1.1, "github-dark": 1.2, vscode: 1.2 }[theme] || 1;
      var speed = { cyberpunk: 0.55, maximalism: 0.5, "retro-crt": 0.2, neumorphism: 0.14, apple: 0.16, enterprise: 0.18 }[theme] || 0.28;
      var count = Math.round(Math.min(90, (w * h) / 22000) * dense);
      return { count: Math.max(26, count), speed: speed, link: theme === "minimalism" || theme === "apple" ? 150 : 175 };
    }

    function build() {
  var c = config();
  nodes = [];

  for (var i = 0; i < c.count; i++) {
    nodes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * c.speed * 3,
      vy: (Math.random() - 0.5) * c.speed * 3,
      r: 1 + Math.random() * 1.6
    });
  }
}

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function draw() {
      var c = config();
      ctx.clearRect(0, 0, w, h);
      var i, j, k, a, b, cN, dx, dy, d;

      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        dx = a.x - pointer.x; dy = a.y - pointer.y;
        d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130 && d > 0.01) {
          a.x += (dx / d) * (130 - d) * 0.02;
          a.y += (dy / d) * (130 - d) * 0.02;
        }
      }

      // triangles
      ctx.fillStyle = style.tri;
      for (i = 0; i < nodes.length; i += 3) {
        a = nodes[i]; b = nodes[(i + 1) % nodes.length]; cN = nodes[(i + 2) % nodes.length];
        if (Math.hypot(a.x - b.x, a.y - b.y) > c.link || Math.hypot(b.x - cN.x, b.y - cN.y) > c.link) continue;
        ctx.globalAlpha = style.alpha * 0.35;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.lineTo(cN.x, cN.y);
        ctx.closePath(); ctx.fill();
      }

      // lines
      ctx.strokeStyle = style.line;
      ctx.lineWidth = theme === "neo-brutalism" ? 1.4 : 0.8;
      for (i = 0; i < nodes.length; i++) {
        for (j = i + 1; j < nodes.length; j++) {
          a = nodes[i]; b = nodes[j];
          d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > c.link) continue;
          ctx.globalAlpha = style.alpha * (1 - d / c.link);
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }

      // nodes
      ctx.fillStyle = style.node;
      for (k = 0; k < nodes.length; k++) {
        a = nodes[k];
        ctx.globalAlpha = Math.min(1, style.alpha * 4.5);
        if (theme === "neo-brutalism" || theme === "vscode" || theme === "retro-crt") {
          ctx.fillRect(a.x - a.r, a.y - a.r, a.r * 2, a.r * 2);
        } else {
          ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    readStyle();
    resize();
    window.addEventListener("resize", function () {
      clearTimeout(resize._t);
      resize._t = setTimeout(resize, 160);
    });
    window.addEventListener("pointermove", function (e) {
      pointer.x = e.clientX; pointer.y = e.clientY;
    }, { passive: true });
    window.addEventListener("pointerleave", function () { pointer.x = pointer.y = -9999; });

    function start() { if (!raf) raf = requestAnimationFrame(draw); }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else if (!reduce) start();
    });

    if (reduce) { readStyle(); ctx.clearRect(0, 0, w, h); draw(); stop(); }
    else start();

    return {
      retheme: function () {
        readStyle();
        build();
        if (reduce) { stop(); draw(); stop(); }
      }
    };
  })();

  if (mesh) mesh.retheme();
})();
