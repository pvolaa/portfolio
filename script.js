/* ============================================
   script.js — Animations & interactions
   Portfolio BTS SIO SLAM
   ============================================ */

// --- Navbar : effet au scroll ---
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// --- Apparition des éléments au scroll (fade-in) ---
const faders = document.querySelectorAll('.fade-in');

const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Délai en cascade pour les groupes d'éléments
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

faders.forEach(el => observer.observe(el));

// --- Effet de parallaxe léger sur le hero ---
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    hero.style.transform = `translateY(${y * 0.12}px)`;
  }, { passive: true });
}

// --- Curseur personnalisé doux (optionnel) ---
const cursor = document.createElement('div');
cursor.style.cssText = `
  width: 18px; height: 18px;
  border: 1.5px solid rgba(201,139,125,0.6);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.2s ease, opacity 0.2s;
  transform: translate(-50%, -50%);
  mix-blend-mode: multiply;
`;
document.body.appendChild(cursor);

let cursorX = 0, cursorY = 0;
let raf;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

function animateCursor() {
  cursor.style.left = cursorX + 'px';
  cursor.style.top  = cursorY + 'px';
  raf = requestAnimationFrame(animateCursor);
}
animateCursor();

// Agrandir le curseur sur les liens/boutons
document.querySelectorAll('a, button, .project-card, .skill-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2.2)';
    cursor.style.background = 'rgba(232, 196, 184, 0.25)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = 'transparent';
  });
});

// Cacher le curseur custom sur mobile
if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  cancelAnimationFrame(raf);
}

// --- Stagger des skill-items au chargement ---
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, i) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;

  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        skillObs.unobserve(item);
      }
    });
  }, { threshold: 0.2 });

  skillObs.observe(item);
});

// --- Cards : effet d'inclinaison 3D au survol ---
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `
      translateY(-10px)
      rotateX(${-y * 6}deg)
      rotateY(${x * 6}deg)
      scale(1.01)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});