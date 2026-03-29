document.addEventListener('DOMContentLoaded', () => {
  // Filter chips
  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('.model-card');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;
      
      // Update active state
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      
      // Filter cards
      cards.forEach((card, index) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(30px)';
          card.style.display = 'block';
          
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(30px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Parallax effect for hero
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero::before');
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Mouse follow glow effect on cards
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const glow = card.querySelector('.model-card__preview::before');
      if (glow) {
        glow.style.background = `
          radial-gradient(
            circle 60px at ${x}px ${y}px, 
            rgba(255,215,0,0.4), 
            transparent 50%
          )
        `;
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const glow = card.querySelector('.model-card__preview::before');
      if (glow) {
        glow.style.background = 'radial-gradient(circle at 30% 30%, rgba(255,215,0,0.3), transparent 50%)';
      }
    });
  });

  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
  });
});