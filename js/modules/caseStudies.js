// Case Studies module
const CaseStudies = {
    list: [],

    init() {
        this.loadData();
        this.renderCaseStudies();
    },

    loadData() {
        try {
            if (typeof window.PortfolioData !== 'undefined') {
                this.list = window.PortfolioData.caseStudies || [];
            } else {
                console.error('Portfolio data not found');
                this.list = [];
            }
        } catch (error) {
            console.error('Error loading case studies data:', error);
            this.list = [];
        }
    },

    renderCaseStudies() {
        const caseCardsContainer = $('.case-cards');
        if (caseCardsContainer.length === 0) return;

        caseCardsContainer.empty();

        for (let i = 0; i < this.list.length; i++) {
            const caseStudy = this.list[i];
            const html = `
                <div class="project" style="cursor: pointer;" onclick="location.href='detail.html?id=${caseStudy.class}'">
                    <div class="content">
                        <h4 class="title">${caseStudy.title}</h4>
                        <p class="description">${caseStudy.description}</p>
                        <span class="view-work">View Work &rarr;</span>
                    </div>
                    <div class="image-container">
                        <img src="${caseStudy.image}" alt="${caseStudy.title}" class="case-card-img" loading="lazy">
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
