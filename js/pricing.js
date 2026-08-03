/* ==========================================================================
   Pricing: monthly / yearly toggle
   ========================================================================== */
(() => {
  'use strict';
  const toggle = document.querySelector('.toggle-switch');
  if (!toggle) return;
  const amounts = document.querySelectorAll('[data-monthly]');

  toggle.addEventListener('click', () => {
    const yearly = toggle.classList.toggle('yearly');
    toggle.setAttribute('aria-checked', String(yearly));
    amounts.forEach(el => {
      const price = yearly ? el.dataset.yearly : el.dataset.monthly;
      el.textContent = price;
    });
    document.querySelectorAll('[data-cycle-label]').forEach(el => {
      el.textContent = yearly ? '/mo, billed yearly' : '/mo';
    });
  });

  toggle.setAttribute('role', 'switch');
  toggle.setAttribute('tabindex', '0');
  toggle.setAttribute('aria-checked', 'false');
  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle.click(); }
  });
})();
