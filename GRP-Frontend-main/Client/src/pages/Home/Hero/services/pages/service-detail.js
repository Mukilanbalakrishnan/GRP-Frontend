document.addEventListener('DOMContentLoaded', () => {
    const servicesData = {
        'ceramic-tile': {
            title: "Ceramic Tile Roofing",
            subtitle: "Classic Beauty & Durability",
            heroImage: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=1600&auto=format&fit=crop",
            aboutTitle: "About Ceramic Tile Roofing",
            aboutDescription: "Ceramic roof tiles are known for their timeless appeal and exceptional durability. They provide superior thermal insulation, keeping your home cooler in summer and warmer in winter. Our premium ceramic tiles are available in a variety of colors and finishes to perfectly match your architectural style.",
            aboutImage: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=800&auto=format&fit=crop",
            bulletPoints: [
                "Superior Thermal Insulation",
                "Fire and Weather Resistant",
                "Long-lasting Durability (50+ years)"
            ],
            videos: [
                { thumbnail: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=600&auto=format&fit=crop", src: "../videos/video 1.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=600&auto=format&fit=crop", src: "../videos/video 2.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=600&auto=format&fit=crop", src: "../videos/video 3.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=600&auto=format&fit=crop", src: "../videos/video 4.mp4" }
            ]
        },
        'cement-tile': {
            title: "Cement Tile Roofing",
            subtitle: "Robust & Weather Resistant",
            heroImage: "https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=1600&auto=format&fit=crop",
            aboutTitle: "About Cement Roofing",
            aboutDescription: "Designed for longevity, cement roof tiles are an excellent choice for both commercial and residential properties. They offer high resistance to wind, hail, and extreme weather conditions, ensuring your roof remains secure for decades.",
            aboutImage: "https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=800&auto=format&fit=crop",
            bulletPoints: [
                "High Impact Resistance",
                "Low Maintenance",
                "Cost-effective Durability"
            ],
            videos: [
                { thumbnail: "https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=600&auto=format&fit=crop", src: "../videos/video 2.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=600&auto=format&fit=crop", src: "../videos/video 1.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=600&auto=format&fit=crop", src: "../videos/video 3.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=600&auto=format&fit=crop", src: "../videos/video 4.mp4" }
            ]
        },
        'clay-tile': {
            title: "Clay Tile Roofing",
            subtitle: "Eco-friendly Elegance",
            heroImage: "https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=1600&auto=format&fit=crop",
            aboutTitle: "About Clay Tile Roofing",
            aboutDescription: "Add a touch of Mediterranean charm to your home with our natural clay tiles. Environmentally friendly and energy-efficient, clay tiles provide excellent air circulation and insulation, helping to reduce your energy bills.",
            aboutImage: "https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=800&auto=format&fit=crop",
            bulletPoints: [
                "Natural & Sustainable Material",
                "Excellent Air Circulation",
                "Resistant to Rot and Insects"
            ],
            videos: [
                { thumbnail: "https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=600&auto=format&fit=crop", src: "../videos/video 3.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=600&auto=format&fit=crop", src: "../videos/video 1.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=600&auto=format&fit=crop", src: "../videos/video 2.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=600&auto=format&fit=crop", src: "../videos/video 4.mp4" }
            ]
        },
        'shingles': {
            title: "Shingles Roofing",
            subtitle: "Versatile & Affordable",
            heroImage: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=1600&auto=format&fit=crop",
            aboutTitle: "About Shingles Roofing",
            aboutDescription: "One of the most popular roofing choices, shingles offer a perfect balance of affordability and versatility. Available in a wide range of colors and styles, they can easily mimic the look of more expensive materials like slate or wood.",
            aboutImage: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=800&auto=format&fit=crop",
            bulletPoints: [
                "Cost-effective Solution",
                "Wide Variety of Styles",
                "Easy Repair & Maintenance"
            ],
            videos: [
                { thumbnail: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=600&auto=format&fit=crop", src: "../videos/video 4.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=600&auto=format&fit=crop", src: "../videos/video 1.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=600&auto=format&fit=crop", src: "../videos/video 2.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=600&auto=format&fit=crop", src: "../videos/video 3.mp4" }
            ]
        },
        'jally-pergola': {
            title: "Jally Pergola Work",
            subtitle: "Decorative Ventilation",
            heroImage: "https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=1600&auto=format&fit=crop",
            aboutTitle: "About Jally & Pergola",
            aboutDescription: "Enhance your outdoor living spaces with our custom Jally and Pergola designs. These decorative elements not only improve ventilation and air flow but also add a sophisticated architectural detail to your home's exterior.",
            aboutImage: "https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=800&auto=format&fit=crop",
            bulletPoints: [
                "Custom Architectural Designs",
                "Improved Natural Ventilation",
                "Enhanced Aesthetic Appeal"
            ],
            videos: [
                { thumbnail: "https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=600&auto=format&fit=crop", src: "../videos/video 1.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=600&auto=format&fit=crop", src: "../videos/video 2.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=600&auto=format&fit=crop", src: "../videos/video 3.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=600&auto=format&fit=crop", src: "../videos/video 4.mp4" }
            ]
        },
        'stone-coated-sheet': {
            title: "Stone Coated Sheet Roofing",
            subtitle: "Strength Meets Beauty",
            heroImage: "https://images.unsplash.com/photo-1522851458296-189f81d1203d?q=80&w=1600&auto=format&fit=crop",
            aboutTitle: "About Stone Coated Sheets",
            aboutDescription: "Get the durability of steel with the aesthetic of traditional tiles. Our stone-coated metal sheets are weather-proof, lightweight, and require minimal maintenance, making them an ideal choice for modern roofing.",
            aboutImage: "https://images.unsplash.com/photo-1522851458296-189f81d1203d?q=80&w=800&auto=format&fit=crop",
            bulletPoints: [
                "Lightweight yet Strong",
                "Sound Insulation",
                "High Weather Resistance"
            ],
            videos: [
                { thumbnail: "https://images.unsplash.com/photo-1522851458296-189f81d1203d?q=80&w=600&auto=format&fit=crop", src: "../videos/video 2.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=600&auto=format&fit=crop", src: "../videos/video 1.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=600&auto=format&fit=crop", src: "../videos/video 3.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=600&auto=format&fit=crop", src: "../videos/video 4.mp4" }
            ]
        },
        'puff-pannel': {
            title: "Puff Pannel Sheet Work",
            subtitle: "Superior Insulation",
            heroImage: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1600&auto=format&fit=crop",
            aboutTitle: "About Puff Pannels",
            aboutDescription: "Ensure maximum energy efficiency with our PUF (Polyurethane Foam) panels. Ideal for industrial and commercial roofing, these panels offer exceptional thermal insulation, reducing cooling costs effectively.",
            aboutImage: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=800&auto=format&fit=crop",
            bulletPoints: [
                "High Thermal Efficiency",
                "Lightweight Construction",
                "Quick & Easy Installation"
            ],
            videos: [
                { thumbnail: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=600&auto=format&fit=crop", src: "../videos/video 3.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=600&auto=format&fit=crop", src: "../videos/video 1.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=600&auto=format&fit=crop", src: "../videos/video 2.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=600&auto=format&fit=crop", src: "../videos/video 4.mp4" }
            ]
        },
        'upvc-sheet': {
            title: "UPVC Sheet Work",
            subtitle: "Chemical Resistant Roofing",
            heroImage: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1600&auto=format&fit=crop",
            aboutTitle: "About UPVC Sheets",
            aboutDescription: "UPVC roofing sheets are lightweight, durable, and highly resistant to chemical corrosion. They are an excellent choice for warehouses, factories, and coastal properties where corrosion is a concern.",
            aboutImage: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop",
            bulletPoints: [
                "Anti-corrosion Properties",
                "Heat & Sound Insulation",
                "Low Maintenance"
            ],
            videos: [
                { thumbnail: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop", src: "../videos/video 4.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=600&auto=format&fit=crop", src: "../videos/video 1.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=600&auto=format&fit=crop", src: "../videos/video 2.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=600&auto=format&fit=crop", src: "../videos/video 3.mp4" }
            ]
        },
        'polycarbonate-sheet': {
            title: "Polycarbonate Sheet Work",
            subtitle: "Transparent & Durable",
            heroImage: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=1600&auto=format&fit=crop",
            aboutTitle: "About Polycarbonate Sheets",
            aboutDescription: "Maximize natural light with our polycarbonate roofing sheets. Perfect for skylights, patios, and greenhouses, they are virtually unbreakable and offer UV protection while letting in sunlight.",
            aboutImage: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=800&auto=format&fit=crop",
            bulletPoints: [
                "Unbreakable Strength",
                "UV Radiation Protection",
                "High Light Transmission"
            ],
            videos: [
                { thumbnail: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=600&auto=format&fit=crop", src: "../videos/video 1.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=600&auto=format&fit=crop", src: "../videos/video 2.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=600&auto=format&fit=crop", src: "../videos/video 3.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=600&auto=format&fit=crop", src: "../videos/video 4.mp4" }
            ]
        },
        'aluminium-sheet': {
            title: "Aluminium Sheet Work",
            subtitle: "Lightweight Protection",
            heroImage: "https://images.unsplash.com/photo-1621905252507-b35a5db9f36f?q=80&w=1600&auto=format&fit=crop",
            aboutTitle: "About Aluminium Sheets",
            aboutDescription: "Our rust-resistant aluminium sheets are the perfect solution for coastal and industrial roofing. Lightweight and easier to handle than steel, they put less stress on your building's structure while providing excellent protection.",
            aboutImage: "https://images.unsplash.com/photo-1621905252507-b35a5db9f36f?q=80&w=800&auto=format&fit=crop",
            bulletPoints: [
                "Rust & Corrosion Resistant",
                "Lightweight Material",
                "Ideal for Coastal Areas"
            ],
            videos: [
                { thumbnail: "https://images.unsplash.com/photo-1621905252507-b35a5db9f36f?q=80&w=600&auto=format&fit=crop", src: "../videos/video 2.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=600&auto=format&fit=crop", src: "../videos/video 1.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=600&auto=format&fit=crop", src: "../videos/video 3.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=600&auto=format&fit=crop", src: "../videos/video 4.mp4" }
            ]
        },
        'metal-sheet': {
            title: "Metal Sheet Roofing Work",
            subtitle: "Industrial Strength",
            heroImage: "https://images.unsplash.com/photo-1518709322971-da0f45202868?q=80&w=1600&auto=format&fit=crop",
            aboutTitle: "About Metal Roofing",
            aboutDescription: "For large-scale industrial and commercial projects, our metal sheet roofing provides unmatched strength and longevity. Custom fabrication ensures a perfect fit for any large structure, minimizing waste and maximizing protection.",
            aboutImage: "https://images.unsplash.com/photo-1518709322971-da0f45202868?q=80&w=800&auto=format&fit=crop",
            bulletPoints: [
                "High Structural Strength",
                "Custom Fabrication",
                "Ideal for Warehouses"
            ],
            videos: [
                { thumbnail: "https://images.unsplash.com/photo-1518709322971-da0f45202868?q=80&w=600&auto=format&fit=crop", src: "../videos/video 3.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=600&auto=format&fit=crop", src: "../videos/video 1.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1520697830682-bbb6e85e420f?q=80&w=600&auto=format&fit=crop", src: "../videos/video 2.mp4" },
                { thumbnail: "https://images.unsplash.com/photo-1598418043689-50c5bb17202d?q=80&w=600&auto=format&fit=crop", src: "../videos/video 4.mp4" }
            ]
        }
    };

    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get('service');
    const data = servicesData[serviceId];

    // Modal Elements
    const modal = document.getElementById('video-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalContent = document.getElementById('modal-content');
    const modalVideo = document.getElementById('modal-video');
    const closeModalBtn = document.getElementById('close-modal');

    function openModal(videoSrc) {
        modalVideo.src = videoSrc;
        modal.classList.remove('hidden');
        modal.classList.add('flex');

        // Trigger animations
        setTimeout(() => {
            modalBackdrop.classList.remove('opacity-0');
            modalContent.classList.remove('opacity-0', 'scale-95');
        }, 10);

        modalVideo.play().catch(e => console.log('Auto-play prevented:', e));
    }

    function closeModal() {
        modalBackdrop.classList.add('opacity-0');
        modalContent.classList.add('opacity-0', 'scale-95');

        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            modalVideo.pause();
            modalVideo.src = ''; // Stop buffering
        }, 300);
    }

    // Close triggers
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) closeModal();
    });

    if (data) {
        document.title = data.title + " - Brand.";
        document.getElementById('hero-title').textContent = data.title;
        document.getElementById('hero-subtitle').textContent = data.subtitle;
        document.getElementById('hero-image').src = data.heroImage;

        document.getElementById('about-title').textContent = data.aboutTitle;
        document.getElementById('about-description').textContent = data.aboutDescription;
        document.getElementById('about-image').src = data.aboutImage;

        // Also update booking image to match about image
        document.getElementById('booking-image').src = data.aboutImage;

        const bulletList = document.getElementById('bullet-points');
        bulletList.innerHTML = '';
        data.bulletPoints.forEach(point => {
            const li = document.createElement('li');
            li.className = 'flex items-center gap-3 text-gray-700';
            li.innerHTML = `<i class="ph-bold ph-check text-blue-600"></i> ${point}`;
            bulletList.appendChild(li);
        });

        // Populate Video Grid
        const videoGrid = document.getElementById('video-grid');
        if (videoGrid && data.videos) {
            videoGrid.innerHTML = ''; // Clear existing
            data.videos.forEach(video => {
                const videoCard = document.createElement('div');
                videoCard.className = 'aspect-[9/16] bg-blue-100 rounded-xl overflow-hidden shadow-md relative group cursor-pointer border border-blue-200 transition-transform hover:-translate-y-1';
                videoCard.innerHTML = `
                    <img src="${video.thumbnail}" class="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <i class="ph-fill ph-play-circle text-5xl text-blue-600 opacity-90 group-hover:scale-110 transition-transform shadow-lg rounded-full bg-white/20 backdrop-blur-sm p-2"></i>
                    </div>
                `;

                // Click handler to open modal
                videoCard.addEventListener('click', () => {
                    openModal(video.src);
                });

                videoGrid.appendChild(videoCard);
            });
        }

        // Set selected option in booking form
        const serviceSelect = document.getElementById('service-select');
        serviceSelect.value = serviceId;

        // Show content
        document.getElementById('main-content').classList.remove('opacity-0');
    } else {
        // Handle invalid service ID
        document.getElementById('main-content').innerHTML = '<div class="text-center py-20"><h2 class="text-2xl font-bold">Service Not Found</h2><a href="../services.html" class="text-blue-600 hover:underline">Return to Services</a></div>';
        document.getElementById('main-content').classList.remove('opacity-0');
    }
});
