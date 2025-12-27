import { animate, spring, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm"

export function initFounder() {
    
    inView("#founder-section", () => {
        
        // 1. NEW: Animate Section Header
        animate(
            ".founder-header-animate",
            { opacity: [0, 1], y: [20, 0], scaleX: [0.5, 1] },
            {
                duration: 0.8,
                delay: stagger(0.2),
                easing: "ease-out"
            }
        );

        // 2. Animate Image
        animate(
            "#founder-image",
            { opacity: [0, 1], scale: [0.8, 1] },
            { 
                duration: 1.2, 
                delay: 0.4, // Added delay so it plays after header
                easing: spring({ stiffness: 100, damping: 15 }) 
            }
        );

        // 3. Animate Badge
        animate(
            "#founder-badge",
            { opacity: [0, 1], y: [20, 0] },
            { duration: 0.8, delay: 0.8, easing: "ease-out" }
        );

        // 4. Animate Text Card
        animate(
            "#founder-card",
            { opacity: [0, 1], x: [50, 0] },
            { duration: 1, delay: 0.6, easing: "ease-out" }
        );

    });
}