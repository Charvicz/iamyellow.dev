/* global AOS */
(function () {
  // AOS init
  AOS.init({
    once: true,
    duration: 650,
    easing: "ease-out",
    offset: 80
  });

  // Explorer/List mode toggle
  const modeToggle = document.getElementById("modeToggle");
  if (modeToggle) {
    modeToggle.addEventListener("click", () => {
      const isList = document.body.classList.toggle("list-mode");
      modeToggle.textContent = isList ? "List Mode" : "Explorer Mode";
      modeToggle.setAttribute("aria-pressed", String(isList));
    });
  }

  // Projects filter
  const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
  const projects = Array.from(document.querySelectorAll(".project"));

  function setActive(btn) {
    filterButtons.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
  }

  function applyProjectFilter(filter) {
    projects.forEach(card => {
      const tags = (card.getAttribute("data-tags") || "").split(/\s+/).filter(Boolean);
      const show = filter === "all" ? true : tags.includes(filter);
      card.classList.toggle("is-hidden", !show);
    });
    // refresh AOS positions after layout change
    AOS.refreshHard();
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      setActive(btn);
      applyProjectFilter(filter);
    });
  });

  // Worlds search
  const worldSearch = document.getElementById("worldSearch");
  const clearSearch = document.getElementById("clearSearch");
  const worlds = Array.from(document.querySelectorAll(".world"));

  function applyWorldSearch(q) {
    const query = (q || "").trim().toLowerCase();
    worlds.forEach(card => {
      const keys = (card.getAttribute("data-keys") || "").toLowerCase();
      const title = (card.querySelector("h3")?.textContent || "").toLowerCase();
      const text = (card.querySelector("p")?.textContent || "").toLowerCase();
      const haystack = `${keys} ${title} ${text}`;

      const show = query.length === 0 ? true : haystack.includes(query);
      card.classList.toggle("is-hidden", !show);
    });
    AOS.refreshHard();
  }

  if (worldSearch) {
    worldSearch.addEventListener("input", (e) => {
      applyWorldSearch(e.target.value);
    });
  }

  if (clearSearch) {
    clearSearch.addEventListener("click", () => {
      if (!worldSearch) return;
      worldSearch.value = "";
      applyWorldSearch("");
      worldSearch.focus();
    });
  }
})();
