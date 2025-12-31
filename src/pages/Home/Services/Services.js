import { animate, stagger, inView } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm";

// 1. THE DATA
const servicesData = [
  {
    title: "Industrial Roofing",
    desc: "Heavy-duty metal and composite roofing",
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />`,
    gradient: "from-orange-600 to-amber-500"
  },
  {
    title: "Residential Shingles",
    desc: "Premium asphalt and slate shingles that provide aesthetic appeal and long-lasting protection.",
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />`,
    gradient: "from-emerald-600 to-teal-500"
  },
  {
    title: "Waterproofing",
    desc: "Advanced coating and sealing technologies to prevent leaks and moisture damage.",
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.263l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />`,
    gradient: "from-blue-600 to-cyan-500"
  },
  {
    title: "Roof Maintenance",
    desc: "Regular inspections and minor repairs to extend the lifespan of your roof significantly.",
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />`,
    gradient: "from-amber-600 to-yellow-500"
  },
  {
    title: "Solar Integration",
    desc: "Seamlessly integrate solar panels with your roofing structure for maximum energy efficiency.",
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.263l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />`,
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    title: "Consulting",
    desc: "Professional architectural consulting to ensure your roof meets all safety and design standards.",
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />`,
    gradient: "from-purple-600 to-indigo-500"
  },
];

// 2. INITIALIZATION FUNCTION
export function initServices() {
  const desktopGrid = document.getElementById("desktop-grid");
  const mobileSliderContainer = document.getElementById("mobile-slider-container");
  const currentSlideEl = document.getElementById("current-slide");
  const totalSlidesEl = document.getElementById("total-slides");

  if (!desktopGrid || !mobileSliderContainer) {
    return;
  }

  // Clear existing content
  desktopGrid.innerHTML = "";
  mobileSliderContainer.innerHTML = "";

  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    /* Mobile card styles */
    .mobile-card {
      display: none;
    }
    
    .mobile-card.active {
      display: block;
      animation: fadeIn 0.5s ease-out;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Card hover effects for both desktop and mobile */
    .service-card {
      transform-style: preserve-3d;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .service-card:hover {
      transform: translateY(-8px) scale(1.02);
    }
    
    .icon-container {
      position: relative;
      overflow: hidden;
    }
    
    .icon-container::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }
    
    .service-card:hover .icon-container::before {
      width: 120px;
      height: 120px;
    }
    
    .text-shine {
      color: white;
      position: relative;
      display: inline-block;
    }
    
    .text-shine::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      transition: left 0.8s ease;
    }
    
    .service-card:hover .text-shine::after {
      left: 100%;
    }
    
    .sparkle {
      position: absolute;
      width: 6px;
      height: 6px;
      background: white;
      border-radius: 50%;
      opacity: 0;
      box-shadow: 0 0 10px 2px white;
    }
    
    .service-card:hover .sparkle {
      animation: sparkle-fly 1s ease-out forwards;
    }
    
    @keyframes sparkle-fly {
      0% {
        opacity: 0;
        transform: translate(0, 0) scale(0);
      }
      20% {
        opacity: 1;
        transform: translate(var(--tx), var(--ty)) scale(1);
      }
      100% {
        opacity: 0;
        transform: translate(var(--tx), var(--ty)) scale(0);
      }
    }
  `;
  document.head.appendChild(style);

  // Set total slides count
  totalSlidesEl.textContent = servicesData.length;

  // Create desktop cards
  servicesData.forEach((item, index) => {
    createCard(item, desktopGrid, false, index);
  });

  // Create mobile cards
  servicesData.forEach((item, index) => {
    createCard(item, mobileSliderContainer, true, index);
  });

  // Initialize mobile slider if on mobile
  if (window.innerWidth < 768) {
    initMobileSlider();
  } else {
    initDesktopGrid();
  }

  // Handle resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth < 768) {
        initMobileSlider();
      } else {
        initDesktopGrid();
      }
    }, 250);
  });
}

// Function to create a card
function createCard(item, container, isMobile, index) {
  const card = document.createElement("div");
  
  card.className = isMobile 
    ? `mobile-card service-card group relative bg-blue-950 rounded-3xl p-8 overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:z-10 ${index === 0 ? 'active' : ''}`
    : `service-card group relative bg-blue-950 rounded-3xl p-8 overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:z-10`;

  card.innerHTML = `
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-950
                transition-all duration-700 group-hover:scale-110"></div>
    
    <!-- Shimmer Overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] 
                transition-all duration-1000"></div>

    <!-- Top Accent Line -->
    <div class="absolute top-0 left-0 w-full h-1 bg-red-600
                scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left
                shadow-lg shadow-red-600/50"></div>
    
    <!-- Floating Sparkles -->
    <div class="sparkle" style="--tx: -20px; --ty: -15px; top: 30%; left: 30%; animation-delay: 0.1s"></div>
    <div class="sparkle" style="--tx: 25px; --ty: -10px; top: 20%; left: 70%; animation-delay: 0.3s"></div>
    <div class="sparkle" style="--tx: -15px; --ty: 20px; top: 70%; left: 20%; animation-delay: 0.5s"></div>
    <div class="sparkle" style="--tx: 20px; --ty: 15px; top: 80%; left: 80%; animation-delay: 0.7s"></div>

    <div class="relative z-10">
      <!-- Icon Container with Enhanced Effects -->
      <div class="icon-container w-14 h-14 bg-blue-800 rounded-2xl flex items-center justify-center mb-6
                  transition-all duration-500 group-hover:scale-110 group-hover:bg-gradient-to-br ${item.gradient}
                  group-hover:shadow-lg group-hover:shadow-red-500/30">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
             class="w-8 h-8 text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
          ${item.icon}
        </svg>
        <!-- Icon Glow -->
        <div class="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-700"></div>
      </div>

      <!-- Title with Shine Effect -->
      <h3 class="text-shine text-2xl font-bold text-white mb-3 transition-all duration-500 
                 group-hover:text-white/90 group-hover:-translate-y-1">
        ${item.title}
      </h3>

      <!-- Description with Slide-up -->
      <p class="text-blue-200 text-sm leading-relaxed mb-6 transition-all duration-500 
                transform translate-y-0 group-hover:translate-y-[-5px] group-hover:text-blue-100">
        ${item.desc}
      </p>

      <!-- CTA Button with Enhanced Effects -->
      <div class="relative overflow-hidden rounded-lg inline-block">
        <span class="text-red-500 font-bold text-sm uppercase tracking-wider
                     group-hover:text-white transition-colors duration-300 flex items-center gap-2 relative z-10">
          LEARN MORE 
          <span class="transform transition-transform duration-500 group-hover:translate-x-2 group-hover:scale-110">→</span>
        </span>
        <!-- Button Background Animation -->
        <div class="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/20 to-red-600/0 
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
      </div>
    </div>
    
    <!-- Corner Accents -->
    <div class="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/20 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"></div>
    <div class="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/20 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300"></div>
  `;

  // Add hover effects for both desktop and mobile
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = (x - centerX) / 30;
    const rotateX = (centerY - y) / 30;
    
    card.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale(1.02) 
      translateY(-8px)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1) translateY(0)';
    setTimeout(() => {
      card.style.transform = '';
    }, 300);
  });

  container.appendChild(card);
}

// MOBILE SLIDER SETUP
function initMobileSlider() {
  const mobileCards = document.querySelectorAll('.mobile-card');
  const prevBtn = document.getElementById('mobile-prev');
  const nextBtn = document.getElementById('mobile-next');
  const currentSlideEl = document.getElementById('current-slide');
  
  let currentSlide = 0;
  
  if (!mobileCards.length) return;
  
  function updateMobileSlider() {
    // Hide all cards
    mobileCards.forEach(card => {
      card.classList.remove('active');
    });
    
    // Show current card
    mobileCards[currentSlide].classList.add('active');
    
    // Update counter
    currentSlideEl.textContent = currentSlide + 1;
  }
  
  // Navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
      } else {
        currentSlide = mobileCards.length - 1;
      }
      updateMobileSlider();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentSlide < mobileCards.length - 1) {
        currentSlide++;
      } else {
        currentSlide = 0;
      }
      updateMobileSlider();
    });
  }
  
 
  

  
  updateMobileSlider();
}

// DESKTOP GRID SETUP
function initDesktopGrid() {
  const desktopCards = document.querySelectorAll('#desktop-grid .service-card');
  
  if (!desktopCards.length) return;
  
  // Set Initial State for desktop animations
  animate(desktopCards, { opacity: 0, scale: 0.95 }, { duration: 0 });
  
  // Run Animation when scrolled into view
  inView("#services-section", () => {
    animate(
      ".service-header-animate",
      { opacity: 1, scale: 1 },
      {
        duration: 0.8,
        delay: stagger(0.2),
        easing: [0.34, 1.56, 0.64, 1],
      }
    );

    animate(
      "#desktop-grid .service-card",
      { opacity: 1, scale: 1, y: [20, 0] },
      {
        duration: 0.7,
        delay: stagger(0.15, { start: 0.4 }),
        easing: [0.34, 1.56, 0.64, 1]
      }
    );
  });
}

// Wait for DOM and initialize
const waitForServicesSection = setInterval(() => {
  const section = document.getElementById("services-section");
  const desktopGrid = document.getElementById("desktop-grid");

  if (section && desktopGrid) {
    clearInterval(waitForServicesSection);
    initServices();
  }
}, 100);