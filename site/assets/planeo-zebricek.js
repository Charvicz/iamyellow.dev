// assets/planeo-zebricek.js
const STORAGE_KEY = "planeo_entries_v1";
const NAME_KEY = "planeo_name_v1";

const elMonth = document.getElementById("monthPick");
const elName = document.getElementById("name");
const elKpis = document.getElementById("kpis");
const elList = document.getElementById("list");
const elPillars = document.getElementById("pillars");

const elExport = document.getElementById("exportBtn");
const elImport = document.getElementById("importFile");
const elWipe = document.getElementById("wipeBtn");

const fmt = new Intl.NumberFormat("cs-CZ");

function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function monthKeyFromTs(ts) {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function setDefaultMonth() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  elMonth.value = `${y}-${m}`;
}

function loadName() {
  elName.value = localStorage.getItem(NAME_KEY) || "";
}
function saveName() {
  localStorage.setItem(NAME_KEY, elName.value.trim());
}

function scoreOf(entry) {
  // Hot take: score musí být jednoduchý, jinak to lidi přestanou brát vážně.
  // Tohle je “body” model, co dává smysl:
  // - základ: 1 bod za prodej
  // - MM +2, Příško +1, PZ +3, Splátky +1
  // - bonus za PZ VIP +1
  let s = 1;
  if (entry?.pillars?.mm) s += 2;
  if (entry?.pillars?.prisko) s += 1;
  if (entry?.pillars?.pz) s += 3;
  if (entry?.pillars?.splatky) s += 1;
  if (entry?.pz?.code === "3R_VIP") s += 1;
  return s;
}

function filterByMonth(entries, monthKey) {
  return entries.filter(e => monthKeyFromTs(e.ts) === monthKey);
}

function render(monthKey) {
  const entriesAll = loadEntries();
  const entries = filterByMonth(entriesAll, monthKey);

  const totals = {
    sales: entries.length,
    revenue: entries.reduce((a, e) => a + (Number(e.price) || 0), 0),
    points: entries.reduce((a, e) => a + scoreOf(e), 0),
    mm: entries.filter(e => e.pillars?.mm).length,
    prisko: entries.filter(e => e.pillars?.prisko).length,
    pz: entries.filter(e => e.pillars?.pz).length,
    spl: entries.filter(e => e.pillars?.splatky).length,
    mmValue: entries.reduce((a, e) => a + (e.pillars?.mm ? (Number(e.price) || 0) : 0), 0),
      // hodnoty (Kč) podle toho, jestli je u prodeje checkbox
    priskoValue: entries.reduce((a, e) => a + (e.pillars?.prisko ? (Number(e.price) || 0) : 0), 0),
    pzValue: entries.reduce((a, e) => a + (e?.pz?.pzPrice || 0), 0),    
    splValue: entries.reduce((a, e) => a + (e.pillars?.splatky ? (Number(e.price) || 0) : 0), 0),

    // (volitelně) “PZ hodnota” jako součet ceny PZ záznamů (pokud to chceš nechat)
    pzAttachValue: entries.reduce((a, e) => a + (e?.pz?.pzPrice || 0), 0),
  };

    elKpis.innerHTML = `
    <div class="kpi"><span>Prodeje</span><b>${fmt.format(totals.sales)}</b></div>
    <div class="kpi"><span>Obrat (součet cen)</span><b>${fmt.format(totals.revenue)} Kč</b></div>
    <div class="kpi"><span>MM hodnota</span><b>${fmt.format(totals.mmValue)} Kč</b></div>
    <div class="kpi"><span>PZ “hodnota”</span><b>${fmt.format(totals.pzValue)} Kč</b></div>
    `;


  const pct = (value) => {
  if (!totals.revenue) return "0%";
  return `${Math.round((value / totals.revenue) * 100)}%`;
};

elPillars.innerHTML = `
  <div class="pillRow">
    <span>MM</span>
    <b>${fmt.format(totals.mmValue)} Kč</b>
    <span class="muted">${pct(totals.mmValue)}</span>
  </div>

  <div class="pillRow">
    <span>Příško</span>
    <b>${fmt.format(totals.priskoValue)} Kč</b>
    <span class="muted">${pct(totals.priskoValue)}</span>
  </div>

  <div class="pillRow">
    <span>PZ</span>
    <b>${fmt.format(totals.pzValue)} Kč</b>
    <span class="muted">${pct(totals.pzValue)}</span>
  </div>

  <div class="pillRow">
    <span>Splátky</span>
    <b>${fmt.format(totals.splValue)} Kč</b>
    <span class="muted">${pct(totals.splValue)}</span>
  </div>

  <div class="pillHint">Pozn.: pilíře se můžou překrývat (u jednoho prodeje může být víc pilířů).</div>
`;


  if (!entries.length) {
    elList.innerHTML = `<div class="empty">Tenhle měsíc zatím nic. Jdi farmit body 😤</div>`;
    return;
  }

  const rows = entries
    .slice()
    .sort((a, b) => b.ts - a.ts)
    .map(e => {
      const d = new Date(e.ts);
      const date = `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth()+1).padStart(2,"0")}. ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
      

      const tags = [
        e.pillars?.mm ? "MM" : null,
        e.pillars?.prisko ? "Příško" : null,
        e.pillars?.pz ? "PZ" : null,
        e.pillars?.splatky ? "Splátky" : null,
      ].filter(Boolean).map(t => `<span class="tag">${t}</span>`).join("");

      const pzLine = e.pz
        ? `<div class="meta">PZ: <b>${e.pz.label}</b> (${e.pz.categoryLabel}) • ${fmt.format(e.pz.pzPrice)} Kč • produkt s PZ: ${fmt.format(e.pz.productPriceWithPz)} Kč</div>`
        : "";

      return `
        <div class="item">
          <div class="top">
            <div class="left">
              <b>${fmt.format(e.price)} Kč</b>
              <span class="muted">${date}</span>
            </div>
            <div class="right">
              <span class="pts">+${pts} bodů</span>
            </div>
          </div>
          <div class="tags">${tags || `<span class="muted">bez pilířů</span>`}</div>
          ${pzLine}
          <button class="del" data-id="${e.id}" type="button">Smazat</button>
        </div>
      `;
    })
    .join("");

  elList.innerHTML = rows;

  elList.querySelectorAll(".del").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const next = loadEntries().filter(x => x.id !== id);
      saveEntries(next);
      render(elMonth.value);
    });
  });
}

function downloadJson(filename, obj) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// init
setDefaultMonth();
loadName();
render(elMonth.value);

elMonth.addEventListener("change", () => render(elMonth.value));
elName.addEventListener("input", saveName);

elExport.addEventListener("click", () => {
  const payload = {
    name: elName.value.trim(),
    exportedAt: Date.now(),
    entries: loadEntries(),
  };
  downloadJson(`planeo-${elMonth.value}-export.json`, payload);
});

elImport.addEventListener("change", async () => {
  const file = elImport.files?.[0];
  if (!file) return;

  try {
    const text = await file.text();
    const payload = JSON.parse(text);

    if (!payload || !Array.isArray(payload.entries)) {
      alert("Špatný JSON (čekám { entries: [...] }).");
      return;
    }

    // merge bez duplicit podle id
    const existing = loadEntries();
    const map = new Map(existing.map(e => [e.id, e]));
    for (const e of payload.entries) map.set(e.id, e);

    const merged = Array.from(map.values()).sort((a, b) => b.ts - a.ts);
    saveEntries(merged);

    if (payload.name && !elName.value.trim()) {
      elName.value = payload.name;
      saveName();
    }

    render(elMonth.value);
    alert("Import OK ✅");
  } catch {
    alert("Import fail. Ten JSON je rozbitej.");
  } finally {
    elImport.value = "";
  }
});

elWipe.addEventListener("click", () => {
  if (!confirm("Fakt smazat všechny uložené záznamy?")) return;
  localStorage.removeItem(STORAGE_KEY);
  render(elMonth.value);
});
