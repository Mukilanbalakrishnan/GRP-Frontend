import { animate, stagger, inView } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm";
import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";

// 1. DATA SOURCE
const testimonialTextData = [
    { 
        id: 1, 
        client: "John D., Factory Owner", 
        review: "The new industrial roofing system exceeded our expectations. The team was professional, efficient, and the quality is top-notch.", 
        rating: 5 
    },
    { 
        id: 2, 
        client: "Sarah L., Operations Manager", 
        review: "We needed a rapid waterproofing solution for our warehouse. They provided expert consulting and executed the project flawlessly.", 
        rating: 5 
    },
    { 
        id: 3, 
        client: "Michael R., Facility Director", 
        review: "Their preventive maintenance program has saved us thousands in potential repairs. Highly reliable partners.", 
        rating: 4 
    },
    { 
        id: 4, 
        client: "Emily W., Architect", 
        review: "As an architect, I value partners who understand design. Their solar integration solutions are innovative and aesthetically pleasing.", 
        rating: 5 
    },
    { 
        id: 5, 
        client: "Robert K., Plant Manager", 
        review: "Industrial-grade waterproofing that withstands extreme conditions. Their technical expertise is unmatched in the industry.", 
        rating: 5 
    },
    { 
        id: 6, 
        client: "Lisa M., Property Director", 
        review: "The roof maintenance service kept our commercial complex in perfect condition through severe weather. Responsive team.", 
        rating: 5 
    },
    { 
        id: 7, 
        client: "David C., Warehouse Manager", 
        review: "Massive warehouse roof installation completed without disrupting our 24/7 operations. Incredible planning and execution.", 
        rating: 5 
    },
    { 
        id: 8, 
        client: "Jennifer H., CEO", 
        review: "Solar integration that actually delivers on promised energy savings. Professional team from initial consultation to final inspection.", 
        rating: 5 
    }
];

// 2. HELPER: Generate Stars with animation
function generateStars(rating) {
    return Array(5).fill(0).map((_, i) => 
        `<svg class="w-5 h-5 rating-star ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-600'}" 
              viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>`
    ).join('');
}

// 3. CREATE CARD FUNCTION with enhanced colors and animations
function createTestimonialTextCard(item, isMobile, index) {
    const card = document.createElement('div');
    const stars = generateStars(item.rating);
    
    // Enhanced gradient colors
    const gradientFrom = isMobile ? "from-[#1e0094]" : "from-[#1e0094]";
    const gradientTo = isMobile ? "to-blue-900" : "to-blue-900";
    
    if (isMobile) {
        card.className = `mobile-testimonial-text-card bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-3xl p-8 flex flex-col justify-between shadow-xl border-2 border-blue-800/30 group ${index === 0 ? 'active' : ''}`;
    } else {
        card.className = `testimonial-text-card opacity-0 scale-95 group relative w-full min-h-[320px] bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-3xl p-8 flex flex-col justify-between overflow-hidden shadow-xl cursor-pointer border-2 border-blue-800/30 hover:z-10 transition-all duration-300`;
        
        // Add hover effect for desktop cards
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1.05,
                y: -15,
                rotateX: 3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1,
                y: 0,
                rotateX: 0,
                ease: "power2.out"
            });
        });
    }

    card.innerHTML = `
        <!-- Top accent bar with gradient -->
        <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-t-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left z-10"></div>

        <div class="relative z-10 flex flex-col h-full">
            <!-- Quote icon and rating -->
            <div class="flex items-start justify-between mb-6">
                <div class="quote-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" 
                         class="w-10 h-10 text-red-400">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-4.001 3.638-4.001 5.849h4v10h-9.995z"/>
                    </svg>
                </div>
                
                <!-- Rating stars -->
                <div class="flex gap-1">
                    ${stars}
                </div>
            </div>
            
            <!-- Review text -->
            <p class="review-text text-white/90 text-lg leading-relaxed italic mb-6 group-hover:text-white transition-colors duration-300">
                "${item.review}"
            </p>
            
            <!-- Client info -->
            <div class="client-info mt-auto pt-6 border-t border-blue-700/50 group-hover:border-red-500/50 transition-colors duration-300">
                <p class="text-red-300 font-bold text-sm uppercase tracking-wider group-hover:text-red-200 transition-colors duration-300">
                    ${item.client}
                </p>
            </div>
        </div>
        
        <!-- Hover sparkle effects -->
        <div class="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div class="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-ping" style="animation-delay: 0.1s"></div>
            <div class="absolute bottom-4 right-4 w-2 h-2 bg-white rounded-full animate-ping" style="animation-delay: 0.3s"></div>
        </div>
    `;

    return card;
}

// 4. MAIN INITIALIZATION
export function initTestimonialsText() {
    const desktopGrid = document.getElementById('testimonial-desktop-grid');
    const mobileContainer = document.getElementById('testimonial-mobile-container');
    const totalSlidesEl = document.getElementById('testimonial-text-total-slides');

    if (!desktopGrid || !mobileContainer) return;

    // Clear existing content
    desktopGrid.innerHTML = '';
    mobileContainer.innerHTML = '';

    // Set total slides count
    totalSlidesEl.textContent = testimonialTextData.length;

    // Create cards for desktop and mobile
    testimonialTextData.forEach((item, index) => {
        // Desktop cards
        const desktopCard = createTestimonialTextCard(item, false, index);
        desktopGrid.appendChild(desktopCard);

        // Mobile cards
        const mobileCard = createTestimonialTextCard(item, true, index);
        mobileContainer.appendChild(mobileCard);
    });

    // Initialize based on screen size
    if (window.innerWidth < 768) {
        initMobileSlider();
    } else {
        initDesktopAnimations();
    }

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth < 768) {
                initMobileSlider();
            } else {
                initDesktopAnimations();
            }
        }, 250);
    });
}

// 5. MOBILE SLIDER with enhanced animations
function initMobileSlider() {
    const mobileCards = document.querySelectorAll('.mobile-testimonial-text-card');
    const prevBtn = document.getElementById('testimonial-text-prev');
    const nextBtn = document.getElementById('testimonial-text-next');
    const currentSlideEl = document.getElementById('testimonial-text-current-slide');
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    if (!mobileCards.length) return;
    
    function updateMobileSlider(direction = null) {
        // Hide all cards with animation
        mobileCards.forEach(card => {
            card.classList.remove('active', 'slide-left', 'slide-right');
            gsap.to(card, {
                duration: 0.3,
                opacity: 0,
                scale: 0.9,
                x: direction === 'next' ? -40 : 40,
                ease: "power2.in"
            });
        });
        
        // Show current card with animation
        const activeCard = mobileCards[currentSlide];
        
        // Determine animation class
        let animationClass = '';
        if (direction === 'prev') {
            animationClass = 'slide-left';
        } else if (direction === 'next') {
            animationClass = 'slide-right';
        }
        
        activeCard.classList.add('active', animationClass);
        
        // Animate the card
        gsap.fromTo(activeCard,
            {
                opacity: 0,
                scale: 0.95,
                x: direction === 'prev' ? -40 : direction === 'next' ? 40 : 0,
                y: 20
            },
            {
                duration: 0.6,
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                ease: "back.out(1.4)",
                onComplete: () => {
                    // Add floating animation
                    gsap.to(activeCard, {
                        duration: 3,
                        y: -5,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut"
                    });
                }
            }
        );
        
        // Update counter
        currentSlideEl.textContent = currentSlide + 1;
    }
    
    // Navigation buttons with enhanced animations
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
            } else {
                currentSlide = mobileCards.length - 1;
            }
            updateMobileSlider('prev');
            
            // Button animation
            gsap.to(prevBtn, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentSlide < mobileCards.length - 1) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            updateMobileSlider('next');
            
            // Button animation
            gsap.to(nextBtn, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
        });
    }
    
    // Auto-rotate every 6 seconds
    autoSlideInterval = setInterval(() => {
        if (currentSlide < mobileCards.length - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateMobileSlider('next');
    }, 6000);
    
    // Pause auto-slide on hover
    mobileCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        card.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => {
                if (currentSlide < mobileCards.length - 1) {
                    currentSlide++;
                } else {
                    currentSlide = 0;
                }
                updateMobileSlider('next');
            }, 6000);
        });
    });
    
    // Initial animation for first card
    // updateMobileSlider();
    // ✅ SHOW FIRST CARD IMMEDIATELY (NO HIDING)
mobileCards.forEach(card => {
    card.classList.remove('active', 'slide-left', 'slide-right');
    gsap.set(card, { opacity: 0, scale: 0.9, x: 0, y: 0 });
});

const firstCard = mobileCards[0];
firstCard.classList.add('active');
gsap.set(firstCard, {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0
});

// Update counter
currentSlideEl.textContent = 1;

    
    // Animate the header for mobile
    gsap.to(".text-header-animate", { 
        duration: 1.2, 
        opacity: 1, 
        y: 0, 
        scale: 1,
        ease: "elastic.out(1, 0.5)",
        delay: 0.2
    });
}

// 6. DESKTOP ANIMATIONS with enhanced effects
function initDesktopAnimations() {
    const desktopCards = document.querySelectorAll('#testimonial-desktop-grid .testimonial-text-card');
    const header = document.querySelector(".text-header-animate");
    
    if (!desktopCards.length) return;
    
    // Set initial state
    gsap.set(desktopCards, { opacity: 0, y: 50, scale: 0.95 });
    gsap.set(header, { opacity: 0, y: -20 });
    
    // Animate on view
    inView("#testimonials-text-section", () => {
        // Animate header
        gsap.to(header, { 
            duration: 1, 
            opacity: 1, 
            y: 0, 
            scale: 1,
            ease: "elastic.out(1, 0.5)",
            delay: 0.2
        });

        // Animate cards with enhanced stagger
        gsap.to(desktopCards, {
            duration: 0.9,
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: {
                amount: 0.5,
                from: "random",
                grid: "auto",
                ease: "back.out(1.7)"
            },
            delay: 0.4,
            onComplete: () => {
                // Add individual floating animations
                desktopCards.forEach((card, index) => {
                    gsap.to(card, {
                        duration: 3 + (index * 0.2),
                        y: -8,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: index * 0.1
                    });
                });
            }
        });

        // Add 3D tilt effect on mouse move for desktop cards
        desktopCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = (x - centerX) / 25;
                const rotateX = (centerY - y) / 25;
                
                gsap.to(card, {
                    duration: 0.3,
                    rotateX: rotateX,
                    rotateY: rotateY,
                    scale: 1.05,
                    y: -15,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.5,
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    y: 0,
                    ease: "elastic.out(1, 0.5)"
                });
            });
        });
    }, { margin: "-100px" });
}