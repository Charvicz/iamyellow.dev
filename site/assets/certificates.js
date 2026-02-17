document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("cert-modal");
  const modalImage = document.getElementById("modal-image");
  const modalDesc = document.getElementById("modal-desc");
  const closeBtn = document.querySelector(".modal-close");

  const certCards = document.querySelectorAll(".cert");

  certCards.forEach(card => {
    card.addEventListener("click", () => {

      const img = card.querySelector("img");
      const title = card.querySelector("h3").innerText;
      const desc = card.querySelector("p").innerText;

      modalImage.src = img.src;
      modalImage.alt = title;
      modalDesc.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    modalImage.src = "";
  }

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

});
