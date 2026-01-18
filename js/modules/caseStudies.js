// Case Studies module
const CaseStudies = {
    list: [],

    init() {
        this.loadData();
        this.renderCaseStudies();
    },

    loadData() {
        try {
            const dataScript = document.getElementById('portfolio-data');
            if (dataScript) {
                const data = JSON.parse(dataScript.textContent);
                this.list = data.caseStudies || [];
            } else {
                console.error('Portfolio data script not found');
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
