// Simple HTML component loader
const ComponentLoader = {
    async load(selector, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentPath}`);
            }
            const html = await response.text();
            const element = document.querySelector(selector);
            if (element) {
                if (selector === 'nav') {
                    element.outerHTML = html;
                } else {
                    element.innerHTML = html;
                }
            } else {
                console.warn(`Selector "${selector}" not found`);
            }
            return Promise.resolve();
        } catch (error) {
            console.error('Error loading component:', error);
            return Promise.reject(error);
        }
    }
};
