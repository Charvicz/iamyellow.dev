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
