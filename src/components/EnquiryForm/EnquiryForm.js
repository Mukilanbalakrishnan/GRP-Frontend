// src/components/EnquiryForm/EnquiryFormGlobal.js
import { animate, stagger, spring } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm";
import confetti from "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/+esm";

export function initEnquiryFormGlobal() {
    // 1. Self-Cleaning
    const existingTrigger = document.getElementById('global-enquiry-trigger');
    const existingModal = document.getElementById('global-enquiry-modal');
    if (existingTrigger) existingTrigger.remove();
    if (existingModal) existingModal.remove();

    // 2. Inject HTML
    // CHANGES MADE:
    // 1. Added 'flex items-center justify-center' to the modal container to force centering.
    // 2. Removed 'top: 50%', 'left: 50%' and 'transform' from the content div.
    const formHTML = `
        <div id="global-enquiry-trigger" 
             style="position: fixed; top: 50%; right: 0; z-index: 99999; transform: translateY(-50%);"
             class="translate-x-0 origin-right">
            <button class="
                bg-blue-600 text-white font-bold 
                py-3 px-1 md:py-6 md:px-2 
                rounded-l-lg shadow-lg hover:shadow-blue-500/50
                hover:bg-blue-700 transition-colors 
                flex flex-col items-center gap-2 cursor-pointer group
            ">
                <i class="ph-bold ph-chat-text text-xl md:text-3xl mb-1 transform -rotate-90"></i>
                <span class="global-writing-vertical text-xs md:text-base tracking-widest uppercase transform rotate-180">
                    Enquiry
                </span>
            </button>
        </div>

        <div id="global-enquiry-modal" 
             class="hidden flex items-center justify-center" 
             style="position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; z-index: 10000 !important;">
            
            <div id="global-enquiry-backdrop" 
                 class="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0"
                 style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div>
            
            <div id="global-enquiry-content" 
                style="
                    background-image: url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop');
                    position: relative !important;
                "
                class="w-[90%] max-w-md bg-cover bg-center bg-no-repeat rounded-2xl shadow-2xl overflow-hidden opacity-0 z-10">
                
                <div class="h-full w-full bg-white/95 backdrop-blur-sm">
                    <div class="bg-blue-600/90 p-6 text-white flex justify-between items-center backdrop-blur-md">
                        <div>
                            <h3 class="text-xl font-bold">Get in Touch</h3>
                            <p class="text-blue-100 text-sm mt-1">We'd love to hear from you!</p>
                        </div>
                        <button id="global-close-enquiry" class="p-2 hover:bg-white/20 rounded-full transition-colors">
                            <i class="ph-bold ph-x text-xl"></i>
                        </button>
                    </div>

                    <div class="p-6 md:p-8">
                        <form id="globalEnquiryFormMain" class="space-y-4">
                            <div class="relative group global-form-item opacity-0">
                                <i class="ph-bold ph-user absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors"></i>
                                <input type="text" name="name" placeholder="Your Name" required

                                    class="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none">
                            </div>

                            <div class="relative group global-form-item opacity-0">
                                <i class="ph-bold ph-envelope-simple absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors"></i>
                                <input type="email" name="email" placeholder="Email Address" required
                                    class="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none">
                            </div>

                            <div class="relative group global-form-item opacity-0">
                                <i class="ph-bold ph-phone absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors"></i>
                                <input type="tel" name="phone" placeholder="Phone Number" required
                                    class="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none">
                            </div>

                            <div class="relative group global-form-item opacity-0">
                                <i class="ph-bold ph-chat-text absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors"></i>
                                <textarea  name="message" rows="3" placeholder="How can we help?" required
                                    class="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none"></textarea>
                            </div>

                            <button type="submit" class="global-form-item opacity-0 w-full bg-blue-600 text-white font-bold py-3.5 rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                                <span>Send Message</span>
                                <i class="ph-bold ph-paper-plane-right"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Only inject style if it doesn't exist
    if (!document.getElementById('global-enquiry-style')) {
        const style = document.createElement('style');
        style.id = 'global-enquiry-style';
        style.textContent = `
            .global-writing-vertical {
                writing-mode: vertical-rl;
                text-orientation: mixed;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.insertAdjacentHTML('beforeend', formHTML);

    // 3. Logic Variables
    const triggerBtn = document.getElementById('global-enquiry-trigger');
    const modal = document.getElementById('global-enquiry-modal');
    const backdrop = document.getElementById('global-enquiry-backdrop');
    const content = document.getElementById('global-enquiry-content');
    const closeBtn = document.getElementById('global-close-enquiry');
    const form = document.getElementById('globalEnquiryFormMain');
    const formItems = document.querySelectorAll('.global-form-item');
    let idleAnimationControl;

    function startIdleAnimation() {
        if (idleAnimationControl) idleAnimationControl.stop();
        idleAnimationControl = animate(triggerBtn, 
            { scale: [1, 1.08, 1], x: [0, -4, 0] }, 
            { duration: 2.5, repeat: Infinity, easing: "ease-in-out" }
        );
    }

    function stopIdleAnimation() {
        if (idleAnimationControl) {
            idleAnimationControl.stop();
            animate(triggerBtn, { scale: 1, x: 0 }, { duration: 0.3 });
        }
    }

    function openModal() {
        stopIdleAnimation();
        modal.classList.remove('hidden'); // This reveals the flex container, centering the content
        
        // Slide Button Out
        animate(triggerBtn, { x: 120 }, { duration: 0.3, easing: "ease-in" });
        
        // Celebration
        confetti({ particleCount: 100, spread: 60, origin: { x: 1, y: 0.5 }, colors: ['#2563EB', '#60A5FA', '#ffffff'], zIndex: 105 });
        
        // Modal Entrance
        animate(backdrop, { opacity: [0, 1] }, { duration: 0.4 });
        animate(content, { opacity: [0, 1], scale: [0.9, 1] }, { type: spring, stiffness: 300, damping: 25 });
        animate(formItems, { opacity: [0, 1], y: [20, 0] }, { delay: stagger(0.05, { start: 0.2 }) });
    }

    async function closeModal() {
        await Promise.all([
            animate(backdrop, { opacity: 0 }, { duration: 0.3 }).finished,
            animate(content, { opacity: 0, scale: 0.95 }, { duration: 0.2 }).finished
        ]);
        modal.classList.add('hidden');
        await animate(triggerBtn, { x: 0 }, { type: spring, stiffness: 200, damping: 20 }).finished;
        startIdleAnimation();
    }

    triggerBtn.addEventListener('click', openModal);
    triggerBtn.addEventListener('mouseenter', () => idleAnimationControl?.pause());
    triggerBtn.addEventListener('mouseleave', () => idleAnimationControl?.play());
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });

    startIdleAnimation();

    form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button');
    const originalContent = btn.innerHTML;

    // ✅ 1. Read values from form
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !phone || !message) {
        alert("Please fill all fields");
        return;
    }
const API_BASE_URL = window.ENV.API_BASE_URL;
    try {
        // ✅ 2. Send data to backend
        const response = await fetch(
            `${API_BASE_URL}/api/enquiry-create.php`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    message
                })
            }
        );

        const result = await response.json();

        if (!result.status) {
            alert(result.message || "Failed to send enquiry");
            return;
        }

        // ✅ 3. UI success animation (your logic)
        btn.disabled = true;
        btn.classList.add('cursor-not-allowed', 'opacity-80');

        btn.innerHTML = `<i class="ph-bold ph-spinner animate-spin text-xl"></i> Sending...`;

        setTimeout(() => {
            btn.classList.replace('bg-blue-600', 'bg-green-600');
            btn.innerHTML = `<i class="ph-bold ph-check text-xl"></i> Sent!`;

            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                zIndex: 105
            });

            form.reset();

            setTimeout(() => {
                closeModal();
                btn.disabled = false;
                btn.classList.remove('cursor-not-allowed', 'opacity-80');
                btn.innerHTML = originalContent;
                btn.classList.replace('bg-green-600', 'bg-blue-600');
            }, 1500);
        }, 600);

    } catch (err) {
        console.error(err);
        alert("Server error. Please try again later.");
    }
});


}