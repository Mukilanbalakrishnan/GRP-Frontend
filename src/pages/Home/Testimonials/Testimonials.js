// import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";

// // 1. ENHANCED DATA SOURCE - Now 8 cards for testing
// export const testimonialData = [
//     { 
//         id: 1, 
//         name: "Robert Fox",
//         role: "Factory Manager",
//         company: "SteelWorks Inc",
//         title: "Industrial Roofing", 
//         videoUrl: "https://youtube.com/shorts/6gExsLRc8ow?si=r1619CbP1eeqm-Rs", 
//         thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
//         rating: 5,
//         quote: "Saved us millions in maintenance",
//         duration: "1:24"
//     },
//     { 
//         id: 2, 
//         name: "Jane Cooper",
//         role: "Homeowner",
//         company: "",
//         title: "Residential Roof", 
//         videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
//         thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
//         rating: 5,
//         quote: "Home value increased by 15%",
//         duration: "2:15"
//     },
//     { 
//         id: 3, 
//         name: "Guy Hawkins",
//         role: "Architect",
//         company: "Design+Build",
//         title: "Perfect Match", 
//         videoUrl: "https://www.instagram.com/reel/C3_xyZqvK7a/",
//         thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
//         rating: 4,
//         quote: "Matched our architectural vision",
//         duration: "0:45"
//     },
//     { 
//         id: 4, 
//         name: "Cody Fisher",
//         role: "Site Engineer",
//         company: "BuildRight",
//         title: "Most Reliable", 
//         videoUrl: "https://www.youtube.com/watch?v=ysz5S6P_bsu",
//         thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
//         rating: 5,
//         quote: "Best team in 15 years",
//         duration: "1:55"
//     },
//     { 
//         id: 5, 
//         name: "Sarah Johnson",
//         role: "Building Manager",
//         company: "Urban Complex",
//         title: "Waterproofing", 
//         videoUrl: "https://www.youtube.com/watch?v=ysz5S6P_bsu",
//         thumbnail: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=400&auto=format&fit=crop",
//         rating: 5,
//         quote: "Solved all leak issues",
//         duration: "1:30"
//     },
//     { 
//         id: 6, 
//         name: "Michael Chen",
//         role: "Solar Consultant",
//         company: "Green Energy",
//         title: "Solar Integration", 
//         videoUrl: "https://www.youtube.com/watch?v=ysz5S6P_bsu",
//         thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
//         rating: 4,
//         quote: "Perfect panel integration",
//         duration: "2:10"
//     },
//     { 
//         id: 7, 
//         name: "Alex Morgan",
//         role: "Project Manager",
//         company: "Skyline Const.",
//         title: "On Time Delivery", 
//         videoUrl: "https://www.youtube.com/watch?v=ysz5S6P_bsu",
//         thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
//         rating: 5,
//         quote: "Completed 2 weeks early",
//         duration: "1:45"
//     },
//     { 
//         id: 8, 
//         name: "Lisa Wang",
//         role: "Property Owner",
//         company: "",
//         title: "Modern Design", 
//         videoUrl: "https://www.youtube.com/watch?v=ysz5S6P_bsu",
//         thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
//         rating: 5,
//         quote: "Beautiful modern finish",
//         duration: "1:20"
//     }
// ];

// // --- HELPER FUNCTIONS ---

// function isInstagram(url) {
//     return url.includes("instagram.com");
// }

// function getYouTubeId(url) {
//     try {
//         const urlObj = new URL(url);
//         if (urlObj.pathname.startsWith('/shorts/')) return urlObj.pathname.split('/')[2];
//         if (urlObj.hostname === 'youtu.be') return urlObj.pathname.slice(1);
//         if (urlObj.hostname.includes('youtube.com')) return urlObj.searchParams.get('v');
//         return null;
//     } catch (e) { return null; }
// }

// function getInstagramId(url) {
//     try {
//         const urlObj = new URL(url);
//         const parts = urlObj.pathname.split('/').filter(Boolean);
//         if (parts[0] === 'reel' || parts[0] === 'p') return parts[1];
//         return null;
//     } catch (e) { return null; }
// }

// function getThumbnail(item) {
//     if (item.thumbnail) return item.thumbnail;
//     if (isInstagram(item.videoUrl)) {
//         return "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&auto=format&fit=crop";
//     }
//     const videoId = getYouTubeId(item.videoUrl);
//     if (videoId) {
//         return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
//     }
//     return "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=400&auto=format&fit=crop";
// }

// // --- ENHANCED MODAL ---

// function createVideoModal() {
//     if (document.getElementById('testimonial-video-modal')) return;

//     const modal = document.createElement('div');
//     modal.id = 'testimonial-video-modal';
//     modal.className = `fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl opacity-0 pointer-events-none transition-all duration-500 p-4`;
    
//     modal.innerHTML = `
//         <div class="relative w-full max-w-6xl h-full flex items-center justify-center">
//             <button id="testimonial-close-modal" class="absolute -top-12 right-0 md:top-0 md:-right-12 z-50 text-white hover:text-red-500 transition-all duration-300 group">
//                 <div class="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 group-hover:bg-red-600/30 group-hover:border-red-500/50 group-hover:rotate-90 transition-all duration-300">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
//                         <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                 </div>
//             </button>
            
//             <div id="testimonial-player-container" class="relative bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 transform scale-95 transition-all duration-500">
//                 <iframe id="testimonial-video-iframe" class="w-full h-full" src="" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
//             </div>
//         </div>
//     `;

//     document.body.appendChild(modal);

//     document.getElementById('testimonial-close-modal').addEventListener('click', closeVideoModal);
//     modal.addEventListener('click', (e) => {
//         if (e.target === modal || e.target.parentElement === modal) closeVideoModal();
//     });
// }

// function openVideoModal(videoUrl) {
//     const modal = document.getElementById('testimonial-video-modal');
//     const iframe = document.getElementById('testimonial-video-iframe');
//     const container = document.getElementById('testimonial-player-container');
    
//     let embedSrc = '';
//     let isVertical = false;

//     if (isInstagram(videoUrl)) {
//         const instaId = getInstagramId(videoUrl);
//         if (!instaId) return;
//         embedSrc = `https://www.instagram.com/reel/${instaId}/embed/`;
//         isVertical = true;
//     } else {
//         const ytId = getYouTubeId(videoUrl);
//         if (!ytId) return;
//         if (videoUrl.includes("/shorts/")) isVertical = true; 
//         embedSrc = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3`;
//     }

//     container.className = "relative bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 transition-all duration-500";
    
//     if (isVertical) {
//         container.classList.add('w-full', 'max-w-[360px]', 'aspect-[9/16]', 'h-[85vh]');
//     } else {
//         container.classList.add('w-full', 'max-w-5xl', 'aspect-video');
//     }

//     iframe.src = embedSrc;
    
//     modal.classList.remove('opacity-0', 'pointer-events-none');
//     setTimeout(() => {
//         container.classList.remove('scale-95');
//         container.classList.add('scale-100');
//     }, 50);
// }

// function closeVideoModal() {
//     const modal = document.getElementById('testimonial-video-modal');
//     const iframe = document.getElementById('testimonial-video-iframe');
//     const container = document.getElementById('testimonial-player-container');

//     container.classList.remove('scale-100');
//     container.classList.add('scale-95');
//     modal.classList.add('opacity-0', 'pointer-events-none');
    
//     setTimeout(() => { iframe.src = ""; }, 300);
// }

// // --- CREATE CARD FUNCTION ---

// function createTestimonialCard(item, container, isMobile, index) {
//     const card = document.createElement('div');
//     const thumbUrl = getThumbnail(item);
    
//     card.className = isMobile 
//         ? `mobile-testimonial-card testimonial-card group relative w-full aspect-9/16
//            min-h-[380px] bg-gradient-to-br from-blue-950/90 via-blue-900/80 to-blue-950/90
//            rounded-xl overflow-hidden shadow-lg cursor-pointer 
//            transition-all duration-500 ease-out
//            hover:shadow-2xl hover:shadow-blue-600/30 
//            hover:scale-[1.03] hover:-translate-y-1
//            border border-white/10 hover:border-blue-500/40 ${index === 0 ? 'active' : ''}`
//         : `testimonial-card opacity-0 scale-95
//            group relative w-full aspect-9/16
//            min-h-[450px] xl:min-h-[480px]
//            bg-gradient-to-br from-blue-950/90 via-blue-900/80 to-blue-950/90
//            rounded-xl md:rounded-2xl overflow-hidden 
//            shadow-lg md:shadow-xl cursor-pointer 
//            transition-all duration-500 ease-out
//            hover:shadow-2xl hover:shadow-blue-600/30 
//            hover:scale-[1.03] hover:-translate-y-1 md:hover:-translate-y-2
//            border border-white/10 hover:border-blue-500/40`;

//     card.innerHTML = `
//         <!-- Background Image -->
//         <div class="absolute inset-0 overflow-hidden">
//             <img src="${thumbUrl}" alt="${item.name}" 
//                  class="absolute inset-0 w-full h-full object-cover 
//                         opacity-70 group-hover:opacity-80 
//                         transition-all duration-800 ease-out
//                         group-hover:scale-110">
            
//             <!-- Gradient Overlay -->
//             <div class="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-950/40 to-blue-950/20 
//                         group-hover:via-blue-950/30 transition-all duration-500"></div>
            
//             <!-- Animated Glow Effect -->
//             <div class="testimonial-glow-effect"></div>
//         </div>

//         <!-- Top Badge -->
//         <div class="absolute top-3 left-3 z-20">
//             <div class="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 
//                         transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 
//                         transition-all duration-500">
//                 <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
//                 </svg>
//                 <span class="text-xs font-bold text-white">${item.rating}.0</span>
//             </div>
//         </div>

//         <!-- Play Button -->
//         <div class="absolute top-3 right-3 z-20">
//             <div class="w-10 h-10 bg-gradient-to-br from-red-600 via-red-500 to-red-700 
//                         rounded-full flex items-center justify-center
//                         shadow-xl border border-white/20
//                         transform transition-all duration-500
//                         group-hover:scale-110 group-hover:rotate-12 group-hover:border-red-500/60
//                         hover:from-red-500 hover:via-red-400 hover:to-red-600
//                         cursor-pointer group/play">
//                 <svg class="w-4 h-4 text-white ml-0.5 group-hover/play:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M8 5v14l11-7z"/>
//                 </svg>
//             </div>
//         </div>

//         <!-- Video Duration -->
//         <div class="absolute top-16 right-3 z-20">
//             <div class="bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded-md 
//                         transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 
//                         transition-all duration-500 delay-100">
//                 <span class="text-xs font-semibold text-white">${item.duration}</span>
//             </div>
//         </div>

//         <!-- Content -->
//         <div class="relative z-10 h-full flex flex-col justify-end p-4">
//             <!-- Platform Badge -->
//             <div class="mb-3">
//                 <span class="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full
//                             ${isInstagram(item.videoUrl) 
//                                 ? 'bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-pink-500/30 text-pink-200 border border-pink-500/40' 
//                                 : 'bg-gradient-to-r from-red-500/30 via-orange-500/30 to-red-500/30 text-red-200 border border-red-500/40'}
//                             backdrop-blur-md shadow-lg">
//                     ${isInstagram(item.videoUrl) ? 'IG' : 'YT'}
//                 </span>
//             </div>

//             <!-- Title -->
//             <h3 class="text-lg font-bold text-white mb-2 leading-tight 
//                        transform transition-all duration-500 
//                        group-hover:-translate-y-1 group-hover:text-blue-100">
//                 ${item.title}
//             </h3>

//             <!-- Quote -->
//             <p class="text-blue-100 text-sm mb-4 opacity-90 leading-relaxed
//                       transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 
//                       transition-all duration-500 delay-100">
//                 "${item.quote}"
//             </p>

//             <!-- User Info -->
//             <div class="flex items-center gap-2 pt-3 border-t border-white/20
//                         transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 
//                         transition-all duration-500 delay-150">
//                 <div class="relative">
//                     <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 
//                                 flex items-center justify-center border border-white/20
//                                 transform group-hover:scale-110 transition-transform duration-300">
//                         <span class="text-white font-bold text-xs">${item.name.split(' ').map(n => n[0]).join('')}</span>
//                     </div>
//                     <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-blue-950"></div>
//                 </div>
//                 <div class="flex-1 min-w-0">
//                     <p class="text-white font-semibold text-xs truncate">${item.name}</p>
//                     <p class="text-blue-300 text-xs opacity-90 truncate">${item.role}${item.company ? ` • ${item.company}` : ''}</p>
//                 </div>
//             </div>
//         </div>

//         <!-- Bottom Accent Line -->
//         <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-blue-500 to-blue-600 
//                     transform scale-x-0 group-hover:scale-x-100 
//                     transition-transform duration-700 origin-left ease-out"></div>
//     `;

//     card.addEventListener('click', (e) => {
//         if (!e.target.closest('.cursor-pointer')) return;
//         openVideoModal(item.videoUrl);
//     });

//     // Enhanced 3D Tilt Effect for BOTH desktop AND mobile cards
//     card.addEventListener('mousemove', (e) => {
//         const rect = card.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;
        
//         const centerX = rect.width / 2;
//         const centerY = rect.height / 2;
        
//         const rotateY = (x - centerX) / 20;
//         const rotateX = (centerY - y) / 20;
        
//         // Apply 3D effect on all devices (but only for the active card on mobile)
//         if (!isMobile || card.classList.contains('active')) {
//             card.style.transform = `
//                 perspective(1200px) 
//                 rotateX(${rotateX}deg) 
//                 rotateY(${rotateY}deg) 
//                 scale(1.03) 
//                 translateY(-2px)
//             `;
            
//             // Update glow effect position
//             const glow = card.querySelector('.testimonial-glow-effect');
//             if (glow) {
//                 glow.style.setProperty('--mouse-x', `${x}px`);
//                 glow.style.setProperty('--mouse-y', `${y}px`);
//             }
//         }
//     });

//     card.addEventListener('mouseleave', () => {
//         if (!isMobile || card.classList.contains('active')) {
//             card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale(1) translateY(0)';
//         }
//     });

//     container.appendChild(card);
// }

// // --- MAIN INITIALIZATION FUNCTION ---

// export function initTestimonials() {
//     const desktopGrid = document.getElementById('testimonials-desktop-grid');
//     const mobileSliderContainer = document.getElementById('testimonials-mobile-container');
//     const currentSlideEl = document.getElementById('testimonial-current-slide');
//     const totalSlidesEl = document.getElementById('testimonial-total-slides');

//     if (!desktopGrid || !mobileSliderContainer) return;

//     createVideoModal();
//     desktopGrid.innerHTML = '';
//     mobileSliderContainer.innerHTML = '';

//     // Set total slides count
//     totalSlidesEl.textContent = testimonialData.length;

//     // Create desktop cards
//     testimonialData.forEach((item, index) => {
//         createTestimonialCard(item, desktopGrid, false, index);
//     });

//     // Create mobile cards
//     testimonialData.forEach((item, index) => {
//         createTestimonialCard(item, mobileSliderContainer, true, index);
//     });

//     // Initialize based on screen size
//     if (window.innerWidth < 768) {
//         initMobileTestimonialSlider();
//     } else {
//         initDesktopTestimonials();
//     }

//     // Handle resize
//     let resizeTimeout;
//     window.addEventListener('resize', () => {
//         clearTimeout(resizeTimeout);
//         resizeTimeout = setTimeout(() => {
//             if (window.innerWidth < 768) {
//                 initMobileTestimonialSlider();
//             } else {
//                 initDesktopTestimonials();
//             }
//         }, 250);
//     });
// }

// // --- MOBILE SLIDER SETUP ---

// function initMobileTestimonialSlider() {
//     const mobileCards = document.querySelectorAll('.mobile-testimonial-card');
//     const prevBtn = document.getElementById('testimonial-prev-btn');
//     const nextBtn = document.getElementById('testimonial-next-btn');
//     const currentSlideEl = document.getElementById('testimonial-current-slide');
    
//     let currentSlide = 0;
    
//     if (!mobileCards.length) return;
    
//     function updateMobileSlider() {
//         // Hide all cards
//         mobileCards.forEach(card => {
//             card.classList.remove('active');
//             // Reset transform when card is hidden
//             card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale(1) translateY(0)';
//         });
        
//         // Show current card
//         const activeCard = mobileCards[currentSlide];
//         activeCard.classList.add('active');
        
//         // Update counter
//         currentSlideEl.textContent = currentSlide + 1;
        
//         // Run GSAP animation for the newly active card
//         gsap.fromTo(activeCard, 
//             { opacity: 0, scale: 0.95, y: 20 },
//             { 
//                 duration: 0.8, 
//                 opacity: 1, 
//                 scale: 1,
//                 y: 0,
//                 ease: "back.out(1.7)",
//                 onComplete: () => {
//                     // Add floating animation to active mobile card
//                     gsap.to(activeCard, {
//                         duration: 3,
//                         y: -3,
//                         repeat: -1,
//                         yoyo: true,
//                         ease: "sine.inOut"
//                     });
//                 }
//             }
//         );
//     }
    
//     // Navigation buttons
//     if (prevBtn) {
//         prevBtn.addEventListener('click', () => {
//             if (currentSlide > 0) {
//                 currentSlide--;
//             } else {
//                 currentSlide = mobileCards.length - 1;
//             }
//             updateMobileSlider();
//         });
//     }
    
//     if (nextBtn) {
//         nextBtn.addEventListener('click', () => {
//             if (currentSlide < mobileCards.length - 1) {
//                 currentSlide++;
//             } else {
//                 currentSlide = 0;
//             }
//             updateMobileSlider();
//         });
//     }
    
//     // Auto-rotate every 5 seconds (optional)
//     let autoSlideInterval = setInterval(() => {
//         if (currentSlide < mobileCards.length - 1) {
//             currentSlide++;
//         } else {
//             currentSlide = 0;
//         }
//         updateMobileSlider();
//     }, 5000);
    
//     // Pause auto-slide on hover
//     mobileCards.forEach(card => {
//         card.addEventListener('mouseenter', () => {
//             clearInterval(autoSlideInterval);
//         });
        
//         card.addEventListener('mouseleave', () => {
//             autoSlideInterval = setInterval(() => {
//                 if (currentSlide < mobileCards.length - 1) {
//                     currentSlide++;
//                 } else {
//                     currentSlide = 0;
//                 }
//                 updateMobileSlider();
//             }, 5000);
//         });
//     });
    
//     // Initial animation for first card
//     updateMobileSlider();
    
//     // Also animate the header for mobile
//     gsap.to(".testimonial-header-animate", { 
//         duration: 1.2, 
//         opacity: 1, 
//         y: 0, 
//         scale: 1,
//         ease: "elastic.out(1, 0.5)",
//         delay: 0.2
//     });
// }

// // --- DESKTOP GRID SETUP ---

// function initDesktopTestimonials() {
//     const desktopCards = document.querySelectorAll('#testimonials-desktop-grid .testimonial-card');
    
//     if (!desktopCards.length) return;
    
//     // ENHANCED GSAP ANIMATIONS
//     gsap.to(".testimonial-header-animate", { 
//         duration: 1.2, 
//         opacity: 1, 
//         y: 0, 
//         scale: 1,
//         ease: "elastic.out(1, 0.5)",
//         delay: 0.2
//     });

//     gsap.to("#testimonials-desktop-grid .testimonial-card", { 
//         duration: 0.9, 
//         opacity: 1, 
//         scale: 1,
//         y: 0,
//         stagger: 0.1, 
//         ease: "back.out(1.7)", 
//         delay: 0.4,
//         onComplete: () => {
//             // Subtle breathing animation
//             gsap.to("#testimonials-desktop-grid .testimonial-card", {
//                 duration: 3,
//                 y: -3,
//                 repeat: -1,
//                 yoyo: true,
//                 ease: "sine.inOut",
//                 stagger: 0.2
//             });
//         }
//     });
// }

// // Add floating animation style
// const style = document.createElement('style');
// style.textContent = `
//     @keyframes testimonialFloat {
//         0%, 100% { transform: translateY(0px); }
//         50% { transform: translateY(-10px); }
//     }
    
//     .testimonial-floating {
//         animation: testimonialFloat 6s ease-in-out infinite;
//     }
    
//     /* Responsive adjustments */
//     @media (max-width: 640px) {
//         .mobile-testimonial-card {
//             min-height: 380px !important;
//         }
//     }
    
//     @media (min-width: 641px) and (max-width: 768px) {
//         .mobile-testimonial-card {
//             min-height: 400px !important;
//         }
//     }
// `;
// document.head.appendChild(style);

// // Initialize when DOM loads
// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', () => {
//         if (typeof initTestimonials === 'function') {
//             initTestimonials();
//         }
//     });
// } else {
//     if (typeof initTestimonials === 'function') {
//         initTestimonials();
//     }
// }





import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";

// --- DATA SOURCE ---
export const testimonialData = [
    { id: 1, name: "Robert Fox", role: "Factory Manager", company: "SteelWorks Inc", title: "Industrial Roofing", videoUrl: "https://youtube.com/shorts/6gExsLRc8ow?si=r1619CbP1eeqm-Rs", thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop", rating: 5, quote: "Saved us millions in maintenance", duration: "1:24" },
    { id: 2, name: "Jane Cooper", role: "Homeowner", company: "", title: "Residential Roof", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop", rating: 5, quote: "Home value increased by 15%", duration: "2:15" },
    { id: 3, name: "Guy Hawkins", role: "Architect", company: "Design+Build", title: "Perfect Match", videoUrl: "https://www.instagram.com/reel/C3_xyZqvK7a/", thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop", rating: 4, quote: "Matched our architectural vision", duration: "0:45" },
    { id: 4, name: "Cody Fisher", role: "Site Engineer", company: "BuildRight", title: "Most Reliable", videoUrl: "https://www.youtube.com/watch?v=ysz5S6P_bsu", thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", rating: 5, quote: "Best team in 15 years", duration: "1:55" },
    { id: 5, name: "Sarah Johnson", role: "Building Manager", company: "Urban Complex", title: "Waterproofing", videoUrl: "https://www.youtube.com/watch?v=ysz5S6P_bsu", thumbnail: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=400&auto=format&fit=crop", rating: 5, quote: "Solved all leak issues", duration: "1:30" },
    { id: 6, name: "Michael Chen", role: "Solar Consultant", company: "Green Energy", title: "Solar Integration", videoUrl: "https://www.youtube.com/watch?v=ysz5S6P_bsu", thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop", rating: 4, quote: "Perfect panel integration", duration: "2:10" },
    { id: 7, name: "Alex Morgan", role: "Project Manager", company: "Skyline Const.", title: "On Time Delivery", videoUrl: "https://www.youtube.com/watch?v=ysz5S6P_bsu", thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop", rating: 5, quote: "Completed 2 weeks early", duration: "1:45" },
    { id: 8, name: "Lisa Wang", role: "Property Owner", company: "", title: "Modern Design", videoUrl: "https://www.youtube.com/watch?v=ysz5S6P_bsu", thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop", rating: 5, quote: "Beautiful modern finish", duration: "1:20" }
];

// --- HELPER FUNCTIONS ---
function isInstagram(url) { return url.includes("instagram.com"); }
function getYouTubeId(url) { try { const u = new URL(url); if(u.pathname.startsWith('/shorts/')) return u.pathname.split('/')[2]; if(u.hostname==='youtu.be') return u.pathname.slice(1); if(u.hostname.includes('youtube.com')) return u.searchParams.get('v'); return null; } catch(e){return null;} }
function getInstagramId(url) { try { const u = new URL(url); const p = u.pathname.split('/').filter(Boolean); if(p[0]==='reel'||p[0]==='p') return p[1]; return null; } catch(e){return null;} }
function getThumbnail(item) { if(item.thumbnail) return item.thumbnail; if(isInstagram(item.videoUrl)) return "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&auto=format&fit=crop"; const vid = getYouTubeId(item.videoUrl); if(vid) return `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`; return "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=400&auto=format&fit=crop"; }

// --- MODAL FUNCTIONS (FIXED CLOSE BUTTON) ---
function createVideoModal() {
    if (document.getElementById('testimonial-video-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'testimonial-video-modal';
    modal.className = `fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl opacity-0 pointer-events-none transition-all duration-500`;
    
    // UPDATED: Fixed Close button to Top-Right of SCREEN, not container
    modal.innerHTML = `
        <button id="testimonial-close-modal" class="fixed top-6 right-6 z-[110] text-white hover:text-red-500 transition-all duration-300 group">
             <div class="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 group-hover:bg-red-600/30 group-hover:border-red-500/50 group-hover:rotate-90 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </button>
        <div class="relative w-full max-w-6xl h-full flex items-center justify-center p-4">
            <div id="testimonial-player-container" class="relative bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 transform scale-95 transition-all duration-500">
                <iframe id="testimonial-video-iframe" class="w-full h-full" src="" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>`;
    
    document.body.appendChild(modal);
    document.getElementById('testimonial-close-modal').addEventListener('click', closeVideoModal);
    modal.addEventListener('click', (e) => { if (e.target === modal || e.target.closest('.relative.w-full') === e.target) closeVideoModal(); });
}

function openVideoModal(videoUrl) {
    const modal = document.getElementById('testimonial-video-modal');
    const iframe = document.getElementById('testimonial-video-iframe');
    const container = document.getElementById('testimonial-player-container');
    let embedSrc = '', isVertical = false;
    if (isInstagram(videoUrl)) {
        const id = getInstagramId(videoUrl); if(!id) return;
        embedSrc = `https://www.instagram.com/reel/${id}/embed/`; isVertical = true;
    } else {
        const id = getYouTubeId(videoUrl); if(!id) return;
        if (videoUrl.includes("/shorts/")) isVertical = true;
        embedSrc = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3`;
    }
    container.className = "relative bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 transition-all duration-500";
    if (isVertical) container.classList.add('w-full', 'max-w-[360px]', 'aspect-[9/16]', 'h-[85vh]');
    else container.classList.add('w-full', 'max-w-5xl', 'aspect-video');
    iframe.src = embedSrc;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    setTimeout(() => { container.classList.remove('scale-95'); container.classList.add('scale-100'); }, 50);
}

function closeVideoModal() {
    const modal = document.getElementById('testimonial-video-modal');
    const iframe = document.getElementById('testimonial-video-iframe');
    const container = document.getElementById('testimonial-player-container');
    container.classList.remove('scale-100');
    container.classList.add('scale-95');
    modal.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => { iframe.src = ""; }, 300);
}

// --- CREATE CARD FUNCTION ---
function createTestimonialCard(item, container, isMobile, index) {
    const card = document.createElement('div');
    const thumbUrl = getThumbnail(item);
    
    const mobileClasses = `mobile-testimonial-card testimonial-card group relative 
                           w-[85%] max-w-[320px] mx-auto aspect-9/16 min-h-[380px] 
                           bg-gradient-to-br from-blue-950/90 via-blue-900/80 to-blue-950/90 
                           rounded-xl overflow-hidden shadow-lg cursor-pointer 
                           border border-white/10 ${index === 0 ? 'active' : ''}`;

    const desktopClasses = `testimonial-card opacity-0 scale-95 group relative w-full aspect-9/16 
                            min-h-[450px] xl:min-h-[480px] bg-gradient-to-br from-blue-950/90 via-blue-900/80 to-blue-950/90 
                            rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl cursor-pointer 
                            transition-all duration-500 ease-out 
                            hover:shadow-2xl hover:shadow-blue-600/30 hover:scale-[1.03] hover:-translate-y-2 
                            border border-white/10 hover:border-blue-500/40`;

    card.className = isMobile ? mobileClasses : desktopClasses;

    // ADDED 'reveal-content' class to Quote and User Info for easy targeting
    card.innerHTML = `
        <div class="absolute inset-0 overflow-hidden">
            <img src="${thumbUrl}" alt="${item.name}" class="bg-image absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-all duration-800 ease-out group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-950/40 to-blue-950/20 group-hover:via-blue-950/30 transition-all duration-500"></div>
            <div class="testimonial-glow-effect"></div>
        </div>
        <div class="absolute top-3 left-3 z-20">
            <div class="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <span class="text-xs font-bold text-white">${item.rating}.0</span>
            </div>
        </div>
        <div class="absolute top-3 right-3 z-20">
            <div class="w-10 h-10 bg-gradient-to-br from-red-600 via-red-500 to-red-700 rounded-full flex items-center justify-center shadow-xl border border-white/20 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:border-red-500/60 hover:from-red-500 hover:via-red-400 hover:to-red-600 cursor-pointer group/play">
                <svg class="w-4 h-4 text-white ml-0.5 group-hover/play:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
        </div>
        <div class="absolute top-16 right-3 z-20">
            <div class="bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded-md transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <span class="text-xs font-semibold text-white">${item.duration}</span>
            </div>
        </div>
        <div class="relative z-10 h-full flex flex-col justify-end p-4">
            <div class="mb-3">
                <span class="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${isInstagram(item.videoUrl) ? 'bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-pink-500/30 text-pink-200 border border-pink-500/40' : 'bg-gradient-to-r from-red-500/30 via-orange-500/30 to-red-500/30 text-red-200 border border-red-500/40'} backdrop-blur-md shadow-lg">${isInstagram(item.videoUrl) ? 'IG' : 'YT'}</span>
            </div>
            <h3 class="text-lg font-bold text-white mb-2 leading-tight transform transition-all duration-500 group-hover:-translate-y-1 group-hover:text-blue-100">${item.title}</h3>
            
            <p class="reveal-content text-blue-100 text-sm mb-4 opacity-90 leading-relaxed transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">"${item.quote}"</p>
            
            <div class="reveal-content flex items-center gap-2 pt-3 border-t border-white/20 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                <div class="relative">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 flex items-center justify-center border border-white/20 transform group-hover:scale-110 transition-transform duration-300">
                        <span class="text-white font-bold text-xs">${item.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-white font-semibold text-xs truncate">${item.name}</p>
                    <p class="text-blue-300 text-xs opacity-90 truncate">${item.role}</p>
                </div>
            </div>
        </div>
        <div class="animate-line absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left ease-out"></div>
    `;

    card.addEventListener('click', (e) => {
        if (!e.target.closest('.cursor-pointer')) return;
        openVideoModal(item.videoUrl);
    });

    // MOUSE OVER LOGIC (DESKTOP ONLY)
    if (!isMobile) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left, y = e.clientY - rect.top;
            const centerX = rect.width / 2, centerY = rect.height / 2;
            const rotateY = (x - centerX) / 20, rotateX = (centerY - y) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03) translateY(-2px)`;
            const glow = card.querySelector('.testimonial-glow-effect');
            if (glow) { glow.style.setProperty('--mouse-x', `${x}px`); glow.style.setProperty('--mouse-y', `${y}px`); }
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1) translateY(0)';
        });
    }

    container.appendChild(card);
}

// --- INITIALIZATION ---
export function initTestimonials() {
    const desktopGrid = document.getElementById('testimonials-desktop-grid');
    const mobileSliderContainer = document.getElementById('testimonials-mobile-container');
    const totalSlidesEl = document.getElementById('testimonial-total-slides');

    if (!desktopGrid || !mobileSliderContainer) return;
    createVideoModal();
    desktopGrid.innerHTML = ''; mobileSliderContainer.innerHTML = '';
    totalSlidesEl.textContent = testimonialData.length;

    testimonialData.forEach((item, index) => createTestimonialCard(item, desktopGrid, false, index));
    testimonialData.forEach((item, index) => createTestimonialCard(item, mobileSliderContainer, true, index));

    if (window.innerWidth < 768) initMobileTestimonialSlider(); 
    else initDesktopTestimonials();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth < 768) initMobileTestimonialSlider(); 
            else initDesktopTestimonials();
        }, 250);
    });
}

// --- ANIMATION LOGIC ---

function initMobileTestimonialSlider() {
    const mobileCards = document.querySelectorAll('.mobile-testimonial-card');
    const prevBtn = document.getElementById('testimonial-prev-btn');
    const nextBtn = document.getElementById('testimonial-next-btn');
    const currentSlideEl = document.getElementById('testimonial-current-slide');
    let currentSlide = 0;
    let autoSlideInterval;
    let currentAnimation;

    if (!mobileCards.length) return;

    function animateActiveCard(card) {
        if(currentAnimation) currentAnimation.kill();
        
        mobileCards.forEach(c => {
            if(c !== card) gsap.set(c, { opacity: 0, scale: 0.95 });
        });

        // Simple Fade In (NO 3D ROTATION)
        currentAnimation = gsap.fromTo(card, 
            { opacity: 0, scale: 0.95, y: 15 }, 
            { duration: 0.5, opacity: 1, scale: 1, y: 0, ease: "power2.out" }
        );
    }

    function updateMobileSlider() {
        mobileCards.forEach(card => card.classList.remove('active'));
        const activeCard = mobileCards[currentSlide];
        activeCard.classList.add('active');
        currentSlideEl.textContent = currentSlide + 1;
        animateActiveCard(activeCard);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : mobileCards.length - 1;
        updateMobileSlider(); clearInterval(autoSlideInterval);
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide < mobileCards.length - 1) ? currentSlide + 1 : 0;
        updateMobileSlider(); clearInterval(autoSlideInterval);
    });

    updateMobileSlider();
    
    // Header Animation
    gsap.to(".testimonial-header-animate", { duration: 1.2, opacity: 1, y: 0, scale: 1, ease: "elastic.out(1, 0.5)", delay: 0.2 });
}

function initDesktopTestimonials() {
    const desktopCards = document.querySelectorAll('#testimonials-desktop-grid .testimonial-card');
    if (!desktopCards.length) return;
    gsap.to(".testimonial-header-animate", { duration: 1.2, opacity: 1, y: 0, scale: 1, ease: "elastic.out(1, 0.5)", delay: 0.2 });
    gsap.to("#testimonials-desktop-grid .testimonial-card", { 
        duration: 0.9, opacity: 1, scale: 1, y: 0, stagger: 0.1, ease: "back.out(1.7)", delay: 0.4,
        onComplete: () => {
            gsap.to("#testimonials-desktop-grid .testimonial-card", { duration: 3, y: -3, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.2 });
        }
    });
}