// Main entry point - initializes all modules
// Load order matters: modules must be loaded before this file
$(document).ready(() => {
    // Initialize image loader first
    if (typeof ImageLoader !== 'undefined') {
        ImageLoader.init();
    }

    // Initialize preloader (will wait for images)
    Preloader.init();

    // Initialize other modules
    DarkMode.init();
    Cursor.init();

    // Projects must initialize before Sidebar (needs project count)
    Projects.init();

    Scroll.init();
    Fullpage.init();

    // Sidebar needs project count
    const sectionCount = Projects.list.length + 3;
    Sidebar.init(sectionCount);

    // Initialize education cards navigation
    Education.init();
});
