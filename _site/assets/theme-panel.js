(function () {
  const THEMES = [
    { id: "default", name: "Default", className: "theme-default", unlocked: true },
    { id: "retro", name: "Retro CRT", className: "theme-retro", unlockKey: "found_secret_seacrite" },
  ];

  const THEME_CLASSES = THEMES.map(t => t.className);

  const btn = document.getElementById("themeToggle");
  const box = document.getElementById("themeBox");
  const list = document.getElementById("themeList");

  if (!btn || !box || !list) return;

  const getUnlocks = () => {
    try { return JSON.parse(localStorage.getItem("unlocks") || "{}"); }
    catch { return {}; }
  };

  const isUnlocked = (theme) => {
    if (theme.unlocked) return true;
    if (!theme.unlockKey) return false;
    const u = getUnlocks();
    return !!u[theme.unlockKey];
  };

  const applyTheme = (themeId) => {
    const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
    if (!isUnlocked(theme)) return;

    THEME_CLASSES.forEach(c => document.documentElement.classList.remove(c));
    document.documentElement.classList.add(theme.className);

    localStorage.setItem("theme", theme.id);
    render();
  };

  const render = () => {
    list.innerHTML = "";
    const current = localStorage.getItem("theme") || "default";

    THEMES.forEach(theme => {
      const unlocked = isUnlocked(theme);

      const item = document.createElement("button");
      item.type = "button";
      item.className = "theme-item";
      item.setAttribute("aria-disabled", unlocked ? "false" : "true");
      item.innerHTML = `
        <span>${theme.name}</span>
        <span>${theme.id === current ? "✅" : unlocked ? "" : "🔒"}</span>
      `;

      item.addEventListener("click", () => {
        if (!unlocked) return;
        applyTheme(theme.id);
      });

      list.appendChild(item);
    });
  };

  // toggle open/close
  btn.addEventListener("click", () => {
    const open = box.hidden;
    box.hidden = !open;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // init theme from storage
  const saved = localStorage.getItem("theme");
  applyTheme(saved || "default");
  render();

  // helper for secret page (kdybys chtěl volat přímo)
  window.__unlockThemeKey = (key) => {
    const u = getUnlocks();
    u[key] = true;
    localStorage.setItem("unlocks", JSON.stringify(u));
    render();
  };
})();
