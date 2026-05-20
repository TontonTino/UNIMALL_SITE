export function openNav() {
  document.getElementById("navMob")?.classList.add("open");
  document.getElementById("navOverlay")?.classList.add("open");
  document.getElementById("menuBtn")?.classList.add("open");
  document.getElementById("navMob")?.removeAttribute("aria-hidden");
  document.getElementById("menuBtn")?.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
  setTimeout(() => document.getElementById("navClose")?.focus(), 60);
}

export function closeNav() {
  document.getElementById("navMob")?.classList.remove("open");
  document.getElementById("navOverlay")?.classList.remove("open");
  document.getElementById("menuBtn")?.classList.remove("open");
  document.getElementById("navMob")?.setAttribute("aria-hidden", "true");
  document.getElementById("menuBtn")?.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

export function initMobileMenu() {
  document.getElementById("menuBtn")?.addEventListener("click", () =>
    document.getElementById("navMob")?.classList.contains("open") ? closeNav() : openNav()
  );
  document.getElementById("navOverlay")?.addEventListener("click", closeNav);
  document.getElementById("navClose")?.addEventListener("click", closeNav);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });
}
