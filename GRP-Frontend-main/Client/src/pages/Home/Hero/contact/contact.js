// Navbar Logic (Vanilla JS)
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    let isOpen = false;

    if (menuBtn && mobileMenu && menuIcon) {
        menuBtn.addEventListener('click', () => {
            isOpen = !isOpen;

            if (isOpen) {
                // Open Menu
                menuIcon.classList.replace('ph-list', 'ph-x');
                mobileMenu.classList.remove('hidden');

                // Simple entry animation
                requestAnimationFrame(() => {
                    mobileMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    mobileMenu.style.opacity = '1';
                    mobileMenu.style.transform = 'translateY(0)';
                });
            } else {
                // Close Menu
                menuIcon.classList.replace('ph-x', 'ph-list');

                // Simple exit animation
                mobileMenu.style.opacity = '0';
                mobileMenu.style.transform = 'translateY(-10px)';

                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
        });
    }
});

// Form Logic (Basic interaction)
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        btn.innerText = 'Sending...';
        btn.classList.add('opacity-75', 'cursor-not-allowed');

        // Simulate sending
        setTimeout(() => {
            alert('Message Sent! (Simulation)');
            form.reset();
            btn.innerText = originalText;
            btn.classList.remove('opacity-75', 'cursor-not-allowed');
        }, 1500);
    });
}
