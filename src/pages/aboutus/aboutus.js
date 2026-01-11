// aboutus.js (Vanilla JS Version - No External Dependencies)

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // Navbar Logic
    // -------------------------------------------------------------
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    let isOpen = false;

    if (menuBtn && mobileMenu && menuIcon) {
        menuBtn.addEventListener('click', () => {
            isOpen = !isOpen;

            if (isOpen) {
                // Open Menu
                menuIcon.classList.replace('ph-list', 'ph-x');
                mobileMenu.classList.remove('hidden');
                // Simple entry animation
                mobileMenu.style.opacity = '0';
                mobileMenu.style.transform = 'translateY(-10px)';
                mobileMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

                requestAnimationFrame(() => {
                    mobileMenu.style.opacity = '1';
                    mobileMenu.style.transform = 'translateY(0)';
                });

            } else {
                // Close Menu
                menuIcon.classList.replace('ph-x', 'ph-list');

                // Simple exit animation
                mobileMenu.style.opacity = '0';
                mobileMenu.style.transform = 'translateY(-10px)';

                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300); // Wait for transition
            }
        });
    }

    // -------------------------------------------------------------
    // Review Carousel Logic
    // -------------------------------------------------------------

    let reviews = [
        
    ];
    const API_BASE_URL = window.ENV.API_BASE_URL;

if (!API_BASE_URL) {
  console.error("❌ API_BASE_URL not found");
}

    let currentReviewIndex = 0;

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const reviewImg = document.getElementById('review-img');
    const reviewAuthor = document.getElementById('review-author');
    const reviewText = document.getElementById('review-text');

    console.log("Carousel Script Loaded. Elements:", { prevBtn, nextBtn, reviewImg });



    async function loadAboutReviews() {
    try {
        const res = await fetch(
            `${API_BASE_URL}/api/about/about-list.php`
        );

        const data = await res.json();

        // Map backend → frontend format (DO NOT TOUCH UI LOGIC)
        reviews = data.map(item => ({
            id: item.id,
            author: item.name,
            role: item.role,
            text: item.text,
            image: item.image
                ? `${API_BASE_URL}/${item.image}`
                : ""
        }));

        // Safety check
        if (reviews.length === 0) return;

        // Load first review
        currentReviewIndex = 0;
        updateReview(currentReviewIndex);

        // Restart auto scroll
        startAutoScroll();

    } catch (err) {
        console.error("Failed to load about reviews", err);
    }
}


    function updateReview(index) {
        const review = reviews[index];
        console.log("Updating to review index:", index);

        // Element check
        if (!reviewImg || !reviewAuthor || !reviewText) {
            console.error("Missing carousel elements");
            return;
        }

        // Fade Out
        reviewAuthor.style.opacity = '0';
        reviewText.style.opacity = '0';
        reviewAuthor.style.transform = 'translateY(10px)';
        reviewText.style.transform = 'translateY(10px)';

        setTimeout(() => {
            // Update Content
            reviewAuthor.textContent = review.author;
            reviewText.textContent = `"${review.text}"`;

            // Image handling
            const tempImg = new Image();
            tempImg.src = review.image;
            tempImg.onload = () => {
                reviewImg.src = review.image;
            };

            // Fade In
            reviewAuthor.style.opacity = '1';
            reviewText.style.opacity = '1';
            reviewAuthor.style.transform = 'translateY(0)';
            reviewText.style.transform = 'translateY(0)';
        }, 300); // 300ms matches standard transition
    }

    // -------------------------------------------------------------
    // Auto-Scroll Logic
    // -------------------------------------------------------------
    let autoScrollInterval;
    const AUTO_SCROLL_DELAY = 5000; // 5 seconds
    const carouselContainer = document.getElementById('reviews-carousel');

    function startAutoScroll() {
        stopAutoScroll(); // Clear any existing

        autoScrollInterval = setInterval(() => {
            currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
            updateReview(currentReviewIndex);
        }, AUTO_SCROLL_DELAY);
    }

    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            console.log("Prev Clicked");
            currentReviewIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length;
            updateReview(currentReviewIndex);
            startAutoScroll(); // Reset timer
        });

        nextBtn.addEventListener('click', () => {
            console.log("Next Clicked");
            currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
            updateReview(currentReviewIndex);
            startAutoScroll(); // Reset timer
        });
    } else {
        console.error("Navigation buttons not found!");
    }

    // Independent Hover Logic
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            stopAutoScroll();
        });
        carouselContainer.addEventListener('mouseleave', () => {
            startAutoScroll();
        });
    }

    // Start initial timer
    loadAboutReviews();

});
