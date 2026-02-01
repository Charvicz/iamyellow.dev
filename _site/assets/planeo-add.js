// assets/planeo-add.js

// --- UI refs
const elPrice = document.getElementById("price");
const elMM = document.getElementById("mm");
const elPrisko = document.getElementById("prisko");
const elPzToggle = document.getElementById("pzToggle");
const elSpl = document.getElementById("spl");

const elPzPanel = document.getElementById("pzPanel");
const elPzCategory = document.getElementById("pzCategory");
const elPzOptions = document.getElementById("pzOptions");
const elPzError = document.getElementById("pzError");
const elPzPriceInfo = document.getElementById("pzPriceInfo");

const elSaveBtn = document.getElementById("saveBtn");
const elBackBtn = document.getElementById("backBtn");
const elToast = document.getElementById("toast");

const fmt = new Intl.NumberFormat("cs-CZ");

const CATEGORY_LABELS = {
  MOBIL: "Telefon",
  BILA: "Bílá",
  NTB_PC: "Notebook",
  ZAHRADA: "Zahrada",
  TV: "Televize",
};

// ✅ tvoje databáze (zkrátil jsem ukázku; ty tam necháš komplet)
const warranty_data = [
  // category, minPrice, maxPrice, code, warrantyPrice
  ['TV', 0, 4999, '1R', 399],
  ['TV', 0, 4999, '2R', 599],
  ['TV', 0, 4999, '3R', 999],
  ['TV', 0, 4999, '3R_VIP', 1399],
  ['TV', 5000, 9999, '1R', 599],
  ['TV', 5000, 9999, '2R', 999],
  ['TV', 5000, 9999, '3R', 1799],
  ['TV', 5000, 9999, '3R_VIP', 2099],
  ['TV', 10000, 14999, '1R', 1349],
  ['TV', 10000, 14999, '2R', 1999],
  ['TV', 10000, 14999, '3R', 2499],
  ['TV', 10000, 14999, '3R_VIP', 3199],
  ['TV', 15000, 19999, '1R', 1549],
  ['TV', 15000, 19999, '2R', 2499],
  ['TV', 15000, 19999, '3R', 3199],
  ['TV', 15000, 19999, '3R_VIP', 3999],
  ['TV', 20000, 29999, '1R', 1949],
  ['TV', 20000, 29999, '2R', 2899],
  ['TV', 20000, 29999, '3R', 3799],
  ['TV', 20000, 29999, '3R_VIP', 4899],
  ['TV', 30000, 39999, '1R', 2299],
  ['TV', 30000, 39999, '2R', 3599],
  ['TV', 30000, 39999, '3R', 4999],
  ['TV', 30000, 39999, '3R_VIP', 5999],
  ['TV', 40000, 49999, '1R', 3199],
  ['TV', 40000, 49999, '2R', 4399],
  ['TV', 40000, 49999, '3R', 5999],
  ['TV', 40000, 49999, '3R_VIP', 7499],
  ['TV', 50000, 59999, '1R', 3699],
  ['TV', 50000, 59999, '2R', 4999],
  ['TV', 50000, 59999, '3R', 6299],
  ['TV', 50000, 59999, '3R_VIP', 7999],
  ['TV', 60000, 69999, '1R', 4099],
  ['TV', 60000, 69999, '2R', 5499],
  ['TV', 60000, 69999, '3R', 6499],
  ['TV', 60000, 69999, '3R_VIP', 7999],
  ['TV', 70000, 79999, '1R', 4399],
  ['TV', 70000, 79999, '2R', 5999],
  ['TV', 70000, 79999, '3R', 6999],
  ['TV', 70000, 79999, '3R_VIP', 8799],
  ['TV', 80000, 99999, '1R', 5499],
  ['TV', 80000, 99999, '2R', 6499],
  ['TV', 80000, 99999, '3R', 7499],
  ['TV', 80000, 99999, '3R_VIP', 8999],
  ['TV', 100000, 124999, '1R', 5999],
  ['TV', 100000, 124999, '2R', 6999],
  ['TV', 100000, 124999, '3R', 7499],
  ['TV', 100000, 124999, '3R_VIP', 9499],

  ['BILA', 500, 999, '1R', 119],
  ['BILA', 500, 999, '2R', 159],
  ['BILA', 500, 999, '3R', 199],
  ['BILA', 500, 999, '3R_VIP', 299],
  ['BILA', 1000, 1999, '1R', 159],
  ['BILA', 1000, 1999, '2R', 249],
  ['BILA', 1000, 1999, '3R', 299],
  ['BILA', 1000, 1999, '3R_VIP', 369],
  ['BILA', 2000, 2999, '1R', 249],
  ['BILA', 2000, 2999, '2R', 379],
  ['BILA', 2000, 2999, '3R', 419],
  ['BILA', 2000, 2999, '3R_VIP', 549],
  ['BILA', 3000, 5499, '1R', 389],
  ['BILA', 3000, 5499, '2R', 699],
  ['BILA', 3000, 5499, '3R', 999],
  ['BILA', 3000, 5499, '3R_VIP', 1329],
  ['BILA', 5500, 7499, '1R', 769],
  ['BILA', 5500, 7499, '2R', 1199],
  ['BILA', 5500, 7499, '3R', 1699],
  ['BILA', 5500, 7499, '3R_VIP', 2199],
  ['BILA', 7500, 9999, '1R', 999],
  ['BILA', 7500, 9999, '2R', 1499],
  ['BILA', 7500, 9999, '3R', 1999],
  ['BILA', 7500, 9999, '3R_VIP', 2599],
  ['BILA', 10000, 14999, '1R', 1349],
  ['BILA', 10000, 14999, '2R', 1999],
  ['BILA', 10000, 14999, '3R', 2599],
  ['BILA', 10000, 14999, '3R_VIP', 3199],
  ['BILA', 15000, 19999, '1R', 1549],
  ['BILA', 15000, 19999, '2R', 2399],
  ['BILA', 15000, 19999, '3R', 3299],
  ['BILA', 15000, 19999, '3R_VIP', 3999],
  ['BILA', 20000, 29999, '1R', 1749],
  ['BILA', 20000, 29999, '2R', 3199],
  ['BILA', 20000, 29999, '3R', 4399],
  ['BILA', 20000, 29999, '3R_VIP', 5499],
  ['BILA', 30000, 39999, '1R', 2299],
  ['BILA', 30000, 39999, '2R', 3799],
  ['BILA', 30000, 39999, '3R', 4999],
  ['BILA', 30000, 39999, '3R_VIP', 5999],
  ['BILA', 40000, 59999, '1R', 3199],
  ['BILA', 40000, 59999, '2R', 4399],
  ['BILA', 40000, 59999, '3R', 5999],
  ['BILA', 40000, 59999, '3R_VIP', 6999],
  ['BILA', 60000, 79999, '1R', 3849],
  ['BILA', 60000, 79999, '2R', 4999],
  ['BILA', 60000, 79999, '3R', 5999],
  ['BILA', 60000, 79999, '3R_VIP', 7699],

  ['NTB_PC', 500, 999, '1R', 199],
  ['NTB_PC', 500, 999, '2R', 249],
  ['NTB_PC', 500, 999, '3R', 299],
  ['NTB_PC', 500, 999, '3R_VIP', 449],
  ['NTB_PC', 1000, 1999, '1R', 249],
  ['NTB_PC', 1000, 1999, '2R', 349],
  ['NTB_PC', 1000, 1999, '3R', 399],
  ['NTB_PC', 1000, 1999, '3R_VIP', 449],
  ['NTB_PC', 2000, 2999, '1R', 399],
  ['NTB_PC', 2000, 2999, '2R', 449],
  ['NTB_PC', 2000, 2999, '3R', 549],
  ['NTB_PC', 2000, 2999, '3R_VIP', 699],
  ['NTB_PC', 3000, 4999, '1R', 499],
  ['NTB_PC', 3000, 4999, '2R', 769],
  ['NTB_PC', 3000, 4999, '3R', 1199],
  ['NTB_PC', 3000, 4999, '3R_VIP', 1499],
  ['NTB_PC', 5000, 9999, '1R', 879],
  ['NTB_PC', 5000, 9999, '2R', 1299],
  ['NTB_PC', 5000, 9999, '3R', 1749],
  ['NTB_PC', 5000, 9999, '3R_VIP', 2299],
  ['NTB_PC', 10000, 14999, '1R', 1299],
  ['NTB_PC', 10000, 14999, '2R', 1899],
  ['NTB_PC', 10000, 14999, '3R', 2499],
  ['NTB_PC', 10000, 14999, '3R_VIP', 3299],
  ['NTB_PC', 15000, 19999, '1R', 1549],
  ['NTB_PC', 15000, 19999, '2R', 2199],
  ['NTB_PC', 15000, 19999, '3R', 3199],
  ['NTB_PC', 15000, 19999, '3R_VIP', 3999],
  ['NTB_PC', 20000, 29999, '1R', 1999],
  ['NTB_PC', 20000, 29999, '2R', 2849],
  ['NTB_PC', 20000, 29999, '3R', 3799],
  ['NTB_PC', 20000, 29999, '3R_VIP', 4799],
  ['NTB_PC', 30000, 39999, '1R', 3199],
  ['NTB_PC', 30000, 39999, '2R', 4999],
  ['NTB_PC', 30000, 39999, '3R', 5699],
  ['NTB_PC', 30000, 39999, '3R_VIP', 6499],
  ['NTB_PC', 40000, 49999, '1R', 4999],
  ['NTB_PC', 40000, 49999, '2R', 5499],
  ['NTB_PC', 40000, 49999, '3R', 5999],
  ['NTB_PC', 40000, 49999, '3R_VIP', 6999],
  ['NTB_PC', 50000, 59999, '1R', 5499],
  ['NTB_PC', 50000, 59999, '2R', 5999],
  ['NTB_PC', 50000, 59999, '3R', 6499],
  ['NTB_PC', 50000, 59999, '3R_VIP', 7499],

  ['ZAHRADA', 500, 1499, '1R', 189],
  ['ZAHRADA', 500, 1499, '2R', 249],
  ['ZAHRADA', 500, 1499, '3R', 329],
  ['ZAHRADA', 500, 1499, '3R_VIP', 449],
  ['ZAHRADA', 1500, 2499, '1R', 249],
  ['ZAHRADA', 1500, 2499, '2R', 499],
  ['ZAHRADA', 1500, 2499, '3R', 799],
  ['ZAHRADA', 1500, 2499, '3R_VIP', 999],
  ['ZAHRADA', 2500, 4999, '1R', 389],
  ['ZAHRADA', 2500, 4999, '2R', 699],
  ['ZAHRADA', 2500, 4999, '3R', 999],
  ['ZAHRADA', 2500, 4999, '3R_VIP', 1249],
  ['ZAHRADA', 5000, 9999, '1R', 649],
  ['ZAHRADA', 5000, 9999, '2R', 1149],
  ['ZAHRADA', 5000, 9999, '3R', 1499],
  ['ZAHRADA', 5000, 9999, '3R_VIP', 1999],
  ['ZAHRADA', 10000, 14999, '1R', 799],
  ['ZAHRADA', 10000, 14999, '2R', 1649],
  ['ZAHRADA', 10000, 14999, '3R', 2299],
  ['ZAHRADA', 10000, 14999, '3R_VIP', 2899],
  ['ZAHRADA', 15000, 19999, '1R', 1099],
  ['ZAHRADA', 15000, 19999, '2R', 2199],
  ['ZAHRADA', 15000, 19999, '3R', 2999],
  ['ZAHRADA', 15000, 19999, '3R_VIP', 3699],
  ['ZAHRADA', 20000, 29999, '1R', 1499],
  ['ZAHRADA', 20000, 29999, '2R', 2999],
  ['ZAHRADA', 20000, 29999, '3R', 4199],
  ['ZAHRADA', 20000, 29999, '3R_VIP', 5399],
  ['ZAHRADA', 30000, 39999, '1R', 1999],
  ['ZAHRADA', 30000, 39999, '2R', 3999],
  ['ZAHRADA', 30000, 39999, '3R', 5499],
  ['ZAHRADA', 30000, 39999, '3R_VIP', 6999],
  ['ZAHRADA', 40000, 49999, '1R', 2499],
  ['ZAHRADA', 40000, 49999, '2R', 4999],
  ['ZAHRADA', 40000, 49999, '3R', 6999],
  ['ZAHRADA', 40000, 49999, '3R_VIP', 7999],
  ['ZAHRADA', 50000, 59999, '1R', 2999],
  ['ZAHRADA', 50000, 59999, '2R', 5999],
  ['ZAHRADA', 50000, 59999, '3R', 7499],
  ['ZAHRADA', 50000, 59999, '3R_VIP', 8999],
  ['ZAHRADA', 60000, 69999, '1R', 3599],
  ['ZAHRADA', 60000, 69999, '2R', 6999],
  ['ZAHRADA', 60000, 69999, '3R', 8999],
  ['ZAHRADA', 60000, 69999, '3R_VIP', 9999],

  // Pozn.: tady máš v datech tuple (5000, 4999) – to je opačně. V kódu to ošetřuju.
  ['MOBIL', 5000, 4999, '1R', 499],
  ['MOBIL', 5000, 9999, '1R', 879],
  ['MOBIL', 5000, 9999, '2R', 1249],
  ['MOBIL', 5000, 9999, '3R', 1849],
  ['MOBIL', 5000, 9999, '3R_VIP', 2299],
  ['MOBIL', 10000, 14999, '1R', 1249],
  ['MOBIL', 10000, 14999, '2R', 1849],
  ['MOBIL', 10000, 14999, '3R', 2499],
  ['MOBIL', 10000, 14999, '3R_VIP', 3199],
  ['MOBIL', 15000, 19999, '1R', 1499],
  ['MOBIL', 15000, 19999, '2R', 2199],
  ['MOBIL', 15000, 19999, '3R', 3299],
  ['MOBIL', 15000, 19999, '3R_VIP', 3999],
  ['MOBIL', 20000, 29999, '1R', 1999],
  ['MOBIL', 20000, 29999, '2R', 2899],
  ['MOBIL', 20000, 29999, '3R', 3799],
  ['MOBIL', 20000, 29999, '3R_VIP', 4699],
  ['MOBIL', 30000, 39999, '1R', 3099],
  ['MOBIL', 30000, 39999, '2R', 4999],
  ['MOBIL', 30000, 39999, '3R', 5699],
  ['MOBIL', 30000, 39999, '3R_VIP', 6999],
  ['MOBIL', 40000, 49999, '1R', 4999],
  ['MOBIL', 40000, 49999, '2R', 5499],
  ['MOBIL', 40000, 49999, '3R', 5899],
  ['MOBIL', 40000, 49999, '3R_VIP', 7499],
  ['MOBIL', 50000, 59999, '1R', 5499],
  ['MOBIL', 50000, 59999, '2R', 5999],
  ['MOBIL', 50000, 59999, '3R', 6599],
  ['MOBIL', 50000, 59999, '3R_VIP', 7999],
];

function normalizeRow(row) {
  const [cat, minP, maxP, code, pzPrice] = row;
  const min = Math.min(minP, maxP);
  const max = Math.max(minP, maxP);
  return { cat, min, max, code, pzPrice };
}
const rows = warranty_data.map(normalizeRow);

function labelFor(code) {
  switch (code) {
    case "1R": return "PZ 1 rok";
    case "2R": return "PZ 2 roky";
    case "3R": return "PZ 3 roky";
    case "3R_VIP": return "PZ 3 roky VIP";
    default: return code;
  }
}

// --- category select fill (jen ty, co existují v datech)
function uniqueCategories() {
  return [...new Set(rows.map(r => r.cat))].sort((a, b) => {
    // hezký pořadí
    const order = ["MOBIL", "BILA", "NTB_PC", "ZAHRADA", "TV"];
    return order.indexOf(a) - order.indexOf(b);
  });
}

function fillCategories() {
  const cats = uniqueCategories();
  elPzCategory.innerHTML = cats
    .map(c => `<option value="${c}">${CATEGORY_LABELS[c] || c}</option>`)
    .join("");
}
fillCategories();

function getBracket(category, productPrice) {
  const matching = rows.filter(r =>
    r.cat === category &&
    productPrice >= r.min &&
    productPrice <= r.max
  );
  if (!matching.length) return null;

  const { min, max } = matching[0];
  const items = matching.filter(r => r.min === min && r.max === max);
  return { min, max, items };
}

function readPrice() {
  const n = Number(elPrice.value);
  return Number.isFinite(n) ? n : NaN;
}

// držíme vybranou PZ variantu
let selectedPz = null; // { code, pzPrice, min, max, category }

function renderPzOptions() {
  const price = readPrice();
  elPzPriceInfo.textContent = Number.isFinite(price) ? `${fmt.format(price)} Kč` : "—";

  elPzError.hidden = true;
  elPzOptions.innerHTML = "";
  selectedPz = null;

  if (!Number.isFinite(price) || price <= 0) {
    elPzError.hidden = false;
    elPzError.textContent = "Zadej cenu produktu, ať ti můžu nabídnout PZ.";
    return;
  }

  const category = elPzCategory.value;
  const bracket = getBracket(category, price);

  if (!bracket) {
    elPzError.hidden = false;
    elPzError.textContent = "Pro tuhle cenu jsem nenašel PZ pásmo v databázi.";
    return;
  }

  const options = bracket.items
    .slice()
    .sort((a, b) => a.pzPrice - b.pzPrice)
    .map((item, idx) => {
      const id = `pzopt_${idx}`;
      return `
        <label class="pzOpt">
          <input type="radio" name="pzPick" value="${item.code}" data-price="${item.pzPrice}">
          <div class="pzOpt__main">
            <div class="pzOpt__left">
              <b>${labelFor(item.code)}</b>
              <span class="muted">Pásmo ${fmt.format(bracket.min)} – ${fmt.format(bracket.max)} Kč</span>
            </div>
            <div class="pzOpt__right">
              <b>${fmt.format(item.pzPrice)} Kč</b>
              <span class="muted">produkt s PZ: ${fmt.format(price - item.pzPrice)} Kč</span>
            </div>
          </div>
        </label>
      `;
    })
    .join("");

  elPzOptions.innerHTML = options;

  // napojení na radio změny
  elPzOptions.querySelectorAll('input[name="pzPick"]').forEach(r => {
    r.addEventListener("change", () => {
      const code = r.value;
      const pzPrice = Number(r.dataset.price);
      selectedPz = { code, pzPrice, min: bracket.min, max: bracket.max, category };
    });
  });
}

function setPzPanelVisible(isOn) {
  elPzPanel.hidden = !isOn;
  if (isOn) renderPzOptions();
  else {
    elPzOptions.innerHTML = "";
    elPzError.hidden = true;
    selectedPz = null;
  }
}

// --- events
elPzToggle.addEventListener("change", () => setPzPanelVisible(elPzToggle.checked));
elPzCategory.addEventListener("change", () => {
  if (elPzToggle.checked) renderPzOptions();
});
elPrice.addEventListener("input", () => {
  if (elPzToggle.checked) renderPzOptions();
});

function toast(msg) {
  elToast.hidden = false;
  elToast.textContent = msg;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => (elToast.hidden = true), 1800);
}

// --- save to localStorage
const STORAGE_KEY = "planeo_entries_v1";

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

function buildEntry() {
  const price = readPrice();
  if (!Number.isFinite(price) || price <= 0) {
    toast("Chybí cena produktu.");
    return null;
  }

  const entry = {
    id: crypto.randomUUID(),
    ts: Date.now(),
    price,
    pillars: {
      mm: elMM.checked,
      prisko: elPrisko.checked,
      pz: elPzToggle.checked,
      splatky: elSpl.checked,
    },
    pz: null,
  };

  if (entry.pillars.pz) {
    if (!selectedPz) {
      toast("Vyber PZ variantu.");
      return null;
    }
    entry.pz = {
      category: selectedPz.category,
      categoryLabel: CATEGORY_LABELS[selectedPz.category] || selectedPz.category,
      code: selectedPz.code,
      label: labelFor(selectedPz.code),
      pzPrice: selectedPz.pzPrice,
      bracket: { min: selectedPz.min, max: selectedPz.max },
      productPriceWithPz: price - selectedPz.pzPrice,
    };
  }

  return entry;
}

elSaveBtn.addEventListener("click", () => {
  const entry = buildEntry();
  if (!entry) return;

  const entries = loadEntries();
  entries.unshift(entry); // newest first
  saveEntries(entries);

  // reset UI
  elPrice.value = "";
  elMM.checked = false;
  elPrisko.checked = false;
  elSpl.checked = false;
  elPzToggle.checked = false;
  setPzPanelVisible(false);

  toast("Uloženo ✅");
  elPrice.focus();
});

elBackBtn.addEventListener("click", () => {
  // uprav si kam chceš
  window.location.href = "/planeo/";
});
