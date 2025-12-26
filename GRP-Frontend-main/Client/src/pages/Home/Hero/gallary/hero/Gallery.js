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
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.currentFilter = 'all';
        this.filteredData = galleryData;

        // Carousel State
        this.currentIndex = Math.floor(this.filteredData.length / 2); // Start in middle
        this.isDragging = false;
        this.startX = 0;

        this.init();
    }

    init() {
        this.renderGallery(this.filteredData);
        this.setupEventListeners();
        this.updateCarousel(); // Initial positioning
    }

    setupEventListeners() {
        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });

        // Lightbox controls
        document.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());

        // Note: Lightbox buttons are for within the lightbox; 
        // We also have Carousel buttons now.
        const prevBtnLightbox = document.getElementById('prevBtn'); // In lightbox
        const nextBtnLightbox = document.getElementById('nextBtn'); // In lightbox

        if (prevBtnLightbox) prevBtnLightbox.addEventListener('click', () => this.navigateLightbox(-1));
        if (nextBtnLightbox) nextBtnLightbox.addEventListener('click', () => this.navigateLightbox(1));

        // Carousel Navigation
        document.getElementById('carouselPrev').addEventListener('click', () => this.rotateCarousel(-1));
        document.getElementById('carouselNext').addEventListener('click', () => this.rotateCarousel(1));

        // Close lightbox on background click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.classList.contains('active')) {
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.navigateLightbox(-1);
                if (e.key === 'ArrowRight') this.navigateLightbox(1);
            } else {
                // Carousel Navigation when lightbox is closed
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
            // Store index for clicking reference
            galleryItem.dataset.index = index;
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="gallery-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;

            // Interaction: Click center to open lightbox, click side to rotate
            galleryItem.addEventListener('click', () => {
                if (this.currentIndex === index) {
                    this.openLightbox(index);
                } else {
                    this.currentIndex = index;
                    this.updateCarousel();
                }
            });

            this.galleryGrid.appendChild(galleryItem);
        });
    }

    updateCarousel() {
        const items = document.querySelectorAll('.gallery-item');
        const count = items.length;

        items.forEach((item, index) => {
            // Determine distance from current index
            // Handle simple linear mapping first
            let offset = index - this.currentIndex;

            // Basic Coverflow Math
            const spacing = 180; // Distance between centers
            const rotation = 40; // Max rotation in degrees
            const depth = 200;   // Depth push for side items

            // Limit visible items for performance if many (optional, but good for style)
            // For now, render all but fade far ones

            let transform = '';
            let zIndex = 0;
            let opacity = 1;

            if (offset === 0) {
                // Center Item
                transform = `translateX(0) translateZ(${depth}px) rotateY(0deg)`;
                zIndex = 100;
                item.classList.add('active');
            } else {
                // Side Items
                const sign = Math.sign(offset);
                const absOffset = Math.abs(offset);

                // Cap opacity for very far items
                opacity = Math.max(0.2, 1 - (absOffset * 0.2));

                const translateX = offset * spacing;
                // Push back in Z, rotate towards center
                // If left (negative offset), rotate positive. If right (positive), rotate negative.
                const rotateY = -sign * rotation;

                transform = `translateX(${translateX}px) translateZ(-${absOffset * 100}px) rotateY(${rotateY}deg)`;
                zIndex = 100 - absOffset;
                item.classList.remove('active');
            }

            item.style.transform = transform;
            item.style.zIndex = zIndex;
            item.style.opacity = opacity;
        });
    }

    rotateCarousel(direction) {
        // Direction: -1 (left/prev), 1 (right/next)
        const newIndex = this.currentIndex + direction;

        // Bounds checking
        if (newIndex >= 0 && newIndex < this.filteredData.length) {
            this.currentIndex = newIndex;
            this.updateCarousel();
        }
    }

    handleFilter(e) {
        const filter = e.target.dataset.filter;
        this.currentFilter = filter;

        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Filter gallery items
        this.galleryGrid.style.opacity = '0'; // Fade out effect

        setTimeout(() => {
            if (filter === 'all') {
                this.filteredData = galleryData;
            } else {
                this.filteredData = galleryData.filter(item => item.category === filter);
            }

            // Reset index to middle of new list
            this.currentIndex = Math.floor(this.filteredData.length / 2);

            this.renderGallery(this.filteredData);
            this.updateCarousel();

            this.galleryGrid.style.opacity = '1';
        }, 300);
    }

    // Lightbox Logic
    openLightbox(index) {
        // Index is relative to filteredData
        this.currentLightboxIndex = index; // Store separate index for lightbox nav
        this.updateLightboxContent();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    navigateLightbox(direction) {
        this.currentLightboxIndex += direction;

        if (this.currentLightboxIndex < 0) {
            this.currentLightboxIndex = this.filteredData.length - 1;
        } else if (this.currentLightboxIndex >= this.filteredData.length) {
            this.currentLightboxIndex = 0;
        }

        this.updateLightboxContent();
    }

    updateLightboxContent() {
        const currentItem = this.filteredData[this.currentLightboxIndex];
        this.lightboxImage.src = currentItem.image;
        this.lightboxImage.alt = currentItem.title;
        this.lightboxCaption.innerHTML = `
            <h3>${currentItem.title}</h3>
            <p>${currentItem.description}</p>
            <span class="image-counter">${this.currentLightboxIndex + 1} / ${this.filteredData.length}</span>
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
