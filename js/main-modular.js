// Main entry point - initializes all modules
// Load order matters: modules must be loaded before this file
$(document).ready(() => {
    // Initialize modules in dependency order
    Preloader.init();
    DarkMode.init();
    Cursor.init();

    // Projects must initialize before Sidebar (needs project count)
    Projects.init();

    Scroll.init();
    Fullpage.init();

    // Sidebar needs project count
    const sectionCount = Projects.list.length + 3;
    Sidebar.init(sectionCount);
});

// Also initialize on window load for preloader
$(window).on('load', () => {
    Preloader.init();
});
