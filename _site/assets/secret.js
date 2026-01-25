document.documentElement.classList.add("js");

// ✅ unlock theme(s) when user finds this page
(function unlock() {
  try {
    const u = JSON.parse(localStorage.getItem("unlocks") || "{}");
    u["found_secret_seacrite"] = true;
    localStorage.setItem("unlocks", JSON.stringify(u));
  } catch {}

  // pokud máš v theme panelu helper, zkusíme ho taky
  if (window.__unlockThemeKey) {
    window.__unlockThemeKey("found_secret_seacrite");
  }
})();

const facts = [
  "Clean UI beats loud UI. Every time.",
  "If it ships, it wins.",
  "The yellow dot is the brand.",
  "Small details = big vibe."
];

const factEl = document.getElementById("fact");
const factDot = document.getElementById("factDot");
const newFact = document.getElementById("newFact");

function rollFact(){
  const f = facts[Math.floor(Math.random() * facts.length)];
  factEl.textContent = f;
}

factDot.addEventListener("click", rollFact);
newFact.addEventListener("click", rollFact);

// mini game
const gameDot = document.getElementById("gameDot");
const scoreEl = document.getElementById("score");
const startBtn = document.getElementById("startGame");

let playing = false;
let score = 0;
let endT = null;

function start(){
  if (playing) return;
  playing = true;
  score = 0;
  scoreEl.textContent = "Score: 0";
  startBtn.textContent = "Go!";
  clearTimeout(endT);

  endT = setTimeout(() => {
    playing = false;
    startBtn.textContent = "Start";
  }, 5000);
}

gameDot.addEventListener("click", () => {
  if (!playing) return;
  score++;
  scoreEl.textContent = "Score: " + score;
});

startBtn.addEventListener("click", start);
