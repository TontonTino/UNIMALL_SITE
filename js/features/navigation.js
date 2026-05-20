import { CATS } from "../data/categories.js";
import { filterByCat, resetToAll } from "./catalogue.js";
import { closeNav } from "./mobile-menu.js";

export function buildNavs() {
  // Cat nav desktop
  const cn = document.getElementById("cnIn");
  if (cn) {
    cn.innerHTML =
      `<button class="cpill all-pill active" data-cat="all">
        <i class="fas fa-th-large"></i> Tout afficher
      </button>` +
      CATS.map(
        (c) => `
        <button class="cpill" data-cat="${c.id}">
          <i class="fas fa-${c.icon}"></i> ${c.label}
        </button>`
      ).join("");
    cn.querySelectorAll(".cpill").forEach((button) => {
      button.addEventListener("click", () => {
        const categoryId = button.dataset.cat;
        if (categoryId === "all") {
          resetToAll();
        } else {
          filterByCat(categoryId);
        }
      });
    });
  }

  // Filter chips
  const fb = document.getElementById("filterBar");
  if (fb) {
    fb.innerHTML =
      `<button class="fchip fall active" data-cat="all">
        <i class="fas fa-th-large"></i> Tout
      </button>` +
      CATS.map(
        (c) => `
        <button class="fchip" data-cat="${c.id}">
          <i class="fas fa-${c.icon}"></i> ${c.label}
        </button>`
      ).join("");
    fb.querySelectorAll(".fchip").forEach((button) => {
      button.addEventListener("click", () => {
        const categoryId = button.dataset.cat;
        if (categoryId === "all") {
          resetToAll();
        } else {
          filterByCat(categoryId);
        }
      });
    });
  }

  // Nav mobile
  const nl = document.getElementById("nmList");
  if (nl) {
    nl.innerHTML =
      `<li><button class="nm-btn all-mob" data-cat="all">
        <i class="fas fa-th-large"></i> Tout afficher
      </button></li>` +
      CATS.map(
        (c) => `
        <li><button class="nm-btn" data-cat="${c.id}">
          <i class="fas fa-${c.icon}"></i> ${c.label}
        </button></li>`
      ).join("");
    nl.querySelectorAll(".nm-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const categoryId = button.dataset.cat;
        if (categoryId === "all") {
          resetToAll();
        } else {
          filterByCat(categoryId);
        }
        closeNav();
      });
    });
  }

  // Footer cats
  const fc = document.getElementById("footerCats");
  if (fc) {
    fc.innerHTML = CATS.map(
      (c) => `
      <button class="fcl" data-cat="${c.id}">
        <i class="fas fa-chevron-right"></i> ${c.label}
      </button>`
    ).join("");
    fc.querySelectorAll(".fcl").forEach((button) => {
      button.addEventListener("click", () => {
        filterByCat(button.dataset.cat);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }
}
