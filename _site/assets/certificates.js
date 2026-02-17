document.querySelectorAll('.cert').forEach((cert, index) => {
  cert.addEventListener('click', () => {
    const img = cert.querySelector('img');
    const h3 = cert.querySelector('h3').textContent;
    const p = cert.querySelector('p').textContent;
    
    document.getElementById('modal-image').src = img.src;
    document.getElementById('modal-image').alt = img.alt;
    document.getElementById('modal-desc').innerHTML = `<h3>${h3}</h3><p>${p}</p>`;
    
    document.getElementById('cert-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

document.querySelector('.modal-close').onclick = () => {
  document.getElementById('cert-modal').classList.remove('active');
  document.body.style.overflow = '';
};

document.getElementById('cert-modal').onclick = (e) => {
  if (e.target.id === 'cert-modal') {
    document.getElementById('cert-modal').classList.remove('active');
    document.body.style.overflow = '';
  }
};

document.onkeydown = (e) => {
  if (e.key === 'Escape') {
    document.getElementById('cert-modal').classList.remove('active');
    document.body.style.overflow = '';
  }
};

// Filtrování
document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    
    const filter = btn.dataset.filter;
    document.querySelectorAll('.cert').forEach(cert => {
      cert.style.display = (filter === 'all' || cert.dataset.tags.includes(filter)) ? 'block' : 'none';
    });
  });
});
