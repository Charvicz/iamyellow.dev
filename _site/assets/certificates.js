document.addEventListener('DOMContentLoaded', function() {
  // MODAL FUNKCE
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('modal-image');
  const modalDesc = document.getElementById('modal-desc');
  const closeBtn = document.querySelector('.modal-close');

  // KLIK NA CERTIFIKÁT
  document.querySelectorAll('.cert').forEach(function(cert) {
    cert.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').src;
      const title = this.querySelector('h3').textContent;
      const desc = this.querySelector('p').textContent;

      modalImg.src = imgSrc;
      modalImg.alt = title;
      modalDesc.innerHTML = '<h3>' + title + '</h3><p>' + desc + '</p>';

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // ZAVŘÍT
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('modal-image');
  const modalDesc = document.getElementById('modal-desc');
  const closeBtn = document.querySelector('.modal-close');

  // KLIK NA CERTIFIKÁT = FULLSCREEN
  document.querySelectorAll('.cert').forEach(function(cert) {
    cert.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').src;
      const title = this.querySelector('h3').textContent;
      const desc = this.querySelector('p').textContent;
      
      modalImg.src = imgSrc;
      modalImg.alt = title;
      modalDesc.innerHTML = `<h3 style="margin: 0 0 1rem 0; color: #333;">${title}</h3><p style="margin: 0; color: #666;">${desc}</p>`;
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // ZAVŘÍT MODAL (X tlačítko)
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  
  // KLIK MIMO MODAL
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });

  // ESC KLÁVESOU
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });
});
