// Testimonials module
const Testimonials = {
    list: [
        {
            quote: 'Soumyo is comprehensive in his research, meticulous in his approach, and comprehensive in his communications. He is a self-taught designer and I have seen him grow from an absolute beginner to one of the best I have worked with. His constant endeavor to learn is what drives his growth. He understands business requirements and excels not only at designing but also at defining a consistent design language and identity for the brands he works with.',
            name: 'Pratyush Shrivastav',
            title: 'Founder | Univinks'
        },
        {
            quote: 'Soumyo is my junior from college and an amazing teammate to work with. He was handed the responsibility of website designing for ProBano\'s replatformed website and our rebranding. He did a really good job on both. His knowledge of design combined with his fresh perspective, dynamic mindset, sincerity and hard work are qualities that I admire. I am sure he\'ll spread awesomeness wherever he works.',
            name: 'Aditya Bose',
            title: 'Founder | CEO | Probano'
        }
    ],

    init() {
        this.renderTestimonials();
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
                    <p>${testimonial.quote}</p>
                    <h2 class="h1">${testimonial.name}</h2>
                    <p>${testimonial.title}</p>
                </div>
            `;
            testimonialsContainer.append(html);
        }
    }
};
