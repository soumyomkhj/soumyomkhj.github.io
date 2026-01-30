// Detail page module - auto-generates project/case study pages
const DetailPage = {
    data: null,
    currentItem: null,
    itemType: null, // 'project' or 'caseStudy'

    init() {
        this.loadData();
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        if (!id) {
            window.location.href = 'index.html';
            return;
        }

        this.findItem(id);
        if (this.currentItem) {
            this.renderPage();
        } else {
            window.location.href = 'index.html';
        }
    },

    loadData() {
        try {
            if (typeof window.PortfolioData !== 'undefined') {
                this.data = window.PortfolioData;
            } else {
                console.error('Portfolio data not found');
            }
        } catch (error) {
            console.error('Error loading portfolio data:', error);
        }
    },

    findItem(id) {
        if (!this.data) return;

        // Check case studies first
        this.currentItem = this.data.caseStudies.find(item => item.class === id);
        if (this.currentItem) {
            this.itemType = 'caseStudy';
            return;
        }

        // Check projects
        this.currentItem = this.data.projects.find(item => item.class === id);
        if (this.currentItem) {
            this.itemType = 'project';
            return;
        }
    },

    renderPage() {
        this.renderNav();
        this.renderContent();
        document.getElementById('page-title').textContent = this.currentItem.title;
    },

    renderNav() {
        const navContainer = document.getElementById('dynamic-nav');
        const backLink = this.itemType === 'caseStudy' ? 'index.html#case-studies' : `index.html#${this.currentItem.class}`;
        const year = '2026';

        navContainer.innerHTML = `
            <div class="nav">
                <div class="f-item left top">
                    <div class="item home" onclick="location.href='${backLink}'">
                        <i class="arrow-left-o"></i>
                        soumyomkhj
                    </div>
                </div>
                <div class="f-item right top">
                    <div class="item hover" id="dark"></div>
                </div>
                <div class="f-item hover left bottom">
                    <div class="item">
                        <li class="social"><a href="https://www.behance.net/soumyomkhj" target="_blank" class="icon-3 behance" title="Behance"><svg viewBox="0 0 512 512"><path d="M254.8 171.8c6.4 8.9 9.6 19.6 9.6 32 0 12.8-3.2 23.1-9.7 30.9 -3.6 4.4-9 8.4-16 12 10.7 3.9 18.8 10.1 24.2 18.5 5.5 8.4 8.2 18.7 8.2 30.7 0 12.4-3.1 23.6-9.3 33.5 -4 6.6-8.9 12.1-14.9 16.5 -6.7 5.1-14.6 8.6-23.7 10.5 -9.1 1.9-19 2.8-29.6 2.8H99.1V149.5h101.4C226.1 149.8 244.2 157.3 254.8 171.8zM140.9 185.9v46.3h51c9.1 0 16.5-1.7 22.2-5.2 5.7-3.5 8.5-9.6 8.5-18.4 0-9.8-3.8-16.2-11.3-19.4 -6.5-2.2-14.7-3.3-24.8-3.3H140.9zM140.9 266.9v55.9h50.9c9.1 0 16.2-1.2 21.2-3.7 9.2-4.6 13.8-13.3 13.8-26.2 0-10.9-4.5-18.4-13.4-22.5 -5-2.3-12-3.5-21-3.6H140.9L140.9 266.9zM396.4 207.3c10.8 4.8 19.8 12.5 26.8 23 6.4 9.2 10.5 19.9 12.4 32.1 1.1 7.1 1.5 17.4 1.3 30.8H323.9c0.6 15.6 6 26.5 16.2 32.7 6.2 3.9 13.6 5.8 22.4 5.8 9.2 0 16.8-2.4 22.5-7.1 3.2-2.6 5.9-6.1 8.4-10.7h41.4c-1.1 9.2-6.1 18.5-15 28 -13.9 15.1-33.4 22.6-58.4 22.6 -20.6 0-38.9-6.4-54.6-19.1 -15.8-12.7-23.7-33.4-23.7-62.1 0-26.9 7.1-47.5 21.4-61.8 14.2-14.3 32.7-21.5 55.5-21.5C373.4 200 385.6 202.4 396.4 207.3zM335.7 242.3c-5.7 5.9-9.3 13.9-10.8 24h69.9c-0.7-10.8-4.3-18.9-10.8-24.5 -6.5-5.6-14.5-8.4-24.1-8.4C349.5 233.4 341.4 236.4 335.7 242.3zM402.8 161.5h-91.2V182.7h91.2V161.5z"/></svg></a></li>
                    </div>
                </div>
                <div class="f-item right bottom">
                    <div class="item">${year}</div>
                </div>
            </div>
        `;
    },

    renderContent() {
        const container = document.getElementById('content-container');

        if (this.itemType === 'caseStudy') {
            this.renderCaseStudy(container);
        } else {
            this.renderProject(container);
        }
    },

    renderCaseStudy(container) {
        const images = this.getImages(this.currentItem.class, 'caseStudy');
        this.injectSlideshowStyles();

        container.innerHTML = `
            <div class="slideshow-container" id="slideshow" tabindex="0">
                <div class="slides">
                    ${images.map((img, i) => `
                        <img class="slide-img" src="${img}" alt="" style="display: ${i === 0 ? 'block' : 'none'};">
                    `).join('')}
                </div>
                <div class="mobile-arrows">
                    <button class="arrow prevs" id="prevSlide" aria-label="Previous Slide">&#10094;</button>
                    <button class="arrow nexts" id="nextSlide" aria-label="Next Slide">&#10095;</button>
                </div>
                <button class="arrow prevs desktop-arrow" id="prevSlide-desktop" aria-label="Previous Slide">&#10094;</button>
                <button class="arrow nexts desktop-arrow" id="nextSlide-desktop" aria-label="Next Slide">&#10095;</button>
            </div>
        `;

        this.initSlideshow();
    },

    renderProject(container) {
        const images = this.getImages(this.currentItem.class, 'project');
        const acceptBadge = this.currentItem.isSpecial ? '<img src="img/accept.png" class="accept">' : '';

        // Handle YouTube videos if present
        let content = images.map(img => `<img class="lazy" src="${img}" alt="">`).join('');
        if (this.currentItem.youtubeVideo && this.currentItem.youtubeVideo.videoId) {
            const position = this.currentItem.youtubeVideo.position || 0;
            const beforeIframe = images.slice(0, position).map(img => `<img class="lazy" src="${img}" alt="">`).join('');
            const iframe = `<iframe id="yt-player" width="100%" height="70%" style="background-color: black;" src="https://www.youtube.com/embed/${this.currentItem.youtubeVideo.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            const afterIframe = images.slice(position).map(img => `<img class="lazy" src="${img}" alt="">`).join('');
            content = beforeIframe + iframe + afterIframe;
        }

        container.innerHTML = `
            <div class="fullpage">
                <div class="display">
                    ${acceptBadge}
                    ${content}
                    ${this.getNavigationButtons()}
                </div>
            </div>
        `;

        if (this.currentItem.isSpecial) {
            this.initAcceptBadge();
        }
    },

    getImages(className, type) {
        const images = [];

        if (type === 'caseStudy') {
            // Case studies use numbered format: 01.png, 02.png, etc.
            let slidesNo = 30;
            if (this.data && Array.isArray(this.data.caseStudies)) {
                const caseStudy = this.data.caseStudies.find(cs => cs.class === className);
                if (caseStudy && typeof caseStudy.slidesNo === 'number') {
                    slidesNo = caseStudy.slidesNo;
                }
            }
            for (let i = 1; i <= slidesNo; i++) {
                const num = String(i).padStart(2, '0');
                images.push(`img/${className}/${num}.png`);
            }
        } else {
            // Projects have various formats - use pattern matching based on className
            const imagePatterns = {
                'graphy': { pattern: (i) => `${className} (${i}).png`, max: 6 },
                'clay-time': { pattern: (i) => `${className}-${i}.png`, max: 10 },
                'photo': {
                    pattern: (i) => `img (${i}).jpg`,
                    max: 8,
                    additional: ['Jhargram 1.jpg', 'Jhargram 2.jpg', 'Jhargram 3.jpg', 'Kolkata 1.jpg', 'Kolkata 2.jpg', 'Kolkata 3.jpg', 'Lepchajagat 1.jpg', 'Lepchajagat 2.jpg', 'Lepchajagat 3.jpg', 'Lepchajagat 4.jpg', 'Varanasi 1.jpg', 'Varanasi 2.jpg', 'Varanasi 3.jpg', 'Varanasi 4.jpg']
                },
                'newzera': { pattern: (i) => `${className} (${i}).jpg`, max: 7 },
                'youtube-coach': { pattern: (i) => `${className}-${i}.jpg`, max: 27 },
                'univinks': { pattern: (i) => `${className} (${String(i).padStart(2, '0')}).jpg`, max: 11 },
                'jagat-jamini': { pattern: (i) => `jagat-${i}.jpg`, max: 4 },
                'exalt-body': { pattern: (i) => `${className}-${i}.png`, max: 6 },
                'create-share': { pattern: (i) => `${className}-${i}.png`, max: 35 },
                'bonfire': { pattern: (i) => `${className}-${i}.png`, max: 35 },
                'unacademy': { pattern: (i) => `${className}-${i}.png`, max: 15 },
                'mobile-atm': { pattern: (i) => `${className}-${i}.png`, max: 7 }
            };

            const config = imagePatterns[className] || { pattern: (i) => `${className} (${i}).png`, max: 10 };

            for (let i = 1; i <= config.max; i++) {
                const path = `img/${className}/${config.pattern(i)}`;
                images.push(path);
            }

            if (config.additional) {
                config.additional.forEach(file => {
                    images.push(`img/${className}/${file}`);
                });
            }
        }

        return images;
    },

    getNavigationButtons() {
        const allItems = this.itemType === 'caseStudy'
            ? this.data.caseStudies
            : this.data.projects;

        const currentIndex = allItems.findIndex(item => item.class === this.currentItem.class);
        const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
        const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

        const prevBtn = prevItem
            ? `<div class="prev" onclick="location.href='detail.html?id=${prevItem.class}'"></div>`
            : '<div class="prev" style="opacity: 0; cursor: none;"></div>';

        const nextBtn = nextItem
            ? `<div class="next" onclick="location.href='detail.html?id=${nextItem.class}'"></div>`
            : '<div class="next" style="opacity: 0; cursor: none;"></div>';

        return prevBtn + nextBtn;
    },

    initSlideshow() {
        // Include slideshow script inline or load from external file
        // For now, we'll need to include the slideshow logic
        // This is a simplified version - you may want to extract to separate file
        setTimeout(() => {
            if (typeof window.initSlideshow === 'function') {
                window.initSlideshow();
            } else {
                this.initSlideshowInline();
            }
        }, 100);
    },

    initSlideshowInline() {
        const slides = document.querySelectorAll('.slide-img');
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        const prevBtnDesktop = document.getElementById('prevSlide-desktop');
        const nextBtnDesktop = document.getElementById('nextSlide-desktop');
        let current = 0;
        let allowWheel = true;

        function updateSlideshow() {
            slides.forEach((img, i) => img.style.display = (i === current) ? 'block' : 'none');
            if (prevBtn) prevBtn.disabled = (current === 0);
            if (nextBtn) nextBtn.disabled = (current === slides.length - 1);
            if (prevBtnDesktop) prevBtnDesktop.disabled = (current === 0);
            if (nextBtnDesktop) nextBtnDesktop.disabled = (current === slides.length - 1);
        }

        updateSlideshow();

        function nextSlide() {
            if (current < slides.length - 1) {
                current++;
                updateSlideshow();
            }
        }

        function prevSlide() {
            if (current > 0) {
                current--;
                updateSlideshow();
            }
        }

        if (nextBtn) nextBtn.onclick = nextSlide;
        if (prevBtn) prevBtn.onclick = prevSlide;
        if (nextBtnDesktop) nextBtnDesktop.onclick = nextSlide;
        if (prevBtnDesktop) prevBtnDesktop.onclick = prevSlide;

        document.addEventListener('keydown', function(e) {
            const tag = document.activeElement.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA') return;
            if (e.key === "ArrowRight") nextSlide();
            else if (e.key === "ArrowLeft") prevSlide();
        });

        // Wheel navigation
        function handleWheel(e) {
            if (!allowWheel) return;
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                if (e.deltaY > 0 && current < slides.length - 1) {
                    nextSlide();
                } else if (e.deltaY < 0 && current > 0) {
                    prevSlide();
                } else {
                    return;
                }
            } else {
                if (e.deltaX > 0 && current < slides.length - 1) {
                    nextSlide();
                } else if (e.deltaX < 0 && current > 0) {
                    prevSlide();
                } else {
                    return;
                }
            }
            allowWheel = false;
            setTimeout(() => { allowWheel = true; }, 400);
            e.preventDefault();
        }

        const slideshow = document.getElementById('slideshow');
        if (slideshow) {
            slideshow.addEventListener('wheel', handleWheel, { passive: false });
        }

        // Touch swipe
        let touchStartX = 0, touchStartY = 0, touchDx = 0, touchDy = 0;
        function handleTouchStart(e) {
            if (e.touches.length > 1) return;
            const t = e.touches[0];
            touchStartX = t.clientX;
            touchStartY = t.clientY;
        }
        function handleTouchMove(e) {
            if (e.touches.length > 1) return;
            const t = e.touches[0];
            touchDx = t.clientX - touchStartX;
            touchDy = t.clientY - touchStartY;
        }
        function handleTouchEnd(e) {
            if (Math.abs(touchDx) > 50 && Math.abs(touchDx) > Math.abs(touchDy)) {
                if (touchDx < 0 && current < slides.length - 1) {
                    nextSlide();
                } else if (touchDx > 0 && current > 0) {
                    prevSlide();
                }
            }
            touchDx = 0; touchDy = 0;
        }
        if (slideshow) {
            slideshow.addEventListener('touchstart', handleTouchStart, { passive: true });
            slideshow.addEventListener('touchmove', handleTouchMove, { passive: true });
            slideshow.addEventListener('touchend', handleTouchEnd, { passive: true });
        }

        // Prevent image drag
        slides.forEach(img => img.ondragstart = e => e.preventDefault());
    },

    initAcceptBadge() {
        $(".display").scroll(function(){
            if ($(this).scrollTop() > 500) {
                $(".accept").addClass("hide");
            } else {
                $(".accept").removeClass("hide");
            }
        });
    },

    injectSlideshowStyles() {
        const styleEl = document.getElementById('slideshow-styles');
        if (styleEl && !styleEl.textContent) {
            styleEl.textContent = `
                html, body { height: 100%; }
                body { min-height: 100vh; }
                .slideshow-container {
                    position: relative;
                    width: auto;
                    height: 100%;
                    min-height: 350px;
                    max-width: 100vw;
                    max-height: 98vh;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 0;
                    overflow: hidden;
                }
                .slideshow-container .slides {
                    width: auto;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                .slide-img {
                    display: none;
                    border-radius: 8px;
                    margin: 0 auto;
                    user-select: none;
                    -webkit-user-drag: none;
                    object-fit: contain;
                    width: auto;
                    height: 90vh;
                    max-width: 100vw;
                    max-height: 90vh;
                }
                .arrow {
                    background: transparent !important;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    font-size: 3.8rem;
                    z-index: 3;
                    cursor: pointer;
                    transition: background 0.2s;
                    user-select: none;
                    outline: none;
                    padding: 1.6rem 2.4rem;
                }
                .arrow:disabled {
                    opacity: 0.15;
                    box-shadow: none;
                    pointer-events: none;
                }
                .desktop-arrow {
                    position: absolute;
                }
                #prevSlide-desktop { left: min(2vw,40px); top: 50%; transform: translateY(-50%);}
                #nextSlide-desktop { right: min(2vw,40px); top: 50%; transform: translateY(-50%);}
                .mobile-arrows {
                    display: none;
                }
                @media (max-width: 650px) and (orientation: portrait) {
                    .slideshow-container {
                        flex-direction: column;
                    }
                    .slideshow-container .slides {
                        height: auto;
                        min-height: 0;
                        flex-direction: column;
                        justify-content: center;
                    }
                    .slide-img {
                        height: 65vw;
                        max-height: 66vw;
                        max-width: 95vw;
                    }
                    .mobile-arrows {
                        width: 100%;
                        display: flex !important;
                        justify-content: center;
                        align-items: center;
                        margin: 1.2em 0 3em 0;
                        gap: 2vw;
                    }
                    .desktop-arrow {
                        display: none !important;
                    }
                    .arrow {
                        position: static;
                        display: inline-block;
                        margin: 0 2vw;
                        padding: 0.7rem 1.25rem;
                        font-size: 2.4rem;
                        top: unset; left: unset; right: unset; transform: none;
                    }
                }
                @media (min-width: 651px), (orientation: landscape) {
                    .slideshow-container .slides {
                        height: 100vh;
                        flex-direction: row;
                        align-items: center;
                    }
                    .slide-img {
                        height: 90vh;
                        max-height: 90vh;
                        max-width: 100vw;
                    }
                    .desktop-arrow {
                        display: inline-block !important;
                    }
                    .mobile-arrows {
                        display: none !important;
                    }
                    .arrow {
                        font-size: 3.1rem;
                        padding: 1.2rem 2rem;
                    }
                }
            `;
        }
    }
};
