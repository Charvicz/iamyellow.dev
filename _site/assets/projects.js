document.documentElement.classList.add("js");

const filterButtons = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

function setActive(btn) {
  filterButtons.forEach(b => b.classList.remove("is-active"));
  btn.classList.add("is-active");
}

function applyFilter(tag) {
  projects.forEach(card => {
    const tags = (card.getAttribute("data-tags") || "")
      .split(/\s+/)
      .filter(Boolean);

    const show = tag === "all" || tags.includes(tag);
    card.style.display = show ? "" : "none";
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const tag = btn.getAttribute("data-filter");
    setActive(btn);
    applyFilter(tag);
  });
});

applyFilter("all");
