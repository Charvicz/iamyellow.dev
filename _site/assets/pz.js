/* assets/pz.js */
const CATEGORY_LABELS = {
  MOBIL: "Telefon",
  BILA: "Bílá",
  NTB_PC: "Notebook",
  ZAHRADA: "Zahrada",
  TV: "Televize",
};

const warranty_data = [
  // TV
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

  // BILA
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

  // NTB_PC
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

  // ZAHRADA
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

  // MOBIL (note the swapped min/max in the original – we normalize later)
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

const warranty_pnp = [
  // TV
  ['TV', 0, 4999, '1R', 329],
  ['TV', 0, 4999, '2R', 659],
  ['TV', 5000, 9999, '1R', 549],
  ['TV', 5000, 9999, '2R', 949],
  ['TV', 10000, 19999, '1R', 879],
  ['TV', 10000, 19999, '2R', 1499],
  ['TV', 20000, 29999, '1R', 1199],
  ['TV', 20000, 29999, '2R', 2199],
  ['TV', 30000, 39999, '1R', 1399],
  ['TV', 30000, 39999, '2R', 2599],
  ['TV', 40000, 49999, '1R', 1649],
  ['TV', 40000, 49999, '2R', 3199],
  ['TV', 50000, 59999, '1R', 2099],
  ['TV', 50000, 59999, '2R', 3899],
  ['TV', 60000, 69999, '1R', 2199],
  ['TV', 60000, 69999, '2R', 4199],
  ['TV', 70000, 79999, '1R', 2499],
  ['TV', 70000, 79999, '2R', 4599],
  ['TV', 80000, 99999, '1R', 3699],
  ['TV', 80000, 99999, '2R', 4999],
  ['TV', 100000, 124999, '1R', 4999],
  ['TV', 100000, 124999, '2R', 5999],

  // BILA TECHNIKA
  ['BILA', 500, 999, '1R', 129],
  ['BILA', 500, 999, '2R', 249],
  ['BILA', 1000, 1999, '1R', 299],
  ['BILA', 1000, 1999, '2R', 399],
  ['BILA', 2000, 2999, '1R', 329],
  ['BILA', 2000, 2999, '2R', 499],
  ['BILA', 3000, 5499, '1R', 449],
  ['BILA', 3000, 5499, '2R', 749],
  ['BILA', 5500, 7499, '1R', 499],
  ['BILA', 5500, 7499, '2R', 879],
  ['BILA', 7500, 9999, '1R', 659],
  ['BILA', 7500, 9999, '2R', 1149],
  ['BILA', 10000, 14999, '1R', 879],
  ['BILA', 10000, 14999, '2R', 1249],
  ['BILA', 15000, 19999, '1R', 1049],
  ['BILA', 15000, 19999, '2R', 1649],
  ['BILA', 20000, 29999, '1R', 1249],
  ['BILA', 20000, 29999, '2R', 1899],
  ['BILA', 30000, 39999, '1R', 1299],
  ['BILA', 30000, 39999, '2R', 2099],
  ['BILA', 40000, 59999, '1R', 1499],
  ['BILA', 40000, 59999, '2R', 2499],
  ['BILA', 60000, 79999, '1R', 1799],
  ['BILA', 60000, 79999, '2R', 2999],

  // MOBILY / SMART WATCH
  ['MOBIL', 1200, 2999, '1R', 499],
  ['MOBIL', 1200, 2999, '2R', 949],
  ['MOBIL', 1200, 2999, '2R_VIP', 1599],
  ['MOBIL', 3000, 5999, '1R', 999],
  ['MOBIL', 3000, 5999, '2R', 1599],
  ['MOBIL', 3000, 5999, '2R_VIP', 2599],
  ['MOBIL', 6000, 8999, '1R', 1049],
  ['MOBIL', 6000, 8999, '2R', 1799],
  ['MOBIL', 6000, 8999, '2R_VIP', 2999],
  ['MOBIL', 9000, 11999, '1R', 1549],
  ['MOBIL', 9000, 11999, '2R', 2399],
  ['MOBIL', 9000, 11999, '2R_VIP', 3899],
  ['MOBIL', 12000, 14999, '1R', 1649],
  ['MOBIL', 12000, 14999, '2R', 2849],
  ['MOBIL', 12000, 14999, '2R_VIP', 4799],
  ['MOBIL', 15000, 17999, '1R', 1899],
  ['MOBIL', 15000, 17999, '2R', 3099],
  ['MOBIL', 15000, 17999, '2R_VIP', 5199],
  ['MOBIL', 18000, 19999, '1R', 1999],
  ['MOBIL', 18000, 19999, '2R', 3749],
  ['MOBIL', 18000, 19999, '2R_VIP', 5999],
  ['MOBIL', 20000, 24999, '1R', 2999],
  ['MOBIL', 20000, 24999, '2R', 4699],
  ['MOBIL', 20000, 24999, '2R_VIP', 8499],
  ['MOBIL', 25000, 29999, '1R', 3499],
  ['MOBIL', 25000, 29999, '2R', 5249],
  ['MOBIL', 25000, 29999, '2R_VIP', 8999],
  ['MOBIL', 30000, 34999, '1R', 4199],
  ['MOBIL', 30000, 34999, '2R', 5999],
  ['MOBIL', 30000, 34999, '2R_VIP', 9999],

  // APPLE
  ['APPLE', 1200, 2999, '1R', 349],
  ['APPLE', 1200, 2999, '2R', 699],
  ['APPLE', 3000, 5999, '1R', 699],
  ['APPLE', 3000, 5999, '2R', 1149],
  ['APPLE', 6000, 8999, '1R', 799],
  ['APPLE', 6000, 8999, '2R', 1349],
  ['APPLE', 9000, 11999, '1R', 1149],
  ['APPLE', 9000, 11999, '2R', 1759],
  ['APPLE', 12000, 14999, '1R', 1199],
  ['APPLE', 12000, 14999, '2R', 2099],
  ['APPLE', 15000, 17999, '1R', 1399],
  ['APPLE', 15000, 17999, '2R', 2249],
  ['APPLE', 18000, 19999, '1R', 1799],
  ['APPLE', 18000, 19999, '2R', 2749],
  ['APPLE', 20000, 24999, '1R', 2199],
  ['APPLE', 20000, 24999, '2R', 3449],
  ['APPLE', 25000, 29999, '1R', 2599],
  ['APPLE', 25000, 29999, '2R', 3849],
  ['APPLE', 30000, 34999, '1R', 2999],
  ['APPLE', 30000, 34999, '2R', 4399],
  ['APPLE', 35000, 39999, '1R', 3299],
  ['APPLE', 35000, 39999, '2R', 4699],
  ['APPLE', 40000, 49999, '1R', 3849],
  ['APPLE', 40000, 49999, '2R', 4949],
  ['APPLE', 50000, 59999, '1R', 4399],
  ['APPLE', 50000, 59999, '2R', 5499],

  // NTB / PC / TAB / GAMING / AUDIO / FOTO / IT
  ['NTB_PC', 500, 999, '1R', 129],
  ['NTB_PC', 500, 999, '2R', 249],
  ['NTB_PC', 1000, 1999, '1R', 249],
  ['NTB_PC', 1000, 1999, '2R', 399],
  ['NTB_PC', 2000, 2999, '1R', 439],
  ['NTB_PC', 2000, 2999, '2R', 639],
  ['NTB_PC', 3000, 4999, '1R', 539],
  ['NTB_PC', 3000, 4999, '2R', 949],
  ['NTB_PC', 5000, 9999, '1R', 659],
  ['NTB_PC', 5000, 9999, '2R', 1199],
  ['NTB_PC', 10000, 19999, '1R', 999],
  ['NTB_PC', 10000, 19999, '2R', 1799],
  ['NTB_PC', 20000, 29999, '1R', 1649],
  ['NTB_PC', 20000, 29999, '2R', 2999],
  ['NTB_PC', 30000, 39999, '1R', 2199],
  ['NTB_PC', 30000, 39999, '2R', 4149],
  ['NTB_PC', 40000, 49999, '1R', 2649],
  ['NTB_PC', 40000, 49999, '2R', 4499],
  ['NTB_PC', 50000, 59999, '1R', 3149],
  ['NTB_PC', 50000, 59999, '2R', 5399],
];

const elCategory = document.getElementById('category');
const elPlaneo = document.getElementById('planeoPrice');
const elMarket = document.getElementById('marketPrice');
const elCalc = document.getElementById('calcBtn');
const elReset = document.getElementById('resetBtn');
const elSummary = document.getElementById('summary');
const elResults = document.getElementById('results');
const elPnpResults = document.getElementById('pnpResults');
const elComboResults = document.getElementById('comboResults'); // <-- new

const fmt = new Intl.NumberFormat('cs-CZ');

function roundDownTo5(n) {
  if (!Number.isFinite(n)) return NaN;
  return Math.floor(n / 10) * 10 + (n % 10 <= 5 ? 5 : -5);
}

function normalizeRow(row) {
  const [cat, minP, maxP, code, price] = row;
  const min = Math.min(minP, maxP);
  const max = Math.max(minP, maxP);
  return { cat, min, max, code, price };
}

const rows = warranty_data.map(normalizeRow);

function uniqueCategories() {
  return [...new Set(rows.map(r => r.cat))].sort();
}

function fillCategories() {
  const cats = uniqueCategories();
  elCategory.innerHTML = cats
    .map(c => `<option value="${c}">${CATEGORY_LABELS[c] || c}</option>`)
    .join('');
}

function getBracket(category, productPrice) {
  const matching = rows.filter(r =>
    r.cat === category &&
    productPrice >= r.min &&
    productPrice <= r.max
  );

  if (!matching.length) return null;

  const { min, max } = matching[0];
  const bracketRows = matching.filter(r => r.min === min && r.max === max);

  return { min, max, items: bracketRows };
}

function labelFor(code) {
  switch (code) {
    case '1R': return 'PZ 1 rok';
    case '2R': return 'PZ 2 roky';
    case '3R': return 'PZ 3 roky';
    case '3R_VIP': return 'PZ 3 roky VIP';
    default: return code;
  }
}

function labelForPNP(code) {
  switch (code) {
    case '1R': return 'PNP 1 rok';
    case '2R': return 'PNP 2 roky';
    case '2R_VIP': return 'PNP 2 roky VIP';
    default: return code;
  }
}

function getPNPBracket(category, productPrice) {
  const matching = warranty_pnp.filter(r =>
    r[0] === category &&
    productPrice >= Math.min(r[1], r[2]) &&
    productPrice <= Math.max(r[1], r[2])
  );

  if (!matching.length) return null;

  const min = Math.min(matching[0][1], matching[0][2]);
  const max = Math.max(matching[0][1], matching[0][2]);

  return matching.filter(r =>
    Math.min(r[1], r[2]) === min &&
    Math.max(r[1], r[2]) === max
  );
}

/* ---------- RENDERERS ---------- */

function renderSummary({ category, planeo, market, diff, bracket }) {
  const diffClass = diff > 0 ? 'ok' : (diff === 0 ? 'meh' : 'bad');

  elSummary.hidden = false;
  elSummary.innerHTML = `
    <div class="sum">
      <div class="sum__row"><span>Kategorie</span><b>${CATEGORY_LABELS[category] || category}</b></div>
      <div class="sum__row"><span>Planeo</span><b>${fmt.format(planeo)} Kč</b></div>
      <div class="sum__row"><span>Trh</span><b>${fmt.format(market)} Kč</b></div>
      <div class="sum__row"><span>Rozdíl (Planeo − trh)</span><b class="${diffClass}">${fmt.format(diff)} Kč</b></div>
      ${
        bracket
          ? `<div class="sum__row"><span>Pásmo</span><b>${fmt.format(bracket.min)} – ${fmt.format(bracket.max)} Kč</b></div>`
          : `<div class="sum__row"><span>Pásmo</span><b class="bad">Nenalezeno v databázi</b></div>`
      }
    </div>
  `;
}

function renderResults(diff, bracket) {
  elResults.innerHTML = '';

  if (!bracket) {
    elResults.innerHTML = `
      <div class="pz__empty">
        Nenašel jsem pásmo pro tuhle cenu/kategorii. (Buď je cena mimo rozsah, nebo chybí data.)
      </div>
    `;
    return;
  }

  const cards = bracket.items
    .sort((a, b) => a.pzPrice - b.pzPrice)
    .map(item => {
      const fits = diff >= item.pzPrice;
      const delta = fits ? (diff - item.pzPrice) : (item.pzPrice - diff);

      const planeo = Number(elPlaneo.value) || 0;
      const priceIfFree = planeo - item.pzPrice;

      return `
        <div class="pz__item ${fits ? 'fit' : 'nofit'}">
          <div class="pz__itemTop">
            <div class="pz__title">${labelFor(item.code)}</div>
            <div class="pz__price">${fmt.format(item.pzPrice)} Kč</div>
          </div>
          <div class="pz__meta">
            ${
              fits
                ? `<span class="tag tag--good">jde to</span>
                   <span class="muted">zbývá ${fmt.format(delta)} Kč</span>
                   <span class="muted">| produkt s PZ zdarma: <b>${fmt.format(priceIfFree)} Kč</b></span>`
                : `<span class="tag tag--bad">nejde to</span>
                   <span class="muted">chybí ${fmt.format(delta)} Kč</span>`
            }
          </div>
        </div>
      `;
    }).join('');

  elResults.innerHTML = `
    <h2>Varianty v pásmu</h2>
    <div class="pz__list">${cards}</div>
  `;
}

function renderPNPResults(diff, bracket) {
  if (!elPnpResults) return;

  elPnpResults.innerHTML = '';

  if (!bracket || !bracket.length) {
    elPnpResults.innerHTML = `
      <div class="pz__empty">
        Pro tuto kategorii není PNP tabulka.
      </div>
    `;
    return;
  }

  const cards = bracket
    .sort((a, b) => a[4] - b[4])
    .map(item => {
      const code = item[3];
      const price = item[4];

      const fits = diff >= price;
      const delta = fits
        ? (diff - price)
        : (price - diff);

      const planeo = Number(elPlaneo.value) || 0;
      const priceIfFree = planeo - price;

      return `
        <div class="pz__item ${fits ? 'fit' : 'nofit'}">
          <div class="pz__itemTop">
            <div class="pz__title">${labelForPNP(code)}</div>
            <div class="pz__price">${fmt.format(price)} Kč</div>
          </div>

          <div class="pz__meta">
            ${
              fits
                ? `
                  <span class="tag tag--good">jde to</span>
                  <span class="muted">
                    zbývá ${fmt.format(delta)} Kč
                  </span>
                  <span class="muted">
                    | produkt s PNP zdarma:
                    <b>${fmt.format(priceIfFree)} Kč</b>
                  </span>
                `
                : `
                  <span class="tag tag--bad">nejde to</span>
                  <span class="muted">
                    chybí ${fmt.format(delta)} Kč
                  </span>
                `
            }
          </div>
        </div>
      `;
    })
    .join('');

  elPnpResults.innerHTML = `
    <h2>PNP varianty</h2>
    <div class="pz__list">${cards}</div>
  `;
}

/* ---------- COMBO LOGIC ---------- */

function renderComboResults(planeo, market, diff, pzBracket, pnpBracket) {
  elComboResults.innerHTML = '';

  if (!pzBracket || !pnpBracket) {
    elComboResults.innerHTML = `<div class="pz__empty">Chybí data pro PZ nebo PNP.</div>`;
    return;
  }

  let best = null;
  let bestTotal = -1;

  // iterate over all PZ and PNP options in the brackets
  for (const pz of pzBracket.items) {
    for (const pnp of pnpBracket) {
      const pzPrice = pz.pzPrice;
      const pnpPrice = pnp[4]; // warranty_pnp entries are [cat, min, max, code, price]
      const total = pzPrice + pnpPrice;

      // condition: market + total ≤ planeo * 1.10  (i.e. within 10% reserve)
      if (market + total <= planeo * 1.10) {
        if (total > bestTotal) {
          bestTotal = total;
          best = { pz, pnp, pzPrice, pnpPrice, total };
        }
      }
    }
  }

  if (!best) {
    elComboResults.innerHTML = `
      <div class="pz__empty">
        Žádná kombinace PZ + PNP se nevejde do 10 % rezervy.
      </div>
    `;
    return;
  }

  const { pz, pnp, pzPrice, pnpPrice, total } = best;
  const remaining = planeo - (market + total);
  const remainingPct = ((planeo - (market + total)) / planeo) * 100;

  elComboResults.innerHTML = `
    <h2>Nejvhodnější kombinace PZ + PNP</h2>
    <div class="pz__item fit">
      <div class="pz__itemTop">
        <div class="pz__title">${labelFor(pz.code)} + ${labelForPNP(pnp[3])}</div>
        <div class="pz__price">${fmt.format(total)} Kč</div>
      </div>
      <div class="pz__meta">
        <span class="tag tag--good">jde to</span>
        <span class="muted">
          zbývá ${fmt.format(remaining)} Kč (${remainingPct.toFixed(1)} %)
        </span>
        <span class="muted">
          | produkt s PZ+PNP zdarma:
          <b>${fmt.format(planeo - total)} Kč</b>
        </span>
      </div>
    </div>
  `;
}

/* ---------- MAIN LOGIC ---------- */

function readNumber(el) {
  const n = Number(el.value);
  return Number.isFinite(n) ? n : NaN;
}

function calculate() {
  const category = elCategory.value;
  const planeo = readNumber(elPlaneo);

  const marketRaw = readNumber(elMarket);
  const market = roundDownTo5(marketRaw);

  if (!Number.isFinite(planeo) || !Number.isFinite(market)) {
    elSummary.hidden = false;
    elSummary.innerHTML = `<div class="pz__error">Hoď tam obě ceny pls (čísla).</div>`;
    elResults.innerHTML = '';
    elPnpResults.innerHTML = '';
    elComboResults.innerHTML = '';
    return;
  }

  const diff = planeo - market;
  const basePrice = Math.min(planeo, market); // used for bracket lookup
  const pzBracket = getBracket(category, basePrice);
  const pnpBracket = getPNPBracket(category, basePrice);

  renderSummary({ category, planeo, market, diff, bracket: pzBracket });
  renderResults(diff, pzBracket);
  renderPNPResults(diff, pnpBracket);
  renderComboResults(planeo, market, diff, pzBracket, pnpBracket);
}

function resetAll() {
  elPlaneo.value = '';
  elMarket.value = '';
  elSummary.hidden = true;
  elSummary.innerHTML = '';
  elResults.innerHTML = '';
  elPnpResults.innerHTML = '';
  elComboResults.innerHTML = '';
  elPlaneo.focus();
}

/* ---------- INIT ---------- */
fillCategories();

elCalc.addEventListener('click', calculate);
elReset.addEventListener('click', resetAll);

[elPlaneo, elMarket].forEach(inp => {
  inp.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') calculate();
  });
});