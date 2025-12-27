import { animate, stagger, inView } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm";

export function initFooter() {
    
    // Select all elements to animate
    const footerItems = document.querySelectorAll(".footer-animate");
    
    // Set initial state (just to be safe)
    if (footerItems.length > 0) {
        animate(footerItems, { opacity: 0, y: 30 }, { duration: 0 });
    }

    // Trigger animation when footer is in view
    inView("#footer-section", () => {
        animate(
            ".footer-animate",
            { opacity: 1, y: 0, scaleX: 1 },
            { 
                duration: 0.8, 
                delay: stagger(0.1), 
                easing: "ease-out" 
            }
        );
    });
}