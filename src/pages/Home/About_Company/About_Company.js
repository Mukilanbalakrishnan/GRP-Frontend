// import { animate, spring, stagger } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm"

// export function initAbout() {
//     // 1. Accordion Logic
//     const items = document.querySelectorAll('.accordion-item');
//     items.forEach(item => {
//         item.addEventListener('click', () => {
//             items.forEach(el => {
//                 el.classList.remove('active', 'flex-[3]');
//                 el.classList.add('flex-[1]');
//                 const overlay = el.querySelector('div[class*="bg-"]');
//                 if(overlay) {
//                     overlay.classList.remove('bg-red-900/40');
//                     overlay.classList.add('bg-blue-900/60');
//                 }
//             });

//             item.classList.remove('flex-[1]');
//             item.classList.add('active', 'flex-[3]');
//             const activeOverlay = item.querySelector('div[class*="bg-"]');
//             if(activeOverlay) {
//                 activeOverlay.classList.remove('bg-blue-900/60');
//                 activeOverlay.classList.add('bg-red-900/40');
//             }
//         });
//     });

//     // 2. Animate Section Header (NEW)
//     animate(
//         ".about-header-animate",
//         { opacity: [0, 1], y: [20, 0], scaleX: [0.5, 1] },
//         {
//             duration: 0.8,
//             delay: stagger(0.2),
//             easing: "ease-out"
//         }
//     );

//     // 3. Animate Bars
//     animate(
//         ".accordion-item",
//         { opacity: [0, 1], y: [50, 0] },
//         {
//             duration: 0.8,
//             delay: 0.4,
//             easing: "ease-out"
//         }
//     );

//     // 4. Animate Circle
//     animate(
//         "#about-circle",
//         { opacity: [0, 1], scale: [0.8, 1] },
//         {
//             duration: 1.2,
//             delay: 0.6,
//             easing: spring({ stiffness: 100, damping: 15 })
//         }
//     );
// }






import { animate, spring, stagger } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm"

export function initAbout() {
    
    // --- 1. ACCORDION LOGIC (AUTO + CLICK) ---
    const items = document.querySelectorAll('.accordion-item');
    let currentIndex = 0;
    let intervalId;

    // Function to expand a specific item
    function activateItem(index) {
        currentIndex = index; // Update tracker

        items.forEach((el, i) => {
            const overlay = el.querySelector('div[class*="bg-"]');

            if (i === index) {
                // Activate this item
                el.classList.remove('flex-[1]');
                el.classList.add('active', 'flex-[3]');
                
                // Change overlay to Red
                if(overlay) {
                    overlay.classList.remove('bg-blue-900/60');
                    overlay.classList.add('bg-red-900/40');
                }
            } else {
                // Deactivate others
                el.classList.remove('active', 'flex-[3]');
                el.classList.add('flex-[1]');
                
                // Reset overlay to Blue
                if(overlay) {
                    overlay.classList.remove('bg-red-900/40');
                    overlay.classList.add('bg-blue-900/60');
                }
            }
        });
    }

    // Start the Auto-Rotation
    function startAutoPlay() {
        // Clear any existing timer first
        if (intervalId) clearInterval(intervalId);
        
        intervalId = setInterval(() => {
            // Calculate next index (loops back to 0 after the last one)
            const nextIndex = (currentIndex + 1) % items.length;
            activateItem(nextIndex);
        }, 2000); // 5 Seconds
    }

    // Initialize Click Listeners
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            activateItem(index);
            startAutoPlay(); // Reset timer so it doesn't jump immediately
        });
    });

    // Start it up!
    startAutoPlay();


    // --- 2. ANIMATIONS (Standard Motion One) ---

    // Animate Header
    animate(
        ".about-header-animate",
        { opacity: [0, 1], y: [20, 0], scaleX: [0.5, 1] },
        { duration: 0.8, delay: stagger(0.2), easing: "ease-out" }
    );

    // Animate Accordion Entrance
    animate(
        ".accordion-item",
        { opacity: [0, 1], y: [50, 0] },
        { duration: 0.8, delay: 0.4, easing: "ease-out" }
    );

    // Animate Circle Image
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