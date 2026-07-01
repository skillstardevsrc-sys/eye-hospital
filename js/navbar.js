/**
 * Navbar Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  // Sticky Navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.add('scrolled');
      // Keeping it scrolled or removing it based on design, 
      // let's add background on scroll:
      if (window.scrollY === 0) {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // Mobile Menu Toggle
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }
});
