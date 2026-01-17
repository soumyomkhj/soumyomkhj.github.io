# Technical Requirements Document (TRD)
## Soumyo's Portfolio Website

**Version:** 1.0
**Date:** 2024
**Author:** Technical Team
**Status:** Draft

---

## 1. Executive Summary

This TRD outlines the technical architecture, implementation details, and technical specifications for Soumyo's portfolio website. The document covers current technical stack, architecture decisions, performance requirements, security considerations, and recommendations for improvements.

---

## 2. Technical Overview

### 2.1 Current Architecture

**Architecture Type:** Static Single-Page Application (SPA-like with multi-page support)

**Hosting:** GitHub Pages (static site hosting)
**Domain:** soumyomkhj.github.io
**Protocol:** HTTPS (provided by GitHub Pages)

**Deployment Model:**
- Source code in GitHub repository
- Automatic deployment via GitHub Pages
- No build pipeline (manual SCSS compilation)
- Static asset delivery via GitHub CDN

### 2.2 Technology Stack

#### Frontend Technologies
```
HTML5
├── Semantic HTML5 elements
├── Meta tags (viewport, charset, description)
└── Accessibility attributes (minimal)

CSS3 (SCSS)
├── Preprocessor: SCSS
├── Modular structure (_navbar.scss, _card.scss, etc.)
├── Variables and mixins
├── Media queries for responsive design
└── CSS animations and transitions

JavaScript
├── jQuery 3.6.0 (CDN)
├── jQuery ScrollTo plugin
└── Vanilla JavaScript (ES5/ES6)
```

#### External Dependencies
- **Google Fonts:** Krona One, Inter
- **jQuery:** v3.6.0 from ajax.googleapis.com
- **jQuery ScrollTo:** Local file (js/jquery.scrollTo.min.js)
- **Google Analytics:** Currently commented out (G-8SQLGN8BW5)

#### Asset Types
- **Images:** PNG, JPG, SVG (303+ files in img/ directory)
- **Videos:** MP4 (intro videos, project videos)
- **Fonts:** Web fonts via Google Fonts
- **Icons:** Inline SVG in HTML

---

## 3. Current Implementation Analysis

### 3.1 File Structure

```
soumyomkhj.github.io/
├── index.html                    # Main homepage
├── [project].html                # Individual project pages (11+ files)
├── scss/
│   ├── style.scss               # Main stylesheet
│   ├── _navbar.scss             # Navigation styles
│   ├── _card.scss               # Project card styles
│   ├── _dark.scss               # Dark mode styles
│   ├── _icons.scss              # Icon styles
│   ├── _normalize.scss          # CSS reset
│   ├── _project.scss            # Project page styles
│   └── style.css                # Compiled CSS
├── js/
│   ├── main.js                  # Main JavaScript logic
│   └── jquery.scrollTo.min.js   # Scroll plugin
├── img/                         # Image assets (300+ files)
│   ├── [project]/               # Project-specific images
│   └── [assets].png/jpg/svg     # General assets
└── SoumyoResume.pdf            # Resume document
```

### 3.2 Key Features Implementation

#### 3.2.1 Custom Cursor System
**Technology:** Vanilla JavaScript + CSS
**Implementation:**
- Two cursor elements: `.follower` and `.follower_border`
- Follows mouse movement via `mousemove` event listener
- Dynamic sizing and content based on hover state
- Disabled on mobile (< 1080px)

**Code Location:** `js/main.js` (lines 114-126, 92-109)

**Technical Notes:**
- Uses `fixed` positioning with `transform: translate(-50%, -50%)`
- Smooth transitions via CSS (`transition: width 200ms ease-out`)
- Context-aware cursor content (VIEW, BACK, etc.)

**Recommendation:**
- Consider using CSS custom properties for cursor size
- Add `will-change: transform` for better performance
- Implement requestAnimationFrame for smoother animation

#### 3.2.2 Dark/Light Mode Toggle
**Technology:** jQuery + CSS classes
**Implementation:**
- Toggle button with `#dark` ID
- Adds/removes `.invert` class to multiple elements
- Theme stored in `dark` variable (not persisted)

**Code Location:** `js/main.js` (lines 75-89)

**Technical Notes:**
- Uses `mix-blend-mode: difference` for inversion effect
- Theme preference not saved (lost on page reload)
- Multiple selectors updated simultaneously

**Recommendation:**
- Store preference in `localStorage`
- Use CSS custom properties for theme colors
- Implement `prefers-color-scheme` media query for system preference
- Consider using a CSS variable system instead of class toggling

#### 3.2.3 Preloader System
**Technology:** jQuery + CSS animations
**Implementation:**
- Preloader div with animated circles
- Animated text via CSS `::after` pseudo-element
- Fades out after page load with 800ms delay

**Code Location:** `js/main.js` (lines 2-8, 11-14)

**Technical Notes:**
- Uses jQuery `.fadeOut()` method
- Animated text via `@keyframes gyan` in SCSS
- Hero animation triggers 9000ms after load

**Recommendation:**
- Use `window.addEventListener('load')` instead of jQuery for better performance
- Consider using `IntersectionObserver` for scroll animations instead of delays
- Implement progressive loading for better perceived performance

#### 3.2.4 Scroll Animations
**Technology:** jQuery ScrollTo + CSS animations
**Implementation:**
- Smooth scrolling via jQuery ScrollTo plugin
- Scroll-triggered animations via CSS `animation-timeline: view()`
- Sidebar indicators update based on scroll position

**Code Location:** `js/main.js` (lines 58-72, 129-174)

**Technical Notes:**
- Uses scroll event listener (can impact performance)
- Calculates current section based on scroll position
- CSS scroll-driven animations (experimental feature)

**Recommendation:**
- Implement scroll throttling/debouncing
- Use `IntersectionObserver` API instead of scroll events
- Add CSS scroll snap for better UX
- Consider using a scroll library (e.g., Lenis) for smoother scrolling

#### 3.2.5 Project Slideshow
**Technology:** Vanilla JavaScript + CSS
**Implementation:**
- Image slideshow in project detail pages
- Keyboard navigation (arrow keys)
- Click-based navigation

**Code Location:** Individual project HTML files (e.g., `nextlevel.html`)

**Technical Notes:**
- Manual image show/hide via `display: block/none`
- Event listeners for keyboard and click events
- No transition effects between slides

**Recommendation:**
- Implement CSS transitions for smooth slide changes
- Add swipe gestures for mobile
- Lazy load images that aren't visible
- Add loading states for images
- Consider using a lightweight slider library (e.g., Swiper.js)

#### 3.2.6 Dynamic Project Loading
**Technology:** JavaScript + DOM manipulation
**Implementation:**
- Projects loaded dynamically from array in `main.js`
- Injected into DOM via jQuery `.after()` method
- Reverse chronological order

**Code Location:** `js/main.js` (lines 18-39)

**Technical Notes:**
- Project data hardcoded in JavaScript
- No external data source
- Background images defined in SCSS

**Recommendation:**
- Move project data to JSON file for easier management
- Implement a simple CMS or build script for content updates
- Consider using a static site generator (e.g., 11ty, Jekyll)

---

## 4. Technical Requirements

### 4.1 Performance Requirements

#### 4.1.1 Page Load Performance
**Target Metrics:**
- **Smooth Performance:** No lag or jank during normal use on both Mobile and Desktop
- **First Contentful Paint (FCP):** < 1.5s (good to have)
- **Largest Contentful Paint (LCP):** < 2.5s (good to have)
- **Time to Interactive (TTI):** < 3.8s (good to have)
- **Total Blocking Time (TBT):** < 300ms (good to have)
- **Cumulative Layout Shift (CLS):** < 0.1 (good to have)

**Current Issues:**
- Large image files not optimized (300+ images)
- No image lazy loading
- jQuery loaded from CDN (adds latency)
- No resource preloading
- Preloader adds artificial delay

**Recommendations:**
1. **Image Optimization:**
   - Convert images to WebP format with fallbacks
   - Implement responsive images with `srcset`
   - Add lazy loading with `loading="lazy"` attribute
   - Use image CDN (Cloudinary, Imgix) for on-the-fly optimization
   - Compress images (TinyPNG, ImageOptim)

2. **JavaScript Optimization:**
   - Remove jQuery dependency (migrate to vanilla JS)
   - Code splitting for project pages
   - Defer non-critical JavaScript
   - Minify and compress JavaScript files

3. **CSS Optimization:**
   - Remove unused CSS
   - Inline critical CSS
   - Defer non-critical CSS
   - Use CSS containment for isolated sections

4. **Resource Loading:**
   - Preload critical resources (`<link rel="preload">`)
   - Prefetch likely next pages (`<link rel="prefetch">`)
   - Use `font-display: swap` for web fonts
   - Self-host Google Fonts for better performance

#### 4.1.2 Runtime Performance
**Target Metrics:**
- **60 FPS** for all animations
- **< 16ms** per frame for smooth animations
- **< 100ms** response time for user interactions

**Recommendations:**
1. Use `requestAnimationFrame` for animations
2. Implement CSS `will-change` property judiciously
3. Use `transform` and `opacity` for animations (GPU-accelerated)
4. Throttle/debounce scroll and resize events
5. Use `IntersectionObserver` instead of scroll listeners

### 4.2 Browser Compatibility

#### 4.2.1 Supported Browsers

**Desktop:**
- Chrome (latest 2 versions) - ✅
- Firefox (latest 2 versions) - ✅
- Safari (latest 2 versions) - ⚠️ (test CSS scroll-driven animations)
- Edge (latest 2 versions) - ✅

**Mobile:**
- iOS Safari (latest 2 versions) - ⚠️ (test touch interactions)
- Chrome Mobile (latest 2 versions) - ✅
- Samsung Internet (latest) - ⚠️ (test)

**Not Supported:**
- Internet Explorer 11 - ❌
- Legacy browsers without ES6 support

#### 4.2.2 Feature Support

**CSS Features Used:**
- CSS Variables (custom properties) - ✅
- CSS Grid - ✅
- Flexbox - ✅
- CSS Animations - ✅
- `mix-blend-mode` - ⚠️ (IE11 not supported, but not required)
- `animation-timeline: view()` - ⚠️ (experimental, Chrome only)

**JavaScript Features Used:**
- ES6+ syntax - ✅ (with potential polyfills needed)
- `addEventListener` - ✅
- `querySelector` - ✅ (IE8+)
- Arrow functions - ⚠️ (IE11 not supported)

**Recommendations:**
1. Add polyfills for older browsers if needed
2. Use feature detection (`Modernizr` or custom checks)
3. Provide fallbacks for experimental features
4. Test CSS scroll-driven animations with fallbacks

### 4.3 Responsive Design

#### 4.3.1 Breakpoints

**Platform Support:** Both Mobile and Desktop are critical - ensure seamless experience on both platforms.

**Current Breakpoint:**
```scss
@media screen and (max-width: 1080px) {
  // Mobile styles
}
```

**Recommendations (Good to Have):**
Implement multiple breakpoints for better control:
```scss
// Mobile
@media (max-width: 768px) { }

// Tablet
@media (min-width: 769px) and (max-width: 1024px) { }

// Desktop
@media (min-width: 1025px) { }
```

**Note:** Current single breakpoint works well for Mobile vs Desktop distinction.

#### 4.3.2 Mobile Optimizations

**Platform Priority:** Both Mobile and Desktop are equally important - optimize for both platforms.

**Current Implementation:**
- Custom cursor disabled on mobile (desktop only)
- Responsive layout adjustments
- Touch-friendly interactions on mobile
- Mouse/cursor interactions on desktop

**Recommendations:**
1. **Touch Targets (Mobile):**
   - Minimum 44x44px for all interactive elements
   - Adequate spacing between touch targets
   - Remove hover-only interactions

2. **Performance (Both Platforms):**
   - Smooth performance during normal use (no lag or jank)
   - Reduce heavy animations on mobile if needed
   - Optimize images appropriately for each platform
   - Implement swipe gestures for slideshow (mobile)

3. **Navigation:**
   - Consistent navigation experience across platforms
   - Sticky navigation bar (good to have)
   - Platform-specific optimizations where needed

### 4.4 Accessibility (A11y)

#### 4.4.1 Current State
- **Semantic HTML:** Partial (needs improvement)
- **ARIA Labels:** Missing
- **Keyboard Navigation:** Partial (cursor interactions may be problematic)
- **Screen Reader Support:** Limited
- **Color Contrast:** Needs verification

#### 4.4.2 WCAG 2.1 AA Compliance Requirements

**Level A Requirements:**
1. ✅ Alternative text for images (implement)
2. ✅ Keyboard accessible (improve)
3. ✅ No keyboard traps
4. ✅ Proper heading hierarchy
5. ✅ Form labels (if forms added)

**Level AA Requirements:**
1. ⚠️ Color contrast ratio 4.5:1 (verify)
2. ⚠️ Text resizable up to 200% without loss of functionality
3. ⚠️ Focus indicators visible
4. ⚠️ Consistent navigation
5. ⚠️ Error identification (if forms added)

**Recommendations:**
1. **Semantic HTML:**
   ```html
   <!-- Current -->
   <div class="hero">...</div>

   <!-- Recommended -->
   <header class="hero" role="banner">...</header>
   ```

2. **ARIA Labels:**
   ```html
   <button id="dark" aria-label="Toggle dark mode">
   <nav aria-label="Main navigation">
   ```

3. **Keyboard Navigation:**
   - Ensure all interactive elements are keyboard accessible
   - Add `tabindex` where needed
   - Remove custom cursor on keyboard navigation (detect keyboard usage)

4. **Focus Management:**
   ```css
   :focus-visible {
     outline: 2px solid currentColor;
     outline-offset: 2px;
   }
   ```

5. **Screen Reader:**
   - Add `aria-live` regions for dynamic content
   - Use `aria-label` for icon-only buttons
   - Provide skip links

6. **Color Contrast:**
   - Use tools like WAVE, axe DevTools
   - Ensure 4.5:1 for text, 3:1 for UI components
   - Don't rely solely on color for information

### 4.5 SEO Optimization

#### 4.5.1 Current State
- ✅ Basic meta tags (title, description)
- ❌ Missing Open Graph tags
- ❌ Missing Twitter Card tags
- ❌ Missing structured data (JSON-LD)
- ❌ No sitemap.xml
- ❌ No robots.txt

#### 4.5.2 SEO Requirements

**Meta Tags:**
```html
<!-- Current -->
<meta name="description" content="Interaction Designer...">

<!-- Recommended -->
<meta name="description" content="...">
<meta property="og:title" content="Soumyo's Portfolio | Senior Product Designer">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta property="og:url" content="https://soumyomkhj.github.io">
<meta name="twitter:card" content="summary_large_image">
```

**Structured Data (JSON-LD):**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Soumyoprabho Mukherjee",
  "jobTitle": "Senior Product Designer",
  "url": "https://soumyomkhj.github.io",
  "sameAs": [
    "https://www.behance.net/soumyomkhj",
    "https://github.com/soumyomkhj"
  ]
}
```

**Recommendations:**
1. Generate `sitemap.xml` for all pages
2. Create `robots.txt` for crawler directives
3. Add canonical URLs
4. Implement breadcrumb structured data for project pages
5. Add `hreflang` if multi-language support is needed

### 4.6 Security Requirements

#### 4.6.1 Current Security
- ✅ HTTPS enforced (GitHub Pages)
- ✅ No user input forms (reduces attack surface)
- ⚠️ External CDN dependencies (jQuery)
- ⚠️ No Content Security Policy (CSP)

#### 4.6.2 Security Recommendations

**Content Security Policy:**
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' https://ajax.googleapis.com;
               style-src 'self' https://fonts.googleapis.com;
               font-src 'self' https://fonts.gstatic.com;
               img-src 'self' data:;">
```

**Subresource Integrity:**
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        integrity="sha384-..."
        crossorigin="anonymous"></script>
```

**Security Headers:**
- Implement via GitHub Pages `_headers` file or meta tags
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

**External Dependencies:**
- Self-host jQuery if possible (better performance + security)
- Use SRI (Subresource Integrity) for CDN resources
- Regularly update dependencies

---

## 5. Technical Architecture Recommendations

### 5.1 Migration from jQuery to Vanilla JavaScript

**Current Dependency:** jQuery 3.6.0 (~30KB gzipped)

**Status:** ⏸️ **No immediate need for migration** - Current jQuery implementation works well and is stable. Migration can be considered in the future if needed.

**Benefits (Future Consideration):**
- Reduced bundle size
- Better performance
- Modern browser APIs
- No external dependency

**Migration Plan (Future):**
1. Replace jQuery selectors with `querySelector/querySelectorAll`
2. Replace jQuery events with `addEventListener`
3. Replace jQuery animations with CSS animations + `classList`
4. Replace jQuery AJAX with `fetch` API (if needed)
5. Replace jQuery plugins with vanilla alternatives

**Estimated Effort:** 2-3 days (when decided to proceed)

### 5.2 Build System Implementation

**Current State:** Manual SCSS compilation

**Recommendation:** Implement build process

**Option 1: Simple Build (npm scripts)**
```json
{
  "scripts": {
    "sass": "sass scss:css --watch",
    "minify-css": "cssnano style.css style.min.css",
    "minify-js": "terser js/main.js -o js/main.min.js",
    "build": "npm run sass && npm run minify-css && npm run minify-js"
  }
}
```

**Option 2: Static Site Generator**
- **11ty (Eleventy):** Flexible, minimal
- **Jekyll:** GitHub Pages native support
- **Hugo:** Fast, Go-based

**Option 3: Module Bundler (for complex needs)**
- **Vite:** Fast, modern
- **Webpack:** Mature, extensive ecosystem
- **Parcel:** Zero-config

**Recommendation:** Start with Option 1, migrate to Option 2 if content management becomes complex.

### 5.3 Content Management Strategy

**Current State:** Hardcoded content in JavaScript and HTML

**Status:** CMS is good to have but not immediately required. Current hardcoded approach works for now.

**Recommendation:**
1. **Short-term:** Move project data to JSON file (good to have)
   ```json
   // projects.json
   {
     "projects": [
       {
         "class": "graphy",
         "title": "Graphy Website Redesign",
         "tags": ["Redesign", "UX Audit", "2023"],
         "url": "graphy.html"
       }
     ]
   }
   ```

2. **Medium-term (Future):** Use a headless CMS (Contentful, Sanity, Strapi) - Good to have
   - API-based content management
   - Easy updates without code changes
   - Image optimization built-in

3. **Long-term (Future):** Consider a static site generator with markdown files
   - Version control for content
   - Easy to edit
   - Can be integrated with CMS later

### 5.4 Image Optimization Strategy

**Current State:** 300+ unoptimized images

**Recommendations:**

1. **Format Optimization:**
   - Convert to WebP with JPEG/PNG fallbacks
   - Use `<picture>` element for responsive images
   ```html
   <picture>
     <source srcset="image.webp" type="image/webp">
     <source srcset="image.jpg" type="image/jpeg">
     <img src="image.jpg" alt="...">
   </picture>
   ```

2. **Responsive Images:**
   - Implement `srcset` for different screen sizes
   - Use `sizes` attribute for proper image selection

3. **Lazy Loading:**
   - Add `loading="lazy"` to images below the fold
   - Use IntersectionObserver for custom lazy loading

4. **Image CDN:**
   - Consider Cloudinary or Imgix
   - Automatic optimization and format conversion
   - Responsive image generation

### 5.5 Performance Monitoring

**Status:** Analytics and monitoring are good to have but not critical. Current setup works well.

**Recommendations (Good to Have):**

1. **Core Web Vitals Monitoring:**
   - Google Search Console (good to have)
   - PageSpeed Insights API (good to have)
   - Real User Monitoring (RUM) (good to have)

2. **Analytics:**
   - Enable Google Analytics (currently disabled) - Good to have, not critical
   - Track custom events (project views, resume downloads) - Good to have
   - Set up conversion goals - Good to have

3. **Error Tracking:**
   - Sentry (client-side error tracking) - Good to have
   - Monitor JavaScript errors - Good to have
   - Track failed resource loads - Good to have

---

## 6. Technical Debt & Improvements

### 6.1 Current Technical Debt

1. **jQuery Dependency:**
   - Large file size (~30KB)
   - **Status:** ⏸️ No immediate need to migrate - Current implementation works well
   - Migration to vanilla JS can be considered in future

2. **Hardcoded Content:**
   - Project data in JavaScript array
   - Difficult to update without code changes
   - Move to JSON or CMS (good to have, not critical)

3. **Image Optimization:**
   - Large unoptimized images
   - No responsive images
   - No lazy loading
   - **Note:** Optimize if performance issues occur during normal use

4. **SCSS Compilation:**
   - Manual compilation process
   - No minification
   - No source maps in production
   - **Status:** Works for current needs

5. **Accessibility:**
   - Missing ARIA labels
   - Keyboard navigation incomplete
   - Color contrast not verified
   - **Priority:** Should be addressed

6. **SEO:**
   - Missing structured data
   - No sitemap
   - Limited meta tags
   - **Priority:** Good to have

### 6.2 Priority Improvements

**High Priority:**
1. Ensure smooth performance on normal use (both Mobile and Desktop)
2. Fix accessibility issues (ARIA labels, keyboard nav)
3. Implement dark mode persistence (localStorage) - Good to have
4. Add basic SEO meta tags - Good to have

**Medium Priority (Good to Have):**
1. Enable Google Analytics (not critical, good to have)
2. Implement image optimization and lazy loading (good to have)
3. Move project data to JSON (good to have)
4. Add structured data (JSON-LD) (good to have)
5. Generate sitemap.xml (good to have)

**Low Priority (Future Consideration):**
1. Migrate from jQuery to vanilla JavaScript - **No immediate need, future consideration**
2. Implement build system (good to have)
3. Implement static site generator (future consideration)
4. Add Content Security Policy (good to have)
5. Implement error tracking (good to have)
6. Set up performance monitoring (good to have)
7. Add automated testing (future consideration)

---

## 7. Development Workflow

### 7.1 Current Workflow

1. Edit HTML/SCSS/JS files
2. Manually compile SCSS (if needed)
3. Test locally
4. Commit and push to GitHub
5. GitHub Pages auto-deploys

### 7.2 Recommended Workflow

**Local Development:**
```bash
# Install dependencies
npm install

# Watch SCSS for changes
npm run sass:watch

# Start local server
python -m http.server 8000
# or
npx serve

# Build for production
npm run build
```

**Version Control:**
- Use feature branches
- Commit conventions (Conventional Commits)
- Pull request reviews before merge

**Deployment:**
- GitHub Actions for automated builds (if build process added)
- Preview deployments for pull requests
- Production deployment to main branch

**Testing:**
- Browser testing (Chrome, Firefox, Safari, Edge)
- Mobile testing (iOS Safari, Chrome Mobile)
- Accessibility testing (axe DevTools, WAVE)
- Performance testing (Lighthouse, PageSpeed Insights)

---

## 8. Technical Specifications

### 8.1 Code Standards

**HTML:**
- Semantic HTML5 elements
- Indentation: 2 spaces or 4 spaces (consistent)
- Attributes: lowercase, quoted values
- Accessibility attributes where needed

**CSS/SCSS:**
- BEM naming convention (consider)
- Modular file structure (current)
- Variables for colors, spacing, typography
- Mobile-first approach (consider)

**JavaScript:**
- ES6+ syntax
- Consistent naming (camelCase for variables/functions)
- Comments for complex logic
- Avoid global variables where possible

### 8.2 File Naming Conventions

**Current:**
- HTML: lowercase, hyphens (`nextlevel.html`)
- CSS: lowercase, hyphens (`style.css`)
- JS: camelCase (`main.js`)
- Images: mixed case (inconsistent)

**Recommendation:**
- HTML: lowercase, hyphens ✅
- CSS/SCSS: lowercase, hyphens ✅
- JS: camelCase ✅
- Images: lowercase, hyphens (standardize)

### 8.3 Asset Organization

**Current Structure:**
```
img/
├── [project-name]/     # Project-specific images
├── [assets].png        # General assets
└── [various formats]
```

**Recommendation:**
```
assets/
├── images/
│   ├── projects/      # Project images
│   ├── icons/         # Icons
│   └── general/       # General images
├── fonts/             # Self-hosted fonts (if applicable)
└── videos/            # Video files
```

---

## 9. Technical Constraints & Limitations

### 9.1 GitHub Pages Constraints

- **Static Only:** No server-side processing
- **Jekyll:** Can use Jekyll, but not required
- **Custom Domain:** Supported via CNAME
- **HTTPS:** Automatic and required
- **File Size:** No explicit limit, but large files slow down site
- **Build Time:** No build process currently

### 9.2 Browser API Limitations

- **CSS Scroll-driven Animations:** Experimental (Chrome only)
- **IntersectionObserver:** Well-supported (polyfill available)
- **LocalStorage:** Well-supported (use for theme persistence)

### 9.3 Performance Constraints

- **Network Speed:** Optimize for 3G/4G connections
- **Device Performance:** Reduce animations on low-end devices
- **Battery:** Minimize CPU-intensive operations

---

## 10. Future Technical Considerations

### 10.1 Scalability

**Current:** Static site, scales well
**Future Considerations:**
- If content grows significantly, consider CMS
- If traffic increases, consider CDN (already using GitHub CDN)
- If interactivity increases, consider progressive enhancement

### 10.2 Maintainability

**Recommendations:**
1. Document code (especially complex animations)
2. Create component library/style guide
3. Implement automated testing
4. Regular dependency updates
5. Code review process

### 10.3 Technology Evolution

**Consider for Future:**
- Web Components (if interactivity grows)
- Service Worker (for offline support, caching)
- WebAssembly (if heavy computations needed)
- Progressive Web App (PWA) features

---

## 11. Technical Decisions & Clarifications

**Decisions Made:**

1. **Platform Support:** Both Mobile and Desktop are critical - must work seamlessly on both platforms
2. **Performance:** Should be smooth during normal use (no lag or jank) - practical performance requirements
3. **jQuery Migration:** ⏸️ **No immediate need** - Keep current jQuery implementation, migration is future consideration
4. **Analytics:** Google Analytics is good to have but not critical
5. **CMS:** Content management system is good to have for easier updates, but not immediately required
6. **Build System:** Good to have, but current manual process works for now
7. **Image Optimization:** Optimize if performance issues occur during normal use

**Remaining Questions:**

1. **Contact:** Should we add a contact form or just display email address?
2. **YouTube Link:** Should the YouTube channel link be visible in navigation?
3. **Theme Persistence:** Should dark/light mode preference be saved in localStorage?
4. **Accessibility:** What level of WCAG compliance is required (A, AA, AAA)?
5. **Browser Support:** Are there specific browser versions that must be supported beyond standard modern browsers?
6. **Testing:** Should we implement automated testing (unit, integration, E2E)?

---

## 12. Technical Recommendations Summary

### Immediate Actions (This Week)
1. ✅ Ensure smooth performance on normal use (both Mobile and Desktop)
2. ✅ Add ARIA labels for accessibility
3. ✅ Implement dark mode persistence (localStorage) - Good to have
4. ⏸️ Add basic SEO meta tags (Open Graph, Twitter Cards) - Good to have

### Short-term (This Month) - Good to Have
1. Enable Google Analytics - Good to have, not critical
2. Move project data to JSON file - Good to have
3. Add basic SEO meta tags (Open Graph, Twitter Cards) - Good to have
4. Implement image lazy loading - If performance issues occur

### Medium-term (Next Quarter) - Good to Have
1. Implement comprehensive accessibility improvements
2. Optimize images (WebP conversion, compression) - If needed
3. Add structured data (JSON-LD) - Good to have
4. Generate sitemap.xml and robots.txt - Good to have
5. Implement basic build system (npm scripts) - Good to have

### Long-term (Future Considerations)
1. ⏸️ Migrate from jQuery to vanilla JavaScript - **No immediate need, future consideration**
2. Set up automated testing - Future consideration
3. Add Content Security Policy - Good to have
4. Implement error tracking - Good to have
5. Consider static site generator - Future consideration
6. Implement headless CMS - If content management becomes needed
7. Add PWA features - If applicable
8. Performance monitoring setup - Good to have
9. Consider image CDN - If image optimization becomes critical

---

## 13. Appendices

### 13.1 Tools & Resources

**Development:**
- VS Code / Cursor (editor)
- Browser DevTools (Chrome, Firefox)
- GitHub (version control, hosting)

**Testing:**
- Lighthouse (performance, accessibility, SEO)
- PageSpeed Insights (performance)
- WAVE (accessibility)
- axe DevTools (accessibility)
- BrowserStack (cross-browser testing)

**Optimization:**
- ImageOptim / TinyPNG (image compression)
- WebPageTest (performance testing)
- GTmetrix (performance analysis)

**Monitoring:**
- Google Analytics (analytics)
- Google Search Console (SEO)
- Sentry (error tracking)

### 13.2 Useful Resources

- [Web.dev](https://web.dev) - Best practices
- [MDN Web Docs](https://developer.mozilla.org) - Documentation
- [Can I Use](https://caniuse.com) - Browser compatibility
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org) - Accessibility resources

---

**Document Status:** Draft - Awaiting technical review and answers to technical questions.
