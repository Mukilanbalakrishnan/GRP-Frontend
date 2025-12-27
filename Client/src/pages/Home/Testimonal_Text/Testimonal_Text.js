import { animate, stagger, inView } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm";

// 1. DATA SOURCE (Original simple data)
const testimonialTextData = [
    {
        id: 1,
        client: "John D., Factory Owner",
        review: "The new industrial roofing system exceeded our expectations. The team was professional, efficient, and the quality is top-notch. Our energy costs have already dropped.",
        rating: 5
    },
    {
        id: 2,
        client: "Sarah L., Operations Manager",
        review: "We needed a rapid waterproofing solution for our warehouse. They provided expert consulting and executed the project flawlessly with zero downtime for our operations.",
        rating: 5
    },
    {
        id: 3,
        client: "Michael R., Facility Director",
        review: "Their preventive maintenance program has saved us thousands in potential repairs. Highly reliable partners for any large-scale industrial facility.",
        rating: 4
    },
    {
        id: 4,
        client: "Emily W., Architect",
        review: "As an architect, I value partners who understand design and functionality. Their solar integration solutions are innovative and aesthetically pleasing.",
        rating: 5
    },
    {
        id: 5,
        client: "Robert K., Plant Manager",
        review: "Industrial-grade waterproofing that withstands extreme conditions. Their technical expertise is unmatched in the industry. Project completed 2 weeks ahead of schedule.",
        rating: 5
    },
    {
        id: 6,
        client: "Lisa M., Property Director",
        review: "The roof maintenance service kept our commercial complex in perfect condition through severe weather. Responsive, thorough, and professional team throughout.",
        rating: 5
    },
    {
        id: 7,
        client: "David C., Warehouse Manager",
        review: "Massive warehouse roof installation completed without disrupting our 24/7 operations. Incredible planning and execution from start to finish.",
        rating: 5
    },
    {
        id: 8,
        client: "Jennifer H., CEO",
        review: "Solar integration that actually delivers on promised energy savings. Professional team from initial consultation to final inspection. Highly recommended.",
        rating: 5
    }
];

// 2. INITIALIZATION FUNCTION
export function initTestimonialsText() {
    const gridContainer = document.getElementById('testimonial-text-grid');
    if (!gridContainer) return;

    // Clear existing content
    gridContainer.innerHTML = '';

    // Generate star rating HTML
    function generateStars(rating) {
        return Array(5).fill(0).map((_, i) => 
            `<svg class="w-5 h-5 rating-star ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-600'}" 
                  viewBox="0 0 20 20" style="animation-delay: ${i * 0.1}s">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>`
        ).join('');
    }

    // Render HTML Cards with enhanced animations
    testimonialTextData.forEach((item, index) => {
        const card = document.createElement('div');
        
        const stars = generateStars(item.rating);

        card.className = `
            testimonial-card
            relative w-full min-h-[320px] bg-gradient-to-br from-[#1e0094] to-blue-900 rounded-3xl 
            p-6 sm:p-8 flex flex-col justify-between
            overflow-hidden shadow-xl cursor-pointer border-2 border-blue-800/30
            hover:z-10 transition-all duration-300 group
        `;

        card.innerHTML = `
            <!-- Top accent bar -->
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left z-10 rounded-t-3xl"></div>

            <div class="relative z-10 flex flex-col h-full">
                <!-- Quote icon and rating -->
                <div class="flex items-start justify-between mb-6">
                    <div class="quote-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" 
                             class="w-12 h-12 text-red-400">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-4.001 3.638-4.001 5.849h4v10h-9.995z"/>
                        </svg>
                    </div>
                    
                    <!-- Rating stars -->
                    <div class="flex gap-1">
                        ${stars}
                    </div>
                </div>
                
                <!-- Review text -->
                <p class="text-white/90 text-base sm:text-lg leading-relaxed italic flex-grow mb-4 line-clamp-5 group-hover:line-clamp-none transition-all duration-300">
                    "${item.review}"
                </p>
                
                <!-- Client info -->
                <div class="mt-6 pt-6 border-t border-blue-700/50">
                    <p class="text-red-300 font-bold text-sm uppercase tracking-wider">${item.client}</p>
                </div>
            </div>
            
            <!-- Hover indicator -->
            <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg class="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
            </div>
        `;

        // Add 3D tilt effect on mousemove
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 20;
            const rotateX = (centerY - y) / 20;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateY(-12px) 
                scale(1.03)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });

        // Click to expand/collapse review
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                const review = card.querySelector('p');
                review.classList.toggle('line-clamp-5');
            }
        });

        gridContainer.appendChild(card);
    });

    // 3. ANIMATION (Motion One)
    
    const header = document.querySelector(".text-header-animate");
    const cardsAll = document.querySelectorAll(".testimonial-card");

    // Set Initial State
    if (header) animate(header, { opacity: 0, y: -20 }, { duration: 0 });
    if (cardsAll.length) animate(cardsAll, { opacity: 0, y: 50 }, { duration: 0 });

    // Animate on View
    inView("#testimonials-text-section", () => {

    // HEADER
    if (header) {
        animate(
            header,
            { opacity: 1, y: 0, scale: 1 },
            { duration: 0.8, easing: "ease-out" } // ✅ FIXED
        );
    }

    // CARDS ENTRY
    animate(
        cardsAll,
        { 
            opacity: 1, 
            y: 0,
            rotateY: [10, 0],
            rotateX: [5, 0]
        },
        {
            duration: 0.9,
            delay: stagger(0.1, { start: 0.4 }),
            easing: [0.34, 1.56, 0.64, 1], // ✅ back-like, Motion-safe
            onComplete: () => {

                // SUBTLE FLOATING
                animate(
                    cardsAll,
                    { y: [0, -8, 0] },
                    {
                        duration: 4,
                        repeat: Infinity,
                        easing: "ease-in-out", // ✅ FIXED
                        delay: stagger(0.2)
                    }
                );
            }
        }
    );
    }, { margin: "-100px" });
}