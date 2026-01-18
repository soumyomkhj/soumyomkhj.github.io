# JavaScript Modules

Modular JavaScript architecture for the portfolio site.

## Module Structure

- `imageLoader.js` - Image loading and fade-in handling
- `preloader.js` - Preloader functionality
- `darkMode.js` - Dark mode toggle
- `cursor.js` - Custom cursor interactions
- `caseStudies.js` - Case studies rendering (tokenized)
- `projects.js` - Projects rendering (tokenized)
- `testimonials.js` - Testimonials rendering (tokenized)
- `detailPage.js` - Auto-generated detail pages for projects/case studies
- `sidebar.js` - Sidebar navigation
- `scroll.js` - Scroll navigation handlers
- `fullpage.js` - Fullpage toggle functionality
- `education.js` - Education/testimonials navigation

## Usage

Load all modules via `main-modular.js`:

```html
<script src="js/modules/imageLoader.js" defer></script>
<script src="js/modules/preloader.js" defer></script>
<script src="js/modules/darkMode.js" defer></script>
<script src="js/modules/cursor.js" defer></script>
<script src="js/modules/projects.js" defer></script>
<script src="js/modules/caseStudies.js" defer></script>
<script src="js/modules/testimonials.js" defer></script>
<script src="js/modules/scroll.js" defer></script>
<script src="js/modules/sidebar.js" defer></script>
<script src="js/modules/fullpage.js" defer></script>
<script src="js/modules/education.js" defer></script>
<script src="js/main-modular.js" defer></script>
```

## Architecture

Each module is self-contained and exports a single object with an `init()` method. Modules can interact with each other through their global namespace.
