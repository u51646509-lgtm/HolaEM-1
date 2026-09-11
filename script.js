/* ============================================================
   DriveWise — site interactivity (Heart Aerospace redesign)
   ============================================================ */

(function () {
  'use strict';

  /* -------------------- Inventory filters -------------------- */
  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.car-card');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const cat = btn.dataset.filter;
      cards.forEach(card => {
        const matches = cat === 'all' || card.dataset.cat === cat;
        card.classList.toggle('is-hidden', !matches);
      });
    });
  });

  /* -------------------- Smooth scroll for in-page anchors -------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  /* -------------------- Scroll reveal -------------------- */
  const revealTargets = document.querySelectorAll(
    '.section__head, .car-card, .why__cell, .process__step, .contact__card, .contact__form, .monumental__title'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* -------------------- Contact form validation -------------------- */
  const form = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');
  if (form) {
    const setErr = (field, msg) => {
      const wrap = field.closest('.field');
      if (!wrap) return;
      wrap.classList.toggle('is-invalid', !!msg);
      const errEl = wrap.querySelector('.field__err');
      if (errEl) errEl.textContent = msg || '';
    };

    form.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;

      const name  = form.elements.name;
      const phone = form.elements.phone;
      const email = form.elements.email;

      if (name.value.trim().length < 2) {
        setErr(name, 'Please enter your name.');
        ok = false;
      } else setErr(name, '');

      const phoneRe = /^[6-9]\d{9}$/;
      const phoneDigits = phone.value.replace(/\D/g, '');
      if (!phoneRe.test(phoneDigits)) {
        setErr(phone, 'Enter a valid 10-digit mobile number.');
        ok = false;
      } else setErr(phone, '');

      if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        setErr(email, 'Enter a valid email address.');
        ok = false;
      } else setErr(email, '');

      if (!ok) return;

      success.hidden = false;
      form.reset();
      setTimeout(() => { success.hidden = true; }, 8000);
    });
  }

  /* -------------------- Footer year -------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();