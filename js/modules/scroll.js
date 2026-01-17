// Scroll navigation module
const Scroll = {
    init() {
        this.setupScrollHandlers();
    },

    setupScrollHandlers() {
        $(".hello").click(() => {
            $(".container").scrollTo($('.hero').parent(), 800, { easing: 'swing' });
        });

        $(".scroll").click(() => {
            $(".container").scrollTo($('.about').parent(), 800, { easing: 'swing' });
        });

        $(".about").click(() => {
            $(".container").scrollTo($('.case-studies').parent(), 800, { easing: 'swing' });
        });
    }
};
