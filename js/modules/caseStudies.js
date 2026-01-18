// Case Studies module
const CaseStudies = {
    list: [
        {
            class: 'nextlevel',
            title: 'NextLevel',
            description: 'Enhanced user growth and engagement through viral loops for NextLevel, an innovative social platform empowering job seekers.',
            image: 'img/nextlevel.png',
            link: 'nextlevel.html'
        },
        {
            class: 'elsa',
            title: 'Grammar & Vocab Games',
            description: 'Crafted innovative ELSA Grammar & Vocab Games to transform learning into an engaging and interactive experience.',
            image: 'img/elsa.png',
            link: 'elsa.html'
        }
    ],

    init() {
        this.renderCaseStudies();
    },

    renderCaseStudies() {
        const caseCardsContainer = $('.case-cards');
        if (caseCardsContainer.length === 0) return;

        caseCardsContainer.empty();

        for (let i = 0; i < this.list.length; i++) {
            const caseStudy = this.list[i];
            const html = `
                <div class="case-card" style="align-items: flex-start;" onclick="location.href='${caseStudy.link}'">
                    <img src="${caseStudy.image}" alt="${caseStudy.title}" class="case-card-img" loading="lazy" style="opacity: 0; transition: opacity 0.3s;">
                    <div class="case-card-content">
                        <h4>${caseStudy.title}</h4>
                        <p>${caseStudy.description}</p>
                    </div>
                </div>
            `;
            caseCardsContainer.append(html);
        }

        this.setupImageFadeIn();
    },

    setupImageFadeIn() {
        const caseCardImages = document.querySelectorAll('.case-card-img');
        caseCardImages.forEach(img => {
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
