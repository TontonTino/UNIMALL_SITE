import { filterByCat } from "../features/catalogue.js";
import { initLazy } from "../features/lazyload.js";

export function createCategoryTile(cat) {
  const cls = cat.size === "wide" ? "tile tile-wide" : cat.size === "tall" ? "tile tile-tall" : "tile";
  const badge = cat.badge ? `<div class="tile-badge">${cat.badge}</div>` : "";
  const tile = document.createElement("div");
  tile.className = cls;
  tile.style.background = cat.color;
  tile.setAttribute("role", "button");
  tile.setAttribute("tabindex", "0");
  tile.setAttribute("aria-label", cat.label);
  tile.innerHTML = `
    <img class="tile-photo" data-src="assets/images/${cat.id}/photo1.jpg"
         alt="${cat.label}" loading="lazy">
    <div class="tile-bg-i" aria-hidden="true"><i class="fas fa-${cat.icon}"></i></div>
    <div class="tile-content">
      ${badge}
      <h3 class="tile-title">${cat.label}</h3>
      <p class="tile-desc">${cat.desc}</p>
      <span class="tile-cta">Filtrer <i class="fas fa-arrow-right"></i></span>
    </div>
  `;
  tile.addEventListener("click", () => filterByCat(cat.id));
  tile.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      filterByCat(cat.id);
    }
  });
  return tile;
}

export function renderBentoGrid() {
  const grid = document.getElementById("bentoGrid");
  if (!grid) return;
  import("../data/categories.js").then(({ CATS }) => {
    CATS.forEach(cat => grid.appendChild(createCategoryTile(cat)));
    initLazy();
  });
}
