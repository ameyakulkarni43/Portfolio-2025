document.addEventListener("DOMContentLoaded", () => {

    // --- 1. FADE UP ANIMATION OBSERVER ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });


    // --- 2. CUSTOM SLOW SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Stop default jump

            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Update Active State on Click
                document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
                this.classList.add('active');

                // Calculate Position
                const navOffset = 100; // Space to leave at top so title isn't hidden
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navOffset;

                // Custom Animation Loop
                const startPosition = window.pageYOffset;
                const distance = offsetPosition - startPosition;
                const duration = 600; // 600ms = 0.6 seconds (Adjust speed here)
                let start = null;

                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    
                    // Easing function (easeInOutCubic)
                    // Starts slow, speeds up, ends slow
                    const ease = progress / duration < 0.5
                        ? 4 * progress * progress * progress / (duration * duration * duration)
                        : 1 - Math.pow(-2 * progress / duration + 2, 3) / 2;

                    window.scrollTo(0, startPosition + (distance * ease));

                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                }
                window.requestAnimationFrame(step);
            }
        });
    });
});
