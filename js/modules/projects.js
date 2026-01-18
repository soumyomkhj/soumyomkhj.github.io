// Projects module
const Projects = {
    list: [
        { class: 'graphy', title: 'Graphy Website Redesign', tag1: 'Redesign', tag2: 'UX Audit', tag3: '2023', isSpecial: false  },
        { class: 'unacademy', title: 'Unacademy', tag1: 'Product Designer', tag2: '2022', tag3: '2024', isSpecial: false },
        { class: 'clay-time', title: 'Clay Time', tag1: 'Tangible Interaction', tag2: 'Image Recognition', tag3: 'Python', isSpecial: true },
        { class: 'create-share', title: 'Create \'n\' Share', tag1: 'Interaction Design', tag2: 'User Study', tag3: 'UX', isSpecial: false },
        { class: 'youtube-coach', title: 'Youtube Coach', tag1: 'Instructional Design', tag2: 'UX', tag3: 'UI', isSpecial: false },
        { class: 'jagat-jamini', title: 'Jagat Jamini', tag1: 'VR', tag2: 'Spatial Audio', tag3: 'Interaction Design', isSpecial: false },
        { class: 'bonfire', title: 'Bonfire!', tag1: 'Interaction Design', tag2: 'Media & Sensory', tag3: 'UX', isSpecial: false },
        { class: 'exalt-body', title: 'Exalt Body', tag1: 'Design Fiction', tag2: 'Short Film', tag3: 'Interaction Design', isSpecial: false },
        { class: 'photo', title: 'Photography', tag1: 'Hobby', tag2: 'Fine Arts', tag3: 'Travel', isSpecial: false },
        { class: 'newzera', title: 'Newzera Summer Intern', tag1: 'UI', tag2: 'Prototype', tag3: 'UX', isSpecial: false },
        { class: 'univinks', title: 'Univinks UX & Branding', tag1: 'UX', tag2: 'Branding', tag3: 'UI', isSpecial: false }
    ],

    init() {
        this.renderProjects();
        this.setupClickHandlers();
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
                <section class="portfolio" id="${project.class}" onclick="location.href='${project.class}.html';">
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
