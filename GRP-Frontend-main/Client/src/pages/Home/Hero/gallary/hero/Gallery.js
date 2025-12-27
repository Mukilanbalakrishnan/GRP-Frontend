// Gallery data
const galleryData = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        title: 'Mountain Landscape',
        category: 'nature',
        description: 'Beautiful mountain scenery'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800',
        title: 'Modern Building',
        category: 'architecture',
        description: 'Contemporary architecture design'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800',
        title: 'Portrait',
        category: 'people',
        description: 'Stunning portrait photography'
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
        title: 'Abstract Art',
        category: 'art',
        description: 'Modern abstract painting'
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
        title: 'Forest Path',
        category: 'nature',
        description: 'Peaceful forest trail'
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800',
        title: 'City Skyline',
        category: 'architecture',
        description: 'Urban cityscape at night'
    },
    {
        id: 7,
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800',
        title: 'Fashion Portrait',
        category: 'people',
        description: 'Fashion photography'
    },
    {
        id: 8,
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
        title: 'Colorful Canvas',
        category: 'art',
        description: 'Vibrant artistic expression'
    }
];

class Gallery {
    constructor() {
        this.galleryGrid = document.getElementById('galleryGrid');
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightboxImage');
        this.lightboxCaption = document.getElementById('lightboxCaption');
        // Filter buttons removed from HTML, but keeping safe selector
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.currentFilter = 'all';
        this.originalData = galleryData;
        this.displayData = []; // Will hold the tripled data

        // Carousel State
        this.currentIndex = 0;
        this.isDragging = false;
        this.startX = 0;
        this.isTransitioning = false;

        this.init();
    }

    init() {
        // Initial setup
        this.setupData(this.originalData);
        this.setupEventListeners();
    }

    setupData(data) {
        // Create 3 sets for infinite loop illusion
        this.displayData = [...data, ...data, ...data];
        // Start in the middle set
        this.currentIndex = data.length + Math.floor(data.length / 2);
        this.renderGallery(this.displayData);
        this.updateCarousel();
    }

    setupEventListeners() {
        // Lightbox controls
        const closeBtn = document.querySelector('.lightbox-close');
        if (closeBtn) closeBtn.addEventListener('click', () => this.closeLightbox());

        const prevBtnLightbox = document.getElementById('prevBtn');
        const nextBtnLightbox = document.getElementById('nextBtn');

        if (prevBtnLightbox) prevBtnLightbox.addEventListener('click', () => this.navigateLightbox(-1));
        if (nextBtnLightbox) nextBtnLightbox.addEventListener('click', () => this.navigateLightbox(1));

        // Carousel Navigation
        const carouselPrev = document.getElementById('carouselPrev');
        const carouselNext = document.getElementById('carouselNext');

        if (carouselPrev) carouselPrev.addEventListener('click', () => this.rotateCarousel(-1));
        if (carouselNext) carouselNext.addEventListener('click', () => this.rotateCarousel(1));

        // Close lightbox on background click
        if (this.lightbox) {
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.closeLightbox();
                }
            });
        }

        // Keyboard navigation
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
    }

    renderGallery(data) {
        this.galleryGrid.innerHTML = '';

        data.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.index = index;
            // Map index back to original data ID for clarity if needed, 
            // but for display we just use the item content.
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" loading="lazy">
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
                    // Smart navigation: determine shortest direction
                    const dir = index > this.currentIndex ? 1 : -1;
                    this.rotateCarousel(dir);
                }
            });

            this.galleryGrid.appendChild(galleryItem);
        });
    }

    updateCarousel(enableTransition = true) {
        const items = document.querySelectorAll('.gallery-item');

        items.forEach((item, index) => {
            const offset = index - this.currentIndex;

            // Basic Coverflow Math
            const spacing = 180;
            const rotation = 40;
            const depth = 200;

            let transform = '';
            let zIndex = 0;
            let opacity = 1;

            // Handle transition
            item.style.transition = enableTransition ? 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)' : 'none';

            if (offset === 0) {
                // Center
                transform = `translateX(0) translateZ(${depth}px) rotateY(0deg)`;
                zIndex = 100;
                item.classList.add('active');
            } else {
                // Sides
                const sign = Math.sign(offset);
                const absOffset = Math.abs(offset);

                opacity = Math.max(0.2, 1 - (absOffset * 0.2));

                // Hide far items for better loop illusion and performance
                if (absOffset > 3) opacity = 0;

                const translateX = offset * spacing;
                const rotateY = -sign * rotation;

                transform = `translateX(${translateX}px) translateZ(-${absOffset * 100}px) rotateY(${rotateY}deg)`;
                zIndex = 100 - absOffset;
                item.classList.remove('active');
            }

            item.style.transform = transform;
            item.style.zIndex = zIndex;
            item.style.opacity = opacity;

            // Interaction pointer events
            if (offset === 0) {
                item.style.pointerEvents = 'auto';
            } else {
                item.style.pointerEvents = 'auto'; // allow clicking side items to nav
            }
        });
    }

    rotateCarousel(direction) {
        if (this.isTransitioning) return;

        this.currentIndex += direction;
        this.isTransitioning = true;
        this.updateCarousel(true);

        const realLength = this.originalData.length;

        // Reset check after transition
        setTimeout(() => {
            this.isTransitioning = false;

            // Infinite Loop Logic:
            // If we are in the first set (index < realLength), jump to middle set.
            // If we are in the third set (index >= 2 * realLength), jump to middle set.

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
                this.updateCarousel(false); // Disable transition for instant jump
            }
        }, 500); // Match CSS transition duration
    }

    // Lightbox Logic - Simplified to use originalData
    openLightbox(displayIndex) {
        // Map displayIndex (0..3N) to original data index (0..N)
        const realIndex = displayIndex % this.originalData.length;
        this.currentLightboxIndex = realIndex;
        this.updateLightboxContent();
        if (this.lightbox) {
            this.lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
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

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Gallery();
});

// Export for module use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Gallery;
}
