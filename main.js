/* Keyboard-only focus outlines */
const handleFirstTab = (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
    window.addEventListener('mousedown', handleMouseDownOnce);
  }
};
const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing');
  window.removeEventListener('mousedown', handleMouseDownOnce);
  window.addEventListener('keydown', handleFirstTab);
};
window.addEventListener('keydown', handleFirstTab);

/* Nav background on scroll + back-to-top visibility */
const nav = document.getElementById('nav');
const backToTop = document.getElementById('backToTop');

const onScroll = () => {
  const y = window.scrollY;
  nav.classList.toggle('is-scrolled', y > 40);
  const show = y > 700;
  backToTop.style.visibility = show ? 'visible' : 'hidden';
  backToTop.style.opacity = show ? 1 : 0;
  backToTop.style.transform = show ? 'scale(1)' : 'scale(.8)';
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* Scroll reveal */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}
