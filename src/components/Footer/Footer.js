import { animate, stagger, inView } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm";

export function initFooter() {

    const yearSpan = document.getElementById('copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Select all elements to animate
    const footerItems = document.querySelectorAll(".footer-animate");
    
    // Set initial state (opacity 0, pushed down slightly)
    if (footerItems.length > 0) {
        animate(footerItems, { opacity: 0, y: 30 }, { duration: 0 });
    }

    // Trigger animation when footer comes into view
    inView("#footer-section", () => {
        animate(
            ".footer-animate",
            { opacity: 1, y: 0 },
            { 
                duration: 0.8, 
                delay: stagger(0.1), // Staggers each column by 0.1s
                easing: "ease-out" 
            }
        );
    });
}