import { animate, stagger } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm"

// 1. Image Configuration
let heroState = { images: [] };

async function loadHeroImages() {
    const res = await fetch(
        "http://localhost/GRP-Backend/api/hero/hero-list.php"
    );
    const result = await res.json();

    if (!result.status) return;

    // convert DB paths → full URLs
    heroState.images = result.data.map(img =>
        "http://localhost/GRP-Backend/" + img.image_path
    );

    initBackgroundSlider(); // ✅ START SLIDER AFTER DATA LOAD
}


document.addEventListener("DOMContentLoaded", loadHeroImages);


export function initHero() {
    loadHeroImages();      // fetch first
    initTextAnimations();  // text animation independent
}


// Function to handle the Background Slideshow
function initBackgroundSlider() {
    const sliderContainer = document.getElementById("hero-slider");
    if (!sliderContainer || heroState.images.length === 0) return;

    sliderContainer.innerHTML = ""; // clear old images

    heroState.images.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = `Hero Background ${index + 1}`;
        img.className =
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000";

        img.classList.add(index === 0 ? "opacity-100" : "opacity-0");
        sliderContainer.appendChild(img);
    });

    let currentIndex = 0;
    const images = sliderContainer.querySelectorAll("img");

    setInterval(() => {
        images[currentIndex].classList.replace("opacity-100", "opacity-0");
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.replace("opacity-0", "opacity-100");
    }, 4000);
}


// Function to handle Text Animations
function initTextAnimations() {
    const elements = document.querySelectorAll(".hero-animate");
    if (elements.length === 0) return; 

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