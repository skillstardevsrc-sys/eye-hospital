/**
 * Scroll Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  animatedElements.forEach(el => observer.observe(el));
});
