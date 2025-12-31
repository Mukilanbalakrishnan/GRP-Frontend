import { animate, stagger, inView, spring } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm";

const contactData = [
    { 
        type: "link",
        href: "tel:+919876543210",
        label: "Call Us Now", 
        value: "+91 98765 43210", 
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />`,
        color: "from-red-600 to-orange-500",
        bgColor: "bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent"
    },
    { 
        type: "link",
        href: "mailto:info@grp-roofing.com",
        label: "Email Support", 
        value: "info@grp-roofing.com", 
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />`,
        color: "from-blue-600 to-cyan-500",
        bgColor: "bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent"
    },
    { 
        type: "link",
        href: "https://maps.app.goo.gl/Fhanvp3cz7dybVLEA",
        target: "_blank",
        label: "Visit Our HQ", 
        value: "Coimbatore, Tamil Nadu", 
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />`,
        color: "from-green-600 to-emerald-500",
        bgColor: "bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent"
    }
];

const businessHoursData = [
  { day: "Monday – Friday", time: "9:00 AM – 6:00 PM", icon: "🏢" },
  { day: "Saturday", time: "10:00 AM – 4:00 PM", icon: "📅" },
  { day: "Sunday", time: "Emergency Only", highlight: true, icon: "🚨" }
];


export function initContact() {
    const cardGrid = document.getElementById("contact-card-grid");
    const mapBox = document.getElementById("contact-map");
    const header = document.querySelector(".contact-header-animate");
    const businessWrapper = document.getElementById("business-hours-wrapper");
    const section = document.getElementById("contact-section");

    if (!cardGrid || !mapBox || !businessWrapper || !section) return;

    // Add custom CSS animations with mobile optimizations
    const style = document.createElement('style');
    style.textContent = `
        /* Mobile optimizations */
        @media (max-width: 640px) {
            .contact-card {
                padding: 1rem !important;
                gap: 0.75rem !important;
            }
            
            .contact-card .text-lg {
                font-size: 1rem !important;
                line-height: 1.5 !important;
            }
            
            .contact-card .text-xs {
                font-size: 0.7rem !important;
            }
            
            .business-day-item {
                padding: 1rem !important;
            }
            
            .business-day-item h4 {
                font-size: 0.875rem !important;
            }
            
            .business-day-item p {
                font-size: 1rem !important;
            }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-10px) scale(1.03); }
        }
        
        @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 5px 20px rgba(30, 64, 175, 0.1); }
            50% { box-shadow: 0 10px 30px rgba(30, 64, 175, 0.2); }
        }
        
        @keyframes slide-in-right {
            from { transform: translateX(50px) rotateY(5deg); opacity: 0; }
            to { transform: translateX(0) rotateY(0); opacity: 1; }
        }
        
        @keyframes slide-in-left {
            from { transform: translateX(-50px) rotateY(-5deg); opacity: 0; }
            to { transform: translateX(0) rotateY(0); opacity: 1; }
        }
        
        @keyframes scale-in {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
            animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .animate-slide-in-right {
            animation: slide-in-right 0.6s ease-out forwards;
        }
        
        .animate-slide-in-left {
            animation: slide-in-left 0.6s ease-out forwards;
        }
        
        .animate-scale-in {
            animation: scale-in 0.5s ease-out forwards;
        }
        
        .shimmer-effect {
            background: linear-gradient(90deg, 
                rgba(255,255,255,0) 0%, 
                rgba(255,255,255,0.2) 50%, 
                rgba(255,255,255,0) 100%);
            background-size: 200% auto;
            animation: shimmer 2s infinite linear;
        }
        
        .contact-card-hover:hover {
            transform: translateY(-4px) scale(1.01);
            box-shadow: 0 15px 30px -8px rgba(30, 64, 175, 0.3);
        }
        
        @media (max-width: 768px) {
            .contact-card-hover:hover {
                transform: translateY(-2px) scale(1.005);
                box-shadow: 0 10px 20px -5px rgba(30, 64, 175, 0.2);
            }
        }
        
        .glow-border {
            position: relative;
        }
        
        .glow-border::before {
            content: '';
            position: absolute;
            inset: -1px;
            background: linear-gradient(45deg, #3b82f6, #ef4444, #3b82f6);
            border-radius: inherit;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .glow-border:hover::before {
            opacity: 0.3;
        }
        
        .business-day-item {
            position: relative;
            overflow: hidden;
        }
        
        .business-day-item::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.6s ease;
        }
        
        .business-day-item:hover::after {
            left: 100%;
        }
        
        /* Touch-friendly tap targets */
        .contact-card,
        .business-day-item {
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
        }
    `;
    document.head.appendChild(style);

    /* ---------------- CONTACT CARDS ---------------- */

    cardGrid.innerHTML = "";

    contactData.forEach((item, index) => {
        const card = document.createElement("a");
        card.href = item.href;
        if (item.target) card.target = item.target;

        card.className = `
            contact-card group relative block glow-border
            bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl sm:rounded-2xl
            p-4 sm:p-5 lg:p-6
            shadow-lg sm:shadow-xl cursor-pointer overflow-hidden contact-card-hover
            opacity-0 -translate-x-6 sm:-translate-x-10
            transition-all duration-300 ease-out
            border border-white/10
            hover:border-white/20
            active:scale-[0.98]
        `;
        
        card.style.setProperty('--delay', `${index * 0.15}s`);
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';

        card.innerHTML = `
            <!-- Animated background effect -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="absolute inset-0 ${item.bgColor}"></div>
                <div class="absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-white/5 rounded-full blur-lg sm:blur-xl -translate-y-1/3 translate-x-1/3"></div>
                <div class="absolute bottom-0 left-0 w-24 sm:w-40 h-24 sm:h-40 bg-white/5 rounded-full blur-lg sm:blur-xl translate-y-1/3 -translate-x-1/3"></div>
            </div>
            
            <!-- Shimmer effect -->
            <div class="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            
            <!-- Animated border -->
            <div class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            <div class="relative z-10 flex items-center gap-4 sm:gap-5 lg:gap-6">
                <!-- Animated icon container -->
                <div class="relative flex-shrink-0">
                    <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center 
                        group-hover:bg-white/15 group-hover:scale-105 sm:group-hover:scale-110
                        transition-all duration-300 shadow-md sm:shadow-lg
                        group-hover:shadow-xl group-hover:shadow-white/10">
                        <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300" 
                             viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            ${item.icon}
                        </svg>
                    </div>
                    <!-- Pulsing dot -->
                    <div class="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-3 sm:h-3 bg-${item.color.split('-')[1]}-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                </div>

                <!-- Text content -->
                <div class="flex-1 min-w-0">
                    <p class="text-[0.7rem] sm:text-xs uppercase text-blue-300 tracking-wider truncate
                        group-hover:text-blue-200 group-hover:translate-x-0.5 sm:group-hover:translate-x-1
                        transition-all duration-300">
                        ${item.label}
                    </p>
                    <p class="text-base sm:text-lg font-bold text-white mt-0.5 sm:mt-1 truncate
                        group-hover:text-white group-hover:translate-x-0.5 sm:group-hover:translate-x-1
                        transition-all duration-300">
                        ${item.value}
                    </p>
                </div>
                
                <!-- Arrow indicator -->
                <div class="opacity-0 -translate-x-1 sm:-translate-x-2 group-hover:opacity-70 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </div>
            </div>
            
            <!-- Bottom border effect -->
            <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-current to-transparent transform translate-x-full group-hover:-translate-x-full transition-transform duration-700 delay-75"></div>
        `;

        // Add touch/mouse animations
        const isMobile = window.innerWidth < 768;
        
        card.addEventListener('mouseenter', () => {
            animate(
                card,
                { 
                    y: isMobile ? -2 : -4,
                    scale: isMobile ? 1.005 : 1.01,
                    boxShadow: isMobile ? 
                        '0 10px 20px -5px rgba(30, 64, 175, 0.2)' : 
                        '0 15px 30px -8px rgba(30, 64, 175, 0.3)'
                },
                { duration: 0.2, easing: "ease-out" }
            );
        });

        card.addEventListener('mouseleave', () => {
            animate(
                card,
                { 
                    y: 0,
                    scale: 1,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                },
                { duration: 0.2, easing: "ease-out" }
            );
        });

        // Touch feedback for mobile
        card.addEventListener('touchstart', () => {
            animate(
                card,
                { scale: 0.98 },
                { duration: 0.1 }
            );
        });

        card.addEventListener('touchend', () => {
            animate(
                card,
                { scale: 1 },
                { duration: 0.1 }
            );
        });

        cardGrid.appendChild(card);
    });

    /* ---------------- MAP ANIMATION ---------------- */

    mapBox.innerHTML = `
        <div class="w-full h-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-2xl border border-gray-100 relative group">
            <!-- Animated overlay -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/3 group-hover:to-blue-500/5 transition-all duration-300 z-10 pointer-events-none"></div>
            
            <!-- Pulsing location indicator -->
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div class="relative">
                    <div class="w-6 h-6 sm:w-8 sm:h-8 bg-red-600 rounded-full animate-ping"></div>
                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-red-600 rounded-full"></div>
                </div>
            </div>
            
            <!-- Map frame -->
            <div class="w-full h-full transform scale-100 group-hover:scale-102 sm:group-hover:scale-105 transition-transform duration-500">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.2766627039014!2d76.9558323148008!3d11.016844492166022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1766817644608!5m2!1sen!2sin"
                    class="w-full h-full"
                    style="border:0;"
                    allowfullscreen
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
            
            <!-- Map label -->
            <div class="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md sm:shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p class="text-xs sm:text-sm font-semibold text-blue-950 flex items-center gap-1.5 sm:gap-2">
                    <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    Our Location
                </p>
            </div>
        </div>
    `;

    /* ---------------- BUSINESS HOURS ---------------- */

    businessWrapper.innerHTML = "";

    const businessSection = document.createElement("div");
    businessSection.className = `
        business-hours opacity-0 translate-y-6 sm:translate-y-8
        mt-12 sm:mt-16 md:mt-20 bg-gradient-to-r from-blue-50 to-white
        p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-blue-100 shadow-md sm:shadow-lg
        relative overflow-hidden
    `;

    businessSection.innerHTML = `
        <!-- Animated background elements -->
        <div class="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-blue-200/20 rounded-full blur-2xl sm:blur-3xl -translate-y-1/3 sm:-translate-y-1/2 translate-x-1/3 sm:translate-x-1/2"></div>
        <div class="absolute bottom-0 left-0 w-32 h-32 sm:w-64 sm:h-64 bg-red-200/20 rounded-full blur-2xl sm:blur-3xl translate-y-1/3 sm:translate-y-1/2 -translate-x-1/3 sm:-translate-x-1/2"></div>
        
        <div class="relative z-10">
            <h3 class="text-blue-950 font-bold text-xl sm:text-2xl mb-6 sm:mb-8 md:mb-10 text-center
                opacity-0 translate-y-4">
                <span class="inline-block py-1 px-3 sm:px-4 bg-blue-100 rounded-full border border-blue-200 text-sm sm:text-base">
                    Business Hours
                </span>
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                ${businessHoursData.map((item, index) => `
                    <div class="business-day-item bg-white/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-blue-100
                        shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl hover:scale-[1.01] sm:hover:scale-[1.02]
                        transition-all duration-300 cursor-pointer
                        opacity-0 translate-y-4
                        ${item.highlight ? 'border-red-200 bg-gradient-to-br from-red-50 to-white animate-pulse-glow' : ''}"
                        style="animation-delay: ${0.3 + (index * 0.1)}s">
                        
                        <div class="flex flex-col items-center text-center">
                            <div class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full ${item.highlight ? 'bg-red-100' : 'bg-blue-100'} 
                                flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4
                                group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300">
                                ${item.icon}
                            </div>
                            
                            <h4 class="font-bold text-blue-950 mb-1.5 sm:mb-2 text-sm sm:text-base md:text-lg">${item.day}</h4>
                            <p class="font-semibold ${item.highlight ? 'text-red-600' : 'text-blue-700'} text-base sm:text-lg md:text-xl">
                                ${item.time}
                            </p>
                            
                            ${item.highlight ? `
                                <div class="mt-2 sm:mt-3 md:mt-4 px-2 py-0.5 sm:px-3 sm:py-1 bg-red-100 text-red-700 text-[0.65rem] sm:text-xs font-bold rounded-full">
                                    24/7 Emergency
                                </div>
                            ` : ''}
                        </div>
                        
                        <!-- Hover effect line -->
                        <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </div>
                `).join("")}
            </div>
            
            <!-- Call to action -->
            <div class="mt-6 sm:mt-8 md:mt-10 text-center opacity-0 translate-y-4">
                <p class="text-gray-600 italic text-sm sm:text-base">
                    "We're here when you need us most"
                </p>
            </div>
        </div>
    `;

    businessWrapper.appendChild(businessSection);

    /* ---------------- ANIMATIONS ---------------- */

    const cards = document.querySelectorAll(".contact-card");
    const businessItems = businessSection.querySelectorAll('.business-day-item');
    const businessTitle = businessSection.querySelector('h3');
    const businessCTA = businessSection.querySelector('.mt-6');

    // Initial states
    animate(cards, { opacity: 0, x: -20 }, { duration: 0 });
    animate(mapBox, { opacity: 0, x: 20, scale: 0.98 }, { duration: 0 });
    animate(businessSection, { opacity: 0, y: 20, scale: 0.98 }, { duration: 0 });
    animate(businessItems, { opacity: 0, y: 15 }, { duration: 0 });
    animate(businessTitle, { opacity: 0, y: 15 }, { duration: 0 });
    animate(businessCTA, { opacity: 0, y: 15 }, { duration: 0 });

    inView("#contact-section", () => {
        // Header animation
        if (header) {
            animate(header,
                { 
                    opacity: 1, 
                    y: 0, 
                    scale: [0.97, 1],
                    filter: ["blur(8px)", "blur(0px)"]
                },
                { 
                    duration: 0.6, 
                    delay: 0.1,
                    easing: "ease-out"
                }
            );
        }

        // Cards animation
        animate(cards,
            { 
                opacity: 1, 
                x: 0,
                filter: ["blur(4px)", "blur(0px)"]
            },
            { 
                duration: 0.5, 
                delay: stagger(0.1, { start: 0.2 }),
                easing: "ease-out"
            }
        );

        // Map animation
        animate(mapBox,
            { 
                opacity: 1, 
                x: 0, 
                scale: [0.98, 1],
                filter: ["blur(4px)", "blur(0px)"]
            },
            { 
                duration: 0.6, 
                delay: 0.4,
                easing: "ease-out"
            }
        );

        // Business section animation
        animate(businessSection,
            { 
                opacity: 1, 
                y: 0, 
                scale: [0.98, 1]
            },
            { 
                duration: 0.5, 
                delay: 0.6
            }
        );

        // Business title animation
        animate(businessTitle,
            { 
                opacity: 1, 
                y: 0
            },
            { 
                duration: 0.4, 
                delay: 0.8
            }
        );

        // Business items animation
        animate(businessItems,
            { 
                opacity: 1, 
                y: 0
            },
            { 
                duration: 0.4, 
                delay: stagger(0.08, { start: 0.9 }),
                easing: "ease-out"
            }
        );

        // Business CTA animation
        animate(businessCTA,
            { 
                opacity: 1, 
                y: 0
            },
            { 
                duration: 0.4, 
                delay: 1.1
            }
        );

        // Add continuous animations only on desktop
        if (window.innerWidth >= 768) {
            setTimeout(() => {
                // Floating animation for emergency card
                const emergencyCard = businessSection.querySelector('.border-red-200');
                if (emergencyCard) {
                    animate(
                        emergencyCard,
                        { y: [0, -3, 0] },
                        {
                            duration: 2,
                            repeat: Infinity,
                            easing: "ease-in-out"
                        }
                    );
                }

                // Subtle pulse for contact cards
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        animate(
                            card,
                            { scale: [1, 1.01, 1] },
                            {
                                duration: 3,
                                repeat: Infinity,
                                delay: index * 0.5,
                                easing: "ease-in-out"
                            }
                        );
                    }, 1000);
                });
            }, 2000);
        }

    }, { margin: "-50px", amount: 0.2 });

    /* ---------------- INTERACTIVE EFFECTS ---------------- */

    // Add hover effects to business hours items
    businessItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const isMobile = window.innerWidth < 768;
            animate(
                item,
                { 
                    scale: isMobile ? 1.01 : 1.02,
                    y: isMobile ? -2 : -3,
                    boxShadow: isMobile ? 
                        '0 10px 20px rgba(30, 64, 175, 0.1)' : 
                        '0 15px 30px rgba(30, 64, 175, 0.15)'
                },
                { duration: 0.2 }
            );
        });

        item.addEventListener('mouseleave', () => {
            animate(
                item,
                { 
                    scale: 1,
                    y: 0,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                },
                { duration: 0.2 }
            );
        });

        // Touch feedback for mobile
        item.addEventListener('touchstart', () => {
            if (window.innerWidth < 768) {
                animate(
                    item,
                    { scale: 0.98 },
                    { duration: 0.1 }
                );
            }
        });

        item.addEventListener('touchend', () => {
            if (window.innerWidth < 768) {
                animate(
                    item,
                    { scale: 1 },
                    { duration: 0.1 }
                );
            }
        });
    });

    // Map hover effect
    const mapContainer = mapBox.querySelector('.group');
    if (mapContainer) {
        mapContainer.addEventListener('mouseenter', () => {
            const isMobile = window.innerWidth < 768;
            animate(
                mapContainer,
                { scale: isMobile ? 1.01 : 1.02 },
                { duration: 0.2 }
            );
        });

        mapContainer.addEventListener('mouseleave', () => {
            animate(
                mapContainer,
                { scale: 1 },
                { duration: 0.2 }
            );
        });
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reinitialize animations if needed
            const currentCards = document.querySelectorAll(".contact-card");
            const currentScale = window.innerWidth < 768 ? 0.98 : 1;
            
            animate(currentCards,
                { scale: currentScale },
                { duration: 0 }
            );
        }, 250);
    });
}