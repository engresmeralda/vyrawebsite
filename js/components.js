/* ==========================================================================
   Reusable UI components: testimonial slider, FAQ accordion
   ========================================================================== */
(() => {
  'use strict';

  /* ---- Testimonial slider ---- */
  const slider = document.querySelector('.testi-slider');
  if (slider) {
    const track = slider.querySelector('.testi-track');
    const slides = slider.querySelectorAll('.testi-slide');
    const dotsWrap = slider.querySelector('.testi-nav');
    let index = 0, timer;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dotsWrap.querySelectorAll('.testi-dot').forEach((d, di) => d.classList.toggle('active', di === index));
    }

    function auto() {
      clearInterval(timer);
      timer = setInterval(() => goTo(index + 1), 5500);
    }
    auto();
    slider.addEventListener('mouseenter', () => clearInterval(timer));
    slider.addEventListener('mouseleave', auto);
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });
})();
