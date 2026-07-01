/**
 * Main Application JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Remove Loader
  const loader = document.querySelector('.loader-wrapper');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => loader.remove(), 500);
    }, 1000); // Simulate initial loading time
  }

  // Ripple Effect on Buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      let x = e.clientX - e.target.getBoundingClientRect().left;
      let y = e.clientY - e.target.getBoundingClientRect().top;

      let ripples = document.createElement('span');
      ripples.style.left = x + 'px';
      ripples.style.top = y + 'px';
      ripples.classList.add('ripple');
      this.appendChild(ripples);

      setTimeout(() => {
        ripples.remove();
      }, 600);
    });
  });

  // Service Modal Logic
  const serviceImages = document.querySelectorAll('.service-img');
  const serviceModal = document.getElementById('serviceModal');
  const closeServiceModalBtn = document.getElementById('closeServiceModal');

  if (serviceModal) {
    const sModalIcon = document.getElementById('service-modal-icon');
    const sModalTitle = document.getElementById('service-modal-title');
    const sModalDesc = document.getElementById('service-modal-desc');

    serviceImages.forEach(el => {
      el.addEventListener('click', () => {
        sModalIcon.className = el.getAttribute('data-icon');
        sModalTitle.textContent = el.getAttribute('data-title');
        sModalDesc.textContent = el.getAttribute('data-desc');

        serviceModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeSModal = () => {
      serviceModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (closeServiceModalBtn) {
      closeServiceModalBtn.addEventListener('click', closeSModal);
    }

    serviceModal.addEventListener('click', (e) => {
      if (e.target === serviceModal) {
        closeSModal();
      }
    });
  }

  // Doctor Modal Logic
  const doctorImages = document.querySelectorAll('.doctor-img');
  const modal = document.getElementById('doctorModal');
  const closeModalBtn = modal ? modal.querySelector('.close-modal') : null;

  if (modal) {
    const modalImg = document.getElementById('modal-img');
    const modalName = document.getElementById('modal-name');
    const modalRole = document.getElementById('modal-role');
    const modalExp = document.getElementById('modal-exp');
    const modalDesc = document.getElementById('modal-desc');

    doctorImages.forEach(img => {
      // Make sure the cursor indicates it's clickable
      img.style.cursor = 'pointer';

      img.addEventListener('click', () => {
        // Populate modal data
        modalImg.src = img.src;
        modalName.textContent = img.getAttribute('data-name');
        modalRole.textContent = img.getAttribute('data-role');
        modalExp.textContent = img.getAttribute('data-exp');
        modalDesc.textContent = img.getAttribute('data-desc');

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      });
    });

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeModal);
    }

    // Close on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // AI Interactive Eye Scanner Parallax & Ambient Effects
  const parallaxContainer = document.getElementById('parallax-container');
  const heroEye = document.getElementById('parallax-eye');
  const particlesContainer = document.getElementById('particles');

  if (parallaxContainer && heroEye && particlesContainer) {
    // Advanced Mouse Parallax
    parallaxContainer.addEventListener('mousemove', (e) => {
      const rect = parallaxContainer.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      requestAnimationFrame(() => {
        heroEye.style.transform = `rotateY(${x * 0.05}deg) rotateX(${-y * 0.05}deg) translateZ(20px)`;
      });
    });

    parallaxContainer.addEventListener('mouseleave', () => {
      requestAnimationFrame(() => {
        heroEye.style.transform = `rotateY(0deg) rotateX(0deg) translateZ(0)`;
      });
    });

    // Particle Generator
    function createParticle() {
      if (particlesContainer.childElementCount > 20) return; // Cap at 20 for performance
      
      const particle = document.createElement('div');
      particle.classList.add('ai-particle');
      
      const size = Math.random() * 4 + 2;
      const startX = Math.random() * 100;
      const startY = 90 + Math.random() * 10;
      const duration = Math.random() * 5 + 5;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${startX}%`;
      particle.style.top = `${startY}%`;
      particle.style.animationDuration = `${duration}s`;
      
      particlesContainer.appendChild(particle);
      
      setTimeout(() => {
        if(particle.parentNode) particle.remove();
      }, duration * 1000);
    }
    
    // Spawn particles continuously
    setInterval(createParticle, 500);
  }

  // Scroll Reveal Animation Logic
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: Stop observing once revealed
        // observer.unobserve(entry.target); 
      }
    });
  };

  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Trigger reveal for elements already in viewport on load
  setTimeout(() => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('active');
      }
    });
  }, 100);

  // Interactive Eye Anatomy Logic
  const anatomyParts = document.querySelectorAll('.anatomy-part');
  const anatomyCards = document.querySelectorAll('.anatomy-card');

  function activateAnatomy(partName) {
    anatomyParts.forEach(p => p.classList.remove('active'));
    anatomyCards.forEach(c => c.classList.remove('active'));

    if (partName) {
      document.querySelector(`.anatomy-part[data-part="${partName}"]`)?.classList.add('active');
      document.querySelector(`.anatomy-card[data-part="${partName}"]`)?.classList.add('active');
    }
  }

  anatomyParts.forEach(part => {
    part.addEventListener('mouseenter', () => activateAnatomy(part.dataset.part));
    part.addEventListener('mouseleave', () => activateAnatomy(null));
  });

  anatomyCards.forEach(card => {
    card.addEventListener('mouseenter', () => activateAnatomy(card.dataset.part));
    card.addEventListener('mouseleave', () => activateAnatomy(null));
  });

});
