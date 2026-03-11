document.addEventListener('DOMContentLoaded', () => {
  const lang = document.querySelector('.lang');
  const langBtn = document.querySelector('.lang-trigger');
  if (lang && langBtn) {
    langBtn.addEventListener('click', () => lang.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!lang.contains(e.target)) lang.classList.remove('open');
    });
  }

  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const openBtn = document.getElementById('openDrawer');
  const closeBtn = document.getElementById('closeDrawer');
  const focusablesSelector = 'a[href],button:not([disabled]),input:not([disabled])';

  const setLock = (locked) => document.body.classList.toggle('lock', locked);
  const openDrawer = () => {
    if (!drawer || !overlay) return;
    drawer.classList.add('open');
    overlay.classList.add('open');
    setLock(true);
    const first = drawer.querySelector(focusablesSelector);
    if (first) first.focus();
  };
  const closeDrawer = () => {
    if (!drawer || !overlay) return;
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    setLock(false);
    if (openBtn) openBtn.focus();
  };

  openBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  const privacyModal = document.getElementById('privacyModal');
  const openPrivacyBtns = document.querySelectorAll('[data-open-privacy]');
  const closePrivacyBtns = document.querySelectorAll('[data-close-privacy]');

  const openModal = () => {
    privacyModal?.classList.add('open');
    setLock(true);
    privacyModal?.querySelector(focusablesSelector)?.focus();
  };
  const closeModal = () => {
    privacyModal?.classList.remove('open');
    setLock(false);
  };
  openPrivacyBtns.forEach((btn) => btn.addEventListener('click', (e) => { e.preventDefault(); openModal(); }));
  closePrivacyBtns.forEach((btn) => btn.addEventListener('click', closeModal));
  privacyModal?.addEventListener('click', (e) => { if (e.target === privacyModal) closeModal(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeModal();
    }
    const activeTrap = drawer?.classList.contains('open') ? drawer : (privacyModal?.classList.contains('open') ? privacyModal : null);
    if (e.key === 'Tab' && activeTrap) {
      const nodes = [...activeTrap.querySelectorAll(focusablesSelector)];
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  document.querySelectorAll('.faq-q').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      document.querySelectorAll('.faq-item').forEach((x) => x !== item && x.classList.remove('open'));
      item?.classList.toggle('open');
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
});
