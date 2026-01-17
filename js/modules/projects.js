// Projects module
const Projects = {
    list: [
        { class: 'graphy', title: 'Graphy Website Redesign', tag1: 'Redesign', tag2: 'UX Audit', tag3: '2023' },
        { class: 'unacademy', title: 'Unacademy', tag1: 'Product Designer', tag2: '2022', tag3: '2024' },
        { class: 'clay-time', title: 'Clay Time', tag1: 'Tangible Interaction', tag2: 'Image Recognition', tag3: 'Python' },
        { class: 'create-share', title: 'Create \'n\' Share', tag1: 'Interaction Design', tag2: 'User Study', tag3: 'UX' },
        { class: 'youtube-coach', title: 'Youtube Coach', tag1: 'Instructional Design', tag2: 'UX', tag3: 'UI' },
        { class: 'jagat-jamini', title: 'Jagat Jamini', tag1: 'VR', tag2: 'Spatial Audio', tag3: 'Interaction Design' },
        { class: 'bonfire', title: 'Bonfire!', tag1: 'Interaction Design', tag2: 'Media & Sensory', tag3: 'UX' },
        { class: 'exalt-body', title: 'Exalt Body', tag1: 'Design Fiction', tag2: 'Short Film', tag3: 'Interaction Design' },
        { class: 'photo', title: 'Photography', tag1: 'Hobby', tag2: 'Fine Arts', tag3: 'Travel' },
        { class: 'newzera', title: 'Newzera Summer Intern', tag1: 'UI', tag2: 'Prototype', tag3: 'UX' },
        { class: 'univinks', title: 'Univinks UX & Branding', tag1: 'UX', tag2: 'Branding', tag3: 'UI' }
    ],

    init() {
        this.renderProjects();
        this.setupClickHandlers();
    },

    renderProjects() {
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
            $(".container>section:nth-child(3)").after(html);
        }
        $(".clay-time").prepend("<img src=\"../img/accept.png\" class=\"accept\">");
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
    }
};
