// Fullpage toggle module
const Fullpage = {
    init() {
        $(".fullpage").click(() => {
            $(".fullpage").toggleClass("fulldisplay");
            Cursor.setContent("");
            Cursor.shrink();
        });
    }
};
