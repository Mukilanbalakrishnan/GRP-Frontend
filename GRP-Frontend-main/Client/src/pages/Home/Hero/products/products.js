
// Mobile Menu Toggle
const btn = document.getElementById("menu-btn");
const nav = document.getElementById("mobile-menu");

if (btn && nav) {
    btn.addEventListener("click", () => {
        nav.classList.toggle("hidden");
    });
}

// Scroll to Top Logic
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.remove("opacity-0", "pointer-events-none");
            scrollToTopBtn.classList.add("opacity-100", "pointer-events-auto");
        } else {
            scrollToTopBtn.classList.add("opacity-0", "pointer-events-none");
            scrollToTopBtn.classList.remove("opacity-100", "pointer-events-auto");
        }
    });

    // Smooth scroll to top
    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Navbar Shadow on Scroll
const navbar = document.getElementById("navbar");
if (navbar) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            navbar.classList.add("shadow-md");
        } else {
            navbar.classList.remove("shadow-md");
        }
    });
}
