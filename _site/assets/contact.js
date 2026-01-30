(function () {
  const btn = document.getElementById("copyEmailBtn");
  const emailEl = document.getElementById("contactEmail");
  const toast = document.getElementById("contactToast");

  if (!btn || !emailEl) return;

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add("show");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => toast.classList.remove("show"), 1400);
  }

  btn.addEventListener("click", async () => {
    const email = (emailEl.textContent || "").trim();

    try {
      await navigator.clipboard.writeText(email);
      showToast("Copied.");
    } catch (e) {
      // fallback
      const input = document.createElement("input");
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      showToast("Copied.");
    }
  });
})();
