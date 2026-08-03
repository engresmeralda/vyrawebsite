/* ==========================================================================
   Portfolio: category filtering + project modal
   ========================================================================== */
(() => {
  'use strict';
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');
  const modalOverlay = document.querySelector('.modal-overlay');
  if (!items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      items.forEach(item => {
        const match = cat === 'all' || item.dataset.category === cat;
        item.hidden = !match;
      });
    });
  });

  const modalTitle = modalOverlay?.querySelector('[data-modal-title]');
  const modalCat = modalOverlay?.querySelector('[data-modal-cat]');
  const modalDesc = modalOverlay?.querySelector('[data-modal-desc]');
  const modalMeta = modalOverlay?.querySelector('[data-modal-meta]');
  const modalImg = modalOverlay?.querySelector('[data-modal-img]');

  function openModal(item) {
    if (!modalOverlay) return;
    modalTitle.textContent = item.dataset.title;
    modalCat.textContent = item.dataset.category;
    modalDesc.textContent = item.dataset.desc;
    modalMeta.innerHTML = `
      <div><strong>Client</strong>${item.dataset.client || 'Confidential'}</div>
      <div><strong>Year</strong>${item.dataset.year || '2026'}</div>
      <div><strong>Stack</strong>${item.dataset.stack || 'VYRA Cloud'}</div>
    `;

    // Pull the same image the card is using, so the modal matches the thumbnail.
    if (modalImg) {
      const cardImg = item.querySelector('img.thumb');
      if (cardImg && cardImg.getAttribute('src')) {
        modalImg.src = cardImg.getAttribute('src');
        modalImg.alt = cardImg.getAttribute('alt') || item.dataset.title || '';
      } else {
        // No real image yet — leave src empty so the CSS gradient
        // background on .modal-banner shows through instead.
        modalImg.removeAttribute('src');
        modalImg.alt = '';
      }
    }

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  items.forEach(item => item.addEventListener('click', () => openModal(item)));
  modalOverlay?.querySelector('.modal-close')?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();
