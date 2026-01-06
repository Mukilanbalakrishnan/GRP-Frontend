import { animate, stagger, inView } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm";

// 1. THE DATA
const API_BASE = "http://localhost/GRP-Backend/api/services";
const IMAGE_BASE = "http://localhost/GRP-Backend/";
let servicesData = [];


let mobileSlideInterval = null;


// 2. INITIALIZATION FUNCTION
export async function initServices() {
  await fetchServices();

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
  // We added specific rules for .mobile-card.active to replicate the hover effects
  const style = document.createElement('style');
  style.textContent = `
    /* Mobile card styles */
    .mobile-card { display: none; }
    
    .mobile-card.active {
      display: block;
      animation: fadeIn 0.5s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    /* Card Hover / Active State Logic */
    .service-card {
      transform-style: preserve-3d;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    /* Desktop Hover */
    .service-card:hover { transform: translateY(-8px) scale(1.02); }
    
    /* --- MOBILE ACTIVE STATE ANIMATION MAPPING --- */
    
    /* 1. Background Zoom */
    .mobile-card.active .js-bg-anim {
        transform: scale(1.1);
    }
    
    /* 2. Shimmer Effect (Auto swipe when active) */
    .mobile-card.active .js-shimmer-anim {
        opacity: 1;
        transform: translateX(100%);
    }
    
    /* 3. Gradient Icon Overlay */
    .mobile-card.active .js-gradient-overlay {
        opacity: 1; 
    }
    
    /* 4. Icon Scaling */
    .mobile-card.active .icon-container {
        transform: scale(1.1);
        box-shadow: 0 10px 15px -3px rgba(239, 68, 68, 0.3); /* Red shadow simulation */
    }
    
    /* 5. Icon Rotate */
    .mobile-card.active .icon-svg {
        transform: scale(1.1) rotate(12deg);
    }
    
    /* 6. Text Shine (Move gradient across) */
    .mobile-card.active .text-shine::after {
        left: 100%;
    }
    
    /* 7. Description Slide Up */
    .mobile-card.active .js-desc-anim {
        transform: translateY(-5px);
        color: #dbeafe; /* text-blue-100 */
    }
    
    /* 8. Top Line Expand */
    .mobile-card.active .js-line-anim {
        transform: scaleX(1);
    }
    
    /* 9. Sparkles (Re-use existing animation) */
    .service-card:hover .sparkle,
    .mobile-card.active .sparkle {
      animation: sparkle-fly 1s ease-out forwards;
    }
    
    /* --- SHARED STYLES --- */
    .icon-container { position: relative; overflow: hidden; transition: all 0.5s; }
    .icon-container::before {
      content: '';
      position: absolute; top: 50%; left: 50%;
      width: 0; height: 0;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }
    .service-card:hover .icon-container::before,
    .mobile-card.active .icon-container::before { width: 120px; height: 120px; }
    
    .text-shine { color: white; position: relative; display: inline-block; }
    .text-shine::after {
      content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      transition: left 0.8s ease;
    }
    
    .sparkle {
      position: absolute; width: 6px; height: 6px;
      background: white; border-radius: 50%; opacity: 0;
      box-shadow: 0 0 10px 2px white;
    }
    @keyframes sparkle-fly {
      0% { opacity: 0; transform: translate(0, 0) scale(0); }
      20% { opacity: 1; transform: translate(var(--tx), var(--ty)) scale(1); }
      100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); }
    }
  `;
  document.head.appendChild(style);

  // Set total slides count
  totalSlidesEl.textContent = servicesData.length;

  // Create cards
  servicesData.forEach((item, index) => {
    createCard(item, desktopGrid, false, index);
    createCard(item, mobileSliderContainer, true, index);
  });

  // --- HEADER ANIMATION ---
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
  });

  // Initialize view logic
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

async function fetchServices() {
  try {
    const res = await fetch(`${API_BASE}/service-list.php`);
    servicesData = await res.json();
  } catch (err) {
    console.error("Failed to load services", err);
    servicesData = [];
  }
}

// Function to create a card
function createCard(item, container, isMobile, index) {
  const card = document.createElement("div");
  
  // Note: We added js- marker classes to specific elements to target them for mobile "auto-hover"
  card.className = isMobile 
    ? `mobile-card service-card group relative bg-blue-950 rounded-3xl p-8 overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:z-10 ${index === 0 ? 'active' : ''}`
    : `service-card group relative bg-blue-950 rounded-3xl p-8 overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:z-10`;

  card.innerHTML = `
    <div class="js-bg-anim absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-950 transition-all duration-700 group-hover:scale-110"></div>
    
    <div class="js-shimmer-anim absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
    
    <div class="js-line-anim absolute top-0 left-0 w-full h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left shadow-lg shadow-red-600/50"></div>
    
    <div class="sparkle" style="--tx: -20px; --ty: -15px; top: 30%; left: 30%; animation-delay: 0.1s"></div>
    <div class="sparkle" style="--tx: 25px; --ty: -10px; top: 20%; left: 70%; animation-delay: 0.3s"></div>
    <div class="sparkle" style="--tx: -15px; --ty: 20px; top: 70%; left: 20%; animation-delay: 0.5s"></div>
    <div class="sparkle" style="--tx: 20px; --ty: 15px; top: 80%; left: 80%; animation-delay: 0.7s"></div>

    <div class="relative z-10">
      <div class="icon-container w-14 h-14 bg-blue-800 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-red-500/30">
        <div class="js-gradient-overlay absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <img
  src="${IMAGE_BASE}${item.image_path}"
  alt="${item.title}"
  class="icon-svg w-8 h-8 object-contain relative z-10
         transition-all duration-500
         group-hover:scale-110 group-hover:rotate-12"
/>

        <div class="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-700"></div>
      </div>

      <h3 class="text-shine text-2xl font-bold text-white mb-3 transition-all duration-500 group-hover:text-white/90 group-hover:-translate-y-1">
        ${item.title}
      </h3>

      <p class="js-desc-anim text-blue-200 text-sm leading-relaxed mb-6 transition-all duration-500 transform translate-y-0 group-hover:translate-y-[-5px] group-hover:text-blue-100">
        ${item.description}
      </p>

      
    </div>
    
    <div class="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"></div>
    <div class="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300"></div>
  `;

  // Desktop Hover Logic (Tilt)
  if (!isMobile) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = (x - centerX) / 30;
      const rotateX = (centerY - y) / 30;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1) translateY(0)';
      setTimeout(() => { card.style.transform = ''; }, 300);
    });
  }

  container.appendChild(card);
}

const mobileSlider = document.getElementById('mobile-slider-container');

if (mobileSlider) {
  mobileSlider.addEventListener('touchstart', () => {
    if (mobileSlideInterval) {
      clearInterval(mobileSlideInterval);
      mobileSlideInterval = null;
    }
  });

  mobileSlider.addEventListener('touchend', () => {
    setTimeout(() => {
      if (!mobileSlideInterval) initMobileSlider();
    }, 2000);
  });
}


// MOBILE SLIDER SETUP (With Auto-Slide)
function initMobileSlider() {
  const mobileCards = document.querySelectorAll('.mobile-card');
  const prevBtn = document.getElementById('mobile-prev');
  const nextBtn = document.getElementById('mobile-next');
  const currentSlideEl = document.getElementById('current-slide');

  if (!mobileCards.length) return;

  let currentSlide = 0;

  // 🔴 IMPORTANT: clear existing interval FIRST
  if (mobileSlideInterval) {
    clearInterval(mobileSlideInterval);
    mobileSlideInterval = null;
  }

  function updateMobileSlider() {
    mobileCards.forEach(card => card.classList.remove('active'));
    mobileCards[currentSlide].classList.add('active');
    currentSlideEl.textContent = currentSlide + 1;
  }

  function startAutoSlide() {
    // Safety clear (double protection)
    if (mobileSlideInterval) clearInterval(mobileSlideInterval);

    mobileSlideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % mobileCards.length;
      updateMobileSlider();
    }, 4000); // ⬅️ slower & smoother (4s)
  }

  // Manual controls
  prevBtn?.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + mobileCards.length) % mobileCards.length;
    updateMobileSlider();
    startAutoSlide();
  });

  nextBtn?.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % mobileCards.length;
    updateMobileSlider();
    startAutoSlide();
  });

  // Initial state
  updateMobileSlider();
  startAutoSlide();
}


// DESKTOP GRID SETUP
function initDesktopGrid() {
  const desktopCards = document.querySelectorAll('#desktop-grid .service-card');
  if (!desktopCards.length) return;
  
  animate(desktopCards, { opacity: 0, scale: 0.95 }, { duration: 0 });
  
  inView("#services-section", () => {
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