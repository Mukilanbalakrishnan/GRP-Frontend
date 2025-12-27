import { animate, stagger, inView } from "https://cdn.jsdelivr.net/npm/motion@10.18.0/+esm";

const contactData = [
    { 
        type: "link",
        href: "tel:+919876543210",
        label: "Call Us Now", 
        value: "+91 98765 43210", 
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />`,
        color: "from-red-600 to-orange-500"
    },
    { 
        type: "link",
        href: "mailto:info@grp-roofing.com",
        label: "Email Support", 
        value: "info@grp-roofing.com", 
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />`,
        color: "from-blue-600 to-cyan-500"
    },
    { 
        type: "link",
        href: "https://goo.gl/maps/1",
        target: "_blank",
        label: "Visit Our HQ", 
        value: "Coimbatore, Tamil Nadu", 
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />`,
        color: "from-green-600 to-emerald-500"
    }
];
const businessHoursData = [
  { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
  { day: "Saturday", time: "10:00 AM – 4:00 PM" },
  { day: "Sunday", time: "Emergency Only", highlight: true }
];


export function initContact() {
    const cardGrid = document.getElementById("contact-card-grid");
    const mapBox = document.getElementById("contact-map");
    const header = document.querySelector(".contact-header-animate");
    const businessWrapper = document.getElementById("business-hours-wrapper");

    if (!cardGrid || !mapBox || !businessWrapper) return;

    /* ---------------- CONTACT CARDS ---------------- */

    cardGrid.innerHTML = "";

    contactData.forEach(item => {
        const card = document.createElement("a");
        card.href = item.href;
        if (item.target) card.target = item.target;

        card.className = `
            contact-card group relative block
            bg-gradient-to-br from-blue-900 to-blue-950 rounded-2xl p-6 lg:p-7
            shadow-xl cursor-pointer overflow-hidden
            opacity-0 translate-y-8
            transition-all duration-500
            border border-white/10
        `;

        card.innerHTML = `
            <div class="relative z-10 flex items-center gap-6">
                <div class="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                    <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        ${item.icon}
                    </svg>
                </div>

                <div class="flex-1">
                    <p class="text-xs uppercase text-blue-300 tracking-wider">${item.label}</p>
                    <p class="text-lg font-bold text-white">${item.value}</p>
                </div>
            </div>
        `;

        cardGrid.appendChild(card);
    });

    /* ---------------- BUSINESS HOURS ---------------- */

    businessWrapper.innerHTML = "";

    const businessSection = document.createElement("div");
    businessSection.className = `
        business-hours opacity-0 translate-y-8
        mt-20 bg-gradient-to-r from-blue-50 to-white
        p-10 rounded-3xl border border-blue-100 shadow-md
    `;

    businessSection.innerHTML = `
        <h3 class="text-blue-950 font-bold text-xl mb-8 text-center">
            Business Hours
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            ${businessHoursData.map(item => `
                <div>
                    <p class="text-gray-600">${item.day}</p>
                    <p class="font-semibold ${item.highlight ? "text-red-600" : "text-blue-950"}">
                        ${item.time}
                    </p>
                </div>
            `).join("")}
        </div>
    `;

    businessWrapper.appendChild(businessSection);

    /* ---------------- ANIMATIONS ---------------- */

    const cards = document.querySelectorAll(".contact-card");

    // Initial states
    animate(cards, { opacity: 0, y: 20 }, { duration: 0 });
    animate(mapBox, { opacity: 0, x: 40 }, { duration: 0 });
    animate(businessSection, { opacity: 0, y: 20 }, { duration: 0 });

    inView("#contact-section", () => {

        if (header) {
            animate(header,
                { opacity: 1, y: 0, scale: [0.95, 1] },
                { duration: 0.8, delay: 0.2 }
            );
        }

        animate(cards,
            { opacity: 1, y: 0 },
            { duration: 0.6, delay: stagger(0.15, { start: 0.4 }) }
        );

        animate(mapBox,
            { opacity: 1, x: 0, scale: [0.95, 1] },
            { duration: 0.8, delay: 0.8 }
        );

        animate(businessSection,
            { opacity: 1, y: 0 },
            { duration: 0.6, delay: 1.2 }
        );

    }, { margin: "-100px" });
}
