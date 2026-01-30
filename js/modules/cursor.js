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
        // Working: .scroll, .hello, .about (keep as is)
        $(".hover").hover(
            () => this.expand("150px"),
            () => this.shrink()
        );

        // .scroll hover handlers
        $(".scroll").each(function() {
            $(this).hover(
                () => {
                    $(this).css('opacity', '0');
                    Cursor.setContent("<p>scroll</p>");
                    Cursor.expand("150px");
                },
                () => {
                    $(this).css('opacity', '100%');
                    Cursor.setContent("");
                    Cursor.shrink();
                }
            );
        });

        // hello hover handlers
        $(".hello").each(function() {
            $(this).hover(
                () => {
                    $(".project > button").css("opacity", "0");
                    Cursor.setContent('<p class="hello-anim"></p>');
                    Cursor.expand("150px");
                },
                () => {
                    $(".project > button").css("opacity", "100%");
                    Cursor.setContent("");
                    Cursor.shrink();
                }
            );
        });

        // about hover handlers
        $(".about").each(function() {
            $(this).hover(
                () => {
                    $(".project > button").css("opacity", "0");
                    const imgSrc = (typeof DarkMode !== 'undefined' && DarkMode.dark === -1)
                        ? '<img class="image-hover" src="img/favicon.png">'
                        : '<img class="image-hover invert" src="img/favicon.png">';
                    Cursor.setContent(imgSrc);
                    Cursor.expand("150px");
                },
                () => {
                    $(".project > button").css("opacity", "100%");
                    Cursor.setContent("");
                    Cursor.shrink();
                }
            );
        });

        // Fix for case-card, home, fullpage, next, prev, frame, etc
        // Need to use delegated events or proper function context

        // case-card hover handlers
        $(".case-card").each(function() {
            $(this).hover(
                () => {
                    $(this).css("opacity", "0");
                    Cursor.setContent("<p>VIEW</p>");
                    Cursor.expand("150px");
                },
                () => {
                    $(".project > button").css("opacity", "100%");
                    Cursor.setContent("");
                    Cursor.shrink();
                }
            );
        });

        // home hover handlers
        $(".home").each(function() {
            $(this).hover(
                () => {
                    $(".project > button").css("opacity", "0");
                    Cursor.setContent("<p>BACK</p>");
                    Cursor.expand("150px");
                },
                () => {
                    $(".project > button").css("opacity", "100%");
                    Cursor.setContent("");
                    Cursor.shrink();
                }
            );
        });

        // fullpage hover handlers
        $(".fullpage").each(function() {
            $(this).hover(
                () => {
                    Cursor.setContent("<p>expand</p>");
                    Cursor.expand("150px");
                    setTimeout(() => {
                        Cursor.setContent("");
                        Cursor.shrink();
                    }, 3000);
                },
                () => {
                    Cursor.setContent("");
                    Cursor.shrink();
                }
            );
        });

        // next/nexts hover handlers
        $(".next, .nexts").each(function() {
            $(this).hover(
                () => {
                    $(".project > button").css("opacity", "0");
                    Cursor.setContent("<p>next</p>");
                    Cursor.expand("150px");
                },
                () => {
                    $(".project > button").css("opacity", "100%");
                    Cursor.setContent("");
                    Cursor.shrink();
                }
            );
        });

        // prev/prevs hover handlers
        $(".prev, .prevs").each(function() {
            $(this).hover(
                () => {
                    $(".project > button").css("opacity", "0");
                    Cursor.setContent("<p>previous</p>");
                    Cursor.expand("150px");
                },
                () => {
                    $(".project > button").css("opacity", "100%");
                    Cursor.setContent("");
                    Cursor.shrink();
                }
            );
        });

        // frame hover handlers
        $(".frame").each(function() {
            $(this).hover(
                () => $(".follower").css("opacity", "0% !important"),
                () => $(".follower").css("opacity", "60%")
            );
        });

    },

    expand(size) {
        $(".follower").css({
            "width": size,
            "height": size,
            "opacity": "100%",
            "z-index": "999"
        });
    },

    shrink() {
        $(".follower").css({
            "width": "20px",
            "height": "20px",
            "opacity": "60%",
            "z-index": "999"
        });
    },

    setContent(html) {
        $(".follower").html(html);
    }
};
