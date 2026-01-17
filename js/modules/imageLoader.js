// Image loader module - prevents jagged loading
const ImageLoader = {
    init() {
        this.setupImageFadeIn();
        this.preloadCriticalImages();
    },

    setupImageFadeIn() {
        // Fade in images once loaded
        const images = document.querySelectorAll('img[loading="eager"]');
        images.forEach(img => {
            if (img.complete) {
                img.style.opacity = '1';
            } else {
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
                img.addEventListener('error', function() {
                    this.style.opacity = '1'; // Show even if error
                });
            }
        });
    },

    preloadCriticalImages() {
        // Ensure images are loaded in cache
        const criticalImages = [
            'img/interaction.svg',
            'img/nextlevel.png',
            'img/elsa.png',
            'img/favicon.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = src.endsWith('.svg') ? 'image/svg+xml' : 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
};
