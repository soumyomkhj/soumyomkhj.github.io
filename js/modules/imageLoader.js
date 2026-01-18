// Image loader module - prevents jagged loading
const ImageLoader = {
    init() {
        this.setupImageFadeIn();
        this.preloadCriticalImages();
    },

    setupImageFadeIn() {
        // Handle all images with opacity fade-in (both eager and lazy)
        const setupImage = (img) => {
            if (img.complete && img.naturalHeight !== 0) {
                img.style.opacity = '1';
            } else {
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
                img.addEventListener('error', function() {
                    this.style.opacity = '1'; // Show even if error
                });
            }
        };

        // Handle eager images immediately
        const eagerImages = document.querySelectorAll('img[loading="eager"]');
        eagerImages.forEach(setupImage);

        // Handle lazy images with Intersection Observer
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        if (lazyImages.length > 0 && 'IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        setupImage(img);
                        observer.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            lazyImages.forEach(setupImage);
        }
    },

    preloadCriticalImages() {
        // Only preload the hero image - others can load lazily
        const heroImage = 'img/interaction.svg';
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.type = 'image/svg+xml';
        link.href = heroImage;
        document.head.appendChild(link);
    }
};
