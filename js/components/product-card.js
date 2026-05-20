import { CATS } from '../data/categories.js';

export function createProductCard(photo) {
  const category = CATS.find(cat => cat.id === photo.category);
  const card = document.createElement('div');
  card.className = 'pcard reveal';
  card.setAttribute('role', 'listitem');
  card.innerHTML = `
    <div class="pc-img-w">
      <span class="pc-cat">${category ? category.label : 'Divers'}</span>
      <img class="pc-img" src="${photo.src}" alt="${photo.title || category?.label || 'Produit'}" loading="lazy">
    </div>
    <div class="pc-body">
      <h3 class="pc-title">${photo.title || category?.label || 'Produit'}</h3>
      <a href="https://wa.me/22657366666?text=Bonjour%2C%20je%20suis%20intéressé(e)%20par%20le%20produit%20%3A%20${encodeURIComponent(photo.title || category?.label || 'Produit')}%20(${photo.src})" target="_blank" rel="noopener" class="pc-wa">
        <i class="fab fa-whatsapp"></i> Commander sur WhatsApp
      </a>
    </div>
  `;
  return card;
}
