// Sidebar navigation module
const Sidebar = {
    init(sectionCount) {
        this.createSidebar(sectionCount);
        this.setupScrollTracking(sectionCount);
        this.setupClickHandlers();
    },

    createSidebar(sectionCount) {
        for (let i = 0; i < sectionCount; i++) {
            $('.sidebar').append('<div class="sidebar_child"></div>');
        }
        $('.sidebar_child').css('height', (20 / sectionCount) + 'vh');
        $(".sidebar_child").eq(0).addClass("bufferd_bar");
    },

    setupScrollTracking(sectionCount) {
        $(".container").scroll(() => {
            const totH = $("section:eq(1)").height();
            const curScr = $(".container").scrollTop();
            const n = Math.round(curScr / totH);

            $(".sidebar_child").eq(n).addClass("bufferd_bar");
            for (let index = 0; index < sectionCount; index++) {
                if (index !== n) {
                    $(".sidebar_child").eq(index).removeClass("bufferd_bar");
                }
            }
        });
    },

    setupClickHandlers() {
        $(".sidebar_child").click(function() {
            const target = $("section").eq($(this).index(".sidebar_child"));
            $(".container").scrollTo(target, 800, { easing: 'swing' });
        });
    }
};
