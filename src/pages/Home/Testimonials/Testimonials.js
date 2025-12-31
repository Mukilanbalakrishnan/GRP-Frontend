

import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
export const testimonialData = [
    { id: 1, name: "Robert Fox", role: "Factory Manager", title: "Industrial Roofing", videoUrl: "https://youtube.com/shorts/6gExsLRc8ow?si=r1619CbP1eeqm-Rs", thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop", rating: 5, quote: "Saved us millions in maintenance", duration: "1:24" },
    { id: 2, name: "Jane Cooper", role: "Homeowner", title: "Residential Roof", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop", rating: 5, quote: "Home value increased by 15%", duration: "2:15" },
    { id: 3, name: "Guy Hawkins", role: "Architect", title: "Perfect Match", videoUrl: "https://www.instagram.com/reel/C3_xyZqvK7a/", thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop", rating: 4, quote: "Matched our architectural vision", duration: "0:45" },
    { id: 4, name: "Cody Fisher", role: "Site Engineer", title: "Most Reliable", videoUrl: "https://www.youtube.com/watch?v=ysz5S6P_bsu", thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", rating: 5, quote: "Best team in 15 years", duration: "1:55" },
    { id: 5, name: "Sarah Johnson", role: "Building Manager", title: "Waterproofing", videoUrl: "https://www.youtube.com/watch?v=ysz5S6P_bsu", thumbnail: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=400&auto=format&fit=crop", rating: 5, quote: "Solved all leak issues", duration: "1:30" },
    { id: 6, name: "Michael Chen", role: "Solar Consultant", title: "Solar Integration", videoUrl: "https://www.youtube.com/watch?v=ysz5S6P_bsu", thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop", rating: 4, quote: "Perfect panel integration", duration: "2:10" }
];

// --- HELPERS ---
function isInstagram(url) { return url.includes("instagram.com"); }
function getYouTubeId(url) { try { const u = new URL(url); if(u.pathname.startsWith('/shorts/')) return u.pathname.split('/')[2]; if(u.hostname==='youtu.be') return u.pathname.slice(1); if(u.hostname.includes('youtube.com')) return u.searchParams.get('v'); return null; } catch(e){return null;} }
function getInstagramId(url) { try { const u = new URL(url); const p = u.pathname.split('/').filter(Boolean); if(p[0]==='reel'||p[0]==='p') return p[1]; return null; } catch(e){return null;} }
function getThumbnail(item) { if(item.thumbnail) return item.thumbnail; if(isInstagram(item.videoUrl)) return "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&auto=format&fit=crop"; const vid = getYouTubeId(item.videoUrl); if(vid) return `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`; return "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=400&auto=format&fit=crop"; }

// --- MODAL ---
function createVideoModal() {
    if (document.getElementById('testimonial-video-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'testimonial-video-modal';
    modal.className = `fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl opacity-0 pointer-events-none transition-all duration-500`;
    modal.innerHTML = `
        <button id="testimonial-close-modal" class="fixed top-6 right-6 z-[110] text-white hover:text-red-500 transition-all duration-300 group">
             <div class="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 group-hover:bg-red-600/30 group-hover:border-red-500/50 group-hover:rotate-90 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </div>
        </button>
        <div class="relative w-full max-w-6xl h-full flex items-center justify-center p-4">
            <div id="testimonial-player-container" class="relative bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 transform scale-95 transition-all duration-500">
                <iframe id="testimonial-video-iframe" class="w-full h-full" src="" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>`;
    document.body.appendChild(modal);
    document.getElementById('testimonial-close-modal').addEventListener('click', closeVideoModal);
    modal.addEventListener('click', (e) => { if (e.target === modal || e.target.closest('.relative.w-full') === e.target) closeVideoModal(); });
}

function openVideoModal(videoUrl) {
    const modal = document.getElementById('testimonial-video-modal');
    const iframe = document.getElementById('testimonial-video-iframe');
    const container = document.getElementById('testimonial-player-container');
    let embedSrc = '', isVertical = false;
    
    if (isInstagram(videoUrl)) {
        const id = getInstagramId(videoUrl); if(!id) return;
        embedSrc = `https://www.instagram.com/reel/${id}/embed/`; isVertical = true;
    } else {
        const id = getYouTubeId(videoUrl); if(!id) return;
        if (videoUrl.includes("/shorts/")) isVertical = true;
        embedSrc = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=0`;
    }
    
    container.className = "relative bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 transition-all duration-500";
    if (isVertical) container.classList.add('w-full', 'max-w-[360px]', 'aspect-[9/16]', 'h-[85vh]');
    else container.classList.add('w-full', 'max-w-5xl', 'aspect-video');
    
    iframe.src = embedSrc;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    setTimeout(() => { container.classList.remove('scale-95'); container.classList.add('scale-100'); }, 50);
}

function closeVideoModal() {
    const modal = document.getElementById('testimonial-video-modal');
    const iframe = document.getElementById('testimonial-video-iframe');
    const container = document.getElementById('testimonial-player-container');
    container.classList.remove('scale-100');
    container.classList.add('scale-95');
    modal.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => { iframe.src = ""; }, 300);
}

// --- INITIALIZATION ---
export function initTestimonials() {
    const track = document.getElementById('testimonials-track');
    const leftBtn = document.getElementById('scroll-left-btn');
    const rightBtn = document.getElementById('scroll-right-btn');
    
    if (!track) return;
    createVideoModal();
    track.innerHTML = '';

    testimonialData.forEach((item, index) => {
        const card = document.createElement('div');
        const thumbUrl = getThumbnail(item);
        
        // --- RESPONSIVE WIDTH LOGIC ---
        // Mobile: w-[85vw] (shows 1 partial)
        // Tablet: w-[calc(50%-12px)] (shows 2)
        // Desktop: w-[calc(33.333%-16px)] (shows exactly 3)
        card.className = `
testimonial-card flex-shrink-0 relative group perspective-1000
w-[85vw] sm:w-[320px] lg:w-[280px] xl:w-[300px]
aspect-[9/16]
bg-[#1e0094] rounded-2xl overflow-hidden shadow-xl
snap-center cursor-pointer border border-white/10
opacity-0 translate-y-12
`;

 

        card.innerHTML = `
            <img src="${thumbUrl}" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-transparent to-transparent"></div>
            <div class="card-glow"></div>

            <div class="absolute top-4 right-4 z-20">
                <div class="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-red-600 group-hover:border-red-500 transition-all duration-300 shadow-lg group-hover:scale-110 group-hover:rotate-12">
                    <svg class="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
            </div>

            <div class="absolute bottom-0 left-0 w-full p-6 z-20 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div class="mb-3">
                    <span class="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
                        ${isInstagram(item.videoUrl) ? 'Instagram' : 'Video'}
                    </span>
                </div>
                <h3 class="text-xl font-bold text-white mb-1 leading-tight">${item.title}</h3>
                <p class="text-blue-200 text-sm mb-4 line-clamp-2">"${item.quote}"</p>
                <div class="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                        ${item.name.charAt(0)}
                    </div>
                    <div>
                        <p class="text-white text-xs font-bold">${item.name}</p>
                        <p class="text-blue-300 text-[10px] uppercase tracking-wider">${item.role}</p>
                    </div>
                </div>
            </div>
        `;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
            const rotateY = ((x - rect.width / 2) / 20).toFixed(2);
            const rotateX = ((rect.height / 2 - y) / 20).toFixed(2);
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });

        card.addEventListener('click', () => openVideoModal(item.videoUrl));
        track.appendChild(card);
    });

    // --- ANIMATIONS ---
    gsap.to(".testimonial-header-animate", { duration: 1, opacity: 1, y: 0, ease: "power3.out" });
    
    gsap.to(".testimonial-card", {
        scrollTrigger: { trigger: "#testimonials-section", start: "top 80%" },
        duration: 0.8,
        opacity: 1,
        y: 0,
        stagger: 0.15,
        ease: "power3.out",
    });
    
    gsap.to(".testimonial-controls-animate", {
        scrollTrigger: { trigger: "#testimonials-section", start: "top 70%" },
        duration: 0.8, opacity: 1, y: 0, delay: 0.5, ease: "back.out(1.5)"
    });

    // --- SCROLL BUTTON LOGIC ---
    const scrollOneCard = (dir) => {
  const card = track.querySelector('.testimonial-card');
  if (!card) return;
  const gap = 24; // gap-6
  const amount = card.offsetWidth + gap;
  track.scrollBy({ left: amount * dir, behavior: 'smooth' });
};

leftBtn.addEventListener('click', () => scrollOneCard(-1));
rightBtn.addEventListener('click', () => scrollOneCard(1));

}