import { animate, spring, stagger } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm"

export function initAbout() {
    // 1. Accordion Logic
    const items = document.querySelectorAll('.accordion-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            items.forEach(el => {
                el.classList.remove('active', 'flex-[3]');
                el.classList.add('flex-[1]');
                const overlay = el.querySelector('div[class*="bg-"]');
                if(overlay) {
                    overlay.classList.remove('bg-red-900/40');
                    overlay.classList.add('bg-blue-900/60');
                }
            });

            item.classList.remove('flex-[1]');
            item.classList.add('active', 'flex-[3]');
            const activeOverlay = item.querySelector('div[class*="bg-"]');
            if(activeOverlay) {
                activeOverlay.classList.remove('bg-blue-900/60');
                activeOverlay.classList.add('bg-red-900/40');
            }
        });
    });

    // 2. Animate Section Header (NEW)
    animate(
        ".about-header-animate",
        { opacity: [0, 1], y: [20, 0], scaleX: [0.5, 1] },
        {
            duration: 0.8,
            delay: stagger(0.2),
            easing: "ease-out"
        }
    );

    // 3. Animate Bars
    animate(
        ".accordion-item",
        { opacity: [0, 1], y: [50, 0] },
        {
            duration: 0.8,
            delay: 0.4,
            easing: "ease-out"
        }
    );

    // 4. Animate Circle
    animate(
        "#about-circle",
        { opacity: [0, 1], scale: [0.8, 1] },
        {
            duration: 1.2,
            delay: 0.6,
            easing: spring({ stiffness: 100, damping: 15 })
        }
    );
}