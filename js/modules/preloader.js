// Preloader module - waits for first 4 critical images
const Preloader = {
    isHidden: false,
    imagePromises: [],
    criticalImages: [
        'img/interaction.svg',
        'img/nextlevel.png',
        'img/elsa.png',
        'img/favicon.png'
    ],

    init() {
        if (this.isHidden) return;

        // Hide on pageshow if restored from cache
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                this.hideImmediately();
            }
        });

        // Start loading critical images
        this.loadCriticalImages();
    },

    loadCriticalImages() {
        const imagePromises = this.criticalImages.map(src => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(src);
                img.onerror = () => resolve(src); // Continue even if one fails
                img.src = src;

                // Timeout after 5 seconds
                setTimeout(() => resolve(src), 5000);
            });
        });

        Promise.all(imagePromises).then(() => {
            // Wait a bit for smooth transition
            setTimeout(() => {
                this.hidePreloader();
            }, 300);
        });

        // Fallback: hide after max 6 seconds
        setTimeout(() => {
            if (!this.isHidden) {
                this.hidePreloader();
            }
        }, 6000);
    },

    hidePreloader() {
        if (this.isHidden) return;
        this.isHidden = true;

        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.transition = 'opacity 0.5s ease-out, visibility 0s linear 0.5s';
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';

            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }

        // Trigger hero animation
        setTimeout(() => {
            $('.hero-anim').addClass("text-clip");
        }, 100);
    },

    hideImmediately() {
        if (this.isHidden) return;
        this.isHidden = true;

        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.display = 'none';
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }
    },

    showPreloader() {
        if (this.isHidden) {
            this.isHidden = false;
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.display = 'flex';
                preloader.style.opacity = '1';
                preloader.style.visibility = 'visible';
            }
        }
    }
};
