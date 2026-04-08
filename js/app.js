const App = {
    data: window.PortfolioData || { caseStudies: [], projects: [], testimonials: [] },

    projectImages: {
        'graphy': 'img/graphy.png',
        'unacademy': 'img/unacademy.png',
        'clay-time': 'img/clay-time.png',
        'create-share': 'img/create-share.png',
        'youtube-coach': 'img/youtube-coach.png',
        'jagat-jamini': 'img/jagat-jamini.jpg',
        'bonfire': 'img/bonfire.png',
        'exalt-body': 'img/exalt-body.jpg',
        'photo': 'img/photo.jpg',
        'newzera': 'img/newzera.jpg',
        'univinks': 'img/univinks/univinks (1).jpg'
    },

    init() {
        this.renderCaseStudies();
        this.renderProjects();
        this.renderTestimonials();

        this.setupScrollListener();
        this.setupNavLinks();
        this.setupNavSpy();
        this.setupScrollObserver();
        this.setupInteractiveCanvas();
        this.setupMobileCorners();
        this.setupGyroscopeTracker();
        this.setupFaceAnimation();
        this.setupAbstractShapes();
        this.setupScrollToTop();

        console.log("App Initialized. Running completely on Vanilla JS and CSS.");

        setTimeout(() => {
            if (window.location.hash) {
                const targetEl = document.querySelector(window.location.hash);
                const wrapper = document.getElementById('scroll-wrapper');
                if (targetEl && wrapper) {
                    wrapper.scrollTo({
                        top: targetEl.offsetTop - 60,
                        behavior: 'smooth'
                    });
                }
            }
        }, 100);
    },

    setupScrollListener() {
        const wrapper = document.getElementById('scroll-wrapper');
        if (!wrapper) return;
        wrapper.addEventListener('scroll', () => {
            if (wrapper.scrollTop > 50) {
                document.body.classList.add('scrolled');
            } else {
                document.body.classList.remove('scrolled');
            }
        });
        if (wrapper.scrollTop > 50) document.body.classList.add('scrolled');
    },

    setupScrollToTop() {
        const topHeading = document.querySelector('.top-heading');
        const wrapper = document.getElementById('scroll-wrapper');
        if (!topHeading || !wrapper) return;

        topHeading.addEventListener('click', () => {
            // Only scroll to top if the site is in "scrolled" state (shows 'Scroll to top')
            if (document.body.classList.contains('scrolled')) {
                wrapper.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    },

    setupNavLinks() {
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetEl = document.querySelector(targetId);
                    const wrapper = document.getElementById('scroll-wrapper');
                    if (targetEl && wrapper) {
                        wrapper.scrollTo({
                            top: targetEl.offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    },

    setupNavSpy() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        const wrapper = document.getElementById('scroll-wrapper');

        if (!wrapper) return;

        wrapper.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                // Add an offset so it triggers organically slightly before exact alignment
                if (wrapper.scrollTop >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href') === `#${current}`) {
                    a.classList.add('active');
                }
            });
        });

        // Trigger initially
        setTimeout(() => wrapper.dispatchEvent(new Event('scroll')));
    },

    setupAbstractShapes() {
        const logoShape = document.getElementById('corner-shape');
        const tlCorner = document.querySelector('.corner.tl');
        if (!logoShape || !tlCorner) return;

        let interval = null;
        let currentIdx = 1;

        tlCorner.addEventListener('mouseenter', () => {
            if (window.innerWidth <= 1024) return;
            interval = setInterval(() => {
                logoShape.className = 'logo-square'; // Reset
                currentIdx = (currentIdx % 10) + 1;
                logoShape.classList.add(`shape-${currentIdx}`);
            }, 100);
        });

        tlCorner.addEventListener('mouseleave', () => {
            clearInterval(interval);
            logoShape.className = 'logo-square';
        });
    },

    setupScrollObserver() {
        if (window.innerWidth > 1024) return;

        const wrapper = document.getElementById('scroll-wrapper');
        if (!wrapper) return;

        const activate = () => {
            const cards = document.querySelectorAll('.project-card, .case-card');
            if (!cards.length) return;

            const wrapperRect = wrapper.getBoundingClientRect();
            const wrapperMid = wrapperRect.top + wrapperRect.height / 2;

            let closest = null;
            let closestDist = Infinity;

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                // Skip cards that are completely outside the wrapper's visible bounds
                if (rect.bottom < wrapperRect.top || rect.top > wrapperRect.bottom) return;

                const cardMid = rect.top + rect.height / 2;
                const dist = Math.abs(cardMid - wrapperMid);
                if (dist < closestDist) {
                    closestDist = dist;
                    closest = card;
                }
            });

            cards.forEach(card => card.classList.remove('active'));
            if (closest) closest.classList.add('active');
        };

        // Throttle: only run once per ~16ms frame
        let ticking = false;
        wrapper.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    activate();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial activation after cards are rendered
        setTimeout(activate, 600);

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                document.querySelectorAll('.project-card, .case-card').forEach(c => c.classList.remove('active'));
            } else {
                activate();
            }
        });
    },

    setupFaceAnimation() {
        const container = document.getElementById('hero-face-anim');
        const caption = document.getElementById('face-caption');
        if (!container) return;

        const glasses = container.querySelectorAll('.face-glass');
        if (glasses.length === 0) return;

        const webMessages = [
            "Nice, I will wear this from now on!",
            "Just kidding, you can't stop me.",
            "Better! This must be the one.",
            "Consistent designs, inconsistent frame.",
            "Looked at my portfolio yet?",
            "Doom-hovering stopped, desinger hired.",
            "Frame_Final_v2_FINAL_v3.eye",
            "404: Static personality not found.",
            "Frame follows function.",
            "Function follows the chaos.",
            "This one feels... Senior.",
            "But CEO requested one more change.",
            "This is me after Coffee.",
            "Before coffee. Shhhhh..."
        ];
        const mwebMessages = [
            "Scroll to change my frame.",
            "Is this better than the last one?",
            "Will the HR like this frame?",
            "Looked at my portfolio yet?",
            "Frame follows function.",
            "Frame_Final_v3_REAL.eye",
            "Optimized for Impact.",
            "Does this frame make me look senior?",
            "Warning: High-fidelity interaction.",
            "Looking at portfolio right? Right?",
            "404: Frame not found (just kidding).",
            "Still here? Let’s talk about design.",
            "I’m not just a pretty frame."
        ];

        let webIdx = 0;
        let mwebIdx = 0;
        let activeIndex = 0;
        let isHovered = false;

        // Set initial mobile text if needed
        if (window.innerWidth <= 1024 && caption) {
            caption.textContent = "Scroll to change my frame";
        }

        container.addEventListener('mouseenter', () => {
            isHovered = true;
            if (window.innerWidth > 1024 && caption) {
                caption.textContent = webMessages[webIdx];
                webIdx = (webIdx + 1) % webMessages.length;
            }
        });

        container.addEventListener('mouseleave', () => {
            isHovered = false;
            if (window.innerWidth > 1024 && caption) {
                caption.textContent = webMessages[webIdx];
                webIdx = (webIdx + 1) % webMessages.length;
            }
        });

        const pickRandomGlass = () => {
            glasses[activeIndex].classList.remove('active');
            let newIndex = Math.floor(Math.random() * glasses.length);
            if (newIndex === activeIndex) newIndex = (newIndex + 1) % glasses.length;
            activeIndex = newIndex;
            glasses[activeIndex].classList.add('active');
        };

        setInterval(() => {
            if (window.innerWidth > 1024 && !isHovered) {
                pickRandomGlass();
            }
        }, 100);

        const scrollWrapper = document.getElementById('scroll-wrapper');
        let lastScrollTime = 0;
        let scrollStopTimeout;

        if (scrollWrapper) {
            scrollWrapper.addEventListener('scroll', () => {
                if (window.innerWidth <= 1024) {
                    const now = Date.now();
                    if (now - lastScrollTime > 30) {
                        pickRandomGlass();
                        lastScrollTime = now;
                    }

                    // Scroll stop detection for caption change
                    clearTimeout(scrollStopTimeout);
                    scrollStopTimeout = setTimeout(() => {
                        if (caption) {
                            caption.textContent = mwebMessages[mwebIdx];
                            mwebIdx = (mwebIdx + 1);
                            if (mwebIdx >= mwebMessages.length) mwebIdx = 1; // Loop from index 1 only
                        }
                    }, 500); // 500ms after scroll stops to feel snacky
                }
            }, { passive: true });
        }
    },

    setupMobileCorners() {
        const corners = document.querySelectorAll('.corner');
        const scrollWrapper = document.getElementById('scroll-wrapper');

        corners.forEach(corner => {
            if (corner.classList.contains('tl')) return;

            corner.addEventListener('click', (e) => {
                if (window.innerWidth > 1024) return;
                if (e.target.closest('a') && !e.target.classList.contains('corner')) return;

                const wasExpanded = corner.classList.contains('expanded');
                corners.forEach(c => c.classList.remove('expanded'));

                if (!wasExpanded) {
                    corner.classList.add('expanded');
                    e.stopPropagation();
                }
            });
        });

        scrollWrapper.addEventListener('scroll', () => {
            if (window.innerWidth <= 1024) {
                corners.forEach(c => c.classList.remove('expanded'));
            }
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024 && !e.target.closest('.corner')) {
                corners.forEach(c => c.classList.remove('expanded'));
            }
        });
    },

    setupGyroscopeTracker() {
        window.globalGyro = { beta: 0, gamma: 0, active: false };

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const sheet = document.getElementById('motion-permission-sheet');
        const btn = document.getElementById('mps-btn-grant');

        if (window.innerWidth <= 1024) {
            if (isIOS && typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                if (!localStorage.getItem('motion_prompted')) {
                    setTimeout(() => sheet.classList.add('open'), 1500);
                }

                btn.addEventListener('click', () => {
                    DeviceOrientationEvent.requestPermission().then(response => {
                        if (response === 'granted') {
                            window.addEventListener('deviceorientation', handleOrientation);
                            window.globalGyro.active = true;
                        }
                        closeSheet();
                    }).catch(console.error);
                });
            } else {
                window.addEventListener('deviceorientation', handleOrientation);
                window.globalGyro.active = true;
            }
        }

        function handleOrientation(e) {
            window.globalGyro.beta = e.beta || 0;
            window.globalGyro.gamma = e.gamma || 0;
        }

        function closeSheet() {
            sheet.classList.remove('open');
            localStorage.setItem('motion_prompted', 'true');
        }

        if (sheet) {
            sheet.addEventListener('click', (e) => {
                if (e.target === sheet) closeSheet();
            });
            let startY = 0;
            const content = sheet.querySelector('.mps-content');
            if (content) {
                content.addEventListener('touchstart', e => startY = e.touches[0].clientY);
                content.addEventListener('touchmove', e => {
                    if (e.touches[0].clientY - startY > 50) closeSheet();
                });
            }
        }
    },

    renderCaseStudies() {
        const container = document.getElementById('cases-container');
        if (!container || !this.data.caseStudies) return;

        this.data.caseStudies.forEach(study => {
            const el = document.createElement('a');
            el.className = 'case-card';
            el.id = study.class;
            el.href = study.link || `detail.html?id=${study.class}`;

            el.innerHTML = `
                <div class="case-card-content dotted-bg">
                    <div class="case-text-wrap">
                        <div class="case-title">${study.title}</div>
                        <div class="case-desc">${study.description}</div>
                    </div>
                    <div class="view-btn">View Work &rarr;</div>
                </div>
                <div class="case-image-wrapper">
                    <img src="${study.image}" alt="${study.title}" class="case-image" loading="lazy">
                </div>
            `;
            container.appendChild(el);
        });
    },

    renderProjects() {
        const container = document.getElementById('projects-container');
        if (!container || !this.data.projects) return;

        this.data.projects.forEach(project => {
            const imgSrc = this.projectImages[project.class] || `img/${project.class}.png`;

            const el = document.createElement('a');
            el.className = 'project-card';
            el.id = project.class;
            el.href = `detail.html?id=${project.class}`;

            const tags = [project.tag1, project.tag2, project.tag3].filter(Boolean);
            const tagsHtml = tags.map(t => `<span>${t}</span>`).join('');

            el.innerHTML = `
                <div class="project-bg" style="background-image: url('${imgSrc}')"></div>
                <div class="project-gradient"></div>
                <div class="project-dots dotted-bg"></div>
                <div class="project-overlay">
                    <div class="project-tags">
                        ${tagsHtml}
                    </div>
                    <div class="project-info">
                        <div class="project-info-inner">
                            <h4>${project.title}</h4>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(el);
        });
    },

    renderTestimonials() {
        const container = document.getElementById('testim-container');
        const controls = document.getElementById('testim-controls');
        if (!container || !controls || !this.data.testimonials || this.data.testimonials.length === 0) return;

        let currentIndex = 0;
        const total = this.data.testimonials.length;

        // Render DOM
        const authorContainer = document.createElement('div');
        authorContainer.id = 'author-container';
        container.parentNode.insertBefore(authorContainer, controls.parentNode);

        this.data.testimonials.forEach((testim, i) => {
            const card = document.createElement('div');
            card.className = `testim-card ${i === 0 ? 'active' : ''}`;
            card.id = `testim-${i}`;

            // Dynamic font size logic for long quotes
            const charCount = testim.quote.length;
            const isMobile = window.innerWidth <= 1024;
            let fontSize;

            if (isMobile) {
                if (charCount < 300) fontSize = "1.5rem";        // Short (Aditya)
                else if (charCount < 600) fontSize = "1.2rem";   // Medium-Short
                else if (charCount < 800) fontSize = "1rem";  // Medium-Long (Sankalp/Vikram)
                else fontSize = "0.9rem";                       // Long (Hardik)
            } else {
                if (charCount < 300) fontSize = "1.8vw";        // Short
                else if (charCount < 600) fontSize = "1.5vw";   // Medium
                else if (charCount < 800) fontSize = "1.3vw";   // Medium-Long
                else fontSize = "1.1vw";                        // Long
            }

            card.innerHTML = `
                <div class="quote-wrap">
                    <div class="quote-mark">“</div>
                    <div class="quote-text" style="--dynamic-fs: ${fontSize}">${testim.quote}</div>
                </div>
            `;
            container.appendChild(card);

            // Create author card
            const authCard = document.createElement('div');
            authCard.className = `author-info ${i === 0 ? 'active' : ''}`;
            authCard.innerHTML = `
                <div class="author-name">${testim.name}</div>
                <div class="author-role">${testim.title}</div>
            `;
            authorContainer.appendChild(authCard);

            const dot = document.createElement('span');
            dot.className = i === 0 ? 'active' : '';
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateView();
                resetTimer();
            });
            controls.appendChild(dot);
        });

        const cards = document.querySelectorAll('.testim-card');
        const authors = document.querySelectorAll('.author-info');
        const dots = document.querySelectorAll('.testim-controls span');

        function updateView() {
            cards.forEach((c, i) => c.classList.toggle('active', i === currentIndex));
            authors.forEach((a, i) => a.classList.toggle('active', i === currentIndex));
            dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
        }

        let timer;
        function startTimer() {
            timer = setInterval(() => {
                currentIndex = (currentIndex + 1) % total;
                updateView();
            }, 30000); // 30s rotation as requested
        }

        function resetTimer() {
            clearInterval(timer);
            startTimer();
        }

        const prevBtn = document.getElementById('t-prev');
        const nextBtn = document.getElementById('t-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + total) % total;
                updateView();
                resetTimer();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % total;
                updateView();
                resetTimer();
            });
        }

        const testimSection = document.getElementById('testimonials');
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (!timer) startTimer();
            } else {
                clearInterval(timer);
                timer = null;
            }
        }, { threshold: 0.1 });
        if (testimSection) observer.observe(testimSection);
    },

    setupInteractiveCanvas() {
        const containers = document.querySelectorAll('.dotted-bg');
        containers.forEach(el => new InteractiveGrid(el));
    }
};

class InteractiveGrid {
    constructor(element) {
        this.el = element;
        this.triggerEl = element.closest('a') || element.closest('.case-card') || element;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d', { alpha: true });

        this.canvas.style.position = "absolute";
        this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.canvas.style.pointerEvents = "none";
        this.canvas.style.zIndex = "0";

        // Upgrade container bounds natively bypassing CSS constraints
        this.el.style.backgroundImage = "none";
        if (getComputedStyle(this.el).position === 'static') {
            this.el.style.position = "relative";
        }
        this.el.style.overflow = "hidden";

        // Ensure child contents naturally layer over the canvas natively without absolute
        Array.from(this.el.children).forEach(child => {
            if (getComputedStyle(child).position === 'static') {
                child.style.position = 'relative';
                child.style.zIndex = '1';
            }
        });

        this.el.insertBefore(this.canvas, this.el.firstChild);

        this.isMobile = window.innerWidth <= 1024;
        this.spacing = this.isMobile ? 14 : 20;
        this.mouseRadius = 250;
        this.tension = this.isMobile ? 0.015 : 0.03;
        this.dampening = this.isMobile ? 0.85 : 0.92;

        this.mouse = { x: -1000, y: -1000, active: false };
        this.scroll = { y: 0, vel: 0 };
        this.gyro = { bx: 0, gy: 0, vbx: 0, vgy: 0 };
        this.ripples = [];
        this.points = [];
        this.isAnimating = false;
        this.inView = false;
        this.isMobile = window.innerWidth <= 1024;

        // Binds strictly
        this.animate = this.animate.bind(this);
        this.resize = this.resize.bind(this);

        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                this.inView = true;
                if (!this.isAnimating) this.startLoop();
            } else {
                this.inView = false;
            }
        }, { rootMargin: '100px' });
        this.observer.observe(this.el);

        this.resize();
        this.bindEvents();
    }

    resize() {
        const rect = this.el.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.points = [];
        // Overscan logic securing corners
        for (let x = 0; x <= this.width + this.spacing; x += this.spacing) {
            for (let y = 0; y <= this.height + this.spacing; y += this.spacing) {
                this.points.push({ ox: x, oy: y, x: x, y: y, vx: 0, vy: 0 });
            }
        }
        if (!this.isAnimating) this.startLoop();
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 1024;
            this.resize();
        });

        if (!this.isMobile) {
            this.triggerEl.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
                this.mouse.active = true;
                this.startLoop();
            });

            this.triggerEl.addEventListener('mouseleave', () => {
                this.mouse.active = false;
            });
        } else {
            // Scroll velocity tracking for slosh
            const wrapper = document.getElementById('scroll-wrapper');
            if (wrapper) {
                let lastY = wrapper.scrollTop;
                wrapper.addEventListener('scroll', () => {
                    const currentY = wrapper.scrollTop;
                    this.scroll.vel = (currentY - lastY) * 0.02;
                    lastY = currentY;
                    this.startLoop();
                });
            }
        }

        this.triggerEl.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.ripples.push({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                radius: 0,
                life: 1
            });
            this.startLoop();
        });
    }

    startLoop() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.animate();
        }
    }

    animate() {
        if (!document.body.contains(this.el) || !this.inView) {
            this.isAnimating = false;
            return;
        }

        let needsUpdate = false;
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let i = this.ripples.length - 1; i >= 0; i--) {
            let r = this.ripples[i];
            r.radius += 10;
            r.life -= 0.03;
            if (r.life <= 0) this.ripples.splice(i, 1);
            else needsUpdate = true;
        }

        let gx = 0, gy = 0, forceX_global = 0, forceY_global = 0;
        let requiresGyroRedraw = false;

        if (this.isMobile && window.globalGyro && window.globalGyro.active) {
            const nextGx = Math.max(-45, Math.min(45, window.globalGyro.gamma));
            const nextGy = Math.max(-45, Math.min(45, window.globalGyro.beta));

            // Track gyro change rate (velocity) for slosh
            this.gyro.vbx = (nextGy - this.gyro.bx) * 0.85;
            this.gyro.vgy = (nextGx - this.gyro.gy) * 0.85;
            this.gyro.bx = nextGy;
            this.gyro.gy = nextGx;

            gx = nextGx;
            gy = nextGy;
            forceX_global = (gx / 45) * 1.5;
            forceY_global = (gy / 45) * 1.5;
            requiresGyroRedraw = true;
        }

        // Decay scroll velocity
        if (this.isMobile) {
            this.scroll.vel *= 0.92;
            if (Math.abs(this.scroll.vel) < 0.01) this.scroll.vel = 0;
            else needsUpdate = true;
        }

        for (let p of this.points) {
            let forceX = 0, forceY = 0;
            let distToMouse = 9999;

            if (!this.isMobile && this.mouse.active) {
                let dx = this.mouse.x - p.ox;
                let dy = this.mouse.y - p.oy;
                distToMouse = Math.sqrt(dx * dx + dy * dy);

                if (distToMouse < this.mouseRadius) {
                    let pull = Math.pow((this.mouseRadius - distToMouse) / this.mouseRadius, 2);
                    forceX += dx * pull * 0.02;
                    forceY += dy * pull * 0.02;
                    needsUpdate = true;
                }
            } else if (this.isMobile && requiresGyroRedraw) {
                forceX += forceX_global * 0.15;
                forceY += forceY_global * 0.15;

                // Add velocity-based inertial slosh (Lag/Overshoot)
                forceX += this.gyro.vgy * 0.35;
                forceY += (this.gyro.vbx * 0.35) + (this.scroll.vel * 0.25);

                needsUpdate = true;
            }

            for (let r of this.ripples) {
                let dx = p.x - r.x;
                let dy = p.y - r.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                let thick = 25;
                if (Math.abs(dist - r.radius) < thick) {
                    let push = r.life * ((thick - Math.abs(dist - r.radius)) / thick);
                    forceX += (dx / dist) * push * 20;
                    forceY += (dy / dist) * push * 20;
                    needsUpdate = true;
                }
            }

            let spX = (p.ox - p.x) * (this.isMobile ? this.tension * 2 : this.tension);
            let spY = (p.oy - p.y) * (this.isMobile ? this.tension * 2 : this.tension);
            forceX += spX;
            forceY += spY;

            p.vx = (p.vx + forceX) * (this.isMobile ? 0.85 : this.dampening);
            p.vy = (p.vy + forceY) * (this.isMobile ? 0.85 : this.dampening);
            p.x += p.vx;
            p.y += p.vy;

            if (Math.abs(p.vx) > 0.05 || Math.abs(p.vy) > 0.05) needsUpdate = true;

            this.ctx.beginPath();
            let size = this.isMobile ? 0.8 : 1.5; // Smaller dots on mobile
            let opacity = 0.1;

            if (!this.isMobile && distToMouse < this.mouseRadius) {
                let shine = (this.mouseRadius - distToMouse) / this.mouseRadius;
                size += shine * 0.5;
                opacity += shine * 0.2;
            } else if (this.isMobile && requiresGyroRedraw) {
                let normX = (p.ox - this.width / 2) / (this.width / 2 || 1);
                let normY = (p.oy - this.height / 2) / (this.height / 2 || 1);
                let tiltX = gx / 45;
                let tiltY = gy / 45;

                let shine = Math.max(0, (normX * tiltX) + (normY * tiltY));
                size += shine * 1;
                opacity += shine * 0.45;
            }

            this.ctx.fillStyle = `rgba(235, 217, 205, ${opacity})`;
            this.ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }

        if (needsUpdate || (!this.isMobile && this.mouse.active) || (this.isMobile && requiresGyroRedraw)) {
            requestAnimationFrame(this.animate);
        } else {
            this.isAnimating = false;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    App.init();

    // ── Fill-wipe Preloader ──
    const preloader = document.getElementById('preloader');
    const fill = document.getElementById('preloader-fill');
    if (!preloader || !fill) return;

    // No minimum display time — on cache hits we want instant dismiss.

    // ── Lerp engine: displayed chases target smoothly each RAF frame ──
    let target = 0; // where progress should be  (0–1)
    let current = 0; // where fill actually is    (0–1)
    let rafId;
    let allDone = false;

    const LERP_SPEED = 0.07; // fraction to close per frame (~60fps → very smooth)

    const tick = () => {
        // Lerp current toward target
        current += (target - current) * LERP_SPEED;

        // Clamp to prevent floating point overshoot
        if (Math.abs(target - current) < 0.0005) current = target;

        fill.style.transform = `scaleX(${current})`;

        if (!allDone || current < target - 0.001) {
            rafId = requestAnimationFrame(tick);
        }
    };
    rafId = requestAnimationFrame(tick);

    // ── Pseudo-progress: exponential crawl toward 0.78 ──
    const PSEUDO_DURATION = 2800;
    const PSEUDO_CEILING = 0.78;

    const pseudoStart = performance.now();
    const pseudoTick = (now) => {
        if (allDone) return;
        const elapsed = now - pseudoStart;
        const pseudo = PSEUDO_CEILING * (1 - Math.exp(-3.5 * (elapsed / PSEUDO_DURATION)));
        target = Math.max(target, pseudo);
        requestAnimationFrame(pseudoTick);
    };
    requestAnimationFrame(pseudoTick);

    // ── Real resource tracking ──
    const tracked = [];

    // 1) All <img> elements
    document.querySelectorAll('img').forEach(img => {
        tracked.push(new Promise(resolve => {
            // Robust check: if complete is true, the browser is finished with it (success or fail)
            if (img.complete) {
                resolve();
                return;
            }
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
            // Individual timeout for images
            setTimeout(resolve, 5000);
        }));
    });

    // 2) CSS background-image URLs (project cards)
    document.querySelectorAll('.project-bg').forEach(el => {
        const bg = getComputedStyle(el).backgroundImage;
        if (bg && bg !== 'none') {
            const match = bg.match(/url\(['"]?(.+?)['"]?\)/);
            if (match) {
                tracked.push(new Promise(resolve => {
                    const probe = new Image();
                    probe.onload = resolve;
                    probe.onerror = resolve;
                    probe.src = match[1];
                    setTimeout(resolve, 5000); // 5s timeout per probe
                }));
            }
        }
    });

    // 3) Web fonts — race with a 3-second timeout so a stalled
    //    document.fonts.ready (common in Safari/WebKit) can't block the whole loader.
    if (document.fonts && document.fonts.ready) {
        const fontsReady = Promise.race([
            document.fonts.ready,
            new Promise(resolve => setTimeout(resolve, 3000))
        ]);
        tracked.push(fontsReady);
    }

    const total = tracked.length || 1;
    let loaded = 0;

    tracked.forEach(promise => {
        promise.then(() => {
            loaded++;
            // Real progress raises the target — lerp engine chases it smoothly
            target = Math.max(target, loaded / total);
        });
    });

    // ── Dismiss once all resources are done ──
    const finishLoader = () => {
        if (allDone) return;
        target = 1; // let lerp smoothly finish to 100%

        // Wait for fill to visually reach 1 before fading out
        const waitForFull = () => {
            if (current >= 0.995) {
                allDone = true;
                cancelAnimationFrame(rafId);

                setTimeout(() => {
                    preloader.classList.add('loaded');

                    let removed = false;
                    const forceRemove = () => {
                        if (!removed) { removed = true; preloader.remove(); }
                    };
                    preloader.addEventListener('transitionend', forceRemove, { once: true });
                    setTimeout(forceRemove, 1000);
                }, 150);
            } else {
                requestAnimationFrame(waitForFull);
            }
        };
        requestAnimationFrame(waitForFull);
    };

    // Race Promise.all(tracked) with a 6-second global timeout
    Promise.race([
        Promise.all(tracked),
        new Promise(resolve => setTimeout(resolve, 6000))
    ]).then(finishLoader);
});
