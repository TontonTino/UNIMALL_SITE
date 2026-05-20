import { runSearch, resetToAll } from './catalogue.js';

export function initSearch() {
  const inp = document.getElementById('searchInput');
  const clr = document.getElementById('searchClr');
  const mobBtn = document.getElementById('mobSbBtn');
  const mobBar = document.getElementById('mobSb');
  const mobCl = document.getElementById('mobSbClose');
  const mobInp = document.getElementById('mobSbInput');
  const suggestDd = document.getElementById('suggestDd');

  inp?.addEventListener('input', e => {
    if (clr) clr.hidden = !e.target.value;
    runSearch(e.target.value);
  });
  inp?.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      suggestDd?.classList.remove('open');
    }
  });
  clr?.addEventListener('click', () => {
    resetToAll();
  });
  mobInp?.addEventListener('input', e => runSearch(e.target.value));

  mobBtn?.addEventListener('click', () => {
    const open = mobBar?.classList.toggle('open');
    mobBar?.setAttribute('aria-hidden', String(!open));
    mobBtn?.setAttribute('aria-expanded', String(!!open));
    if (open) setTimeout(() => mobInp?.focus(), 60);
  });
  mobCl?.addEventListener('click', () => {
    mobBar?.classList.remove('open');
    mobBar?.setAttribute('aria-hidden', 'true');
    mobBtn?.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.sw') && !e.target.closest('.mob-sb'))
      suggestDd?.classList.remove('open');
  });
}
