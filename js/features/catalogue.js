import { CATS } from '../data/categories.js';
import { shuffle } from '../utils/shuffle.js';
import { createProductCard } from '../components/product-card.js';

const PRODUCTS_PER_LOAD = 12;
let ALL_PHOTOS = [];
let displayedPhotos = 0;
let currentFilter = 'all';
let currentSearchTerm = '';

export async function discoverPhotos() {
  const photoPaths = [];
  const categoriesToProcess = CATS.map(cat => cat.id);

  for (const catId of categoriesToProcess) {
    for (let i = 1; i <= 20; i++) { // Supposons un maximum de 20 photos par catégorie
      const img = new Image();
      const path = `assets/images/${catId}/photo${i}.jpg`;
      try {
        await new Promise((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject();
          img.src = path;
        });
        photoPaths.push({ src: path, category: catId });
      } catch (error) {
        // console.log(`Image non trouvée: ${path}`);
        // Si une image n'est pas trouvée, on arrête pour cette catégorie
        break;
      }
    }
  }
  return photoPaths;
}

export function renderGrid(reset = false) {
  const photoGrid = document.getElementById('photoGrid');
  const lmWrap = document.getElementById('lmWrap');
  const emptyState = document.getElementById('emptyState');
  const countPill = document.getElementById('countPill');
  const filterTag = document.getElementById('filterTag');
  const filterLabel = document.getElementById('filterLabel');
  const shuffleTag = document.getElementById('shuffleTag');

  if (!photoGrid || !lmWrap || !emptyState || !countPill || !filterTag || !filterLabel || !shuffleTag) return;

  if (reset) {
    photoGrid.innerHTML = '';
    displayedPhotos = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  let photosToRender = ALL_PHOTOS;

  if (currentFilter !== 'all') {
    photosToRender = photosToRender.filter(photo => photo.category === currentFilter);
    filterTag.classList.add('show');
    filterLabel.textContent = CATS.find(cat => cat.id === currentFilter)?.label || '';
  } else {
    filterTag.classList.remove('show');
  }

  if (currentSearchTerm) {
    const searchTermLower = currentSearchTerm.toLowerCase();
    photosToRender = photosToRender.filter(photo => {
      const categoryLabel = CATS.find(cat => cat.id === photo.category)?.label.toLowerCase();
      return categoryLabel.includes(searchTermLower);
    });
  }

  if (photosToRender.length === 0) {
    emptyState.style.display = 'block';
    lmWrap.style.display = 'none';
    photoGrid.innerHTML = '';
    countPill.textContent = '0 photo';
    return;
  } else {
    emptyState.style.display = 'none';
  }

  const fragment = document.createDocumentFragment();
  const nextPhotos = photosToRender.slice(displayedPhotos, displayedPhotos + PRODUCTS_PER_LOAD);

  nextPhotos.forEach(photo => {
    fragment.appendChild(createProductCard(photo));
  });

  photoGrid.appendChild(fragment);
  displayedPhotos += nextPhotos.length;

  if (displayedPhotos < photosToRender.length) {
    lmWrap.style.display = 'block';
  } else {
    lmWrap.style.display = 'none';
  }

  countPill.textContent = `${photosToRender.length} photo${photosToRender.length > 1 ? 's' : ''}`;
}

export function filterByCat(categoryId) {
  currentFilter = categoryId;
  currentSearchTerm = ''; // Réinitialiser la recherche lors du filtrage par catégorie
  const searchInput = document.getElementById('searchInput');
  const mobSbInput = document.getElementById('mobSbInput');
  const searchClr = document.getElementById('searchClr');
  const suggestDd = document.getElementById('suggestDd');

  if (searchInput) searchInput.value = '';
  if (mobSbInput) mobSbInput.value = '';
  if (searchClr) searchClr.hidden = true;
  if (suggestDd) suggestDd.classList.remove('open');

  // Mettre à jour les classes 'active' pour les puces de filtre
  document.querySelectorAll('.cpill, .fchip, .nm-btn').forEach(el => {
    if (el.dataset.cat === categoryId) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  renderGrid(true);
}

export function resetToAll() {
  currentFilter = 'all';
  currentSearchTerm = '';
  const searchInput = document.getElementById('searchInput');
  const mobSbInput = document.getElementById('mobSbInput');
  const searchClr = document.getElementById('searchClr');
  const suggestDd = document.getElementById('suggestDd');

  if (searchInput) searchInput.value = '';
  if (mobSbInput) mobSbInput.value = '';
  if (searchClr) searchClr.hidden = true;
  if (suggestDd) suggestDd.classList.remove('open');

  document.querySelectorAll('.cpill, .fchip, .nm-btn').forEach(el => {
    el.classList.remove('active');
  });
  document.querySelector('.cpill.all-pill')?.classList.add('active');
  document.querySelector('.fchip.fall')?.classList.add('active');
  document.querySelector('.nm-btn.all-mob')?.classList.add('active');

  renderGrid(true);
}

export function runSearch(term) {
  currentSearchTerm = term;
  const suggestDd = document.getElementById('suggestDd');
  if (!suggestDd) return;

  if (term.length > 0) {
    const matchingCategories = CATS.filter(cat =>
      cat.label.toLowerCase().includes(term.toLowerCase())
    );
    displaySuggestions(matchingCategories);
  } else {
    suggestDd.classList.remove('open');
    renderGrid(true);
  }
}

function displaySuggestions(categories) {
  const dd = document.getElementById('suggestDd');
  if (!dd) return;

  if (categories.length === 0) {
    dd.classList.remove('open');
    renderGrid(true);
    return;
  }

  dd.innerHTML = categories.map(c => `
    <div class="sug-row" data-cat="${c.id}">
      <div class="sug-dot" style="background:${c.color}"><i class="fas fa-${c.icon}"></i></div>
      <div>
        <span class="sug-name">${c.label}</span>
        <span class="sug-meta">${c.desc}</span>
      </div>
    </div>`).join('');
  dd.classList.add('open');
  renderGrid(true);
}

export function initCatalogue(initialPhotos) {
  ALL_PHOTOS = shuffle(initialPhotos);
  renderGrid(true);

  const lmBtn = document.getElementById('lmBtn');
  if (lmBtn) {
    lmBtn.addEventListener('click', () => renderGrid(false));
  }

  const countPill = document.getElementById('countPill');
  if (countPill) {
    countPill.textContent = `${ALL_PHOTOS.length} photo${ALL_PHOTOS.length > 1 ? 's' : ''}`;
  }
}

export function getAllPhotos() {
  return ALL_PHOTOS;
}
