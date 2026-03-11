/* =========================
   SCROLL REVEAL
========================= */

const revealItems = document.querySelectorAll(
  ".drone-hero, .drone-video, .drone-photos, .drone-pricing, .drone-contact, .drone-links"
);

const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
    }
  });
},{
  threshold:0.15
});

revealItems.forEach(el=>{
  el.classList.add("reveal");
  revealObserver.observe(el);
});


/* =========================
   LIGHTBOX GALLERY
========================= */

const galleryImages = document.querySelectorAll(".drone-gallery img");

if(galleryImages.length){

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <span class="lightbox-close">✕</span>
    <img class="lightbox-img">
  `;

  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  galleryImages.forEach(img=>{
    img.addEventListener("click",()=>{
      lightboxImg.src = img.src;
      lightbox.classList.add("show");
    });
  });

  closeBtn.onclick = ()=> lightbox.classList.remove("show");

  lightbox.onclick = e=>{
    if(e.target === lightbox){
      lightbox.classList.remove("show");
    }
  };
}


/* =========================
   EMAIL COPY
========================= */

const emailLink = document.querySelector('.drone-contact a[href^="mailto"]');

if(emailLink){

  emailLink.addEventListener("click",e=>{
    e.preventDefault();

    const email = emailLink.textContent;

    navigator.clipboard.writeText(email);

    showToast("Email copied to clipboard ✉️");
  });

}


/* =========================
   VIDEO INTERACTION
========================= */

const video = document.querySelector(".video-wrapper");

if(video){

  video.addEventListener("mouseenter",()=>{
    video.style.transform = "scale(1.01)";
  });

  video.addEventListener("mouseleave",()=>{
    video.style.transform = "scale(1)";
  });

}


/* =========================
   TOAST SYSTEM
========================= */

function showToast(message){

  let toast = document.getElementById("toast");

  if(!toast){
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(()=>{
    toast.classList.remove("show");
  },2500);

}

document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".video-card"));
  const buttons = document.querySelectorAll(".video-card-controls [data-dir]");
  if (!cards.length) return;

  let index = 0;

  function show(idx) {
    cards.forEach((card, i) => {
      card.classList.toggle("active", i === idx);
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const dir = btn.dataset.dir === "next" ? 1 : -1;
      index = (index + dir + cards.length) % cards.length;
      show(index);
    });
  });

  // start
  show(0);
});


// VIDEO STACK
document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".video-card"));
  const buttons = document.querySelectorAll("[data-dir]");
  const indicator = document.querySelector(".video-indicator");
  
  if (!cards.length) return;

  let index = 0;

  function show(idx) {
    cards.forEach((card, i) => {
      card.classList.toggle("active", i === idx);
    });
    if (indicator) indicator.textContent = `${idx + 1} / ${cards.length}`;
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const dir = btn.dataset.dir === "next" ? 1 : -1;
      index = (index + dir + cards.length) % cards.length;
      show(index);
    });
  });

  show(0);
});

// LIGHTBOX GALERIE
document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.drone-gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  const lightboxCounter = document.getElementById('lightbox-counter');
  
  if (!gallery || !lightbox) return;

  const images = Array.from(gallery.querySelectorAll('img'));
  let currentIndex = 0;

  // Otevřít lightbox
  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      updateCounter();
      lightbox.classList.add('show');
    });
  });

  // Zavřít
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Klávesnice
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('show')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });

  // Navigace
  lightboxNext.addEventListener('click', nextImage);
  lightboxPrev.addEventListener('click', prevImage);

  function closeLightbox() {
    lightbox.classList.remove('show');
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt;
    updateCounter();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt;
    updateCounter();
  }

  function updateCounter() {
    lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
  }
});

// SMOOTH SCROLL pro tlačítka
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

