/* certificates.js - Přidej k tvému existujícímu JS nebo do extra_js */

// Modal funkcionalita
const certCards = document.querySelectorAll('.cert');
const modal = document.getElementById('cert-modal');
const modalImg = document.getElementById('modal-image');
const modalDesc = document.getElementById('modal-desc');
const modalClose = document.querySelector('.modal-close');

certCards.forEach(card => {
  card.addEventListener('click', () => {
    const imgSrc = card.querySelector('img').src;
    const title = card.querySelector('h3').textContent;
    const desc = card.querySelector('p').textContent;
    
    modalImg.src = imgSrc;
    modalImg.alt = title;
    modalDesc.innerHTML = `<strong>${title}</strong><br>${desc}`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Blokuj scroll
    modal.setAttribute('aria-hidden', 'false');
  });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  modal.setAttribute('aria-hidden', 'true');
}

// ESC klávesa
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

// Filtrování certifikátů (integrované do tvého existujícího filter systému)
document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    
    document.querySelectorAll('.filter').forEach(btn => btn.classList.remove('is-active'));
    button.classList.add('is-active');
    
    document.querySelectorAll('.cert').forEach(cert => {
      const tags = cert.dataset.tags;
      cert.classList.toggle('hidden', filter !== 'all' && !tags.includes(filter));
    });
  });
});
