// Projects module
const Projects = {
    list: [],

    init() {
        this.loadData();
        this.renderProjects();
        this.setupClickHandlers();
    },

    loadData() {
        try {
            if (typeof window.PortfolioData !== 'undefined') {
                this.list = window.PortfolioData.projects || [];
            } else {
                console.error('Portfolio data not found');
                this.list = [];
            }
        } catch (error) {
            console.error('Error loading projects data:', error);
            this.list = [];
        }
    },

    renderProjects() {
        const insertionPoint = $('#case-studies');
        if (insertionPoint.length === 0) return;

        // Remove any existing project sections
        $('.portfolio').remove();
        $('.project-item').remove();

        if ($('.projects-grid').length === 0) {
            insertionPoint.after('<div class="projects-grid"></div>');
        }
        const grid = $('.projects-grid');

        for (let i = 0; i < this.list.length; i++) {
            const index = this.list.length - i - 1;
            const project = this.list[index];
            const html = `
                <div class="project-item" id="${project.class}" onclick="location.href='detail.html?id=${project.class}';">
                    <div class="project" style="display: contents;">
                        <div class="img-bg ${project.class}"></div>
                    </div>
                    <div class="project-item-dots"></div>
                    <div class="hover-slide-up">
                        <h4>${project.title}</h4>
                        <p>${project.tag1} &bull; ${project.tag2}</p>
                    </div>
                </div>
            `;
            grid.append(html);
        }

        // Initialize images manually if needed by existing lazy loaders
        this.setupImageFadeIn();
    },

    setupClickHandlers() {
        $(".img, .case-card").click(() => {
            Preloader.showPreloader();
        });

        $(".home").click(() => {
            Preloader.showPreloader();
        });

        $(".project").click(() => {
            Preloader.showPreloader();
        });
    },

    setupImageFadeIn() {
        const projectImages = document.querySelectorAll('.project img, .accept');
        projectImages.forEach(img => {
            if (img.complete && img.naturalHeight !== 0) {
                img.style.opacity = '1';
            } else {
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
                img.addEventListener('error', function() {
                    this.style.opacity = '1';
                });
            }
        });
    }
};
