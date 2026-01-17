// Dark mode module
const DarkMode = {
    dark: 1,

    init() {
        $("#dark").click(() => this.toggle());
    },

    toggle() {
        this.dark = -this.dark;
        $("html").toggleClass("invert");
        $("img").toggleClass("invert");
        $(".img").toggleClass("invert");
        $("iframe").toggleClass("invert");
        $(".image-hover").toggleClass("invert");
        $(".f-item").toggleClass("invert");
        $("#dark").toggleClass("darkicon");
        $(".inter-d").toggleClass("invert");
        $(".follower").css({
            "width": "100px",
            "height": "100px",
        });
    }
};
