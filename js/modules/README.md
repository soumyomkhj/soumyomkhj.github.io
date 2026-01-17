# JavaScript Modules

Modular JavaScript architecture for the portfolio site.

## Module Structure

- `componentLoader.js` - Utility for loading HTML components
- `preloader.js` - Preloader functionality
- `darkMode.js` - Dark mode toggle
- `cursor.js` - Custom cursor interactions
- `sidebar.js` - Sidebar navigation
- `projects.js` - Project listing and rendering
- `scroll.js` - Scroll navigation handlers
- `fullpage.js` - Fullpage toggle functionality

## Usage

Load all modules via `main-modular.js`:

```html
<script src="js/modules/componentLoader.js"></script>
<script src="js/modules/preloader.js"></script>
<script src="js/modules/darkMode.js"></script>
<script src="js/modules/cursor.js"></script>
<script src="js/modules/sidebar.js"></script>
<script src="js/modules/projects.js"></script>
<script src="js/modules/scroll.js"></script>
<script src="js/modules/fullpage.js"></script>
<script src="js/main-modular.js"></script>
```

## Architecture

Each module is self-contained and exports a single object with an `init()` method. Modules can interact with each other through their global namespace.
