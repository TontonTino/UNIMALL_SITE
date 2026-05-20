import { discoverPhotos, initCatalogue, resetToAll } from './features/catalogue.js';
import { initSearch } from './features/search.js';
import { initMobileMenu } from './features/mobile-menu.js';
import { initLazy } from './features/lazyload.js';
import { buildNavs } from './features/navigation.js';
import { renderBentoGrid } from './components/category-tile.js';
import { initScrollTop } from './features/scroll-top.js';
import { initWA } from './features/whatsapp.js';

// Fonction pour initialiser les animations de révélation
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); }
  });
}, { threshold: 0.05 });

function initReveal() {
  document.querySelectorAll('.reveal:not(.in)').forEach(el => revObs.observe(el));
}

// Fonction pour initialiser l'ombre du header au scroll
function initHeaderShadow() {
  const h = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    h?.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', async () => {
  buildNavs();
  renderBentoGrid();
  initSearch();
  initMobileMenu();
  initScrollTop();
  initHeaderShadow();
  initWA();
  setTimeout(initReveal, 80);

  // Afficher skeletons pendant la découverte
  const grid = document.getElementById('photoGrid');
  if (grid) grid.innerHTML = Array(12).fill('<div class="skel"></div>').join('');

  // Découverte illimitée des photos via img.onload/onerror
  const found = await discoverPhotos();
  initCatalogue(found);

  console.log(`%c UNIMALL V9 ✅ — ${found.length} photos découvertes · 19 catégories · Illimité`,
    'background:linear-gradient(90deg,#FF6600,#9b1c2c);color:#fff;padding:6px 16px;border-radius:6px;font-weight:bold;font-size:12px');
});

// Remplacement des onclick inline
document.getElementById('logoHome')?.addEventListener('click', (e) => {
  e.preventDefault();
  resetToAll();
});

document.getElementById('resetBtn')?.addEventListener('click', resetToAll);

document.getElementById('emptyState')?.querySelector('.btn-reset')?.addEventListener('click', resetToAll);

// Gestion des onerror pour les images
document.querySelectorAll('img').forEach(img => {
  if (img.getAttribute('onerror')) {
    const originalOnError = img.getAttribute('onerror');
    img.removeAttribute('onerror');
    img.addEventListener('error', function() {
      eval(originalOnError); // Exécute le code original de onerror
    });
  }
});
