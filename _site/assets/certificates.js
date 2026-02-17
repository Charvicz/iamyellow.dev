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

// ROZKLİKAT = FULLSCREEN
document.querySelectorAll('.cert').forEach(cert => {
  cert.addEventListener('click', function() {
    const imgSrc = this.querySelector('img').src;
    const title = this.querySelector('h3').textContent;
    const desc = this.querySelector('p').textContent;
    
    // Naplň modal
    document.getElementById('modal-image').src = imgSrc;
    document.getElementById('modal-desc').innerHTML = `
      <h3 style="margin: 0 0 0.5rem 0; color: #333;">${title}</h3>
      <p style="margin: 0; color: #666; font-size: 1rem;">${desc}</p>
    `;
    
    // Ukaž modal
    document.getElementById('cert-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// ZAVŘÍT MODAL
document.querySelector('.modal-close').addEventListener('click', function() {
  document.getElementById('cert-modal').classList.remove('active');
  document.body.style.overflow = '';
});

document.getElementById('cert-modal').addEventListener('click', function(e) {
  if (e.target.id === 'cert-modal') {
    this.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.getElementById('cert-modal').classList.remove('active');
    document.body.style.overflow = '';
  }
});
