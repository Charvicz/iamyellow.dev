(() => {
  // Don't inject twice
  if (document.getElementById("themePanel")) return;

  const panelHTML = `
  <div id="themePanel" class="theme-panel" hidden>
    <div class="theme-head">
      <span class="theme-title">Themes</span>
      <button id="themeClose" class="theme-close" type="button">✕</button>
    </div>

    <div class="theme-buttons">
      <button class="theme-btn" data-theme="theme-default" type="button">Default</button>
      <button class="theme-btn" data-theme="theme-violet" type="button">Violet</button>
      <button class="theme-btn" data-theme="theme-matrix" type="button">Matrix</button>
      <button class="theme-btn" data-theme="theme-danger" type="button">Danger</button>
    </div>
  </div>
  `;

  document.body.insertAdjacentHTML("beforeend", panelHTML);

  const panel = document.getElementById("themePanel");
  const closeBtn = document.getElementById("themeClose");
  const buttons = document.querySelectorAll(".theme-btn");

  function openPanel(){
    panel.hidden = false;
  }

  function closePanel(){
    panel.hidden = true;
  }

  function setTheme(themeClass){
    document.documentElement.classList.remove(
      "theme-default", "theme-violet", "theme-matrix", "theme-danger"
    );
    document.documentElement.classList.add(themeClass);
    localStorage.setItem("yellowTheme", themeClass);
  }

  // Restore last theme
  const saved = localStorage.getItem("yellowTheme");
  if (saved) setTheme(saved);

  closeBtn.addEventListener("click", closePanel);

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      setTheme(btn.dataset.theme);
    });
  });

  // Global function you can call from easter eggs
  window.__openThemePanel = openPanel;
})();
