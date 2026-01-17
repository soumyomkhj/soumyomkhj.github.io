// Cursor/follower module
const Cursor = {
    init() {
        this.setupMouseTracking();
        this.setupHoverEffects();
    },

    setupMouseTracking() {
        $(document).on('mousemove', (event) => {
            $('.follower').css({
                left: event.clientX,
                top: event.clientY,
            });
            $('.follower_border').css({
                left: event.clientX,
                top: event.clientY,
            });
        });
    },

    setupHoverEffects() {
        $(".hover").hover(
            () => this.expand("100%"),
            () => this.shrink()
        );

        $(".scroll").hover(
            () => {
                $(this).css('opacity', '0');
                this.setContent("<p>scroll</p>");
                this.expand("100%");
            },
            () => {
                $(this).css('opacity', '100%');
                this.setContent("");
                this.shrink();
            }
        );

        $(".img, .case-card").hover(
            () => {
                $(".project > button").css("opacity", "0");
                this.setContent("<p>VIEW</p>");
                this.expand("100%");
            },
            () => {
                $(".project > button").css("opacity", "100%");
                this.setContent("");
                this.shrink();
            }
        );

        $(".hello").hover(
            () => {
                $(".project > button").css("opacity", "0");
                this.setContent('<p class="hello-anim"></p>');
                this.expand("100%");
            },
            () => {
                $(".project > button").css("opacity", "100%");
                this.setContent("");
                this.shrink();
            }
        );

        $(".about").hover(
            () => {
                $(".project > button").css("opacity", "0");
                const imgSrc = (typeof DarkMode !== 'undefined' && DarkMode.dark === -1)
                    ? '<img class="image-hover" src="img/favicon.png">'
                    : '<img class="image-hover invert" src="img/favicon.png">';
                this.setContent(imgSrc);
                this.expand("150px");
            },
            () => {
                $(".project > button").css("opacity", "100%");
                this.setContent("");
                this.shrink();
            }
        );

        $(".home").hover(
            () => {
                $(".project > button").css("opacity", "0");
                this.setContent("<p>BACK</p>");
                this.expand("100%");
            },
            () => {
                $(".project > button").css("opacity", "100%");
                this.setContent("");
                this.shrink();
            }
        );

        $(".fullpage").hover(
            () => {
                this.setContent("<p>expand</p>");
                this.expand("100%");
                setTimeout(() => {
                    this.setContent("");
                    this.shrink();
                }, 3000);
            },
            () => {
                this.setContent("");
                this.shrink();
            }
        );

        $(".next, .nexts").hover(
            () => {
                $(".project > button").css("opacity", "0");
                this.setContent("<p>next</p>");
                this.expand("100%");
            },
            () => {
                $(".project > button").css("opacity", "100%");
                this.setContent("");
                this.shrink();
            }
        );

        $(".prev, .prevs").hover(
            () => {
                $(".project > button").css("opacity", "0");
                this.setContent("<p>previous</p>");
                this.expand("100%");
            },
            () => {
                $(".project > button").css("opacity", "100%");
                this.setContent("");
                this.shrink();
            }
        );

        $(".frame").hover(
            () => $(".follower").css("opacity", "0% !important"),
            () => $(".follower").css("opacity", "60%")
        );
    },

    expand(size) {
        $(".follower").css({
            "width": size,
            "height": size,
            "opacity": "100%",
            "z-index": "0"
        });
    },

    shrink() {
        $(".follower").css({
            "width": "20px",
            "height": "20px",
            "opacity": "60%",
            "z-index": "100"
        });
    },

    setContent(html) {
        $(".follower").html(html);
    }
};
