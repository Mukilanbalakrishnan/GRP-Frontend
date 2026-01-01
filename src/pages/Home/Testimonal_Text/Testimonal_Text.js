import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

gsap.registerPlugin(ScrollTrigger);

// --- CONFIGURATION ---
const DESKTOP_CARDS_PER_PAGE = 3; 
const AUTO_SLIDE_DELAY = 4000; // 4 seconds
let desktopPage = 0;
let autoSlideInterval;

// --- DATA ---
const reviews = [
    { id: 1, name: "John Doe", role: "Factory Owner", text: "The industrial roofing system exceeded our expectations. Professional, efficient, and top-notch quality.", rating: 5 },
    { id: 2, name: "Sarah Lee", role: "Ops Manager", text: "Rapid waterproofing solution executed flawlessly. They truly understand industrial needs.", rating: 5 },
    { id: 3, name: "Mike Ross", role: "Facility Director", text: "Preventive maintenance saved us thousands. Highly reliable partners for the long term.", rating: 4 },
    { id: 4, name: "Emily White", role: "Lead Architect", text: "Innovative solar integration that respects the building's aesthetic. A pleasure to work with.", rating: 5 },
    { id: 5, name: "Robert King", role: "Plant Manager", text: "Waterproofing that withstands extreme chemical exposure. Unmatched technical expertise.", rating: 5 },
    { id: 6, name: "Lisa Miller", role: "Property Director", text: "Kept our complex running during severe weather. The most responsive team we've hired.", rating: 5 },
];

// --- HELPER: Star Generator ---
function getStars(rating) {
    return Array(5).fill(0).map((_, i) => 
        `<svg class="w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600/30'}" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`
    ).join('');
}

// --- COMPONENT: Card with Updated Colors ---
function createCard(item, isMobile) {
    const card = document.createElement('div');
    
    // We define the "Target Look" (from your screenshot) as variables to ensure consistency
    // Screenshot shows a light blue to purple gradient
    const activeGradient = "bg-gradient-to-br from-[#1e0094] to-[#16007a]";

    const activeShadow = "shadow-2xl shadow-blue-500/40";
    const activeBorder = "border-blue-300/50";
    
    // Darker default state for Desktop (before hover)
    const inactiveGradient = "bg-gradient-to-br from-[#1e0094] to-[#16007a]";

    let baseClasses = `
        relative rounded-3xl p-8 flex flex-col justify-between 
        shadow-xl overflow-hidden group transition-all duration-500 ease-out cursor-pointer 
    `;
    
    if(isMobile) {
        // MOBILE: Permanently apply the "Screenshot" look
        card.className = `
            ${baseClasses} 
            ${activeGradient} ${activeShadow} border ${activeBorder}
            min-w-[85vw] snap-center
        `;
    } else {
        // DESKTOP: Default is Dark Blue, Hover becomes "Screenshot" look
        card.className = `
            ${baseClasses} 
            ${inactiveGradient} border border-white/10 opacity-0 translate-y-8
            hover:${activeShadow} 
            hover:-translate-y-3 hover:scale-[1.03] hover:border-blue-300/50
            hover:bg-gradient-to-br hover:from-blue-400 hover:to-purple-600
            active:scale-[1.01] active:translate-y-0
        `;
    }

    // Visibility of decorative elements
    const decorativeOpacity = isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100';
    const borderOpacity = isMobile ? 'opacity-20 blur-md' : 'opacity-0 group-hover:opacity-20 blur-sm group-hover:blur-md';

    card.innerHTML = `
        <div class="absolute inset-0 ${decorativeOpacity} transition-all duration-700">
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-300/30 via-purple-300/20 to-blue-300/30 blur-xl"></div>
            <div class="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'scale-150' : 'group-hover:scale-150'} transition-transform duration-1000"></div>
            <div class="absolute bottom-0 right-0 w-40 h-40 bg-purple-900/10 rounded-full translate-x-1/2 translate-y-1/2 ${isMobile ? 'scale-150' : 'group-hover:scale-150'} transition-transform duration-1000 delay-200"></div>
        </div>
        
        <div class="absolute -inset-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 rounded-3xl ${borderOpacity} transition-all duration-500"></div>
        
        <div class="absolute inset-0 overflow-hidden ${decorativeOpacity} transition-opacity duration-500">
            <div class="absolute top-4 left-6 w-2 h-2 bg-white/40 rounded-full animate-ping ${isMobile ? 'animate-none' : 'group-hover:animate-none'}" style="animation-delay: 0.1s"></div>
            <div class="absolute top-8 right-10 w-1 h-1 bg-blue-100/60 rounded-full animate-ping ${isMobile ? 'animate-none' : 'group-hover:animate-none'}" style="animation-delay: 0.3s"></div>
            <div class="absolute bottom-10 left-12 w-1.5 h-1.5 bg-purple-100/50 rounded-full animate-ping ${isMobile ? 'animate-none' : 'group-hover:animate-none'}" style="animation-delay: 0.5s"></div>
        </div>
        
        <div class="relative z-10">
            <div class="mb-6 relative">
                <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm 
                    ${isMobile ? 'scale-110 rotate-12 bg-white/20 border-white/40 shadow-lg shadow-white/10' : 'group-hover:scale-110 group-hover:rotate-12 group-hover:bg-white/20 group-hover:border-white/40 group-hover:shadow-lg group-hover:shadow-white/10'}
                    transition-all duration-300 border border-white/10">
                    <svg class="w-6 h-6 text-blue-200 ${isMobile ? 'text-white scale-110' : 'group-hover:text-white group-hover:scale-110'} transition-all duration-300" 
                         fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z"></path>
                    </svg>
                </div>
            </div>

            <p class="text-white/90 text-lg leading-relaxed font-medium mb-8 
                ${isMobile ? 'text-white scale-[1.01]' : 'group-hover:text-white group-hover:scale-[1.01]'}
                transition-all duration-300 relative">
                "${item.text}"
                <span class="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-blue-200 via-white to-transparent ${isMobile ? 'w-full' : 'w-0 group-hover:w-full'} transition-all duration-500"></span>
            </p>

            <div class="mt-auto flex items-center justify-between border-t border-white/10 pt-6 
                ${isMobile ? 'border-white/30' : 'group-hover:border-white/30'} transition-colors duration-300">
                <div class="relative">
                    <h4 class="text-white font-bold text-lg tracking-wide 
                        ${isMobile ? 'translate-x-1' : 'group-hover:translate-x-1'}
                        transition-all duration-300 relative">
                        ${item.name}
                    </h4>
                    <p class="text-blue-200 text-xs uppercase tracking-wider font-semibold 
                        ${isMobile ? 'text-white translate-x-1' : 'group-hover:text-white group-hover:translate-x-1'}
                        transition-all duration-300 mt-1">
                        ${item.role}
                    </p>
                </div>
                
                <div class="flex gap-0.5 bg-black/20 px-2 py-1 rounded-lg backdrop-blur-sm border border-white/5
                    ${isMobile ? 'bg-black/10 border-white/20 scale-105 shadow-md' : 'group-hover:bg-black/10 group-hover:border-white/20 group-hover:scale-105 group-hover:shadow-md'}
                    transition-all duration-300">
                    ${getStars(item.rating)}
                </div>
            </div>
        </div>
        
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-1/4 left-1/4 w-1 h-1 bg-white/30 rounded-full opacity-0 ${isMobile ? 'opacity-100 animate-float' : 'group-hover:opacity-100 group-hover:animate-float'}" style="animation-delay: 0.1s"></div>
            <div class="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-100/40 rounded-full opacity-0 ${isMobile ? 'opacity-100 animate-float' : 'group-hover:opacity-100 group-hover:animate-float'}" style="animation-delay: 0.3s"></div>
            <div class="absolute bottom-1/3 left-1/3 w-1 h-1 bg-purple-100/40 rounded-full opacity-0 ${isMobile ? 'opacity-100 animate-float' : 'group-hover:opacity-100 group-hover:animate-float'}" style="animation-delay: 0.5s"></div>
        </div>
    `;

    // Add GSAP animation on mouse enter/leave (Desktop Only)
    card.addEventListener('mouseenter', (e) => {
        if (!isMobile) { 
            gsap.to(card, {
                scale: 1.03,
                y: -3,
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Animate the glow effect
            gsap.to(card.querySelector('.absolute.-inset-0.5'), {
                opacity: 0.2,
                duration: 0.4
            });
        }
    });

    card.addEventListener('mouseleave', (e) => {
        if (!isMobile) {
            gsap.to(card, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(card.querySelector('.absolute.-inset-0.5'), {
                opacity: 0,
                duration: 0.3
            });
        }
    });

    return card;
}

// --- RENDER LOGIC ---
function renderDesktop() {
    const grid = document.getElementById("testimonial-desktop-grid");
    const counter = document.getElementById("text-current-slide");
    const label = document.getElementById("text-slide-label");
    
    if (!grid) return;

    // Desktop Update: Shows Page Number (e.g., 01)
    if(counter) counter.textContent = `0${desktopPage + 1}`;
    if(label) label.textContent = "PAGE";

    // Fade Out Old Cards
    const oldCards = Array.from(grid.children);
    if(oldCards.length > 0) {
        gsap.to(oldCards, {
            opacity: 0,
            y: -20,
            scale: 0.95,
            duration: 0.3,
            stagger: 0.05,
            onComplete: () => {
                grid.innerHTML = "";
                injectNewCards();
            }
        });
    } else {
        injectNewCards();
    }

    function injectNewCards() {
        const start = desktopPage * DESKTOP_CARDS_PER_PAGE;
        const end = start + DESKTOP_CARDS_PER_PAGE;
        const items = reviews.slice(start, end);

        items.forEach(item => grid.appendChild(createCard(item, false)));

        // Animate In
        gsap.fromTo(grid.children, 
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.2)" }
        );
    }
}

function initMobile() {
    const track = document.getElementById("testimonial-text-track");
    const counter = document.getElementById("text-current-slide");
    const label = document.getElementById("text-slide-label");
    
    if(!track) return;
    
    // Only re-render if empty to prevent jitter on resize
    if(track.children.length === 0) {
        track.innerHTML = "";
        reviews.forEach(item => track.appendChild(createCard(item, true)));
    }

    // Mobile Update: Shows Card Count (e.g., 1 / 6)
    if(counter) counter.textContent = `1 / ${reviews.length}`;
    if(label) label.textContent = "SLIDE";

    // Add Scroll Listener for Mobile Counter
    track.addEventListener('scroll', () => {
        const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth : 0;
        if(cardWidth > 0) {
            const index = Math.round(track.scrollLeft / (cardWidth + 16)); // 16 is gap
            const current = Math.min(Math.max(index + 1, 1), reviews.length);
            counter.textContent = `${current} / ${reviews.length}`;
        }
    });
}

// --- AUTO SLIDE CONTROLLER ---
function manageAutoSlide() {
    if(autoSlideInterval) clearInterval(autoSlideInterval);

    autoSlideInterval = setInterval(() => {
        if(window.innerWidth >= 768) {
            // DESKTOP AUTO SLIDE
            const totalPages = Math.ceil(reviews.length / DESKTOP_CARDS_PER_PAGE);
            if(desktopPage < totalPages - 1) { 
                desktopPage++; 
            } else { 
                desktopPage = 0; 
            }
            renderDesktop();
        } else {
            // MOBILE AUTO SLIDE
            const track = document.getElementById("testimonial-text-track");
            if(track && track.firstElementChild) {
                const cardWidth = track.firstElementChild.offsetWidth + 16; 
                const maxScroll = track.scrollWidth - track.clientWidth;
                
                if(track.scrollLeft + 10 >= maxScroll) {
                    track.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    track.scrollBy({ left: cardWidth, behavior: 'smooth' });
                }
            }
        }
    }, AUTO_SLIDE_DELAY);
}

function pauseAutoSlide() {
    if(autoSlideInterval) clearInterval(autoSlideInterval);
}

// --- INITIALIZATION ---
export function initTestimonialsText() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
            50% { transform: translateY(-10px) scale(1.1); opacity: 0.7; }
        }
        .animate-float {
            animation: float 3s ease-in-out infinite;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
    `;
    document.head.appendChild(style);
    
    // 1. Initial Render
    if(window.innerWidth >= 768) renderDesktop();
    else initMobile();

    // 2. Start Auto Slide
    manageAutoSlide();

    // 3. Header Animation
    gsap.to(".text-header-animate", {
        scrollTrigger: "#testimonials-text-section",
        opacity: 1, y: 0, duration: 1, ease: "power3.out"
    });

    gsap.to(".text-controls-animate", {
        scrollTrigger: "#testimonials-text-section",
        opacity: 1, y: 0, duration: 0.8, delay: 0.4
    });

    // 4. Event Listeners
    const prevBtn = document.getElementById("text-prev-btn");
    const nextBtn = document.getElementById("text-next-btn");
    const track = document.getElementById("testimonial-text-track");
    const grid = document.getElementById("testimonial-desktop-grid");
    const totalPages = Math.ceil(reviews.length / DESKTOP_CARDS_PER_PAGE);

    if(grid) {
        grid.addEventListener('mouseenter', pauseAutoSlide);
        grid.addEventListener('mouseleave', manageAutoSlide);
    }
    if(track) {
        track.addEventListener('touchstart', pauseAutoSlide);
        track.addEventListener('touchend', () => setTimeout(manageAutoSlide, 2000)); 
    }

    if(prevBtn && nextBtn) {
        [prevBtn, nextBtn].forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                pauseAutoSlide();
                gsap.to(btn, { scale: 1.05, duration: 0.2, ease: "power2.out" });
            });
            btn.addEventListener('mouseleave', () => {
                manageAutoSlide();
                gsap.to(btn, { scale: 1, duration: 0.2, ease: "power2.out" });
            });
        });

        prevBtn.addEventListener("click", () => {
            if(window.innerWidth >= 768) {
                if(desktopPage > 0) { desktopPage--; renderDesktop(); }
            } else {
                track.scrollBy({ left: -300, behavior: 'smooth' });
            }
        });

        nextBtn.addEventListener("click", () => {
            if(window.innerWidth >= 768) {
                if(desktopPage < totalPages - 1) { desktopPage++; renderDesktop(); }
                else { desktopPage = 0; renderDesktop(); }
            } else {
                track.scrollBy({ left: 300, behavior: 'smooth' });
            }
        });
    }

    // 5. Resize Handler
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if(window.innerWidth >= 768) renderDesktop();
            else initMobile();
        }, 200);
    });
}