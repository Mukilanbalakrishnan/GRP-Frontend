import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm";

// --- BRANDS DATA ---
const brands = [
    { 
        name: "APEX STEEL", 
        icon: "M12 2L2 22h20L12 2zm0 4l6 12H6l6-12z",
        color: "from-orange-600 to-amber-500"
    },
    { 
        name: "CORE DYNAMICS", 
        icon: "M4 4h16v16H4V4zm4 4v8h8V8H8z",
        color: "from-blue-600 to-cyan-500"
    },
    { 
        name: "TITAN STRUCT", 
        icon: "M12 2L2 7v10l10 5 10-5V7l-10-5zm0 14.5l-6-3V7.5l6 3 6-3v6l-6 3z",
        color: "from-gray-700 to-gray-900"
    },
    { 
        name: "NEXUS GRID", 
        icon: "M3 3v18h18V3H3zm14 14H7V7h10v10zM9 9h6v6H9V9z",
        color: "from-green-600 to-emerald-500"
    },
    { 
        name: "OMEGA HEAVY", 
        icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z",
        color: "from-red-600 to-orange-500"
    },
    { 
        name: "VELOCITY", 
        icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
        color: "from-purple-600 to-indigo-500"
    },
    { 
        name: "QUANTUM SHIELD", 
        icon: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z",
        color: "from-yellow-500 to-amber-500"
    },
    { 
        name: "FORGE INDUSTRIES", 
        icon: "M12 2L2 7v10l10 5 10-5V7l-10-5zM12 22v-3",
        color: "from-rose-600 to-pink-500"
    },
];

// --- ENHANCED HTML GENERATOR ---
function getLogoCardHTML(brand, index) {
    return `
        <div class="logo-card group relative w-72 h-28 bg-white border-2 border-gray-200 rounded-xl shadow-lg hover:shadow-2xl hover:border-blue-900 transition-all duration-400 flex items-center justify-center cursor-pointer overflow-hidden flex-shrink-0"
             style="animation-delay: ${index * 0.1}s">
            
            <!-- Hover gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-br ${brand.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
            
            <!-- Top accent line -->
            <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 via-blue-600 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            
            <!-- Bottom accent line -->
            <div class="absolute bottom-0 right-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-red-600 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right delay-100"></div>
            
            <!-- Content -->
            <div class="relative flex items-center gap-4 px-6 opacity-90 group-hover:opacity-100 transition-all duration-300">
                <!-- Icon Container -->
                <div class="logo-icon relative p-3 bg-gradient-to-br from-gray-100 to-white rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300">
                    <div class="absolute inset-0 bg-gradient-to-br ${brand.color} opacity-0 group-hover:opacity-10 rounded-lg transition-all duration-500"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" 
                         class="w-10 h-10 text-blue-950 group-hover:text-blue-900 transition-colors duration-300">
                        <path d="${brand.icon}"/>
                    </svg>
                </div>
                
                <!-- Text Content -->
                <div class="flex flex-col items-start">
                    <span class="font-black text-blue-950 tracking-wider text-lg 
             group-hover:text-white group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]
             transition-all duration-300">

                        ${brand.name}
                    </span>
                    <div class="h-1 w-12 bg-gray-200 mt-2 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r ${brand.color} w-0 group-hover:w-full transition-all duration-700"></div>
                    </div>
                </div>
            </div>
            
            <!-- Sparkle effect on hover -->
            <div class="absolute inset-0 pointer-events-none">
                <div class="absolute top-4 left-4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style="animation-delay: 0.1s"></div>
                <div class="absolute bottom-4 right-4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style="animation-delay: 0.3s"></div>
            </div>
        </div>
    `;
}

// --- INITIALIZATION ---

export function initBrand() {
    const logoTrack1 = document.getElementById("track-1");
    const logoTrack2 = document.getElementById("track-2");

    if (!logoTrack1 || !logoTrack2) return;

    // 1. FILL CONTENT WITH STAGGERED ANIMATION
    const logosBlock1 = Array(6).fill(null).flatMap((_, blockIndex) => 
        brands.map((b, i) => getLogoCardHTML(b, blockIndex * brands.length + i))
    ).join("");
    
    const logosBlock2 = Array(6).fill(null).flatMap((_, blockIndex) => 
        brands.map((b, i) => getLogoCardHTML(b, blockIndex * brands.length + i + 0.5))
    ).join("");
    
    logoTrack1.innerHTML = logosBlock1;
    logoTrack2.innerHTML = logosBlock2;

    // 2. ANIMATE COUNTERS
    function animateCounters() {
        document.querySelectorAll('.animate-count').forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                    
                    // Add + sign after animation
                    setTimeout(() => {
                        counter.innerHTML = `${target}<span class="text-red-600">+</span>`;
                    }, 300);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 30);
        });
    }

    // 3. SETUP SCROLLING ANIMATIONS WITH ENHANCED EFFECTS
    inView("#brands-section", () => {

    // Header text animation
    animate(
        ".animate-fade-in",
        { opacity: 1, y: 0, scale: 1 },
        {
            duration: 1,
            delay: stagger(0.2),
            easing: [0.34, 1.56, 0.64, 1] // ✅ fixed
        }
    );

    // Logo cards entry animation
    animate(
        ".logo-card",
        { opacity: 1, scale: 1, y: 0 },
        {
            duration: 0.8,
            delay: stagger(0.05),
            easing: [0.68, -0.55, 0.27, 1.55] // ✅ fixed
        }
    );

    setTimeout(animateCounters, 800);

    // Row animations (already valid)
    const row1Animation = animate(
        logoTrack1,
        { transform: "translateX(-50%)" },
        { duration: 45, easing: "linear", repeat: Infinity }
    );

    const row2Animation = animate(
        logoTrack2,
        { transform: ["translateX(-50%)", "translateX(0%)"] },
        { duration: 55, easing: "linear", repeat: Infinity }
    );

    const rows = [
        document.getElementById("logo-row-1"),
        document.getElementById("logo-row-2")
    ];
    const animations = [row1Animation, row2Animation];

    rows.forEach((row, index) => {
        row.addEventListener("mouseenter", () => {
            animations[index].pause();
            animate(row, { scale: 0.98 }, { duration: 0.3, easing: "ease-out" });
        });

        row.addEventListener("mouseleave", () => {
            animations[index].play();
            animate(row, { scale: 1 }, { duration: 0.3, easing: "ease-out" });
        });
    });

}, { margin: "-100px" });
// Trigger animation 100px before section enters view
}