import { animate, stagger } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm"

export function initNavbar() {
    // 1. First, Fetch the HTML
    fetch('/src/components/Navbar/Navbar.html')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load Navbar');
            return response.text();
        })
        .then(html => {
            // 2. Inject the HTML into the page
            const container = document.getElementById('navbar-container');
            if (container) {
                container.innerHTML = html;
                
                // 3. NOW run your logic (because the elements finally exist!)
                setupMobileMenu();
            }
        })
        .catch(error => console.error('Error loading navbar:', error));
}

// This function holds YOUR specific logic
function setupMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    let isOpen = false;

    if (!menuBtn) return; 

    menuBtn.addEventListener('click', () => {
        isOpen = !isOpen;

        if (isOpen) {
            // Check if menuIcon exists before accessing classList
            if(menuIcon) menuIcon.classList.replace('ph-list', 'ph-x');
            mobileMenu.classList.remove('hidden');

            animate(
                mobileMenu, 
                { height: ["0px", "auto"], opacity: [0, 1] }, 
                { duration: 0.3, easing: "ease-out" }
            );

            animate(
                ".mobile-link", 
                { opacity: [0, 1], x: [-20, 0] }, 
                { delay: stagger(0.05), duration: 0.3 }
            );

        } else {
            if(menuIcon) menuIcon.classList.replace('ph-x', 'ph-list');

            const closeAnimation = animate(
                mobileMenu, 
                { height: "0px", opacity: 0 }, 
                { duration: 0.2, easing: "ease-in" }
            );

            closeAnimation.finished.then(() => {
                mobileMenu.classList.add('hidden');
            });
        }
    });
}