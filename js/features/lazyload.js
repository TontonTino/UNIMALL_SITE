export function initLazy() {
  const imgs = document.querySelectorAll("img[data-src]");
  if (!imgs.length) return;
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries, ob) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const img = e.target;
          const src = img.dataset.src;
          if (!src) return;
          const l = new Image();
          l.onload = () => {
            img.src = src;
            img.classList.add("loaded");
          };
          l.onerror = () => {
            img.classList.add("loaded");
          };
          l.src = src;
          ob.unobserve(img);
        });
      },
      { rootMargin: "300px 0px" }
    );
    imgs.forEach((i) => obs.observe(i));
  } else {
    imgs.forEach((img) => {
      const src = img.dataset.src;
      if (!src) return;
      img.src = src;
      img.classList.add("loaded");
    });
  }
}
