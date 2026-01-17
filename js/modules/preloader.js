// Preloader module
const Preloader = {
    init() {
        this.hidePreloader();
        window.addEventListener('pageshow', () => this.hidePreloader());
    },

    hidePreloader() {
        $('#status').fadeOut();
        $('#preloader').delay(800).fadeOut('slow');
        $('.hero-anim').delay(9000).addClass("text-clip");
    },

    showPreloader() {
        $('#status').fadeIn();
        $('#preloader').delay(500).fadeIn('slow');
    }
};
