(function () {
  const THEMES = [
    { id: "default", name: "Default", vars: { "--bg": "#0B0C10" }, unlocked: true },

    // locknuté dokud nenajdou secret
    { id: "goldnight", name: "Gold Night", vars: { "--bg": "#07070a" }, unlockKey: "found_secret_seacrite" },
    { id: "paper", name: "Paper", vars: { "--bg": "#0e1016" }, unlockKey: "found_secret_seacrite" },
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

  const applyTheme = (themeId) => {
    const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
    if (!isUnlocked(theme)) return;

    // nastav CSS proměnné
    Object.entries(theme.vars || {}).forEach(([k, v]) => root.style.setProperty(k, v));

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
