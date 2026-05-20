export function initScrollTop() {
  const btn = document.getElementById("stBtn");
  if (!btn) return;
  let t = false;
  window.addEventListener("scroll", () => {
    if (!t) {
      requestAnimationFrame(() => {
        btn.classList.toggle("show", window.scrollY > 400);
        t = false;
      });
      t = true;
    }
  }, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
