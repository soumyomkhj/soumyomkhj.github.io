const Scroll = {
    init() {
        this.setupScrollHandlers();
    },

    setupScrollHandlers() {
        window.addEventListener('scroll', () => {
            const frame = document.querySelector('.ui-frame');
            if (frame) {
                if (window.scrollY > 50) {
                    frame.classList.add('scrolled');
                } else {
                    frame.classList.remove('scrolled');
                }
            }
        });

        $(".text-hello, .text-name, .c-tl").click(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        $(".scroll").click(() => {
            const about = document.querySelector('.about-con');
            if (about) {
                window.scrollTo({ top: about.offsetTop - 80, behavior: 'smooth' });
            }
        });
        
        $(".expandable-nav a").click(function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    }
};
// Text to animate
const aboutText = 'I have been designing <b>practical website and mobile app</b> experiences for 8 years.';
const target = document.getElementById('about-anim');

function splitToSpans(html) {
    // Helper to wrap each letter with span, preserves <b> blocks
    const parser = new DOMParser();
    const frag = parser.parseFromString('<span>'+html+'</span>', 'text/html').body.firstChild;

    function wrap(node) {
        let nodes = [];
        node.childNodes.forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                child.textContent.split('').forEach(char => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.classList.add('ab-letter');
                    nodes.push(span);
                });
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                const newEl = document.createElement(child.tagName.toLowerCase());
                newEl.innerHTML = wrap(child).map(n => n.outerHTML || n.textContent).join('');
                nodes.push(newEl);
            }
        });
        return nodes;
    }

    return wrap(frag);
}

// Clear target and inject spans
target.innerHTML = '';
splitToSpans(aboutText).forEach(node => {
    target.appendChild(node);
});

// Intersection Observer for scroll trigger
let aboutAnimated = false;
function animateLetters() {
    if (aboutAnimated) return;
    aboutAnimated = true;
    const letters = target.querySelectorAll('.ab-letter');
    letters.forEach((span, i) => {
        setTimeout(() => {
            span.classList.add('blood-in');
        }, i * 30);
    });
}

// CSS for animation
const css = `
.ab-letter {
    opacity: 0;
    filter: blur(3px);
    display: inline-block;
    transition: opacity 0.4s cubic-bezier(.28,.46,.52,1.13), filter 0.4s cubic-bezier(.28,.46,.52,1.13);
}
.ab-letter.blood-in {
    opacity: 1;
    filter: blur(0);
    color: #13272D;
    animation: ab-flare 0.4s;
}
@keyframes ab-flare {
    0% { color: #13272D; text-shadow: 0 0 16px #13272D, 0 0 8px #13272D; }
    100% { color: #13272D; text-shadow: none; }
}
`;
const style = document.createElement('style');
style.innerHTML = css;
document.head.appendChild(style);

// Observer to trigger animation when in view
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateLetters();
        observer.disconnect();
    }
}, { threshold: 0.2 });
observer.observe(target);