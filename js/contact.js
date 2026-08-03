/* ==========================================================================
   Contact form validation + submission feedback
   ========================================================================== */
(() => {
  'use strict';
  const form = document.querySelector('#contact-form');
  if (!form) return;
  const successPanel = document.querySelector('.success-panel');

  const validators = {
    name: v => v.trim().length >= 2 || 'Enter your full name.',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address.',
    phone: v => v.trim() === '' || /^[0-9+()\-\s]{7,}$/.test(v) || 'Enter a valid phone number.',
    service: v => v.trim() !== '' || 'Select a service.',
    message: v => v.trim().length >= 10 || 'Message should be at least 10 characters.'
  };

  function setError(field, msg) {
    const wrap = field.closest('.field');
    const err = wrap.querySelector('.error-msg');
    if (msg) { wrap.classList.add('invalid'); err.textContent = msg; }
    else { wrap.classList.remove('invalid'); err.textContent = ''; }
  }

  function validateField(field) {
    const rule = validators[field.name];
    if (!rule) return true;
    const result = rule(field.value);
    setError(field, result === true ? '' : result);
    return result === true;
  }

  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => { if (field.closest('.field').classList.contains('invalid')) validateField(field); });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('input, textarea, select').forEach(field => {
      if (!validateField(field)) valid = false;
    });

    if (!valid) {
      showToast('Almost there', 'Please fix the highlighted fields.', 'error');
      form.querySelector('.invalid input, .invalid select, .invalid textarea')?.focus();
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      form.hidden = true;
      successPanel.classList.add('show');
      showToast('Message sent', 'A VYRA strategist will reach out within one business day.', 'success');
    }, 900);
  });
})();
