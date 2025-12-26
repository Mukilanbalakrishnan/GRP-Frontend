// main.js

// 1. IMPORT PATHS
import { initNavbar } from './src/components/Navbar/Navbar.js';
// Correct path based on your screenshot:
import { initHero } from './src/pages/Home/Hero/Hero.js'; 


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
}

startApp();