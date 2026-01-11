import { animate } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm";

export function initGlobalLoader() {
  // 1. Ensure Phosphor Icons
  if (!document.querySelector('script[src*="phosphor-icons"]')) {
    const iconScript = document.createElement("script");
    iconScript.src = "https://unpkg.com/@phosphor-icons/web";
    document.head.appendChild(iconScript);
  }

  // 2. Loader HTML (namespaced)
  const loaderHTML = `
    <div id="grp-loader-root"
      class="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center">

      <div class="relative w-28 h-28 mb-6 flex items-center justify-center">

        <!-- Pulse Background -->
        <div class="absolute inset-0 rounded-full bg-blue-100 grp-pulse-bg"></div>

        <!-- Rotating Ring -->
        <div
          id="grp-loader-ring"
          class="absolute inset-2 rounded-full border-[3px] border-transparent border-t-blue-600">
        </div>

        <!-- Logo -->
        <img
          src="/src/assets/images/GRP_Industries_Logo.png"
          alt="GRP Industries"
          class="relative z-10 h-16 w-auto"
        />
      </div>

      <h2 class="text-gray-900 font-extrabold text-xl tracking-wide">
        GRP Industries
      </h2>
    </div>
  `;

  // 3. Namespaced CSS (NO conflicts)
  const style = document.createElement("style");
  style.textContent = `
    @keyframes grpPulse {
      0%, 100% { transform: scale(0.85); opacity: 0.4; }
      50% { transform: scale(1.05); opacity: 0.9; }
    }

    .grp-pulse-bg {
      animation: grpPulse 2s ease-in-out infinite;
    }

    #grp-loader-ring {
      transform: rotate(0deg);
      will-change: transform;
    }
  `;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML("beforeend", loaderHTML);

  // 4. Animate AFTER layout is ready
  const loader = document.getElementById("grp-loader-root");
  const ring = document.getElementById("grp-loader-ring");

  let spinControls;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      spinControls = animate(
        ring,
        { rotate: 360 },
        { duration: 1, repeat: Infinity, easing: "linear" }
      );
    });
  });

  // 5. Remove loader safely
  setTimeout(async () => {
    await animate(loader, { opacity: 0 }, { duration: 0.5 }).finished;

    spinControls?.stop();
    loader.remove();

    // Namespaced event
    window.dispatchEvent(new CustomEvent("grp-app-loaded"));
  }, 2000);
}
