# Modular Architecture

This document describes the modular architecture of the portfolio project.

## Structure

```
├── components/          # Reusable HTML components
│   ├── nav.html
│   ├── nav-project.html
│   ├── preloader.html
│   └── cursor.html
├── js/
│   ├── modules/        # JavaScript modules
│   │   ├── componentLoader.js
│   │   ├── preloader.js
│   │   ├── darkMode.js
│   │   ├── cursor.js
│   │   ├── sidebar.js
│   │   ├── projects.js
│   │   ├── scroll.js
│   │   └── fullpage.js
│   ├── main.js         # Legacy monolithic version
│   └── main-modular.js # New modular entry point
└── scss/
    └── style.css       # Compiled CSS (source in SCSS)
```

## Component System

HTML components are stored in `components/` and can be loaded using the ComponentLoader:

```javascript
ComponentLoader.load(selector, path)
```

## Module System

JavaScript is split into focused modules, each handling a specific concern:

- **Preloader**: Loading screen management
- **DarkMode**: Theme switching
- **Cursor**: Custom cursor interactions
- **Sidebar**: Navigation sidebar
- **Projects**: Project listing and rendering
- **Scroll**: Smooth scroll navigation
- **Fullpage**: Fullscreen toggle

## Migration Path

1. Components are available but can be used inline (current approach)
2. JavaScript modules are ready to use via `main-modular.js`
3. Legacy `main.js` is kept for backward compatibility
4. Gradually migrate pages to use modular approach

## Benefits

- **Maintainability**: Each module has a single responsibility
- **Reusability**: Components can be shared across pages
- **Testability**: Modules can be tested independently
- **Simplicity**: No build tools required, works with plain HTML/JS
