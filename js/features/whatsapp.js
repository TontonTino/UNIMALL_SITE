export function initWA() {
  const b = document.querySelector(".wa-bubble");
  const x = document.getElementById("waBx");
  const K = "um_wa_v8";
  if (sessionStorage.getItem(K)) b?.classList.add("gone");
  x?.addEventListener("click", () => {
    b?.classList.add("gone");
    sessionStorage.setItem(K, "1");
  });
  if (window.innerWidth <= 768) {
    window.addEventListener("scroll", () => {
      if (!sessionStorage.getItem(K)) b?.classList.toggle("gone", window.scrollY > 150);
    }, { passive: true });
  }
}
