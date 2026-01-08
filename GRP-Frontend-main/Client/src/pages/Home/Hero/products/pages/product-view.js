
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

// --- Category Filtering Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const pageTitle = document.getElementById('page-title');

    // Map categories to Title text
    const titles = {
        'ceramic': 'Ceramic Roof Tiles',
        'clay': 'Clay Roof Tiles',
        'concrete': 'Concrete Roof Tiles',
        'white-cement': 'White Cement Jally'
    };

    // Sections
    const sections = {
        'ceramic': document.getElementById('category-ceramic'),
        'clay': document.getElementById('category-clay'),
        'concrete': document.getElementById('category-concrete'),
        'white-cement': document.getElementById('category-white-cement')
    };

    // Hide all initially
    Object.values(sections).forEach(sec => {
        if (sec) sec.classList.add('hidden-section');
    });

    if (category && sections[category]) {
        // Show specific category
        sections[category].classList.remove('hidden-section');

        // Update Page Title
        if (pageTitle && titles[category]) {
            pageTitle.textContent = titles[category];
        }
    } else {
        // Fallback: Show all if no category specific (or invalid)
        Object.values(sections).forEach(sec => {
            if (sec) sec.classList.remove('hidden-section');
        });
    }
});


// --- Product Color Picker Logic ---

const productsConfig = {
    // --- CERAMIC SERIES ---
    'ceramic-elbano': [
        { name: 'Steel Grey', filter: '', imageSrc: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=500&auto=format&fit=crop' },
        { name: 'Ocean Blue', filter: 'hue-rotate(200deg)', imageSrc: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=500&auto=format&fit=crop' },
        { name: 'Sunset Red', filter: 'hue-rotate(320deg)', imageSrc: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=500&auto=format&fit=crop' },
        { name: 'Graphite Black', filter: 'grayscale(100%) brightness(50%)', imageSrc: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=500&auto=format&fit=crop' }
    ],
    'ceramic-romano': [
        { name: 'Terracotta', filter: 'hue-rotate(30deg) saturate(150%)', imageSrc: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=500&auto=format&fit=crop' },
        { name: 'Olive Green', filter: 'hue-rotate(90deg) contrast(1.2)', imageSrc: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=500&auto=format&fit=crop' },
        { name: 'Burnt Orange', filter: 'hue-rotate(10deg) sepia(0.5)', imageSrc: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=500&auto=format&fit=crop' },
        { name: 'Midnight', filter: 'grayscale(100%) brightness(30%)', imageSrc: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=500&auto=format&fit=crop' }
    ],
    'ceramic-titan': [
        { name: 'Titan Grey', filter: 'grayscale(100%)', imageSrc: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=500&auto=format&fit=crop' },
        { name: 'Deep Blue', filter: 'hue-rotate(220deg) brightness(0.8)', imageSrc: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=500&auto=format&fit=crop' },
        { name: 'Metallic Red', filter: 'hue-rotate(300deg) contrast(1.5)', imageSrc: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=500&auto=format&fit=crop' },
        { name: 'Copper', filter: 'hue-rotate(40deg) sepia(1)', imageSrc: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=500&auto=format&fit=crop' }
    ],
    'ceramic-viano': [
        { name: 'Classic Brown', filter: 'sepia(0.8)', imageSrc: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=500&auto=format&fit=crop' },
        { name: 'Moss Green', filter: 'hue-rotate(80deg) brightness(0.9)', imageSrc: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=500&auto=format&fit=crop' },
        { name: 'Slate', filter: 'grayscale(100%) brightness(80%)', imageSrc: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=500&auto=format&fit=crop' },
        { name: 'Sand', filter: 'sepia(0.5) brightness(1.2)', imageSrc: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=500&auto=format&fit=crop' }
    ],

    // --- CLAY SERIES ---
    'clay-spanish': [
        { name: 'Terra Cotta', filter: '', imageSrc: 'https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=500&auto=format&fit=crop' },
        { name: 'Antique Red', filter: 'hue-rotate(340deg)', imageSrc: 'https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=500&auto=format&fit=crop' },
        { name: 'Volcanic Black', filter: 'grayscale(100%) brightness(75%)', imageSrc: 'https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=500&auto=format&fit=crop' }
    ],
    'clay-french': [
        { name: 'Natural Red', filter: 'hue-rotate(350deg) saturate(1.2)', imageSrc: 'https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=500&auto=format&fit=crop' },
        { name: 'Dark Brown', filter: 'hue-rotate(10deg) brightness(0.7)', imageSrc: 'https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=500&auto=format&fit=crop' },
        { name: 'Slate Grey', filter: 'grayscale(100%)', imageSrc: 'https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=500&auto=format&fit=crop' }
    ],
    'clay-roman': [
        { name: 'Romano Gold', filter: 'hue-rotate(45deg) sepia(0.5)', imageSrc: 'https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=500&auto=format&fit=crop' },
        { name: 'Rustic Red', filter: 'hue-rotate(330deg) contrast(1.2)', imageSrc: 'https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=500&auto=format&fit=crop' },
        { name: 'Midnight', filter: 'hue-rotate(240deg) brightness(0.5)', imageSrc: 'https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=500&auto=format&fit=crop' }
    ],
    'clay-mission': [
        { name: 'Mission Sand', filter: 'grayscale(50%) sepia(0.5) brightness(1.2)', imageSrc: 'https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=500&auto=format&fit=crop' },
        { name: 'Mission Brown', filter: 'hue-rotate(20deg) brightness(0.6)', imageSrc: 'https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=500&auto=format&fit=crop' },
        { name: 'Mission Red', filter: 'hue-rotate(340deg) saturate(1.5)', imageSrc: 'https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=500&auto=format&fit=crop' }
    ],

    // --- CONCRETE SERIES ---
    'concrete-flat': [
        { name: 'Slate Grey', filter: '', imageSrc: 'https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=500&auto=format&fit=crop' },
        { name: 'Charcoal Black', filter: 'brightness(75%) grayscale(100%)', imageSrc: 'https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=500&auto=format&fit=crop' },
        { name: 'Classic Red', filter: 'hue-rotate(340deg) saturate(1.5)', imageSrc: 'https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=500&auto=format&fit=crop' }
    ],
    'concrete-roman': [
        { name: 'Roman Brown', filter: 'hue-rotate(20deg) contrast(1.1)', imageSrc: 'https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=500&auto=format&fit=crop' },
        { name: 'Roman Red', filter: 'hue-rotate(330deg) brightness(1.1)', imageSrc: 'https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=500&auto=format&fit=crop' },
        { name: 'Roman Grey', filter: 'grayscale(100%)', imageSrc: 'https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=500&auto=format&fit=crop' }
    ],
    'concrete-shake': [
        { name: 'Shake Wood', filter: 'sepia(0.8) brightness(0.9)', imageSrc: 'https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=500&auto=format&fit=crop' },
        { name: 'Shake Grey', filter: 'grayscale(80%) contrast(1.2)', imageSrc: 'https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=500&auto=format&fit=crop' },
        { name: 'Shake Brown', filter: 'hue-rotate(15deg) brightness(0.6)', imageSrc: 'https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=500&auto=format&fit=crop' }
    ],
    'concrete-shingle': [
        { name: 'Shingle Charcoal', filter: 'grayscale(100%) brightness(0.4)', imageSrc: 'https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=500&auto=format&fit=crop' },
        { name: 'Shingle Red', filter: 'hue-rotate(320deg) brightness(0.5)', imageSrc: 'https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=500&auto=format&fit=crop' },
        { name: 'Shingle Green', filter: 'hue-rotate(90deg) brightness(0.5)', imageSrc: 'https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=500&auto=format&fit=crop' }
    ],

    // --- WHITE CEMENT SERIES ---
    'cement-floral': [
        { name: 'Pure White', filter: '', imageSrc: 'https://images.unsplash.com/photo-1522851458296-189f81d1203d?q=80&w=500&auto=format&fit=crop' },
        { name: 'Cream', filter: 'sepia(0.3)', imageSrc: 'https://images.unsplash.com/photo-1522851458296-189f81d1203d?q=80&w=500&auto=format&fit=crop' },
        { name: 'Silver', filter: 'grayscale(100%) opacity(0.8)', imageSrc: 'https://images.unsplash.com/photo-1522851458296-189f81d1203d?q=80&w=500&auto=format&fit=crop' }
    ],
    'cement-diamond': [
        { name: 'Diamond White', filter: 'contrast(1.2)', imageSrc: 'https://images.unsplash.com/photo-1522851458296-189f81d1203d?q=80&w=500&auto=format&fit=crop' },
        { name: 'Diamond Grey', filter: 'grayscale(100%)', imageSrc: 'https://images.unsplash.com/photo-1522851458296-189f81d1203d?q=80&w=500&auto=format&fit=crop' },
        { name: 'Diamond Black', filter: 'invert(1)', imageSrc: 'https://images.unsplash.com/photo-1522851458296-189f81d1203d?q=80&w=500&auto=format&fit=crop' }
    ],
    'cement-star': [
        { name: 'Star White', filter: 'brightness(1.1)', imageSrc: 'https://images.unsplash.com/photo-1522851458296-189f81d1203d?q=80&w=500&auto=format&fit=crop' },
        { name: 'Star Gold', filter: 'sepia(1) hue-rotate(10deg)', imageSrc: 'https://images.unsplash.com/photo-1522851458296-189f81d1203d?q=80&w=500&auto=format&fit=crop' },
        { name: 'Star Rose', filter: 'hue-rotate(300deg) sepia(0.2)', imageSrc: 'https://images.unsplash.com/photo-1522851458296-189f81d1203d?q=80&w=500&auto=format&fit=crop' }
    ],
    'cement-grid': [
        { name: 'Grid White', filter: 'brightness(1.05)', imageSrc: 'https://images.unsplash.com/photo-1522851458296-189f81d1203d?q=80&w=500&auto=format&fit=crop' },
        { name: 'Grid Grey', filter: 'grayscale(100%) brightness(0.9)', imageSrc: 'https://images.unsplash.com/photo-1522851458296-189f81d1203d?q=80&w=500&auto=format&fit=crop' },
        { name: 'Grid Blue', filter: 'hue-rotate(200deg) sepia(0.2)', imageSrc: 'https://images.unsplash.com/photo-1522851458296-189f81d1203d?q=80&w=500&auto=format&fit=crop' }
    ]
};

let currentCardImgId = null;

function openColorPicker(event, seriesId, cardImgId) {
    event.preventDefault();
    event.stopPropagation();

    currentCardImgId = cardImgId;
    currentSeriesId = seriesId; // Track current series for manual interaction sync
    const colors = productsConfig[seriesId];
    const modal = document.getElementById('color-picker-modal');
    const colorGrid = document.getElementById('color-grid');

    // Clear existing
    colorGrid.innerHTML = '';

    // Populate
    if (colors) {
        colors.forEach(color => {
            const btn = document.createElement('button');
            btn.className = "flex flex-col items-center gap-2 group";
            btn.onclick = () => updateCardImage(color);

            // Color Swatch
            const swatch = document.createElement('div');
            swatch.className = "w-12 h-12 rounded-full shadow-md border-2 border-white ring-2 ring-gray-100 group-hover:scale-110 transition-transform overflow-hidden";

            // Inner logic to simulate color (using same image + filter)
            const img = document.createElement('img');
            img.src = color.imageSrc;
            img.className = "w-full h-full object-cover";
            img.style.filter = color.filter;

            swatch.appendChild(img);

            // Label
            const label = document.createElement('span');
            label.className = "text-xs font-medium text-gray-700 group-hover:text-blue-600";
            label.textContent = color.name;

            btn.appendChild(swatch);
            btn.appendChild(label);
            colorGrid.appendChild(btn);
        });
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function updateCardImage(colorConfig) {
    const img = document.getElementById(currentCardImgId);
    if (img) {
        img.style.filter = colorConfig.filter;
        img.src = colorConfig.imageSrc;

        // Sync auto-cycle index with manually selected color
        if (currentSeriesId && productsConfig[currentSeriesId]) {
            const index = productsConfig[currentSeriesId].findIndex(c => c.name === colorConfig.name);
            if (index !== -1) {
                colorIndices[currentSeriesId] = index;
            }
        }
    }
    closeColorPicker();
}

function closeColorPicker() {
    const modal = document.getElementById('color-picker-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    currentCardImgId = null;
}

// Close Modal on Outside Click
document.getElementById('color-picker-modal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('color-picker-modal')) {
        closeColorPicker();
    }
});


// --- Auto-Cycling Color Logic ---

const colorIndices = {};
let currentSeriesId = null; // Track which series modal is open for manual sync

function startColorCycle() {
    setInterval(() => {
        Object.keys(productsConfig).forEach(seriesId => {
            const colors = productsConfig[seriesId];
            if (!colors || colors.length === 0) return;

            // Initialize index if not set
            if (typeof colorIndices[seriesId] === 'undefined') {
                colorIndices[seriesId] = 0;
            }

            // Increment index
            colorIndices[seriesId] = (colorIndices[seriesId] + 1) % colors.length;

            // Get next color
            const nextColor = colors[colorIndices[seriesId]];

            // Update Image
            const imgId = `img-${seriesId}`;
            const imgElement = document.getElementById(imgId);

            if (imgElement) {
                // Ensure partial smooth transition for filter (though src change is instant)
                imgElement.style.transition = "filter 0.5s ease-in-out";
                imgElement.src = nextColor.imageSrc;
                imgElement.style.filter = nextColor.filter;
            }
        });
    }, 10000);
}

// Start cycle on load
document.addEventListener('DOMContentLoaded', () => {
    startColorCycle();
});
