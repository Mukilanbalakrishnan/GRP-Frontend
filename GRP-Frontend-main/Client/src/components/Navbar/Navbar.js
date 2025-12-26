import { animate, stagger } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm"

export function initNavbar() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    let isOpen = false;

    if (!menuBtn) return; // Guard clause in case element isn't found

    menuBtn.addEventListener('click', () => {
        isOpen = !isOpen;

        if (isOpen) {
            menuIcon.classList.replace('ph-list', 'ph-x');
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
            menuIcon.classList.replace('ph-x', 'ph-list');

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