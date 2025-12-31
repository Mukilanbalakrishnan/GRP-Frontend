// aboutus.js (Vanilla JS Version - No External Dependencies)

import {initNavbar} from "../../components/Navbar/Navbar";
import {initFooter} from "../../components/Footer/Footer";

// aboutus.js (Vanilla JS Version - No External Dependencies)

document.addEventListener('DOMContentLoaded', () => {


    // -------------------------------------------------------------
    // Review Carousel Logic
    // -------------------------------------------------------------

    const reviews = [
        {
            id: 1,
            author: "Alex Johnson",
            role: "Verified Client",
            text: "Excellent service! Highly recommended for their professionalism and attention to detail. They exceeded all our expectations.",
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 2,
            author: "Sarah Williams",
            role: "Project Manager",
            text: "The team was incredibly responsive and delivered the project ahead of schedule. Truly a pleasure to work with.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 3,
            author: "Michael Chen",
            role: "Tech Lead",
            text: "Innovative solutions and top-tier code quality. Their expertise helped us solve complex challenges effortlessly.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 4,
            author: "Emily Davis",
            role: "Creative Director",
            text: "A fantastic eye for design and user experience. The final product looks stunning and works perfectly.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 5,
            author: "David Brown",
            role: "Startup Founder",
            text: "They helped us scale our MVP into a full-fledged product. Their technical guidance was invaluable.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 6,
            author: "Lisa Anderson",
            role: "Marketing Head",
            text: "Our conversion rates skyrocketed after the redesign. The team understood our brand voice perfectly.",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop"
        }
    ];

    let currentReviewIndex = 0;

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const reviewImg = document.getElementById('review-img');
    const reviewAuthor = document.getElementById('review-author');
    const reviewText = document.getElementById('review-text');

    console.log("Carousel Script Loaded. Elements:", { prevBtn, nextBtn, reviewImg });

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

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            console.log("Prev Clicked");
            currentReviewIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length;
            updateReview(currentReviewIndex);
        });

        nextBtn.addEventListener('click', () => {
            console.log("Next Clicked");
            currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
            updateReview(currentReviewIndex);
        });
    } else {
        console.error("Navigation buttons not found!");
    }
});



document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initFooter();
});