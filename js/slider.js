/**
 * Slider Functionality for Mobile Auto-Scroll
 */
document.addEventListener('DOMContentLoaded', () => {
    // Find containers that need horizontal scrolling (only hero-stats-row as requested)
    const autoScrollElements = document.querySelectorAll('.hero-stats-row');
    
    autoScrollElements.forEach(container => {
        let isInteraction = false;
        let animationFrameId;

        // Disable scroll snapping so continuous pixel-by-pixel scrolling doesn't glitch
        container.style.scrollSnapType = 'none';

        const continuousScroll = () => {
            if (window.innerWidth <= 768 && !isInteraction) {
                container.scrollLeft += 1; // Scroll 1px per frame

                // If reached the end, reset scroll position instantly to loop
                if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1) {
                    container.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(continuousScroll);
        };

        const startAutoScroll = () => {
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(continuousScroll);
            }
        };

        // Pause on touch or hover
        container.addEventListener('touchstart', () => { isInteraction = true; }, {passive: true});
        container.addEventListener('touchend', () => { isInteraction = false; }, {passive: true});
        
        container.addEventListener('mouseenter', () => { isInteraction = true; });
        container.addEventListener('mouseleave', () => { isInteraction = false; });

        startAutoScroll();
    });
});
