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
            const dataScript = document.getElementById('portfolio-data');
            if (dataScript) {
                const data = JSON.parse(dataScript.textContent);
                this.list = data.projects || [];
            } else {
                console.error('Portfolio data script not found');
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

        for (let i = 0; i < this.list.length; i++) {
            const index = this.list.length - i - 1;
            const project = this.list[index];
            const html = `
                <section class="portfolio" id="${project.class}" onclick="location.href='detail.html?id=${project.class}';">
                    <div class="project">
                        <div class="img ${project.class}" alt="Image"></div>
                        <h1 class="h1 title">${project.title}</h1>
                        <div class="tags-container">
                            <div class="tag">${project.tag1}</div>
                            <div class="tag">${project.tag2}</div>
                            <div class="tag">${project.tag3}</div>
                        </div>
                        <div class="view">
                            <h5>TAP TO VIEW</h5>
                        </div>
                    </div>
                </section>
            `;
            insertionPoint.after(html);

            if (project.isSpecial) {
                $(`.${project.class}`).prepend("<img src=\"img/accept.png\" class=\"accept\">");
            }
        }

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
