// navbar.js
import { animate, stagger, inView } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm";

export function initNavbar() {
  fetch('/src/components/Navbar/Navbar.html')
    .then(res => {
      if (!res.ok) throw new Error('Navbar load failed');
      return res.text();
    })
    .then(html => {
      const container = document.getElementById('navbar-container');
      if (!container) return;

      container.innerHTML = html;
      
      // Initialize all navbar features
      setupMobileMenu();
      highlightActiveLink();
      setupNavbarScroll();
      setupBackendFeatures();
      setupLogout();
      
      // Animate navbar on load
      animateNavbar();
    })
    .catch(err => console.error('Navbar error:', err));
}

function animateNavbar() {
  const nav = document.querySelector('nav');
  
  // Animate navbar entrance
  animate(
    nav,
    { y: [-50, 0], opacity: [0, 1] },
    { duration: 0.5, easing: "ease-out" }
  );
  
  // Animate brand
  animate(
    '.nav a',
    { x: [-20, 0], opacity: [0, 1] },
    { duration: 0.6, delay: 0.2 }
  );
  
  // Animate desktop menu items
  animate(
    '.nav-link',
    { y: [-10, 0], opacity: [0, 1] },
    { delay: stagger(0.1, { start: 0.3 }), duration: 0.5 }
  );
}

function setupMobileMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  let isOpen = false;

  if (!menuBtn) return;

  menuBtn.addEventListener("click", () => {
    isOpen = !isOpen;

    if (isOpen) {
      // Open animation
      menuIcon?.classList.replace("ph-list", "ph-x");
      menuIcon?.style.setProperty('transform', 'rotate(90deg)');
      
      mobileMenu.classList.remove("hidden");

      animate(
        mobileMenu,
        { 
          height: ["0px", `${mobileMenu.scrollHeight}px`], 
          opacity: [0, 1] 
        },
        { 
          duration: 0.4, 
          easing: [0.22, 1, 0.36, 1] 
        }
      );

      animate(
        ".mobile-link",
        { 
          opacity: [0, 1], 
          x: [-20, 0],
          filter: ["blur(4px)", "blur(0px)"]
        },
        { 
          delay: stagger(0.05), 
          duration: 0.3 
        }
      );
    } else {
      // Close animation
      menuIcon?.classList.replace("ph-x", "ph-list");
      menuIcon?.style.setProperty('transform', 'rotate(0deg)');

      const close = animate(
        mobileMenu,
        { 
          height: [`${mobileMenu.scrollHeight}px`, "0px"], 
          opacity: [1, 0] 
        },
        { 
          duration: 0.3, 
          easing: "ease-in" 
        }
      );

      close.finished.then(() => mobileMenu.classList.add("hidden"));
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (isOpen && 
        !mobileMenu.contains(e.target) && 
        !menuBtn.contains(e.target)) {
      menuBtn.click();
    }
  });
}

function highlightActiveLink() {
  const currentPath = window.location.pathname.replace(/\/$/, "");
  const links = document.querySelectorAll("nav a");

  links.forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, "");

    // Reset
    link.classList.remove("active", "text-blue-700");
    link.classList.add("text-gray-900");

    // Active
    if (
      linkPath === currentPath ||
      (currentPath === "/" && linkPath.endsWith("/index.html")) ||
      (currentPath === "" && linkPath.endsWith("/index.html"))
    ) {
      link.classList.remove("text-gray-900");
      link.classList.add("active", "text-blue-700");
      
      // Animate active link
      animate(
        link,
        { scale: [1, 1.05, 1] },
        { duration: 0.3 }
      );
    }
  });
}

function setupNavbarScroll() {
  const nav = document.querySelector('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class
    if (currentScroll > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    // Hide/show on scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scrolling down
      animate(
        nav,
        { y: -80 },
        { duration: 0.3 }
      );
    } else {
      // Scrolling up
      animate(
        nav,
        { y: 0 },
        { duration: 0.3 }
      );
    }
    
    lastScroll = currentScroll;
  });
}

// Backend-specific functionality
function setupBackendFeatures() {
  // Check if we're in backend/admin section
  const isBackendPage = window.location.pathname.includes('/admin/') || 
                       window.location.pathname.includes('/dashboard') ||
                       window.location.pathname.includes('/backend');
  
  // Check if user is logged in (you would replace this with actual auth check)
  const isLoggedIn = localStorage.getItem('userToken') || 
                     sessionStorage.getItem('isAuthenticated');
  
  // Show backend menu items if in backend section
  if (isBackendPage) {
    const backendMenu = document.getElementById('backend-menu');
    const mobileBackendMenu = document.getElementById('mobile-backend-menu');
    
    if (backendMenu) backendMenu.classList.remove('hidden');
    if (mobileBackendMenu) mobileBackendMenu.classList.remove('hidden');
  }
  
  // Show user profile if logged in
  if (isLoggedIn) {
    const userProfile = document.getElementById('user-profile');
    const mobileUserProfile = document.getElementById('mobile-user-profile');
    
    if (userProfile) {
      userProfile.classList.remove('hidden');
      
      // Animate user profile entrance
      animate(
        userProfile,
        { opacity: [0, 1], scale: [0.9, 1] },
        { duration: 0.5 }
      );
    }
    
    if (mobileUserProfile) {
      mobileUserProfile.classList.remove('hidden');
    }
  }
}

function setupLogout() {
  const logoutBtn = document.getElementById('logout-btn');
  const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
  
  const handleLogout = () => {
    // Add logout animation
    if (logoutBtn) {
      animate(
        logoutBtn,
        { scale: [1, 0.9, 1] },
        { duration: 0.2 }
      );
    }
    
    // Simulate logout process
    setTimeout(() => {
      // Clear auth data
      localStorage.removeItem('userToken');
      sessionStorage.removeItem('isAuthenticated');
      
      // Redirect to login/home
      window.location.href = '/index.html';
    }, 300);
  };
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
  
  if (mobileLogoutBtn) {
    mobileLogoutBtn.addEventListener('click', handleLogout);
  }
}

// Export for manual initialization if needed
export function refreshNavbar() {
  highlightActiveLink();
  setupBackendFeatures();
}

// Auto-initialize if script is loaded directly
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavbar);
} else {
  initNavbar();
}