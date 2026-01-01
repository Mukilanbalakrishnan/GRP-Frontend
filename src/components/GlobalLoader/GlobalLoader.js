// src/components/GlobalLoader/GlobalLoader.js
import { animate } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm";

export function initGlobalLoader() {
    // 1. Check for Phosphor Icons (for the lightning icon)
    if (!document.querySelector('script[src*="phosphor-icons"]')) {
        const iconScript = document.createElement('script');
        iconScript.src = 'https://unpkg.com/@phosphor-icons/web';
        document.head.appendChild(iconScript);
    }

    // 2. Inject HTML (Clean, Minimal Design)
    // Z-Index is high to cover everything.
    const loaderHTML = `
        <div id="simple-loader" class="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center">
            
            <div class="relative w-24 h-24 mb-6 flex items-center justify-center">
                <div class="absolute inset-0 bg-blue-100 rounded-full animate-pulse-slow"></div>
                
                <div id="loader-ring" class="absolute inset-0 border-2 border-transparent border-t-blue-600 rounded-full"></div>
                
                <i class="ph-fill ph-lightning text-3xl text-blue-600 z-10"></i>
            </div>

            <h2 class="text-gray-800 font-bold text-lg tracking-widest uppercase">Brand.</h2>
            <p class="text-gray-400 text-sm mt-1 font-medium">Loading experience...</p>
        </div>
    `;

    // Inject CSS for the "Breathing" and "Spin" effects
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulseSlow {
            0%, 100% { transform: scale(0.8); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 1; }
        }
        .animate-pulse-slow {
            animation: pulseSlow 2s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
    document.body.insertAdjacentHTML('beforeend', loaderHTML);

    // 3. Logic & Variables
    const loader = document.getElementById('simple-loader');
    const ring = document.getElementById('loader-ring');

    // Start Ring Rotation Animation
    const spinControls = animate(
        ring, 
        { rotate: 360 }, 
        { duration: 1, repeat: Infinity, easing: "linear" }
    );

    // 4. Simulate Load Time (e.g., 2 seconds)
    // In a real app, you would listen for window.onload
    setTimeout(async () => {
        
        // --- STEP A: FADE OUT ---
        // We fade opacity to 0 so it looks smooth.
        await animate(loader, { opacity: 0 }, { duration: 0.5 }).finished;

        // --- STEP B: CRITICAL FIX FOR MOUSE ---
        // We MUST stop the animation and remove the element from the HTML.
        // If we don't do this, the invisible div blocks your clicks.
        spinControls.stop();
        loader.remove(); 

        // --- STEP C: NOTIFY APP ---
        // Tell the rest of your app (like the EnquiryForm) to show itself.
        window.dispatchEvent(new CustomEvent('app-loaded'));

    }, 2000);
}