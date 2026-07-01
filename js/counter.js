/**
 * Animated Counters for Stats Section
 */

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200; // The lower the slower

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        // Lower inc to slow and higher to fast
        const inc = target / speed;

        // Check if target is reached
        if (count < target) {
          // Add inc to count and output in counter
          counter.innerText = Math.ceil(count + inc);
          // Call function every ms
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = target + (target > 100 ? '+' : '');
        }
      };
      
      updateCount();
    });
  }

  // Use Intersection Observer to start animation when visible
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
      } else {
        // Reset counters to 0 when scrolled out of view so it animates again
        counters.forEach(counter => {
          counter.innerText = '0';
        });
      }
    });
  }, observerOptions);

  const statsSection = document.querySelector('.stats-container');
  if(statsSection) {
      observer.observe(statsSection);
  }
});
