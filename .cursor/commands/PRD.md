# Product Requirements Document (PRD)
## Soumyo's Portfolio Website

**Version:** 1.0
**Date:** 2026
**Author:** Product Team
**Status:** Draft

---

## 1. Executive Summary

This PRD outlines the requirements for Soumyo's portfolio website - a showcase for a Senior Product Designer specializing in HCI, UI, UX, User Research, and User Evaluation. The website serves as the primary digital touchpoint for potential employers, clients, and collaborators to understand Soumyo's design expertise, view case studies, and connect professionally.

**Key Objectives:**
- Showcase professional work and case studies
- Demonstrate design capabilities through the website itself
- Provide easy access to resume and contact information
- Create an engaging, memorable user experience
- Establish professional credibility

---

## 2. Product Overview

### 2.1 Product Vision
A visually striking, interactive portfolio website that reflects Soumyo's design philosophy and showcases 8+ years of experience designing practical website and mobile app experiences.

### 2.2 Target Users

**Primary Users:**
- **Recruiters & Hiring Managers** - Seeking to evaluate design skills and experience
- **Potential Clients** - Looking for design services or collaboration opportunities
- **Design Community** - Fellow designers seeking inspiration or networking

**Secondary Users:**
- **Colleagues & Peers** - Professional references and network connections
- **Students & Aspiring Designers** - Learning from case studies and portfolio structure

### 2.3 User Personas

**Persona 1: Tech Recruiter - Sarah**
- **Goals:** Quickly assess design skills, experience level, and portfolio quality
- **Pain Points:** Limited time, needs to evaluate multiple candidates
- **Needs:** Clear case studies, easy resume download, professional presentation

**Persona 2: Product Manager - Alex**
- **Goals:** Understand design process, see relevant work samples, assess fit for team
- **Pain Points:** Needs evidence of user research and problem-solving skills
- **Needs:** Detailed case studies, testimonials, examples of collaboration

**Persona 3: Design Director - Jordan**
- **Goals:** Evaluate design quality, creativity, and technical execution
- **Pain Points:** Needs to see attention to detail and design systems knowledge
- **Needs:** High-quality visuals, interactive elements, evidence of design thinking

---

## 3. Goals & Success Metrics

### 3.1 Business Goals
- Increase visibility and professional opportunities
- Generate leads for freelance/contract work
- Build professional brand and online presence
- Showcase design capabilities effectively

### 3.2 User Goals
- Easily browse portfolio projects
- Understand design process and expertise
- Access resume quickly
- Contact or connect via social media
- View detailed case studies

### 3.3 Success Metrics
**Key Performance Indicators (KPIs):**
- **Engagement:**
  - Average session duration (> 2 minutes)
  - Pages per session (> 2)
  - Bounce rate (< 60%)

- **Conversion:**
  - Resume downloads per month
  - Clicks on contact/social links
  - Case study views (especially NextLevel and ELSA)

- **Technical:**
  - Smooth performance during normal use (no lag or jank)
  - Page load time (< 3 seconds on normal connections)
  - Mobile and Desktop support (both platforms are critical)
  - Browser compatibility (Chrome, Safari, Firefox)

**Note:** *Currently, Google Analytics is commented out. Analytics tracking is good to have but not critical.*

---

## 4. Current State Analysis

### 4.1 Existing Features
✅ Hero section with animated introduction
✅ About section describing experience
✅ Case studies section (2 featured projects: NextLevel, Grammar & Vocab Games)
✅ Projects section (11 projects displayed)
✅ Individual project detail pages with image slideshows
✅ Dark/light mode toggle
✅ Custom cursor follower animations
✅ Preloader with animated loading states
✅ Responsive design (mobile-friendly)
✅ Social media links (Behance, Pinterest, GitHub, YouTube)
✅ Resume download functionality
✅ Testimonials/recommendations section
✅ Navigation sidebar with scroll indicators
✅ Smooth scrolling animations

### 4.2 Technology Stack
- **Frontend:** HTML5, CSS3 (SCSS), JavaScript (ES5/ES6)
- **Libraries:** jQuery 3.6.0, jQuery ScrollTo
- **Fonts:** Google Fonts (Krona One, Inter)
- **Hosting:** GitHub Pages (soumyomkhj.github.io)
- **Assets:** Images (PNG, JPG), Videos (MP4), SVG icons

### 4.3 Identified Gaps & Opportunities
- No contact form or email integration
- Limited SEO optimization
- Analytics tracking disabled
- No blog or writing section
- Limited accessibility features
- No search functionality for projects
- No filtering/sorting for projects
- No project categories/tags navigation
- Missing meta tags for social sharing

---

## 5. Functional Requirements

### 5.1 Core Features (Must Have)

#### FR-1: Homepage Navigation
- **Priority:** P0 (Critical)
- **Description:** Users must be able to navigate to all major sections
- **Acceptance Criteria:**
  - Hero section visible on page load
  - Smooth scroll to About, Case Studies, and Projects sections
  - Navigation sidebar indicates current section
  - Logo/brand name returns to top

#### FR-2: Portfolio Project Display
- **Priority:** P0 (Critical)
- **Description:** Showcase individual projects with images and metadata
- **Acceptance Criteria:**
  - Projects displayed in scrollable grid/list format
  - Each project shows thumbnail, title, and tags
  - Clicking project navigates to detail page
  - Projects load in reverse chronological order
  - Minimum 11 projects visible

#### FR-3: Case Studies Section
- **Priority:** P0 (Critical)
- **Description:** Highlight featured case studies prominently
- **Acceptance Criteria:**
  - Case studies appear before regular projects
  - Clear visual distinction from regular projects
  - Clickable cards linking to detailed pages
  - At least 2 case studies featured (NextLevel, ELSA Grammar & Vocab Games)

#### FR-4: Project Detail Pages
- **Priority:** P0 (Critical)
- **Description:** Display detailed project information and images
- **Acceptance Criteria:**
  - Image slideshow/carousel functionality
  - Keyboard navigation (arrow keys)
  - Back to homepage navigation
  - Consistent layout across all project pages

#### FR-5: Resume Download
- **Priority:** P0 (Critical)
- **Description:** Users can download PDF resume
- **Acceptance Criteria:**
  - Download button visible in navigation
  - PDF opens in new tab/downloads directly
  - File name: "Soumyoprabho Mukherjee resume.pdf"

#### FR-6: Social Media Integration
- **Priority:** P1 (High)
- **Description:** Links to professional social profiles
- **Acceptance Criteria:**
  - Behance, Pinterest, GitHub links functional
  - YouTube link (currently hidden) - *Should this be visible?*
  - Links open in new tabs
  - Icon-based navigation

#### FR-7: Dark/Light Mode
- **Priority:** P1 (High)
- **Description:** Toggle between light and dark themes
- **Acceptance Criteria:**
  - Toggle button in top navigation
  - Theme preference persists across sessions *(Currently not implemented - should we add this?)*
  - Smooth transition between themes
  - All elements adapt to theme change

#### FR-8: Responsive Design
- **Priority:** P0 (Critical)
- **Description:** Website works seamlessly on both Mobile and Desktop platforms
- **Acceptance Criteria:**
  - Mobile-friendly layout (< 1080px breakpoint)
  - Desktop-optimized experience (> 1080px)
  - Touch-friendly interactions on mobile
  - Mouse/cursor interactions on desktop
  - Custom cursor disabled on mobile (desktop only)
  - Images scale appropriately on both platforms
  - Text remains readable across all device sizes
  - Smooth performance on normal use for both platforms

### 5.2 Enhanced Features (Should Have)

#### FR-9: Preloader Animation
- **Priority:** P1 (High)
- **Description:** Animated loading state on page load
- **Acceptance Criteria:**
  - Preloader displays for minimum duration
  - Smooth fade-out transition
  - Hero animation triggers after preloader

#### FR-10: Custom Cursor
- **Priority:** P2 (Medium)
- **Description:** Interactive cursor follower (desktop only)
- **Acceptance Criteria:**
  - Cursor follows mouse movement
  - Expands on hover over interactive elements
  - Shows contextual text (VIEW, BACK, etc.)
  - Disabled on mobile devices

#### FR-11: Scroll Animations
- **Priority:** P1 (High)
- **Description:** Animated transitions on scroll
- **Acceptance Criteria:**
  - Projects animate into view
  - Smooth scroll between sections
  - Scroll indicators in sidebar
  - Parallax effects on hero section

### 5.3 Future Enhancements (Nice to Have)

#### FR-12: Contact Form
- **Priority:** P3 (Low - Good to Have)
- **Description:** Allow users to send messages directly
- **Requirements:**
  - Email integration (e.g., Formspree, EmailJS)
  - Spam protection
  - Success/error messages
  - *What email should receive contact form submissions?*

#### FR-13: Project Filtering
- **Priority:** P3 (Low)
- **Description:** Filter projects by category/tag
- **Requirements:**
  - Filter by design type (UX, UI, Interaction Design)
  - Filter by industry
  - Sort by date or relevance

#### FR-14: Search Functionality
- **Priority:** P3 (Low)
- **Description:** Search projects by keywords
- **Requirements:**
  - Client-side search
  - Search by project name or tags
  - Instant results

#### FR-15: Blog/Articles Section
- **Priority:** P3 (Low - Good to Have)
- **Description:** Share design thoughts and insights
- **Requirements:**
  - CMS integration or static markdown files (good to have)
  - RSS feed support
  - *Future consideration, not immediate need*

---

## 6. Non-Functional Requirements

### 6.1 Performance
- **Page Load Time:** < 3 seconds on normal connections (3G/4G/WiFi)
- **Time to Interactive:** < 5 seconds
- **Smooth Performance:** No lag or jank during normal use on both Mobile and Desktop
- **Lighthouse Score:** > 90 (Performance, Accessibility, Best Practices, SEO) - Good to have
- **Image Optimization:** WebP format with fallbacks, lazy loading (good to have)

### 6.2 Accessibility
- **WCAG Compliance:** Minimum Level AA
- **Keyboard Navigation:** All features accessible via keyboard
- **Screen Reader Support:** Proper ARIA labels and semantic HTML
- **Color Contrast:** WCAG AA compliant ratios
- **Focus Indicators:** Visible focus states for all interactive elements

**Note:** *Current accessibility implementation should be audited. Are there specific accessibility requirements?*

### 6.3 Browser Compatibility
- **Desktop:** Chrome (latest), Safari (latest), Firefox (latest), Edge (latest)
- **Mobile:** iOS Safari (latest 2 versions), Chrome Mobile (latest)
- **Legacy Support:** IE11 not required

### 6.4 SEO Requirements
- **Meta Tags:** Title, description, Open Graph, Twitter Cards
- **Structured Data:** JSON-LD for Person schema
- **Sitemap:** XML sitemap generation
- **Robots.txt:** Properly configured
- **URL Structure:** Clean, readable URLs

**Note:** *SEO optimization is good to have for better discoverability.*

### 6.5 Security
- **HTTPS:** Required (GitHub Pages provides by default)
- **Content Security Policy:** Headers configured
- **Input Validation:** For any forms (if added)
- **External Links:** Security considerations for social media links

### 6.6 Analytics
- **Google Analytics:** Currently commented out - *Good to have, not critical*
- **Event Tracking:** Project views, resume downloads, external link clicks (good to have)
- **Conversion Tracking:** Resume downloads, contact form submissions (good to have)

---

## 7. Content Requirements

### 7.1 Existing Content
- Hero section: "Hello! I'M SOUMYO"
- About: "I have been designing practical website and mobile app experiences for 8 years."
- Projects: 11 projects with titles, tags, and images
- Case Studies: 2 featured projects with descriptions
- Testimonials: 2 recommendations from Pratyush Shrivastav and Aditya Bose
- Resume: PDF document (SoumyoResume.pdf)

### 7.2 Content Gaps
- Missing contact information
- No explicit email address
- Limited personal introduction
- No location/timezone information
- *Should we add these details?*

### 7.3 Content Strategy Questions
1. Should there be a more detailed "About" section with background, skills, education?
2. Do you want to add client/company names to projects?
3. Should testimonials include photos or company logos?
4. Is there additional case study content to add?

---

## 8. Design Requirements

### 8.1 Visual Design
- **Design System:** Maintain current aesthetic
- **Typography:** Krona One (headers), Inter (body) - *Should these be updated?*
- **Color Palette:** Dark theme primary (#12282E), light theme support
- **Animations:** Smooth, purposeful animations (cubic-bezier easing)
- **Custom Cursor:** Maintained for desktop experience

### 8.2 Interaction Design
- **Scroll Behavior:** Smooth scrolling with snap points
- **Hover States:** Clear feedback on interactive elements
- **Loading States:** Preloader and skeleton screens
- **Error States:** Graceful error handling (if forms added)

### 8.3 Brand Guidelines
- **Logo/Branding:** "soumyomkhj" text logo
- **Tone of Voice:** Professional, creative, approachable
- **Visual Style:** Modern, minimal, interactive

---

## 9. Technical Constraints

### 9.1 Platform Constraints
- **Hosting:** GitHub Pages (static site hosting)
- **No Backend:** Serverless architecture required
- **No Database:** All content must be static or client-side
- **Build Process:** No active build process - CSS files are maintained directly
- **SCSS Status:** SCSS source files exist but are currently unused/stale (cleaned up January 2026)

### 9.2 Technology Constraints
- **jQuery Dependency:** Currently using jQuery - *Should we migrate to vanilla JS?*
- **Browser APIs:** Must work without modern JS features (with polyfills)
- **File Size Limits:** GitHub Pages has no explicit limits, but optimization recommended

---

## 10. Dependencies & Integrations

### 10.1 Current Dependencies
- Google Fonts (Krona One, Inter)
- jQuery 3.6.0 (CDN)
- jQuery ScrollTo plugin
- Google Analytics (disabled)

### 10.2 Potential Future Integrations
- Email service (Formspree, EmailJS) - *For contact form*
- CMS (Contentful, Sanity) - *If blog/updates needed*
- CDN (Cloudflare) - *For asset optimization*
- Image hosting (Cloudinary) - *For optimized images*

---

## 11. Out of Scope (For Now)

The following features are explicitly out of scope for the current version:

- User authentication or login
- Admin panel or CMS
- E-commerce functionality
- Multi-language support
- User-generated content
- Real-time chat or messaging
- Database-driven content management

**Note:** *If any of these become desired, please specify.*

---

## 12. Success Criteria & Launch Checklist

### 12.1 Launch Criteria
- [ ] All P0 features functional
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing completed
- [ ] Performance metrics met
- [ ] SEO basics implemented
- [ ] Analytics tracking enabled (if desired)
- [ ] Accessibility audit passed
- [ ] Content reviewed and finalized

### 12.2 Post-Launch
- [ ] Monitor analytics for 30 days
- [ ] Gather user feedback
- [ ] Fix critical bugs
- [ ] Plan next iteration based on metrics

---

## 13. Clarifications & Decisions

**Decisions Made:**

1. **Platform Support:** Both Mobile and Desktop are critical platforms - must work seamlessly on both
2. **Performance:** Should be smooth during normal use (no lag or jank) - practical performance requirements
3. **jQuery Migration:** No immediate need - keep current jQuery implementation, migration is future consideration
4. **Analytics:** Google Analytics is good to have but not critical
5. **CMS:** Content management system is good to have for easier updates, but not immediate requirement

**Remaining Questions:**

1. **Contact:** Should we add a contact form or just display email address?
2. **YouTube Link:** Should the YouTube channel link be visible in navigation?
3. **Theme Persistence:** Should dark/light mode preference be saved in localStorage?
4. **SEO Priority:** How important is comprehensive SEO optimization?
5. **Accessibility:** Are there specific accessibility requirements or certifications needed?
6. **Content Updates:** How often will content need to be updated?
7. **Case Studies:** Should case studies have more detailed content than projects?
8. **Social Links:** Are all current social links active and desired?

---

## 14. Timeline & Milestones

**Current Phase:** Analysis & Documentation
**Next Phase:** Implementation Planning
**Future Phases:**
- Phase 1: Core improvements (P0 features)
- Phase 2: Enhanced features (P1 features)
- Phase 3: Future enhancements (P2/P3 features)

**Timeline:** *To be determined based on priorities*

---

## 15. Appendices

### 15.1 Glossary
- **HCI:** Human-Computer Interaction
- **PRD:** Product Requirements Document
- **TRD:** Technical Requirements Document
- **WCAG:** Web Content Accessibility Guidelines
- **KPI:** Key Performance Indicator

### 15.2 References
- Current website: soumyomkhj.github.io
- GitHub repository: soumyomkhj.github.io
- Design portfolio best practices
- Accessibility guidelines (WCAG 2.1)

---

**Document Status:** Draft - Awaiting stakeholder review and answers to open questions.

---

## 16. Recent Changes Log

**January 2026:**
- ✅ Unified `.hero > img` CSS definitions into single location with relative dimensions
- ✅ Removed unused `chart/scss/` directory (chart uses main `scss/style.css`)
- ✅ Cleaned up stale build artifacts (`.sass-cache/` directories)
- ✅ Code cleanup: Removed duplicate and unused SCSS implementations
- **Note:** SCSS source files are currently unused/stale. CSS files (style.css) are the source of truth.
