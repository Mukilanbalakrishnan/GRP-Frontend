    
// src/components/BackToTop/BackToTop.js
import { animate } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm";

const EASE_IN_OUT = [0.4, 0.0, 0.2, 1];
let isVisible = false;
let isInFooterZone = false;

export function initBackToTop() {
    // 1. Inject HTML & CSS
    const buttonHTML = `
        <div id="back-to-top" class="fixed bottom-8 right-8 z-50 opacity-0 invisible translate-y-20 cursor-pointer group">
            <div class="relative w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300">
                <!-- Progress Ring -->
                <svg class="progress-ring w-full h-full absolute inset-0 -rotate-90" width="48" height="48">
                    <circle 
                        class="text-gray-200/50"
                        stroke="currentColor" 
                        stroke-width="3" 
                        fill="transparent" 
                        r="20" 
                        cx="24" 
                        cy="24" 
                    />
                    <circle 
                        class="progress-ring__circle text-blue-600 transition-all duration-300"
                        stroke="currentColor" 
                        stroke-width="3" 
                        fill="transparent" 
                        r="20" 
                        cx="24" 
                        cy="24" 
                    />
                </svg>

                <!-- Arrow with pulsing effect -->
                <div class="relative z-10">
                    <i class="ph-bold ph-arrow-up text-xl text-blue-600 group-hover:text-blue-700 transition-all duration-300"></i>
                    
                    <!-- Pulsing glow effect -->
                    <div class="absolute inset-0 w-full h-full rounded-full bg-blue-600/0 group-hover:bg-blue-600/20 blur-sm transition-all duration-500 -z-10"></div>
                </div>
                
                <!-- Bubble effect dots -->
                <div class="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
            </div>
            
            <!-- Tooltip -->
            <div class="absolute right-full top-1/2 -translate-y-1/2 mr-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div class="relative bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap">
                    Back to top
                    <div class="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', buttonHTML);

    // 2. Logic Variables
    const btn = document.getElementById('back-to-top');
    const circle = btn.querySelector('.progress-ring__circle');
    const arrow = btn.querySelector('i');
    const mainButton = btn.querySelector('div > div:first-child');
    const radius = 20;
    const circumference = radius * 2 * Math.PI;

    // Setup SVG Circle - Start empty
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    // 3. Animation Variables
    let lastScrollY = 0;
    let scrollDirection = 'down';
    let isScrolling = false;
    let scrollTimeout;
    let isAtBottom = false;
    let footerElement = null;

    // Find footer element for precise detection
    function findFooter() {
        const possibleFooters = ['footer', '#footer', '.footer', 'main + footer', 'body > footer'];
        
        for (const selector of possibleFooters) {
            const element = document.querySelector(selector);
            if (element && element.getBoundingClientRect().height > 50) {
                return element;
            }
        }
        
        // Fallback: last section with substantial height
        const sections = document.querySelectorAll('section, div[class*="footer"]');
        if (sections.length > 0) {
            const lastSection = sections[sections.length - 1];
            if (lastSection.getBoundingClientRect().height > 100) {
                return lastSection;
            }
        }
        
        return null;
    }

    // 4. Footer progress animation (ONLY fills when in footer)
    function updateFooterProgress() {
        if (!footerElement) return;
        
        const footerRect = footerElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how much of footer is visible (0 to 1)
        let footerVisibility = 0;
        
        if (footerRect.top < windowHeight) {
            // Footer is in view
            footerVisibility = Math.min(
                (windowHeight - footerRect.top) / footerRect.height,
                1
            );
        }
        
        // Only animate if we're in the footer zone
        if (footerVisibility > 0) {
            const offset = circumference - (footerVisibility * circumference);
            animate(circle, 
                { strokeDashoffset: offset },
                { 
                    duration: 0.3,
                    easing: EASE_IN_OUT
                }
            );
            
            // Change color based on footer progress
            if (footerVisibility > 0.8) {
                animate(circle,
                    { stroke: ["#3b82f6", "#8b5cf6", "#ec4899"] },
                    { duration: 0.5, easing: EASE_IN_OUT }
                );
            }
        } else {
            // Reset to empty when not in footer
            if (circle.style.strokeDashoffset !== circumference.toString()) {
                animate(circle,
                    { strokeDashoffset: circumference },
                    { duration: 0.3, easing: EASE_IN_OUT }
                );
            }
            circle.style.stroke = "#3b82f6";
        }
        
        return footerVisibility > 0;
    }

    // 5. Check if we're at the bottom of page
    function checkBottomStatus() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.offsetHeight;
        const winHeight = window.innerHeight;
        
        // More precise bottom detection
        const distanceFromBottom = docHeight - (scrollTop + winHeight);
        const wasAtBottom = isAtBottom;
        isAtBottom = distanceFromBottom < 50; // Within 50px of bottom
        
        // Trigger bottom animations only when state changes
        if (isAtBottom !== wasAtBottom) {
            animateBottomStateChange(isAtBottom);
        }
        
        return isAtBottom;
    }

    // 6. Bottom state change animations
    function animateBottomStateChange(atBottom) {
        if (atBottom) {
            // Entering bottom zone
            animate(mainButton,
                {
                    backgroundColor: ["#ffffff", "#3b82f6"],
                    scale: [1, 1.1, 1]
                },
                {
                    duration: 0.4,
                    easing: EASE_IN_OUT
                }
            );
            
            animate(arrow,
                {
                    color: ["#3b82f6", "#ffffff"]
                },
                {
                    duration: 0.4,
                    easing: EASE_IN_OUT
                }
            );
            
            // Complete the circle animation when at bottom
            if (footerElement) {
                animate(circle,
                    {
                        strokeDashoffset: 0,
                        stroke: "#ffffff"
                    },
                    {
                        duration: 0.6,
                        easing: EASE_IN_OUT
                    }
                );
            }
        } else {
            // Leaving bottom zone
            animate(mainButton,
                {
                    backgroundColor: ["#3b82f6", "#ffffff"]
                },
                {
                    duration: 0.4,
                    easing: EASE_IN_OUT
                }
            );
            
            animate(arrow,
                {
                    color: ["#ffffff", "#3b82f6"]
                },
                {
                    duration: 0.4,
                    easing: EASE_IN_OUT
                }
            );
            
            // Reset circle to empty unless in footer zone
            if (!isInFooterZone) {
                animate(circle,
                    {
                        strokeDashoffset: circumference,
                        stroke: "#3b82f6"
                    },
                    {
                        duration: 0.3,
                        easing: EASE_IN_OUT
                    }
                );
            }
        }
    }

    // 7. Button visibility animations
    function animateButtonEntrance() {
        btn.classList.remove('invisible', 'opacity-0', 'translate-y-20');
        isVisible = true;

        animate(btn,
            {
                opacity: 1,
                y: 0,
                scale: [0.8, 1],
                rotate: [10, 0]
            },
            {
                duration: 0.6,
                easing: EASE_IN_OUT
            }
        );
    }

    function animateButtonExit() {
    if (!isVisible) return;
    isVisible = false;

    animate(btn,
        {
            opacity: 0,
            y: 20,
            scale: 0.9
        },
        {
            duration: 0.4,
            easing: EASE_IN_OUT
        }
    );

    // Motion does NOT return a Promise → use timeout
    setTimeout(() => {
        btn.classList.add('invisible', 'opacity-0', 'translate-y-20');
    }, 400);
}


    function playBounceAnimation() {
        animate(btn,
            {
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0]
            },
            {
                duration: 0.8,
                easing: [0.68, -0.55, 0.265, 1.55]
            }
        );
    }

    // 8. Scroll to Top Animation
    function scrollToTop() {
        // Reset circle before animation
        circle.style.strokeDashoffset = circumference;
        
        // Button click animation
        animate(btn,
            {
                scale: [1, 0.8, 1],
                rotate: [0, -360]
            },
            {
                duration: 0.8,
                easing: [0.68, -0.55, 0.265, 1.55]
            }
        );
        
        // Arrow animation
        animate(arrow,
            {
                y: [0, -10, 0],
                scale: [1, 1.3, 1]
            },
            {
                duration: 0.5,
                easing: EASE_IN_OUT
            }
        );
        
        // Page scroll
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // 9. Main Scroll Handler
    function handleScroll() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.offsetHeight;
        const winHeight = window.innerHeight;
        
        // Determine scroll direction
        scrollDirection = scrollTop > lastScrollY ? 'down' : 'up';
        lastScrollY = scrollTop;
        
        // Clear previous timeout
        clearTimeout(scrollTimeout);
        isScrolling = true;
        
        // Find footer on first scroll
        if (!footerElement) {
            footerElement = findFooter();
        }
        
        // Check footer progress (ONLY fills when in footer)
        const wasInFooterZone = isInFooterZone;
        isInFooterZone = updateFooterProgress();
        
        // If just entered footer zone, play animation
        if (isInFooterZone && !wasInFooterZone) {
            playBounceAnimation();
        }
        
        // Check bottom status
        checkBottomStatus();
        
        // Show/Hide Button based on scroll position
        if (scrollTop > 300 && !isVisible) {
            animateButtonEntrance();
            if (scrollDirection === 'up') {
                playBounceAnimation();
            }
        } else if (scrollTop <= 300 && isVisible) {
            animateButtonExit();
        }
        
        // Reset scrolling flag
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);
    }

    // 10. Event Listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check after DOM is fully loaded
    setTimeout(() => {
        footerElement = findFooter();
        handleScroll();
    }, 500);

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToTop();
    });

    // 11. Hover Animations
    btn.addEventListener('mouseenter', () => {
        if (isScrolling) return;
        
        animate(btn,
            {
                scale: 1.05,
                rotate: -5
            },
            {
                duration: 0.3,
                easing: EASE_IN_OUT
            }
        );
    });

    btn.addEventListener('mouseleave', () => {
        animate(btn,
            {
                scale: 1,
                rotate: 0
            },
            {
                duration: 0.3,
                easing: EASE_IN_OUT
            }
        );
    });

    // 12. Keyboard Accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Home' || (e.ctrlKey && e.key === 'ArrowUp')) {
            e.preventDefault();
            scrollToTop();
        }
    });

    // 13. Handle dynamic content loading (for SPAs)
    function handleContentChange() {
        footerElement = findFooter();
        handleScroll();
    }

    // Observe DOM changes for SPAs
    const observer = new MutationObserver(() => {
        footerElement = findFooter();
    });

    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });

    // 14. Cleanup function
    return function cleanup() {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('keydown', handleKeyDown);
        observer.disconnect();
        if (btn) btn.remove();
    };
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initBackToTop();
    });
} else {
    initBackToTop();
}