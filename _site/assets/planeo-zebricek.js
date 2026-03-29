// assets/planeo-zebricek.js
const STORAGE_KEY = "planeo_entries_v1";
const NAME_KEY = "planeo_name_v1";

const fmt = new Intl.NumberFormat("cs-CZ");

// ---------- storage helpers ----------
function loadEntries() {
  try {
    const arr = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function monthKeyFromTs(ts) {
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return "invalid";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function filterByMonth(entries, monthKey) {
  return entries.filter(e => monthKeyFromTs(e?.ts) === monthKey);
}

// ---------- render ----------
function render(monthKey) {
  const elKpis = document.getElementById("kpis");
  const elList = document.getElementById("list");
  const elPillars = document.getElementById("pillars");
  const elMonth = document.getElementById("monthPick");

  const entriesAll = loadEntries();
  const entries = filterByMonth(entriesAll, monthKey);

  const revenue = entries.reduce((a, e) => a + (Number(e?.price) || 0), 0);

  const totals = {
    sales: entries.length,
    revenue,

    // hodnoty pilířů
    mmValue: entries.reduce((a, e) => a + ((e?.pillars?.mm) ? (Number(e?.price) || 0) : 0), 0),
    priskoValue: entries.reduce((a, e) => a + ((e?.pillars?.prisko) ? (Number(e?.price) || 0) : 0), 0),

    // ✅ PZ hodnota = jen cena PZ (z tabulky)
    pzValue: entries.reduce((a, e) => a + (e?.pz?.pzPrice || 0), 0),

    splValue: entries.reduce((a, e) => a + ((e?.pillars?.splatky) ? (Number(e?.price) || 0) : 0), 0),
  };

  // KPIs
  if (elKpis) {
    elKpis.innerHTML = `
      <div class="kpi"><span>Prodeje</span><b>${fmt.format(totals.sales)}</b></div>
      <div class="kpi"><span>Obrat (součet cen)</span><b>${fmt.format(totals.revenue)} Kč</b></div>
      <div class="kpi"><span>MM hodnota</span><b>${fmt.format(totals.mmValue)} Kč</b></div>
      <div class="kpi"><span>PZ hodnota</span><b>${fmt.format(totals.pzValue)} Kč</b></div>
    `;
  }

  // Souhrn pilířů (Kč + % z obratu)
  const pct = (value) => {
    if (!totals.revenue) return "0%";
    return `${Math.round((value / totals.revenue) * 100)}%`;
  };

  if (elPillars) {
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
  }

  // List
  if (!elList) return;

  if (!entries.length) {
    elList.innerHTML = `<div class="empty">Tenhle měsíc zatím nic.</div>`;
    return;
  }

  const rows = entries
    .slice()
    .sort((a, b) => (Number(b?.ts) || 0) - (Number(a?.ts) || 0))
    .map(e => {
      const d = new Date(e?.ts);
      const date = Number.isNaN(d.getTime())
        ? "—"
        : `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}. ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

      const pillars = e?.pillars || {};
      const tags = [
        pillars.mm ? "MM" : null,
        pillars.prisko ? "Příško" : null,
        e?.pz ? "PZ" : null,
        pillars.splatky ? "Splátky" : null,
      ]
        .filter(Boolean)
        .map(t => `<span class="tag">${t}</span>`)
        .join("");

      const pzLine = e?.pz
        ? `<div class="meta">PZ: <b>${e.pz.label}</b> (${e.pz.categoryLabel}) • ${fmt.format(e.pz.pzPrice)} Kč • produkt s PZ: ${fmt.format(e.pz.productPriceWithPz)} Kč</div>`
        : "";

      const id = e?.id || "";

      return `
        <div class="item">
          <div class="top">
            <div class="left">
              <b>${fmt.format(Number(e?.price) || 0)} Kč</b>
              <span class="muted">${date}</span>
            </div>
            <div class="right"></div>
          </div>
          <div class="tags">${tags || `<span class="muted">bez pilířů</span>`}</div>
          ${pzLine}
          <button class="del" data-id="${id}" type="button">Smazat</button>
        </div>
      `;
    })
    .join("");

  elList.innerHTML = rows;

  // delete single
  elList.querySelectorAll(".del").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      if (!id) return;

      const next = loadEntries().filter(x => x?.id !== id);
      saveEntries(next);

      // rerender current month
      render(elMonth?.value || monthKey);
    });
  });
}

// ---------- download ----------
function downloadJson(filename, obj) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ---------- init ----------
document.addEventListener("DOMContentLoaded", () => {
  const elMonth = document.getElementById("monthPick");
  const elName = document.getElementById("name");

  const elExport = document.getElementById("exportBtn");
  const elImport = document.getElementById("importFile");
  const elWipe = document.getElementById("wipeBtn");

  // default month
  if (elMonth) {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    elMonth.value = `${y}-${m}`;
  }

  // load name
  if (elName) elName.value = localStorage.getItem(NAME_KEY) || "";
  const saveName = () => {
    if (!elName) return;
    localStorage.setItem(NAME_KEY, elName.value.trim());
  };

  // first render
  render(elMonth?.value || "invalid");

  // listeners
  elMonth?.addEventListener("change", () => render(elMonth.value));
  elName?.addEventListener("input", saveName);

  elExport?.addEventListener("click", () => {
    const payload = {
      name: elName?.value?.trim() || "",
      exportedAt: Date.now(),
      entries: loadEntries(),
    };
    downloadJson(`planeo-${elMonth?.value || "export"}-export.json`, payload);
  });

  elImport?.addEventListener("change", async () => {
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
      const map = new Map(existing.map(e => [e?.id, e]));
      for (const e of payload.entries) {
        if (e?.id) map.set(e.id, e);
      }

      const merged = Array.from(map.values()).sort((a, b) => (Number(b?.ts) || 0) - (Number(a?.ts) || 0));
      saveEntries(merged);

      if (payload.name && elName && !elName.value.trim()) {
        elName.value = payload.name;
        saveName();
      }

      render(elMonth?.value || "invalid");
      alert("Import OK ✅");
    } catch {
      alert("Import fail. Ten JSON je rozbitej.");
    } finally {
      elImport.value = "";
    }
  });

  elWipe?.addEventListener("click", () => {
    if (!confirm("Fakt smazat všechny uložené záznamy?")) return;
    localStorage.removeItem(STORAGE_KEY);
    saveEntries([]); // pojistka
    render(elMonth?.value || "invalid");
  });
});
