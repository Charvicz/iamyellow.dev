/* global AOS */
(function () {
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
    worldSearch.addEventListener("input", (e) => applyWorldSearch(e.target.value));
  }
  if (clearSearch) {
    clearSearch.addEventListener("click", () => {
      if (!worldSearch) return;
      worldSearch.value = "";
      applyWorldSearch("");
      worldSearch.focus();
    });
  }

  // ----------------------------
  // SETTINGS (EDIT THIS)
  // ----------------------------

  // ✅ 1) YouTube channel ID (nejstabilnější)
  // Jak ho najít rychle:
  // - otevři svůj kanál v prohlížeči
  // - CTRL+U (view source)
  // - najdi "channelId"
  const YT_CHANNEL_ID = "UCsE7xJBE7xnaMMC-7zCX3DQ";

  // volitelné: odkaz na kanál (pro tlačítko Channel →)
  const YT_CHANNEL_URL = "https://youtube.com/@iamyellowdev?si=dfkQbUaJnphRuDhf" + YT_CHANNEL_ID;

  // ✅ 2) Instagram profil URL (pro tlačítko Profile →)
  const IG_PROFILE_URL = "https://www.instagram.com/fly_with_yellow/";

  // ✅ 3) Instagram posty (3 URL) — doplň ručně
  // Pozn.: bez tokenu nejde stabilně získat “poslední posty” automaticky.
  const IG_POST_URLS = [
    "https://www.instagram.com/p/XXXXXXXXXXX/",
    "https://www.instagram.com/p/YYYYYYYYYYY/",
    "https://www.instagram.com/p/ZZZZZZZZZZZ/"
  ];

  // ----------------------------
  // YouTube RSS (no API key)
  // ----------------------------
  async function loadYouTubeLatest({ channelId, limit = 3, targetId, statusId }) {
    const row = document.getElementById(targetId);
    const status = document.getElementById(statusId);
    if (!row || !status) return;

    // veřejný RSS feed
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`;

    // CORS workaround přes veřejnou proxy
    const proxy = "https://api.allorigins.win/raw?url=";
    const url = proxy + encodeURIComponent(feedUrl);

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();

      const xml = new DOMParser().parseFromString(text, "text/xml");
      const entries = Array.from(xml.querySelectorAll("entry")).slice(0, limit);

      if (!entries.length) {
        status.textContent = "Žádná videa nenalezena.";
        return;
      }

      row.innerHTML = entries.map(entry => {
        const title = entry.querySelector("title")?.textContent?.trim() || "Video";
        const link = entry.querySelector("link")?.getAttribute("href") || "#";
        const published = entry.querySelector("published")?.textContent || "";
        const date = published ? new Date(published).toLocaleDateString("cs-CZ") : "";
        const videoId = entry.querySelector("yt\\:videoId, videoId")?.textContent || "";
        const thumb = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "";

        return `
          <a class="feed-card" href="${link}" target="_blank" rel="noreferrer" aria-label="${escapeHtml(title)}">
            ${thumb ? `<img class="feed-thumb" src="${thumb}" alt="">` : ""}
            <div class="feed-body">
              <h4>${escapeHtml(title)}</h4>
              <div class="feed-meta">${date ? `Publikováno: ${date}` : ""}</div>
            </div>
          </a>
        `;
      }).join("");

      status.textContent = `Načteno ${entries.length} poslední videa.`;
    } catch (e) {
      console.error(e);
      status.textContent =
        "YouTube feed se nepodařilo načíst (CORS/proxy). Lokálně/online to většinou jede, když ne → udělá se vlastní mini proxy.";
    }
  }

  // ----------------------------
  // Instagram embeds (manual URLs)
  // ----------------------------
  function renderInstagramEmbeds({ urls, targetId, statusId }) {
    const row = document.getElementById(targetId);
    const status = document.getElementById(statusId);
    if (!row || !status) return;

    const clean = (urls || []).map(u => String(u || "").trim()).filter(Boolean);

    // když jsou placeholdery, nebudeme dělat bordel
    const looksPlaceholder = clean.some(u => u.includes("XXXXXXXX") || u.includes("YYYYYYYY") || u.includes("ZZZZZZZZ"));
    if (!clean.length || looksPlaceholder) {
      row.innerHTML = "";
      status.textContent = "Doplň do app.js 3 reálný Instagram post URL (https://www.instagram.com/p/.../).";
      return;
    }

    row.innerHTML = clean.slice(0, 3).map(u => `
      <div class="ig-embed-wrap">
        <blockquote class="instagram-media" data-instgrm-permalink="${u}" data-instgrm-version="14"></blockquote>
      </div>
    `).join("");

    status.textContent = `Načteno ${Math.min(3, clean.length)} posty.`;

    // re-render embedu (Instagram script)
    // pokud script ještě není ready, zkusíme to víckrát jemně
    let tries = 0;
    const t = setInterval(() => {
      tries++;
      if (window.instgrm?.Embeds?.process) {
        window.instgrm.Embeds.process();
        clearInterval(t);
      }
      if (tries > 20) clearInterval(t);
    }, 250);
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // set header links
  const ytLink = document.getElementById("ytChannelLink");
  if (ytLink) ytLink.href = YT_CHANNEL_URL;

  const igLink = document.getElementById("igProfileLink");
  if (igLink) igLink.href = IG_PROFILE_URL;

  // run
  loadYouTubeLatest({
    channelId: YT_CHANNEL_ID,
    limit: 3,
    targetId: "ytRow",
    statusId: "ytStatus"
  });

  renderInstagramEmbeds({
    urls: IG_POST_URLS,
    targetId: "igRow",
    statusId: "igStatus"
  });
})();
