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
        const observer = new IntersectionObserver((entries) => {
            if (window.innerWidth > 1024) return;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, { rootMargin: '0px 0px -40% 0px', threshold: 0 });

        setTimeout(() => {
            if (window.innerWidth <= 1024) {
                document.querySelectorAll('.project-card, .case-card').forEach(card => observer.observe(card));
            }

            // Re-evaluate on resize
            window.addEventListener('resize', () => {
                const cards = document.querySelectorAll('.project-card, .case-card');
                if (window.innerWidth > 1024) {
                    cards.forEach(card => {
                        observer.unobserve(card);
                        card.classList.remove('active');
                    });
                } else {
                    cards.forEach(card => observer.observe(card));
                }
            });
        }, 500);
    },

    setupFaceAnimation() {
        const container = document.getElementById('hero-face-anim');
        if (!container) return;

        const glasses = container.querySelectorAll('.face-glass');
        if (glasses.length === 0) return;

        let activeIndex = 0;
        let isHovered = false;

        container.addEventListener('mouseenter', () => isHovered = true);
        container.addEventListener('mouseleave', () => isHovered = false);

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
        if (scrollWrapper) {
            scrollWrapper.addEventListener('scroll', () => {
                if (window.innerWidth <= 1024) {
                    const now = Date.now();
                    if (now - lastScrollTime > 30) {
                        pickRandomGlass();
                        lastScrollTime = now;
                    }
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
        this.data.testimonials.forEach((testim, i) => {
            const card = document.createElement('div');
            card.className = `testim-card ${i === 0 ? 'active' : ''}`;
            card.id = `testim-${i}`;

            // Dynamic font size logic for long quotes (mostly for desktop)
            const charCount = testim.quote.length;
            let fontSize = "1.8vw";
            if (charCount > 300) fontSize = "1.5vw";
            if (charCount > 600) fontSize = "1.2vw";
            if (charCount > 900) fontSize = "1.1vw";

            card.innerHTML = `
                <div class="quote-wrap">
                    <div class="quote-mark">“</div>
                    <div class="quote-text" style="--dynamic-fs: ${fontSize}">${testim.quote}</div>
                </div>
                <div class="author-info">
                    <div class="author-name">${testim.name}</div>
                    <div class="author-role">${testim.title}</div>
                </div>
            `;
            container.appendChild(card);

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
        const dots = document.querySelectorAll('.testim-controls span');

        function updateView() {
            cards.forEach((c, i) => c.classList.toggle('active', i === currentIndex));
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

        startTimer();
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

        this.spacing = 20;
        this.mouseRadius = 250; // Vastly increased proximity sphere
        this.tension = 0.03; // Much looser spring tension 
        this.dampening = 0.92; // High frictionless drift

        this.mouse = { x: -1000, y: -1000, active: false };
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
            gx = Math.max(-45, Math.min(45, window.globalGyro.gamma));
            gy = Math.max(-45, Math.min(45, window.globalGyro.beta));
            forceX_global = (gx / 45) * 1.5;
            forceY_global = (gy / 45) * 1.5;
            requiresGyroRedraw = true;
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
            let size = 1.5;
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

document.addEventListener('DOMContentLoaded', () => App.init());
