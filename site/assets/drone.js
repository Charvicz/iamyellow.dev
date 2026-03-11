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

