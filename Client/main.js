// main.js

// 1. IMPORT PATHS
import { initNavbar } from './src/components/Navbar/Navbar.js';
// Correct path based on your screenshot:
import { initHero } from './src/pages/Home/Hero/Hero.js'; 
import { initAbout } from './src/pages/Home/About_Company/About_Company.js';
import { initFounder } from './src/pages/Home/Founder/Founder.js';
import { initServices } from './src/pages/Home/Services/Services.js';
import { initTestimonials } from './src/pages/Home/Testimonials/Testimonials.js';
import { initBrand } from './src/pages/Home/Brand/Brand.js';
import { initTestimonialsText } from './src/pages/Home/Testimonal_Text/Testimonal_Text.js';
import { initContact } from './src/pages/Home/Contact/Contact.js';
import { initFooter } from './src/pages/Home/Footer/Footer.js';


// 2. LOADER FUNCTION
async function loadComponent(containerId, htmlPath, initFunction) {
    try {
        const response = await fetch(htmlPath);

        if (!response.ok) {
            throw new Error(`File not found: ${htmlPath}`);
        }

        const html = await response.text();
        
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container #${containerId} is missing in index.html`);
        }

        container.innerHTML = html;
        
        // Execute animation
        if (initFunction) {
             // Small delay to ensure DOM is ready
            setTimeout(() => initFunction(), 0);
        }

    } catch (error) {
        console.error("❌ ERROR:", error.message);
        const container = document.getElementById(containerId);
        if(container) container.innerHTML = `<p style="color:red; text-align:center;">${error.message}</p>`;
    }
}

// 3. START APP
async function startApp() {
    // Load Navbar
    await loadComponent('navbar-container', './src/components/Navbar/Navbar.html', initNavbar);

    // Load Hero (Includes /Home/ now)
    await loadComponent('hero-container', './src/pages/Home/Hero/Hero.html', initHero);

    await loadComponent('about-container', './src/pages/Home/About_Company/About_Company.html', initAbout);
    await loadComponent('founder-container', './src/pages/Home/Founder/Founder.html', initFounder);
    await loadComponent('services-container', './src/pages/Home/Services/Services.html', initServices);
    await loadComponent('testimonials-container', './src/pages/Home/Testimonials/Testimonials.html', initTestimonials);
    await loadComponent('brand-container', './src/pages/Home/Brand/Brand.html', initBrand);
    await loadComponent('testimonialsText-container', './src/pages/Home/Testimonal_Text/Testimonal_Text.html', initTestimonialsText);
    await loadComponent('contact-container', './src/pages/Home/Contact/Contact.html', initContact);
    await loadComponent('footer-container', './src/pages/Home/Footer/Footer.html', initFooter   );
}

startApp();