/* ==========================================================================
   Blog: client-side search across post cards
   ========================================================================== */
(() => {
  'use strict';
  const input = document.querySelector('#blog-search');
  const posts = document.querySelectorAll('.post-card');
  const noResults = document.querySelector('.no-results');
  if (!input) return;

  function filter() {
    const q = input.value.trim().toLowerCase();
    let visible = 0;
    posts.forEach(post => {
      const text = post.textContent.toLowerCase();
      const match = text.includes(q);
      post.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    noResults.classList.toggle('show', visible === 0);
  }

  input.addEventListener('input', filter);
  document.querySelector('#blog-search-btn')?.addEventListener('click', (e) => { e.preventDefault(); filter(); });

  /* Category quick-filter */
  document.querySelectorAll('.cat-list a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      input.value = a.dataset.cat || '';
      filter();
      document.querySelector('#blog-search').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
})();
