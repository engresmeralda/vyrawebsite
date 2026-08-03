/* ==========================================================================
   Team: bio popup modal
   ========================================================================== */
(() => {
  'use strict';
  const cards = document.querySelectorAll('.team-card');
  const modalOverlay = document.querySelector('.modal-overlay');
  if (!cards.length || !modalOverlay) return;

  const nameEl = modalOverlay.querySelector('[data-modal-title]');
  const roleEl = modalOverlay.querySelector('[data-modal-cat]');
  const bioEl = modalOverlay.querySelector('[data-modal-desc]');
  const metaEl = modalOverlay.querySelector('[data-modal-meta]');
  const avatarEl = modalOverlay.querySelector('[data-modal-img]');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      nameEl.textContent = card.dataset.name;
      roleEl.textContent = card.dataset.role;
      bioEl.textContent = card.dataset.bio;
      metaEl.innerHTML = `
        <div><strong>Experience</strong>${card.dataset.experience}</div>
        <div><strong>Skills</strong>${card.dataset.skills}</div>
      `;

      // Match the modal photo to whichever card was clicked.
      if (avatarEl) {
        const cardImg = card.querySelector('img.team-avatar');
        if (cardImg && cardImg.getAttribute('src')) {
          avatarEl.src = cardImg.getAttribute('src');
          avatarEl.alt = cardImg.getAttribute('alt') || card.dataset.name || '';
        } else {
          avatarEl.removeAttribute('src');
          avatarEl.alt = '';
        }
      }

      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  modalOverlay.querySelector('.modal-close')?.addEventListener('click', () => {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  });
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) { modalOverlay.classList.remove('open'); document.body.style.overflow = ''; }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { modalOverlay.classList.remove('open'); document.body.style.overflow = ''; }
  });
})();
