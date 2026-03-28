// Testimonials module
const Testimonials = {
    list: [],

    init() {
        this.loadData();
        this.renderTestimonials();
    },

    loadData() {
        try {
            if (typeof window.PortfolioData !== 'undefined') {
                this.list = window.PortfolioData.testimonials || [];
            } else {
                console.error('Portfolio data not found');
                this.list = [];
            }
        } catch (error) {
            console.error('Error loading testimonials data:', error);
            this.list = [];
        }
    },

    renderTestimonials() {
        const testimonialsContainer = $('.testimonials-container');
        if (testimonialsContainer.length === 0) return;

        testimonialsContainer.empty();

        for (let i = 0; i < this.list.length; i++) {
            const testimonial = this.list[i];
            const isActive = i === 0 ? ' active' : '';
            const html = `
                <div class="educard${isActive}">
                    <div class="quote-text">${testimonial.quote}</div>
                    <div class="author-row">
                        <div class="author-name">${testimonial.name}</div>
                        <div class="author-title">${testimonial.title}</div>
                    </div>
                </div>
            `;
            testimonialsContainer.append(html);
        }
    }
};
