// --- IMPORTS ---
// import { initNavbar } from "../../components/Navbar/Navbar";
// import { initFooter } from "../../components/Footer/Footer";

const GALLERY_API =
    "http://localhost/GRP-Backend/api/gallery/gallery-list.php";


let galleryData = [];

class Gallery {
    constructor() {
        this.galleryGrid = document.getElementById('galleryGrid');
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightboxImage');
        this.lightboxCaption = document.getElementById('lightboxCaption');
        
        this.originalData = [];

        this.displayData = []; 
        this.currentIndex = 0;
        this.isDragging = false;
        this.startX = 0;
        this.isTransitioning = false;

        this.init();
        window.addEventListener('resize', () => {
             requestAnimationFrame(() => this.updateCarousel(false));
        });
    }

    init() {
    this.loadGalleryFromDB();
    this.setupEventListeners();
}


    renderGallery(data) {
        if (!this.galleryGrid) return;
        

        this.galleryGrid.innerHTML = '';

        data.forEach((item, index) => {
            
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.index = index;

            galleryItem.style.position = 'absolute';
            galleryItem.style.left = '50%';
            galleryItem.style.top = '50%';
            
            let width = 300;
            let height = 400;
            if (window.innerWidth < 768) {
                width = 220;
                height = 320;
            }
            
            galleryItem.style.width = `${width}px`;
            galleryItem.style.height = `${height}px`;
            galleryItem.style.marginLeft = `-${width / 2}px`;
            galleryItem.style.marginTop = `-${height / 2}px`;

            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" loading="eager" style="width:100%; height:100%; object-fit:cover; border-radius:15px;">
                <div class="gallery-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;

            galleryItem.addEventListener('click', () => {
                const centerDist = Math.abs(index - this.currentIndex);
                if (centerDist === 0) {
                    this.openLightbox(index);
                } else {
                    const dir = index > this.currentIndex ? 1 : -1;
                    this.rotateCarousel(dir);
                }
            });

            this.galleryGrid.appendChild(galleryItem);
        });
    }

    async loadGalleryFromDB() {
    try {
        const res = await fetch(GALLERY_API);
        const data = await res.json();
        

        // ✅ API RETURNS ARRAY DIRECTLY
        if (!Array.isArray(data)) {
            console.error("Invalid gallery API response:", data);
            return;
        }
        

        this.originalData = data.map(item => {
    return {
        id: item.id,
        image: item.url || "",   // ✅ USE url DIRECTLY
        title: item.title || "",
        category: item.category || "",
        description: item.description || ""
    };
});




        if (this.originalData.length === 0) return;

        // Infinite carousel
        this.displayData = [
            ...this.originalData,
            ...this.originalData,
            ...this.originalData
        ];

        this.currentIndex =
            this.originalData.length +
            Math.floor(this.originalData.length / 2);

        this.renderGallery(this.displayData);
        requestAnimationFrame(() => this.updateCarousel(false));

    } catch (err) {
        console.error("Gallery fetch failed", err);
    }
}




    setupEventListeners() {
        const closeBtn = document.querySelector('.lightbox-close');
        if (closeBtn) closeBtn.addEventListener('click', () => this.closeLightbox());

        const prevBtnLightbox = document.getElementById('prevBtn');
        const nextBtnLightbox = document.getElementById('nextBtn');
        if (prevBtnLightbox) prevBtnLightbox.addEventListener('click', () => this.navigateLightbox(-1));
        if (nextBtnLightbox) nextBtnLightbox.addEventListener('click', () => this.navigateLightbox(1));

        const carouselPrev = document.getElementById('carouselPrev');
        const carouselNext = document.getElementById('carouselNext');
        if (carouselPrev) carouselPrev.addEventListener('click', () => this.rotateCarousel(-1));
        if (carouselNext) carouselNext.addEventListener('click', () => this.rotateCarousel(1));

        if (this.lightbox) {
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) this.closeLightbox();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (this.lightbox && this.lightbox.classList.contains('active')) {
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.navigateLightbox(-1);
                if (e.key === 'ArrowRight') this.navigateLightbox(1);
            } else {
                if (e.key === 'ArrowLeft') this.rotateCarousel(-1);
                if (e.key === 'ArrowRight') this.rotateCarousel(1);
            }
        });
        
        let touchStartX = 0;
        let touchEndX = 0;
        this.galleryGrid.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        this.galleryGrid.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, {passive: true});
        
        this.handleSwipe = () => {
            if (touchStartX - touchEndX > 50) this.rotateCarousel(1); 
            if (touchEndX - touchStartX > 50) this.rotateCarousel(-1); 
        };
    }

    // UPDATED FUNCTION: Fixed Z-Index calculations to prevent overlay conflicts
    updateCarousel(enableTransition = true) {
        const items = document.querySelectorAll('.gallery-item');
        const isMobile = window.innerWidth < 768;
        
        const spacing = isMobile ? 120 : 200;  
        const rotation = isMobile ? 25 : 45;   
        const depthStep = isMobile ? 100 : 150; 

        items.forEach((item, index) => {
            const offset = index - this.currentIndex;
            const absOffset = Math.abs(offset);

            item.style.transition = enableTransition ? 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)' : 'none';

            let transform = '';
            let zIndex = 0;
            let opacity = 1;

            if (offset === 0) {
                // --- CENTER ITEM ---
                transform = `translateX(0px) translateZ(${isMobile ? 200 : 350}px) rotateY(0deg) scale(1.1)`;
                // FIXED: Changed from 1000 to 40 so it stays UNDER Navbar (z-50)
                zIndex = 40; 
                opacity = 1;
                item.classList.add('active');
            } else {
                // --- SIDE ITEMS ---
                const sign = Math.sign(offset);
                opacity = Math.max(0.1, 1 - (absOffset * 0.3));
                const hideThreshold = isMobile ? 2 : 3;
                if (absOffset > hideThreshold) opacity = 0;

                const translateX = offset * spacing;
                const rotateY = -sign * rotation;
                const translateZ = -absOffset * depthStep;

                transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
                
                // FIXED: Lowered zIndex calculation to stay below 40
                zIndex = 30 - absOffset; 
                item.classList.remove('active');
            }

            item.style.transform = transform;
            item.style.zIndex = zIndex;
            item.style.opacity = opacity;
            item.style.pointerEvents = absOffset > (isMobile ? 1 : 2) ? 'none' : 'auto';
        });
    }

    rotateCarousel(direction) {
        if (this.isTransitioning) return;

        this.currentIndex += direction;
        this.isTransitioning = true;
        this.updateCarousel(true);

        const realLength = this.originalData.length;

        setTimeout(() => {
            this.isTransitioning = false;
            let needsReset = false;
            let resetIndex = this.currentIndex;

            if (this.currentIndex < realLength) {
                resetIndex = this.currentIndex + realLength;
                needsReset = true;
            } else if (this.currentIndex >= realLength * 2) {
                resetIndex = this.currentIndex - realLength;
                needsReset = true;
            }

            if (needsReset) {
                this.currentIndex = resetIndex;
                this.updateCarousel(false); 
            }
        }, 500);
    }

    openLightbox(displayIndex) {
        if (!this.lightbox) return;
        const realIndex = displayIndex % this.originalData.length;
        this.currentLightboxIndex = realIndex;
        this.updateLightboxContent();
        
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        if (this.lightbox) {
            this.lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    navigateLightbox(direction) {
        this.currentLightboxIndex += direction;
        const len = this.originalData.length;

        if (this.currentLightboxIndex < 0) {
            this.currentLightboxIndex = len - 1;
        } else if (this.currentLightboxIndex >= len) {
            this.currentLightboxIndex = 0;
        }

        this.updateLightboxContent();
    }

    updateLightboxContent() {
        const currentItem = this.originalData[this.currentLightboxIndex];
        if (!currentItem) return;

        this.lightboxImage.src = currentItem.image;
        this.lightboxImage.alt = currentItem.title;
        this.lightboxCaption.innerHTML = `
            <h3>${currentItem.title}</h3>
            <p>${currentItem.description}</p>
            <span class="image-counter">${this.currentLightboxIndex + 1} / ${this.originalData.length}</span>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof initNavbar === 'function') initNavbar();
    if (typeof initFooter === 'function') initFooter();
    new Gallery();
    
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Gallery;
}