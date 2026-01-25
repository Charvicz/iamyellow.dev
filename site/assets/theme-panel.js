(function () {
  const THEMES = [
    { id: "default", name: "Default", className: "theme-default", unlocked: true },
    { id: "retro", name: "Retro CRT", className: "theme-retro", unlockKey: "found_secret_seacrite" },

  ];

  const root = document.documentElement;
  const panelBtn = document.getElementById("themeToggle");
  const box = document.getElementById("themeBox");
  const list = document.getElementById("themeList");

  if (!panelBtn || !box || !list) return;

  const getUnlocked = () => {
    try { return JSON.parse(localStorage.getItem("unlocks") || "{}"); }
    catch { return {}; }
  };

  const setUnlocked = (key, value = true) => {
    const u = getUnlocked();
    u[key] = value;
    localStorage.setItem("unlocks", JSON.stringify(u));
  };

  const isUnlocked = (theme) => {
    if (theme.unlocked) return true;
    if (!theme.unlockKey) return false;
    const u = getUnlocked();
    return !!u[theme.unlockKey];
  };

  const THEME_CLASSES = ["theme-default", "theme-retro", "theme-violet", "theme-matrix", "theme-danger"];

  const applyTheme = (themeId) => {
    const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
    if (!isUnlocked(theme)) return;

    // smaž starý theme classy
    THEME_CLASSES.forEach(c => document.documentElement.classList.remove(c));

    // přidej nový
    document.documentElement.classList.add(theme.className);

    localStorage.setItem("theme", theme.id);
    render();
  };


  const render = () => {
    list.innerHTML = "";
    const current = localStorage.getItem("theme") || "default";

    THEMES.forEach(theme => {
      const unlocked = isUnlocked(theme);

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "theme-item";
      btn.setAttribute("aria-disabled", unlocked ? "false" : "true");
      btn.innerHTML = `
        <span>${theme.name}</span>
        <span>${theme.id === current ? "✅" : unlocked ? "" : "🔒"}</span>
      `;

      btn.addEventListener("click", () => {
        if (!unlocked) return;
        applyTheme(theme.id);
      });

      list.appendChild(btn);
    });
  };

  // toggle panel
  panelBtn.addEventListener("click", () => {
    const open = box.hidden;
    box.hidden = !open;
    panelBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // init: apply saved theme
  const saved = localStorage.getItem("theme");
  if (saved) applyTheme(saved);
  render();

  // expose unlock helper (pro secret stránku)
  window.__unlockThemeKey = (key) => {
    setUnlocked(key, true);
    render();
  };
})();
