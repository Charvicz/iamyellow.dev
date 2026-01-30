document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("copyBtn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    await navigator.clipboard.writeText("hello@iamyellow.dev");
    btn.innerText = "Copied ✓";
    setTimeout(() => btn.innerText = "Copy", 1500);
  });
});
