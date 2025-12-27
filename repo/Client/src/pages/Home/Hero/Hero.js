import { animate, stagger } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm"

export function initHero() {
    // Safety check for the text elements
    const elements = document.querySelectorAll(".hero-animate");
    if (elements.length === 0) return; 

    // Animate Text and Buttons (Slide Up)
    animate(
        ".hero-animate", 
        { opacity: [0, 1], y: [50, 0] },
        { 
            duration: 1, 
            delay: stagger(0.2), 
            easing: "ease-out" 
        }
    );

}