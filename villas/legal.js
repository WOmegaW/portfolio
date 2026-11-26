/* Юридические страницы: подставить данные агентства из data.js (SITE) */
(() => {
  const S = window.SITE || {};
  const get = path => path.split('.').reduce((o, k) => (o || {})[k], S);
  document.querySelectorAll('[data-s]').forEach(el => { el.textContent = get(el.dataset.s) || '—'; });
  document.title += ` — ${S.brand || ''}`;
  const stats = document.getElementById('stats');
  if (stats) stats.textContent = S.gaId ? 'Google Analytics (con consentimiento)' : S.plausible ? 'Plausible (sin cookies)' : 'desactivada';
  const reset = document.getElementById('reset');
  if (reset) reset.addEventListener('click', () => {
    try { localStorage.removeItem('vt-cookies'); } catch (e) { /* almacenamiento bloqueado */ }
    document.getElementById('resetDone').textContent = 'Hecho: el aviso volverá a aparecer.';
  });
})();
