// Scroll reveal (IntersectionObserver)
const reveals = document.querySelectorAll(".reveal");

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: 0.18 });

reveals.forEach(el => io.observe(el));

// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Tiny toast helper for "paths" placeholders
const toast = document.getElementById("toast");
let toastTimer = null;

function showToast(text){
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1700);
}

document.querySelectorAll("[data-toast]").forEach(el => {
  el.addEventListener("click", (e) => {
    // For now, prevent dead links; later replace href with real pages
    e.preventDefault();
    showToast(el.getAttribute("data-toast"));
  });
});

(() => {
  const dot = document.getElementById("yellowDot");
  const toast = document.getElementById("unlockToast");

  // If this page doesn't have the dot, do nothing.
  if (!dot) return;

  // ---------- Base path helper (because you host under /site/) ----------
  // If later you move to domain root, it still works.
  function basePrefix() {
    const p = window.location.pathname;
    return p.includes("/site/") ? "/site" : "";
  }

  // ---------- 1) Scroll-reactive pulse ----------
  function clamp01(x){ return Math.max(0, Math.min(1, x)); }

  function onScrollPulse(){
    const y = window.scrollY || 0;
    const h = window.innerHeight || 800;

    // pulse increases slowly with scroll (0..1 over ~1.2 screens)
    const pulse = clamp01(y / (h * 1.2));
    // words fade in a bit later
    const words = clamp01((y - h * 0.15) / (h * 0.65));

    document.documentElement.style.setProperty("--pulse", String(pulse));
    document.documentElement.style.setProperty("--words", String(words));
  }

  window.addEventListener("scroll", onScrollPulse, { passive: true });
  onScrollPulse();

  // ---------- 2) Hold 2s on dot = Yellow Mode ----------
  let holdTimer = null;
  let holding = false;

  function showToast(msg){
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => toast.classList.remove("show"), 1800);
  }

  function microBeep(){
    // optional: tiny beep via WebAudio, no files needed
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

  function startHold(){
    if (holding) return;
    holding = true;
    dot.classList.add("is-holding");

    holdTimer = window.setTimeout(() => {
      document.documentElement.classList.toggle("yellow-mode");
      showToast("Yellow Mode unlocked ✨");
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

  // ---------- 3) Click counter: 7 clicks unlocks a button ----------
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
      showToast("✨ ok you found it");
      makeUnlockedButton();
    }
  });

  // ---------- 4) Konami code -> /secret/ ----------
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
