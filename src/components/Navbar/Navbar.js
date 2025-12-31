import { animate, stagger } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm";

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
      setupMobileMenu();
      highlightActiveLink();
    })
    .catch(err => console.error(err));
}

function highlightActiveLink() {
  const currentPath = window.location.pathname.replace(/\/$/, "");
  const links = document.querySelectorAll("nav a");

  links.forEach(link => {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, "");

    // Reset
    link.classList.remove("text-blue-700");
    link.classList.add("text-gray-900");

    // Active
    if (
      linkPath === currentPath ||
      (currentPath === "/" && linkPath.endsWith("/index.html"))
    ) {
      link.classList.remove("text-gray-900");
      link.classList.add("text-blue-700");
    }
  });
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
      menuIcon?.classList.replace("ph-list", "ph-x");
      mobileMenu.classList.remove("hidden");

      animate(
        mobileMenu,
        { height: ["0px", "auto"], opacity: [0, 1] },
        { duration: 0.3, easing: "ease-out" }
      );

      animate(
        ".mobile-link",
        { opacity: [0, 1], x: [-20, 0] },
        { delay: stagger(0.05), duration: 0.3 }
      );
    } else {
      menuIcon?.classList.replace("ph-x", "ph-list");

      const close = animate(
        mobileMenu,
        { height: "0px", opacity: 0 },
        { duration: 0.2, easing: "ease-in" }
      );

      close.finished.then(() => mobileMenu.classList.add("hidden"));
    }
  });
}
