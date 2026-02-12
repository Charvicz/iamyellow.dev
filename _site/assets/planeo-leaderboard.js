const tabs = [
  { key: "total_amount", label: "1) Nejvyšší obrat" },
  { key: "mm_amount",    label: "2) Obrat MM" },
  { key: "mm_count",     label: "3) Počet MM" },
  { key: "pz_count",     label: "4) Počet PZ" },
  { key: "pz_amount",    label: "5) Hodnota PZ" },
];

const elMonth = document.getElementById("lbMonth");
const elTabs  = document.getElementById("lbTabs");
const elTitle = document.getElementById("lbTitle");
const elTable = document.getElementById("lbTable");
const elScope = document.getElementById("lbScope");

let active = "total_amount";
let meId = null;

function ymNow() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function fmtMoney(n) {
  const x = Number(n || 0);
  return x.toLocaleString("cs-CZ", { maximumFractionDigits: 0 }) + " Kč";
}

function fmtNum(n) {
  return Number(n || 0).toLocaleString("cs-CZ");
}

function metricLabel(key) {
  return tabs.find(t => t.key === key)?.label ?? key;
}

function metricValue(row, key) {
  if (key.endsWith("_amount")) return fmtMoney(row[key]);
  return fmtNum(row[key]);
}

function renderTabs() {
  elTabs.innerHTML = tabs.map(t => `
    <button class="tab ${t.key === active ? "is-active" : ""}" data-key="${t.key}" type="button">
      ${t.label}
    </button>
  `).join("");

  elTabs.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      active = btn.dataset.key;
      renderTabs();
      load();
    });
  });
}

async function load() {
  const month = elMonth.value || ymNow();
  const scope = elScope.checked ? "branch" : "all";

  elTitle.textContent = `${metricLabel(active)} — ${month}${scope === "branch" ? " (moje pobočka)" : ""}`;
  elTable.innerHTML = `<div class="muted">Načítám…</div>`;

  const url = `/api/sales/leaderboard.php?month=${encodeURIComponent(month)}&type=${encodeURIComponent(active)}&scope=${encodeURIComponent(scope)}`;
  const r = await fetch(url, { credentials: "include" });
  const data = await r.json().catch(() => ({}));

  if (!r.ok || data.ok === false) {
    elTable.innerHTML = `<div class="err">Chyba: ${data.error || "API error"}</div>`;
    return;
  }

  meId = data.me;

  const rows = data.rows || [];
  if (!rows.length) {
    elTable.innerHTML = `<div class="muted">Žádná data pro tenhle měsíc.</div>`;
    return;
  }

  elTable.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Hodnota</th>
          <th>Obrat</th>
          <th>MM (Kč)</th>
          <th>MM (ks)</th>
          <th>PZ (ks)</th>
          <th>PZ (Kč)</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map((row, i) => {
          const isMe = String(row.user_id) === String(meId);
          return `
            <tr class="${isMe ? "me" : ""}">
              <td>${i + 1}</td>
              <td>${row.user_id}</td>
              <td><b>${metricValue(row, active)}</b></td>
              <td>${fmtMoney(row.total_amount)}</td>
              <td>${fmtMoney(row.mm_amount)}</td>
              <td>${fmtNum(row.mm_count)}</td>
              <td>${fmtNum(row.pz_count)}</td>
              <td>${fmtMoney(row.pz_amount)}</td>
            </tr>
          `;
        }).join("")}
      </tbody>
    </table>
  `;
}

function init() {
  elMonth.value = ymNow();
  renderTabs();

  elMonth.addEventListener("change", load);
  elScope.addEventListener("change", load);

  load();
}

init();
