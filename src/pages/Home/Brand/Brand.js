

import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm";

// --- BRANDS DATA ---
// const brands = [
//     { name: "APEX STEEL", icon: "M12 2L2 22h20L12 2zm0 4l6 12H6l6-12z", color: "from-orange-600 to-amber-500" },
//     { name: "CORE DYNAMICS", icon: "M4 4h16v16H4V4zm4 4v8h8V8H8z", color: "from-blue-600 to-cyan-500" },
//     { name: "TITAN STRUCT", icon: "M12 2L2 7v10l10 5 10-5V7l-10-5zm0 14.5l-6-3V7.5l6 3 6-3v6l-6 3z", color: "from-gray-700 to-gray-900" },
//     { name: "NEXUS GRID", icon: "M3 3v18h18V3H3zm14 14H7V7h10v10zM9 9h6v6H9V9z", color: "from-green-600 to-emerald-500" },
//     { name: "OMEGA HEAVY", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z", color: "from-red-600 to-orange-500" },
//     { name: "VELOCITY", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", color: "from-purple-600 to-indigo-500" },
//     { name: "QUANTUM SHIELD", icon: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z", color: "from-yellow-500 to-amber-500" },
//     { name: "FORGE INDUSTRIES", icon: "M12 2L2 7v10l10 5 10-5V7l-10-5zM12 22v-3", color: "from-rose-600 to-pink-500" },
// ];

const API_BASE = "http://localhost/GRP-Backend/api/brands";
const IMAGE_BASE = "http://localhost/GRP-Backend/";
let brands = [];


// --- HTML GENERATOR ---
function getLogoCardHTML(brand, index) {
  return `
    <div class="logo-card group relative w-40 h-16 md:w-72 md:h-28 
                bg-white border-2 border-gray-200 rounded-xl shadow-lg 
                hover:shadow-2xl hover:border-blue-900 transition-all duration-400 
                flex items-center justify-center cursor-pointer overflow-hidden flex-shrink-0"
         style="animation-delay: ${index * 0.1}s">

      <!-- Hover overlay -->
      <div class="absolute inset-0 bg-gradient-to-br ${brand.gradient}
                  opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>

      <!-- CONTENT -->
      <div class="relative flex items-center gap-3 md:gap-5 px-3 md:px-6">

        <!-- BRAND IMAGE -->
        <div class="relative w-10 h-10 md:w-14 md:h-14 bg-white rounded-lg shadow-sm overflow-hidden">
  <img 
    src="${IMAGE_BASE}${brand.image_path}"
    alt="${brand.name}"
    class="absolute inset-0 w-full h-full object-cover"
    loading="lazy"
  />
</div>


        <!-- BRAND NAME -->
        <div class="flex flex-col items-start">
          <span class="
            font-black tracking-wider text-[10px] md:text-lg
            text-blue-950
            group-hover:text-blue-900
            transition-colors duration-300
          ">
            ${brand.name}
          </span>

          <div class="h-0.5 md:h-1 w-8 md:w-12 bg-gray-200 mt-1 md:mt-2 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r ${brand.gradient}
                        w-0 group-hover:w-full transition-all duration-700"></div>
          </div>
        </div>

      </div>
    </div>
  `;
}



async function fetchBrands() {
  try {
    const res = await fetch(`${API_BASE}/brand-list.php`);
    brands = await res.json();
  } catch (err) {
    console.error("Failed to load brands", err);
    brands = [];
  }
}

// --- INITIALIZATION ---

export async function initBrand() {
  await fetchBrands();

  if (!brands.length) return;

  const logoTrack1 = document.getElementById("track-1");
  const logoTrack2 = document.getElementById("track-2");
  if (!logoTrack1 || !logoTrack2) return;

  const block1 = Array(6).fill(null).flatMap((_, blockIndex) =>
    brands.map((b, i) =>
      getLogoCardHTML(b, blockIndex * brands.length + i)
    )
  ).join("");

  const block2 = Array(6).fill(null).flatMap((_, blockIndex) =>
    brands.map((b, i) =>
      getLogoCardHTML(b, blockIndex * brands.length + i + 0.5)
    )
  ).join("");

  logoTrack1.innerHTML = block1;
  logoTrack2.innerHTML = block2;

  inView("#brands-section", () => {
    animate(".logo-card", { opacity: 1, scale: 1, y: 0 }, {
      duration: 0.8,
      delay: stagger(0.05),
      easing: [0.68, -0.55, 0.27, 1.55]
    });

    const row1 = animate(logoTrack1, { transform: "translateX(-50%)" }, {
      duration: 45,
      easing: "linear",
      repeat: Infinity
    });

    const row2 = animate(logoTrack2, {
      transform: ["translateX(-50%)", "translateX(0%)"]
    }, {
      duration: 55,
      easing: "linear",
      repeat: Infinity
    });

    [[row1, "logo-row-1"], [row2, "logo-row-2"]].forEach(
      ([anim, id]) => {
        const row = document.getElementById(id);
        if (!row) return;
        row.addEventListener("mouseenter", () => anim.pause());
        row.addEventListener("mouseleave", () => anim.play());
        row.addEventListener("touchstart", () => anim.pause(), { passive: true });
        row.addEventListener("touchend", () => anim.play(), { passive: true });
      }
    );
  }, { margin: "-100px" });
}
