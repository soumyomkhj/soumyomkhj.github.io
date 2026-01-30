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
        // Only wait for the hero image (interaction.svg) - others can load later
        const heroImage = this.criticalImages[0]; // interaction.svg

        const heroPromise = new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(heroImage);
            img.onerror = () => resolve(heroImage);
            img.src = heroImage;
            // Shorter timeout for hero image
            setTimeout(() => resolve(heroImage), 2000);
        });

        // Trigger hero animation
        $('.hero-anim').addClass("text-clip");
        // Load other images in parallel but don't wait for them
        this.criticalImages.slice(1).forEach(src => {
            const img = new Image();
            img.src = src;
        });

        // Hide preloader as soon as hero image loads or after 3.5s min
        Promise.race([
            heroPromise,
            new Promise(resolve => setTimeout(resolve, 3500))
        ]).then(() => {
            setTimeout(() => {
                this.hidePreloader();
            }, 500);
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

            preloader.style.transition = 'opacity 0.7s ease-out, visibility 0s linear 0.9s';
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000);
        }

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
