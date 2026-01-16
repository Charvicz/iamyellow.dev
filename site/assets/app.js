// Scroll reveal (IntersectionObserver)
const reveals = document.querySelectorAll(".reveal");
if (reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: 0.18 });

  reveals.forEach(el => io.observe(el));
}

// Year in footer (safe)
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Tiny toast helper (safe)
const toastEl = document.getElementById("toast");
let toastTimer = null;

function showToast(text){
  if (!toastEl) return;
  toastEl.textContent = text;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1700);
}

// Only block click if data-toast has a message
document.querySelectorAll("[data-toast]").forEach(el => {
  el.addEventListener("click", (e) => {
    const msg = el.getAttribute("data-toast") || "";
    if (!msg) return;
    e.preventDefault();
    showToast(msg);
  });
});

// Easter eggs
(() => {
  const dot = document.getElementById("yellowDot");
  const unlockToast = document.getElementById("unlockToast");

  if (!dot) return;

  function basePrefix() {
    const p = window.location.pathname;
    return p.includes("/site/") ? "/site" : "";
  }

  function showUnlock(msg){
    if (!unlockToast) return;
    unlockToast.textContent = msg;
    unlockToast.classList.add("show");
    window.clearTimeout(showUnlock._t);
    showUnlock._t = window.setTimeout(() => unlockToast.classList.remove("show"), 1800);
  }

  function microBeep(){
    try{
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 880;
      g.gain.value = 0.03;
      o.connect(g); g.connect(ctx.destination);
      o.start();
      setTimeout(() => { o.stop(); ctx.close(); }, 90);
    }catch(e){}
  }

  // Hold 2s => Yellow Mode
  let holdTimer = null;
  let holding = false;

  function startHold(){
    if (holding) return;
    holding = true;
    dot.classList.add("is-holding");

    holdTimer = window.setTimeout(() => {
      document.documentElement.classList.toggle("yellow-mode");
      showUnlock("Yellow Mode unlocked ✨");
      microBeep();
      holding = false;
      dot.classList.remove("is-holding");
    }, 2000);
  }

  function cancelHold(){
    holding = false;
    dot.classList.remove("is-holding");
    if (holdTimer) window.clearTimeout(holdTimer);
    holdTimer = null;
  }

  dot.addEventListener("pointerdown", startHold);
  dot.addEventListener("pointerup", cancelHold);
  dot.addEventListener("pointerleave", cancelHold);
  dot.addEventListener("touchcancel", cancelHold);

  // 7 clicks => unlock button
  let clickCount = 0;
  let unlockedBtn = null;

  function makeUnlockedButton(){
    if (unlockedBtn) return;
    unlockedBtn = document.createElement("a");
    unlockedBtn.href = basePrefix() + "/projects/";
    unlockedBtn.className = "btn primary";
    unlockedBtn.style.marginTop = "14px";
    unlockedBtn.textContent = "Surprise me → Projects";
    dot.insertAdjacentElement("afterend", unlockedBtn);
  }

  dot.addEventListener("click", () => {
    clickCount++;
    if (clickCount === 7) {
      showUnlock("✨ ok you found it");
      makeUnlockedButton();
    }
  });

  // Konami => /secret/
  const konami = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let kIdx = 0;

  window.addEventListener("keydown", (e) => {
    const key = (e.key || "").length === 1 ? e.key.toLowerCase() : e.key;

    if (key === konami[kIdx]) {
      kIdx++;
      if (kIdx === konami.length) {
        kIdx = 0;
        window.location.href = basePrefix() + "/secret/";
      }
    } else {
      kIdx = 0;
    }
  });
})();
