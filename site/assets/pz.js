// assets/pz.js

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

const elCategory = document.getElementById('category');
const elPlaneo = document.getElementById('planeoPrice');
const elMarket = document.getElementById('marketPrice');
const elCalc = document.getElementById('calcBtn');
const elReset = document.getElementById('resetBtn');
const elSummary = document.getElementById('summary');
const elResults = document.getElementById('results');

const fmt = new Intl.NumberFormat('cs-CZ');

function normalizeRow(row) {
  const [cat, minP, maxP, code, pzPrice] = row;
  const min = Math.min(minP, maxP);
  const max = Math.max(minP, maxP);
  return { cat, min, max, code, pzPrice };
}

const rows = warranty_data.map(normalizeRow);

function uniqueCategories() {
  return [...new Set(rows.map(r => r.cat))].sort();
}

function fillCategories() {
  const cats = uniqueCategories();
  elCategory.innerHTML = cats.map(c => `<option value="${c}">${c}</option>`).join('');
}

function getBracket(category, productPrice) {
  // vezmeme všechny řádky, které sedí do pásma (inclusive)
  const matching = rows.filter(r =>
    r.cat === category &&
    productPrice >= r.min &&
    productPrice <= r.max
  );

  if (!matching.length) return null;

  // přehledně: pásmo bereme z prvního matchu (v datech jsou u pásma vždy 4 varianty)
  const { min, max } = matching[0];
  const bracketRows = matching.filter(r => r.min === min && r.max === max);

  return { min, max, items: bracketRows };
}

function renderSummary({ category, planeo, market, diff, bracket }) {
  const diffClass = diff > 0 ? 'ok' : (diff === 0 ? 'meh' : 'bad');

  elSummary.hidden = false;
  elSummary.innerHTML = `
    <div class="sum">
      <div class="sum__row"><span>Kategorie</span><b>${category}</b></div>
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

function labelFor(code) {
  switch (code) {
    case '1R': return 'PZ 1 rok';
    case '2R': return 'PZ 2 roky';
    case '3R': return 'PZ 3 roky';
    case '3R_VIP': return 'PZ 3 roky VIP';
    default: return code;
  }
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

    // ✅ cena produktu když je PZ "zadarmo" (jen pro zelené)
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

function readNumber(el) {
  const n = Number(el.value);
  return Number.isFinite(n) ? n : NaN;
}

function calculate() {
  const category = elCategory.value;
  const planeo = readNumber(elPlaneo);
  const market = readNumber(elMarket);

  if (!Number.isFinite(planeo) || !Number.isFinite(market)) {
    elSummary.hidden = false;
    elSummary.innerHTML = `<div class="pz__error">Hoď tam obě ceny pls (čísla).</div>`;
    elResults.innerHTML = '';
    return;
  }

  const diff = planeo - market;
  const bracket = getBracket(category, planeo);

  renderSummary({ category, planeo, market, diff, bracket });
  renderResults(diff, bracket);
}

function resetAll() {
  elPlaneo.value = '';
  elMarket.value = '';
  elSummary.hidden = true;
  elSummary.innerHTML = '';
  elResults.innerHTML = '';
  elPlaneo.focus();
}

fillCategories();

elCalc.addEventListener('click', calculate);
elReset.addEventListener('click', resetAll);

// Enter = spočítat
[elPlaneo, elMarket].forEach(inp => {
  inp.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') calculate();
  });
});
